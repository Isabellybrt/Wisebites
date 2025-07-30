import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import Sidebar from '../components/Sidebar_Nutritionist';

const RegisterClient: React.FC = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    idade: '',
    peso_atual: '',
    altura: '',
    restricoes: '',
    objetivo: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Força o tipo_usuario como cliente
      const payload = { ...form, tipo_usuario: 'cliente' };

      await axios.post('http://localhost:5000/api/register', payload);
      alert('Cliente cadastrado com sucesso!');
      navigate('/nutri/pacientes');
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert('Erro ao cadastrar cliente: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="register-container">
        <Sidebar />
      <div className="register-form">
        <h2>Cadastrar Cliente</h2>
        <p>Preencha os dados do cliente</p>
        <form onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="senha" type="password" placeholder="Senha de acesso" onChange={handleChange} required />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} />

          <div className="input-with-unit">
            <input
              name="idade"
              type="number"
              placeholder="Idade"
              onChange={handleChange}
              required
            />
            <span className="unit">anos</span>
          </div>

          <div className="input-with-unit">
            <input
              name="peso_atual"
              type="number"
              placeholder="Peso Atual"
              onChange={handleChange}
              required
            />
            <span className="unit">kg</span>
          </div>

          <div className="input-with-unit">
            <input
              name="altura"
              type="number"
              placeholder="Altura"
              onChange={handleChange}
              required
            />
            <span className="unit">cm</span>
          </div>

          <textarea name="restricoes" placeholder="Restrições alimentares" onChange={handleChange}></textarea>
          <textarea name="objetivo" placeholder="Objetivo" onChange={handleChange}></textarea>

          <button type="submit">Cadastrar Cliente</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterClient;
