import React from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
