import React from 'react';
import '../styles/Features.css';

const Features: React.FC = () => {
  return (
    <section className="features" id='caracteristicas'>
      <h2>Funcionalidades Principais</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>📋 Planos Nutricionais</h3>
          <p>Crie e acompanhe planos personalizados com facilidade.</p>
        </div>
        <div className="feature-card">
          <h3>🍽️ Registro de Refeições</h3>
          <p>Registre refeições dentro ou fora do plano alimentar.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Acompanhamento Visual</h3>
          <p>Dados e gráficos que facilitam o acompanhamento diário.</p>
        </div>
        <div className="feature-card">
          <h3>🧠 IA para Reconhecimento</h3>
          <p>Futuramente, envie fotos e estime calorias com IA.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
