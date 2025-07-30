import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <section className="about" id='sobre'>
      <div className="about-container">
        <h2>Sobre o <span className="highlight">WiseBites</span></h2>
        <p>
          O <strong>WiseBites</strong> é uma plataforma de acompanhamento nutricional projetada para aproximar nutricionistas e pacientes.
        </p>
        <p>
          Nutricionistas conseguem visualizar o plano alimentar e refeições registradas, enquanto os pacientes têm autonomia para adicionar refeições dentro ou fora do plano. Em breve, também contaremos com IA para estimar calorias com base em imagens de comida!
        </p>
      </div>
    </section>
  );
};

export default About;
