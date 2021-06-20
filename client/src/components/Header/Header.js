import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="Header">
      <img src={logo} className="Header__logo" alt="logo" />
      <h1>
        Vaccine App
      </h1>
    </header>
  );
};

export default Header;
