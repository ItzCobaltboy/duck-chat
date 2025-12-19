import { useState } from 'react';
import './chatScreen.css';

function ChatScreen() {
  const [status, setStatus] = useState('idle'); // idle | connecting | connected
  const [messages, setMessages] = useState([
    { from: 'stranger', text: 'Hey 👋' },
    { from: 'me', text: 'Yo!' }
  ]);
  const [input, setInput] = useState('');

  // Placeholder for WebRTC / backend matchmaking
  function handleConnect() {
    setStatus('connecting');

    // fake API / signaling delay
    setTimeout(() => {
      setStatus('connected');
    }, 1500);
  }

  function sendMessage() {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { from: 'me', text: input }
    ]);

    setInput('');

    // fake stranger reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'stranger', text: 'Interesting 🤔' }
      ]);
    }, 1000);
  }

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <h2>Duck Chat</h2>
        <span className={`status ${status}`}>{status}</span>
      </header>

      {status !== 'connected' ? (
        <div className="connect-area">
          <button onClick={handleConnect} disabled={status === 'connecting'}>
            {status === 'connecting' ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      ) : (
        <>
          <div className="messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${msg.from}`}
              >
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
          </div>
        </>
      )}
    </div>
  );
}

export { ChatScreen };
