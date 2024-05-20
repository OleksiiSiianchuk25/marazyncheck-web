import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { LoginRequest } from '../../services/AuthService'; 
import './Login.css';

const Login: React.FC = () => {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({ email: '', password: '' });
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    try {
      const response = await AuthService.login(loginRequest);
      setMessage('Login successful!');
      console.log(response);
      navigate('/');
    } catch (error: any) {
      setMessage(error.response?.data?.message || error.message || 'Failed to login.');
    }
  };

  return (
    <div className='main-content'>
      <div className='login-content'>
        <div className='login-header'>Увійти в аккаунт</div>
        <form onSubmit={handleLogin} className='login-form'>
          <div className='form-group'>
            <input type="email" name="email" value={loginRequest.email} placeholder='Електронна адреса' onChange={handleChange} />
          </div>
          <div className='form-group'>
            <input type="password" name="password" value={loginRequest.password} placeholder='Пароль' onChange={handleChange} />
          </div>
          <button type="submit" className='login-button'>Увійти</button>
          {message && <div className='login-message'>{message}</div>}
        </form>
        <div className='login-links'>
          <a href='/register'>Немає аккаунта?</a>
          <a href='/forgot-password'>Забули пароль?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
