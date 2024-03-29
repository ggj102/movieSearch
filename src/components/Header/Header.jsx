import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../img/logo.png";
import DbLogo from "../../img/dbLogo.png";
import "../../css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logoDiv">
        <NavLink to="/">
          <img className="movieLogo" src={Logo} alt="" />
        </NavLink>
        <img className="dbLogo" src={DbLogo} alt="img" />
      </div>
    </div>
  );
}

export default Header;
