import React from 'react';
import pokeball from '../assets/pokeball_icon.svg';

export default function Header() {
  return (
    <header className="header">
      <a href="/">
        <img 
          className="pokeball"
          src={pokeball}
          alt="Pokeball Logo"
          height="80px"
          width="80px"
        />
      </a>
      <h1 className="header-title">
          Adding Insights to InstanSearch
      </h1>
      <p className="header-subtitle">
        using{' '}
        <a href="https://github.com/algolia/react-instantsearch">
          React InstantSearch Hooks
        </a>
      </p>
    </header>
  );
}

