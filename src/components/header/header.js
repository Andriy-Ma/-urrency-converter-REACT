import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header__container">
                <ul className="header__links">
                    <li >
                        <Link to="/">Main Page</Link>
                    </li>
                    <span></span>
                    <li >
                        <Link to="/exchangeRates">Exchange Rates</Link>
                    </li>
                </ul>
            </div>
        </div>
);
    
}

export default Header;