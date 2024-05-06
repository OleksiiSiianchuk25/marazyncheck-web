import React from "react";
import './Footer.css'
import telegram  from "../../Images/NavBarAndFooter/telegram.png"

const Footer: React.FC<{}> = () => {

    return (
        <footer className='footer' >
            <div className="shop-name">MarAzynCheck</div>
            <div className="telegram-icon">
                <img src={telegram} alt="Telegram icon" />
            </div>
        </footer>
    )
}

export default Footer;