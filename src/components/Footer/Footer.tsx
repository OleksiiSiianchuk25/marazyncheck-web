import React from "react";
import './Footer.css'
import telegram  from "../../Images/NavBarAndFooter/telegram.png"
import { Link } from 'react-router-dom';

const Footer: React.FC<{}> = () => {

    return (
        <footer className='footer' >
            <Link to="/">
                <div className="shop-name">MarAzynCheck</div>
            </Link>
            <div className="telegram-icon">
                <a href="https://t.me/MarAzynCheck"><img src={telegram} alt="Telegram icon" /></a>
            </div>
        </footer>
    )
}

export default Footer;