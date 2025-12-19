import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IntroScreen } from './modules/intro';
import { ChatScreen } from './modules/chatScreen';
import { ChatPage } from './modules/chatPage';
import './App.css';



function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Default route → intro if showIntro is true, else redirect to /chat */}
        <Route
          path="/"
          element={
            showIntro ? (
              <IntroScreen setShowIntro={setShowIntro} />
            ) : (
              <Navigate to="/chat" replace />
            )
          }
        />

        {/* Chat route */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
