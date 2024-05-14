import React from "react";
import './NavBar.css'
import logo  from "../../Images/NavBarAndFooter/logo.png"
import search_icon from "../../Images/NavBarAndFooter/search-icon.png"
import help_question from "../../Images/NavBarAndFooter/help-question.png"
import user_circle from "../../Images/NavBarAndFooter/user-circle.png"
import shopping_basket from "../../Images/NavBarAndFooter/shopping-basket.png"
import { Link } from 'react-router-dom';


const Nav: React.FC<{}> = () => {

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
                <input type="text" placeholder="Я шукаю..."/>
                <img src={search_icon} alt="Search icon" className='search-icon'/>
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
                        <img src={user_circle} alt="User circle" className='user-circle'/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;