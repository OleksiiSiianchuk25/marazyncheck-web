import React, { useState } from 'react';
import ForgotPasswordRequest from './ForgotPasswordRequest';
import VerifyCode from './VerifyCode';
import ResetPassword from './ResetPassword';
import AuthService from '../../services/AuthService';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (email: string) => {
    try {
      await AuthService.requestPasswordReset(email);
      setEmail(email);
      setStep(2);
    } catch (error) {
      setMessage('Failed to request password reset.');
    }
  };

  const handleVerifyCode = async (code: string) => {
    try {
      await AuthService.verifyResetCode(email, code);
      setCode(code);
      setStep(3);
    } catch (error) {
      setMessage('Invalid verification code.');
    }
  };

  const handleResetPassword = async (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      await AuthService.resetPassword(email, code, password);
      setMessage('Password reset successful. You can now log in.');
      setStep(1);
    } catch (error) {
      setMessage('Failed to reset password.');
    }
  };

  return (
    <div className="forgot-password">
      {step === 1 && <ForgotPasswordRequest isOpen={true} onClose={() => {}} onRequestReset={handleRequestReset} />}
      {step === 2 && <VerifyCode isOpen={true} onClose={() => {}} onVerifyCode={handleVerifyCode} />}
      {step === 3 && <ResetPassword isOpen={true} onClose={() => {}} onResetPassword={handleResetPassword} />}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ForgotPassword;
