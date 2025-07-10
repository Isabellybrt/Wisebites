import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ tipo_usuario: string }>('http://localhost:5000/api/login', {
        email,
        senha
    });
      const tipo = response.data.tipo_usuario;

      if (tipo === 'nutricionista') {
        navigate('/dashboard');
      } else if (tipo === 'cliente') {
        navigate('/home');
      } else {
        alert('Tipo de usuário não reconhecido.');
      }

    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert('Erro ao fazer login: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Entrar no WiseBites</h2>
        <p>Digite suas informações para acessar sua conta</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p className="register-link">
          Não tem uma conta? <a href="/registrar">Registre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
