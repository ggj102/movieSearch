import React from 'react';
import Logo from '../img/logo.png';
import DbLogo from '../img/dbLogo.png';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';

function Header()
{
    return(
        <div className='header'>
            <div className="logoDiv">
                <NavLink to="/"><img className="movieLogo" src={Logo} /></NavLink> 
                <img className = "dbLogo" src={DbLogo} />
            </div>
        </div>
    )
}

export default Header;