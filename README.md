# Duck Chat

Duck Chat is a lightweight anonymous chat experience that pairs two visitors via a WebRTC data channel, with a WebSocket signaling server for matchmaking and signaling.

## Tech Stack

- **Frontend:** React + Vite + Tailwind
- **Backend:** Express + `ws` WebSocket server
- **Realtime:** WebRTC data channel for peer-to-peer messages

## Repository Structure

```
backend/                Express + WebSocket signaling server
frontend/duck-chat/     Vite React application
```

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Setup

Install dependencies in each app folder:

```bash
cd backend
npm install

cd ../frontend/duck-chat
npm install
```

## Configuration

The frontend reads the signaling server base URL from Vite env variables.

1. Copy or edit the dev env file:
   - `frontend/duck-chat/.env.development`
2. Set the backend URL (HTTP/HTTPS; the app upgrades it to `wss://`):

```
VITE_BACKEND_URL=http://localhost:8080
```

> For local development without SSL, you may need to run a local reverse proxy or adjust the signaling URL logic to use `ws://`. If you change the backend port, update this value to match.

## Running Locally

### 1) Start the backend

```bash
cd backend
node index.js
```

The server listens on port `8080` by default and exposes the WebSocket signaling server on the same port.

### 2) Start the frontend

```bash
cd frontend/duck-chat
npm run dev
```

Open the printed local URL in two browser tabs to see two clients match and chat.

## Build & Lint

```bash
cd frontend/duck-chat
npm run lint
npm run build
```

## Notes

- The backend limits messages per client to reduce spam.
- WebRTC requires two clients to be paired; open two tabs or two devices to test.
