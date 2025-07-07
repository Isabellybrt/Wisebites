import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    nome: '', email: '', senha: '', tipo_usuario: '',
    telefone: '', especialidade: '', idade: '', peso_atual: '', altura: '', restricoes: '', objetivo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', form);
      alert('Usuário cadastrado com sucesso!');
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert('Erro ao cadastrar: ' + (err.response?.data?.message || err.message));
    }

  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Criar uma conta</h2>
        <p>Preencha suas informações para começar</p>
        <form onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} />
          
          <select name="tipo_usuario" onChange={handleChange} required>
            <option value="">Selecione o tipo</option>
            <option value="nutricionista">Nutricionista</option>
            <option value="cliente">Cliente</option>
          </select>

          {form.tipo_usuario === 'nutricionista' && (
            <input name="especialidade" placeholder="Especialidade" onChange={handleChange} required />
          )}

          {form.tipo_usuario === 'cliente' && (
            <>
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
            </>
          )}

          <button type="submit">Registrar</button>
        </form>
        <p className="login-link">Já tem uma conta? <a href="/login">Entre</a></p>
      </div>
    </div>
  );
};

export default Register;