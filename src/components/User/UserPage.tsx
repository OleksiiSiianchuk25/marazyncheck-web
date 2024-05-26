import React, { useState, useEffect } from "react";
import './UserPage.css';
import SideBar from "./SideBar";
import AuthService, { LoginRequest } from "../../services/AuthService";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({ email: '', password: '' });

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        telegram: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/info', {
                    headers: {
                        Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
                    }
                });
                setUserDetails(prevDetails => ({
                    ...prevDetails,
                    name: response.data.name || "",
                    email: response.data.email || "",
                    telegram: response.data.telegram || "",
                    newPassword: "",
                    confirmPassword: ""
                }));
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userDetails.newPassword !== userDetails.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        const updateData = {
            name: userDetails.name,
            email: userDetails.email,
            telegram: userDetails.telegram,
            newPassword: userDetails.newPassword
        };
    
        try {
            const response = await axios.patch('http://localhost:8080/api/users/update', updateData, {
                headers: {
                    Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
                }
            });
    
            if (response.status === 200) {
                alert('Profile updated successfully!');
                console.log('Updated user details:', response.data);
    
                if (response.data.jwtToken) {
                    AuthService.updateToken(response.data.jwtToken);
                    window.location.reload();
                }
            } else {
                alert(response.data);
            }
    
            if (userDetails.email !== updateData.email || updateData.newPassword) {
                AuthService.logout(navigate);
                const newPassword = prompt("Please enter your new password to continue:");
                if (newPassword) {  
                    AuthService.login({ email: updateData.email, password: newPassword }).then(() => {
                        window.location.reload();
                    }).catch(error => {
                        console.error('Re-login failed:', error);
                        alert('Re-login failed. Please manually log in again.');
                    });
                } else {
                    console.error('Password input was canceled.');
                    alert('Update process was canceled. You need to log in again manually.');
                }
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            alert('Failed to update profile. Please try again.');
        }
    };
    
    

    return (
        <div className="user-main-content">
            <SideBar/>
            <div className="info-content">
                <form className="user-info-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" value={userDetails.name} onChange={handleChange} />
                    <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
                    <input type="text" name="telegram" value={userDetails.telegram} onChange={handleChange} />
                    <input type="password" name="newPassword" placeholder="Новий пароль" value={userDetails.newPassword} onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Підтвердити новий пароль" value={userDetails.confirmPassword} onChange={handleChange} />
                    <button type="submit">Оновити дані</button>
                </form>
            </div>
        </div>
    );
}

export default UserPage;
