// src/pages/Register.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    especialidade: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Adiciona tipo_usuario fixo como 'nutricionista'
      const formData = { ...form, tipo_usuario: 'nutricionista' };

      await axios.post('http://localhost:5000/api/register', formData);
      alert('Nutricionista cadastrado com sucesso!');
      navigate('/Nutri');
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert('Erro ao cadastrar: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Criar conta de Nutricionista</h2>
        <p>Preencha suas informações para começar</p>
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            placeholder="Nome completo"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            onChange={handleChange}
            required
          />
          <input
            name="telefone"
            placeholder="Telefone"
            onChange={handleChange}
          />
          <input
            name="especialidade"
            placeholder="Especialidade"
            onChange={handleChange}
            required
          />

          <button type="submit">Registrar</button>
        </form>
        <p className="login-link">
          Já tem uma conta? <a href="/login">Entre</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
