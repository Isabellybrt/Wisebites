import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Register from './pages/Register';
import Home_Nutritionist from './pages/Home_Nutritionist';

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

// Componente separado para usar o hook useLocation
const Layout: React.FC = () => {
  const location = useLocation();

  // Define onde o Navbar deve aparecer
  const showNavbarRoutes = ['/', '/registrar'];

  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/dashboard" element={<Home_Nutritionist />} />
        {/* outras rotas no futuro */}
      </Routes>
    </>
  );
};

export default App;