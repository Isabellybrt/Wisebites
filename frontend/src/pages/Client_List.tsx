import React, { useEffect, useState } from 'react';
import { FaEdit, FaEyeDropper, FaEyeSlash, FaRegEye, FaTrash, FaUserCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar_Nutritionist';
import '../styles/Client_List.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Paciente {
  id_cliente: number;
  idade: number;
  peso_atual: number;
  altura: number;
  objetivo: string;
  usuario: {
    nome: string;
    email: string;
  };
}

const Client_List: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
  axios
    .get<Paciente[]>('http://localhost:5000/api/buscar-clientes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setPacientes(response.data); // Agora reconhece como Paciente[]
    })
    .catch((error) => {
      console.error('Erro ao buscar pacientes:', error);
    });
}, []);


  return (
    <div className="container-pacientes">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <h2>Meus Pacientes</h2>
          <Link to="/register_client"> <button className="novo-paciente">+ Novo Paciente</button></Link>
        </div>

        <div className="pacientes-lista-box">
          <h3>Lista de Pacientes</h3>
          {pacientes.map((paciente) => (
            <div key={paciente.id_cliente} className="paciente-card">
              <FaUserCircle className="icone-paciente" />
              <div className="info">
                <strong>{paciente.usuario.nome}</strong>
                <p>{paciente.usuario.email}</p>
              </div>
              <div className="detalhes">
                <span className="objetivo">{paciente.objetivo}</span>
                <small>Idade: {paciente.idade} anos</small>
              </div>
              <div className="acoes">
                <button className="edit-btn"><FaEdit /></button>
                <button className="delete-btn"><FaTrash /></button>
                <button className="view-btn"><FaRegEye /></button> {/*BOTÃO PARA VISUALIZAR PLANO NUTRICIONAL*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client_List;
