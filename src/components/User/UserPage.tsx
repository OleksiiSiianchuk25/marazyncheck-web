import React, { useState } from "react";
import './UserPage.css';
import telegram from "../../Images/NavBarAndFooter/telegram.png";
import { Link } from 'react-router-dom';
import SideBar from "./SideBar";

const UserPage: React.FC<{}> = () => {
    const [userDetails, setUserDetails] = useState({
        name: "Test",
        email: "test@gmail.com",
        telegram: "@telegram"
    });

    // Define handleChange function to update userDetails based on input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the form from submitting traditionally
        console.log(userDetails); // Log or submit these details to the server
    };

    return (
        <div className="user-main-content">
            <div>
                <SideBar/>
            </div>
            <div className="info-content">
                <div className="user-info">
                    <div className="user-info-header">
                        Обліковий запис
                    </div>
                    <form className="user-info-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" value={userDetails.name} onChange={handleChange} />
                        <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
                        <input type="text" name="telegram" value={userDetails.telegram} onChange={handleChange} />
                        <button type="submit">Змінити дані</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
