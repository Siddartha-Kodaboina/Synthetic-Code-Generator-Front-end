import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpertScreen from './pages/ExpertScreen';
import ChatScreen from './pages/ChatScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/expert" element={<ExpertScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
