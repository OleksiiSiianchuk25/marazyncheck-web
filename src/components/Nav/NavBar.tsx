import React, { useState } from "react";
import './NavBar.css';
import logo from "../../Images/NavBarAndFooter/logo.png";
import search_icon from "../../Images/NavBarAndFooter/search-icon.png";
import help_question from "../../Images/NavBarAndFooter/help-question.png";
import user_circle from "../../Images/NavBarAndFooter/user-circle.png";
import shopping_basket from "../../Images/NavBarAndFooter/shopping-basket.png";
import { Link, useNavigate } from 'react-router-dom';

interface NavProps {
    onSearch: (query: string) => void;
}

const NavBar: React.FC<NavProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
        navigate('/');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className='navbar'>
            <div className='logo-container'>
                <Link to="/">
                    <img src={logo} alt="Logo" className='logo'/>
                </Link>
            </div>

            <div>
                <Link to="/">
                    <span className="navbar-text">Магазин</span>
                </Link>
            </div>

            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Я шукаю..." 
                    value={searchQuery} 
                    onChange={handleInputChange} 
                    onKeyDown={handleKeyDown}
                />
                <img 
                    src={search_icon} 
                    alt="Search icon" 
                    className='search-icon' 
                    onClick={handleSearch}
                />
            </div>

            <div className="navbar-icons-list">
                <ul className="navbar-icons">
                    <li className="navbar-icon">
                        <img src={shopping_basket} alt="Shopping basket" className='shopping-basket'/>
                    </li>
                    <li className="navbar-icon">
                        <Link to="/faq">
                            <img src={help_question} alt="Help question" className='help-question'/>
                        </Link>
                    </li>
                    <li className="navbar-icon">
                        <Link to="/user">
                            <img src={user_circle} alt="User circle" className='user-circle'/>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
