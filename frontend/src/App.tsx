import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Register from './pages/Register';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* outras rotas no futuro */}
      </Routes>
    </Router>
  );
};

export default App;
