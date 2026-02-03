import React from 'react';
import logo from '../assets/tcg-search-logo.svg';

export default function Header() {
  return (
    <header className="header">
      <a href="/">
        <img
          className="header-logo"
          src={logo}
          alt="TCG Search Logo"
          height="100px"
        />
      </a>
      <p className="header-subtitle">
        Gotta Find &apos;Em All!
      </p>
    </header>
  );
}

