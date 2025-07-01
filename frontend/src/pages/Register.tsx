import React from 'react';
import '../styles/Register.css';

const Register: React.FC = () => {
  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Criar uma conta</h2>
        <p>Preencha suas informações para começar</p>
        <form>
          <input type="text" placeholder="Nome completo" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Senha" required />
          <input type="password" placeholder="Confirmar Senha" required />
          <select required>
            <option value="nutricionista">Nutricionista</option>
            <option value="cliente">Cliente</option>
          </select>
          <button type="submit">Registrar</button>
        </form>
        <p className="login-link">Já tem uma conta? <a href="/login">Entre</a></p>
      </div>
    </div>
  );
};

export default Register;
