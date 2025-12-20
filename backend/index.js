// index.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const waitingQueue = [];
const pairs = new Map(); // socket -> partnerSocket
const rateLimits = new Map(); // socket -> timestamps[]

const RATE_LIMIT_WINDOW = 10_000; // 10 sec
const RATE_LIMIT_MAX = 30;        // messages per window

console.log("WebSocket signaling server running on ws://localhost:8080");

function isRateLimited(ws) {
  const now = Date.now();
  const timestamps = rateLimits.get(ws) || [];

  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  recent.push(now);

  rateLimits.set(ws, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function tryMatch() {
  if (waitingQueue.length >= 2) {
    const a = waitingQueue.shift();
    const b = waitingQueue.shift();

    pairs.set(a, b);
    pairs.set(b, a);

    a.send(JSON.stringify({ type: "matched", role: "offerer" }));
    b.send(JSON.stringify({ type: "matched", role: "answerer" }));

    console.log("Paired two users");

    return true;
  }
}

wss.on("connection", (ws) => {
  console.log("User connected");

  rateLimits.set(ws, []);

  ws.on("message", (raw) => {
    if (isRateLimited(ws)) {
      ws.close(1013, "Rate limited");
      return;
    }

    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    handleMessage(ws, msg);
  });

  ws.on("close", () => cleanup(ws));
});

function handleMessage(ws, msg) {
  switch (msg.type) {
    case "join":
      if (!waitingQueue.includes(ws) && !pairs.has(ws)) {
        waitingQueue.push(ws);
        tryMatch();
      }
      break;

    case "signal":
      const partner = pairs.get(ws);
      if (partner && partner.readyState === partner.OPEN) {
        partner.send(JSON.stringify({
          type: "signal",
          data: msg.data
        }));
      }
      break;

    case "leave":
      cleanup(ws);
      break;
  }
}

function cleanup(ws) {
  // remove from waiting queue
  const idx = waitingQueue.indexOf(ws);
  if (idx !== -1) waitingQueue.splice(idx, 1);

  // break pair
  const partner = pairs.get(ws);
  if (partner) {
    pairs.delete(partner);
    partner.send(JSON.stringify({ type: "leave" }));
  }

  pairs.delete(ws);
  rateLimits.delete(ws);
}
