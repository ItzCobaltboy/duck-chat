import { useState } from 'react';
import { createChat, pushMessage, closeChat } from './chatHandler';
import './chatScreen.css';
import GradientText from '../components/GradientText';

function ChatScreen() {
  const [status, setStatus] = useState('idle'); 
  const [messages, setMessages] = useState([
    { from: 'Duck', text: 'Say Hey to stranger! 👋' },
  ]);
  const [input, setInput] = useState('');

  /* ================= CALLBACKS ================= */

  function onConnectedCb() {
    setStatus('connected');
  }

  function onDisconnectedCb() {
    setStatus('disconnected');
    setMessages([
      { from: 'Duck', text: 'The other person disconnected.' }
    ]);
  }

  function onMessageCb(text) {
    setMessages(prev => [
      ...prev,
      { from: 'stranger', text }
    ]);
  }

  /* ================= ACTIONS ================= */

  function handleConnect() {
    setStatus('connecting');

    createChat({
      onMessage: onMessageCb,
      onConnected: onConnectedCb,
      onDisconnected: onDisconnectedCb,
    });
  }

  function handleDisconnect() {
    closeChat();
    setStatus('idle');
    setMessages([
      { from: 'Duck', text: 'Say Hey to stranger! 👋' },
    ]);
  }

  function handleTryAgain() {
    closeChat();
    setMessages([
      { from: 'Duck', text: 'Finding a new stranger…' },
    ]);
    handleConnect();
  }

  function sendMessage() {
    if (!input.trim()) return;

    if (!pushMessage(input)) {
      console.error('Failed to send message');
      return;
    }

    setMessages(prev => [
      ...prev,
      { from: 'me', text: input }
    ]);

    setInput('');
  }

  /* ================= UI ================= */

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <GradientText
          colors={[
            "#1CCEFF", "#FFFFFF", "#C67BFF",
            "#1CCEFF", "#FFFFFF", "#C67BFF"
          ]}
          animationSpeed={8}
        >
          Duck Chat
        </GradientText>
        <span className={`status ${status}`}>{status}</span>
      </header>

      {/* IDLE */}
      {status === 'idle' && (
        <div className="connect-area">
          <button onClick={handleConnect}>Connect</button>
        </div>
      )}

      {/* CONNECTING */}
      {status === 'connecting' && (
        <div className="connect-area">
          <button disabled>Connecting...</button>
        </div>
      )}

      {/* DISCONNECTED */}
      {status === 'disconnected' && (
        <div className="disconnect-area">
          <p>You have been disconnected.</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}

      {/* CONNECTED */}
      {status === 'connected' && (
        <>
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
            <button className="disconnect-btn" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export { ChatScreen };
