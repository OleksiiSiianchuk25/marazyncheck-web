import React, { useState } from 'react';
import Modal from 'react-modal';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onResetPassword: (password: string, confirmPassword: string) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose, onResetPassword }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResetPassword(password, confirmPassword);
    navigate("/login");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="ResetPasswordModal">
      <h2>Скинути пароль</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          value={password} 
          onChange ={(e) => setPassword(e.target.value)} 
          placeholder="Пароль" 
        />
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Підтвердіть пароль" 
        />
        <button type="submit">Скинути пароль</button>
      </form>
      <button className="close-button" onClick={onClose}>X</button>
    </Modal>
  );
};

export default ResetPassword;

