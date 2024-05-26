import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import AuthService from '../../services/AuthService';
import { User } from '../../interfaces/User';
import './UserEditModal.css';

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onSave: (user: User) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [telegram, setTelegram] = useState<string>(user.telegram);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = { name, email, telegram };
        
        axios.patch('http://localhost:8080/api/users/update-user', updatedUser, {
            headers: {
                Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
            }
        })
        .then(() => {
            onSave({ ...user, ...updatedUser });
            onClose();
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    };

    return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="UserEditModal">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <br />
            <input value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="Telegram" />
            <br />
            <button type="submit">Save</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    </Modal>

    );
};

export default UserEditModal;
