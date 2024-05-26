import React, { useState } from 'react';
import Modal from 'react-modal';
import './ForgotPasswordRequest.css';

interface ForgotPasswordRequestProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestReset: (email: string) => void;
}

const ForgotPasswordRequest: React.FC<ForgotPasswordRequestProps> = ({ isOpen, onClose, onRequestReset }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestReset(email);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="ForgotPasswordRequestModal">
      <h2>Змінити пароль</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Електронна адреса" 
        />
        <button type="submit">Змінити пароль</button>
      </form>
      <button className="close-button" onClick={onClose}>X</button>
    </Modal>
  );
};

export default ForgotPasswordRequest;
