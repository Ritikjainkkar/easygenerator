import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';
import Home from './pages/Home';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/sign" element={<SignInSignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
