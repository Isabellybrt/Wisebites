import React, { useState } from 'react';
import Sidebar from '../components/Sidebar_Client';
import '../styles/Meal_Register.css';

export const Meal_Register: React.FC = () => {
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [alimento, setAlimento] = useState('');
  const [alimentos, setAlimentos] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const adicionarAlimento = () => {
    if (alimento.trim() !== '') {
      setAlimentos([...alimentos, alimento.trim()]);
      setAlimento('');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="meal-register-container">
  <Sidebar />
    <div className="card">
        <h1 className="title">Registrar Refeição</h1> {/* movido para dentro do card */}
        <div className="row">
        <div className="field wide-field"> {/* adicionamos wide-field */}
            <label>Data</label>
            <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            />
        </div>

        <div className="field wide-field"> {/* adicionamos wide-field */}
            <label>Tipo de Refeição</label>
            <select
            value={tipoRefeicao}
            onChange={(e) => setTipoRefeicao(e.target.value)}
            >
            <option value="">Selecione o tipo de refeição</option>
            <option value="café">Café da Manhã</option>
            <option value="almoco">Almoço</option>
            <option value="jantar">Jantar</option>
            <option value="lanche">Lanche</option>
            </select>
        </div>
        </div>

        <div className="field alimento-field">
          <label>Alimentos</label>
          <div className="alimento-input">
            <input
              type="text"
              placeholder="Pesquisar alimentos..."
              value={alimento}
              onChange={(e) => setAlimento(e.target.value)}
            />
            <button className="add-button" onClick={adicionarAlimento}>+</button>
          </div>
          <ul className="alimentos-list">
            {alimentos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="field">
          <label>Observações (opcional)</label>
          <textarea
            placeholder="Compartilhe mais detalhes sobre essa refeição..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          ></textarea>
        </div>

        <div className="field imagem-field">
            <label>Foto do Prato (opcional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
                <img src={imagePreview} alt="Prévia da refeição" className="image-preview" />
            )}
        </div>



        <button className="submit-button">Registrar Refeição</button>
      </div>
    </div>
  );
};

export default Meal_Register;
