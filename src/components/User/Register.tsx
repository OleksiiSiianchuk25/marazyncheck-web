import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { RegisterRequest } from '../../services/AuthService';
import './Register.css';

const Register: React.FC = () => {
  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    telegram: ''
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    if (registerRequest.password !== confirmPassword) {
      setMessage("Паролі не співпадають.");
      return;
    }
    try {
      await AuthService.register(registerRequest);
      setMessage("Реєстрація успішна!");
      navigate("/login");
    } catch (error: any) {
      setMessage(error.response?.data?.message || error.message || "Не вдалося зареєструватися.");
    }
  };

  const handleClose = () => {
    navigate('/login'); 
  };

  return (
    <div className='main-content'>
      <div className='register-content'>
        <div className='register-header'>
          Реєстрація
          <button className='close-button' onClick={handleClose}>X</button>
        </div>
        <form onSubmit={handleRegister} className='register-form'>
          <div className='form-row'>
            <input type="text" name="name" placeholder="Ім'я" value={registerRequest.name} onChange={handleChange}  required/>
            <input type="password" name="password" placeholder="Пароль" value={registerRequest.password} onChange={handleChange} required/>
          </div>
          <div className='form-row'>
            <input type="email" name="email" placeholder="Електронна адреса" value={registerRequest.email} onChange={handleChange} required/>
            <input type="password" name="confirmPassword" placeholder="Повторіть пароль" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
          </div>
          <div className='form-row'>
            <input type="text" name="telegram" placeholder="Телеграм (@user21)" value={registerRequest.telegram} onChange={handleChange} required/>
            <button type="submit" className='register-button'>Створити аккаунт</button>
          </div>
          {message && <div className='register-message'>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;
