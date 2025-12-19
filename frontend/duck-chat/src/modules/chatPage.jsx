import { ChatScreen } from './chatScreen';
import './chatPage.css';
import DarkVeil from '../components/DarkVeil';

function ChatPage() {
  return (
    <div className="chat-page-root">
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div className="darkveil-wrapper">
                <DarkVeil />  
            </div>

            <div className="chat-page">
                <ChatScreen />
            </div>   
        </div>
    </div>
  );
}

export { ChatPage };
