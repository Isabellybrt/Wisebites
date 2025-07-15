import React from 'react';
import '../styles/SummaryCard_Client.css';

interface Props {
  icon: string;
  label: string;
  value: string;
}

const SummaryCard_Client: React.FC<Props> = ({ icon, label, value }) => {
  return (
    <div className="summary-card">
      <span className="material-symbols-outlined">{icon}</span>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
};

export default SummaryCard_Client;
