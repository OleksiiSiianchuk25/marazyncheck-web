import React, { useState } from 'react';
import Modal from 'react-modal';
import './VerifyCode.css';

interface VerifyCodeProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyCode: (code: string) => void;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ isOpen, onClose, onVerifyCode }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerifyCode(code);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="VerifyCodeModal">
      <h2>Введіть отриманий код</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Код підтвердження" 
        />
        <button type="submit">Надіслати</button>
      </form>
      <button className="close-button" onClick={onClose}>X</button>
    </Modal>
  );
};

export default VerifyCode;
