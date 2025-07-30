import React from 'react';
import '../styles/Hero.css';
import Logo from '../assets/logo-wisebites.jpg'; 
  
const Hero: React.FC = () => {
  return (
    <section className="hero"id='hero'>
      <div className="hero-text">
        <h1>
          Transforme sua <br />
          <span className="highlight">experiência nutricional</span>
        </h1>
        <p>
          Um sistema completo para nutricionistas e pacientes gerenciarem dietas, registrarem refeições e acompanharem o progresso através de uma plataforma integrada e intuitiva.
        </p>
        <div className="hero-buttons">
          <button className="primary">Começar Gratuitamente</button>
          <button className="secondary">Faça Login</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={Logo} alt="Logo" />
      </div>
    </section>
  );
};

export default Hero;
