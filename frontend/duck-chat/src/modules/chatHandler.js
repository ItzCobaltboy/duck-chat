
const SIGNAL_SERVER = "ws://localhost:8080";

let socket;
let peer;
let channel;
let isOfferer = false;

let onMessageCb = () => {};
let onConnectedCb = () => {};
let onDisconnectedCb = () => {};

export function createChat({ onMessage, onConnected, onDisconnected }) {
  onMessageCb = onMessage;
  onConnectedCb = onConnected;
  onDisconnectedCb = onDisconnected;

  socket = new WebSocket(SIGNAL_SERVER);

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "join" }));
  };

  socket.onmessage = async (event) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "matched") {
      isOfferer = msg.role === "offerer";
      await initWebRTC();
    }

    if (msg.type === "signal") {
      await handleSignal(msg.data);
    }

    if (msg.type === "leave") {
      closeChat();
    }
  };

  socket.onclose = () => closeChat();
}


async function initWebRTC() {
  peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  peer.onicecandidate = (e) => {
    if (e.candidate) {
      socket.send(JSON.stringify({
        type: "signal",
        data: { ice: e.candidate }
      }));
    }
  };

  peer.ondatachannel = (e) => {
    channel = e.channel;
    setupChannel();
  };

  if (isOfferer) {
    channel = peer.createDataChannel("chat");
    setupChannel();

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.send(JSON.stringify({
      type: "signal",
      data: { sdp: offer }
    }));
  }
}

async function handleSignal(data) {
  if (data.sdp) {
    await peer.setRemoteDescription(data.sdp);

    if (data.sdp.type === "offer") {
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.send(JSON.stringify({
        type: "signal",
        data: { sdp: answer }
      }));
    }
  }

  if (data.ice) {
    await peer.addIceCandidate(data.ice);
  }
}

function setupChannel() {
  channel.onopen = () => {
    onConnectedCb();
  };

  channel.onmessage = (e) => {
    onMessageCb(e.data);
  };

  channel.onclose = () => {
    onDisconnectedCb();
  };
}


export function pushMessage(text) {
   try {
        if (channel && channel.readyState === "open") {
            channel.send(text);
        } 
        return true;
    } catch (err) {
        console.error("Failed to send message:", err);
        return false;
    }
}


export function closeChat() {
  if (channel) channel.close();
  if (peer) peer.close();
  if (socket) socket.close();

  channel = null;
  peer = null;
  socket = null;

  onDisconnectedCb();
}
