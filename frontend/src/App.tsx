import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Register from './pages/Register';
import Home_Nutritionist from './pages/Home_Nutritionist';
import Home_Client from './pages/Home_Client';
import Login from './pages/Login';
import Plan_Registration from './pages/Plan_Registration';
import Nutritional_Plan_Client from './pages/Nutritional_Plan_Client';

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
        <Route path="/home" element={<Home_Client />} />
        <Route path="/login" element={<Login />} />
        <Route path='/plan_Registration' element={<Plan_Registration />} />
        <Route path='/nutritional_plan_client' element={<Nutritional_Plan_Client />} />
        {/* outras rotas no futuro */}
      </Routes>
    </>
  );
};

export default App;