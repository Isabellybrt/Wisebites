import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact" id='contato'>
      <h2>Entre em Contato</h2>
      <p>Tem dúvidas, sugestões ou quer colaborar? Fale conosco!</p>
      <form className="contact-form">
        <input type="text" placeholder="Seu nome" required />
        <input type="email" placeholder="Seu e-mail" required />
        <textarea placeholder="Sua mensagem..." rows={5} required></textarea>
        <button type="submit" className="primary">Enviar Mensagem</button>
      </form>
    </section>
  );
};

export default Contact;
