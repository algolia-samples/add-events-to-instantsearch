import React from 'react';
import pokeball from '../assets/pokeball_icon.svg';
import { analytics } from '../utilities/segment';
import { userToken } from '../utilities/algolia';
import aa from 'search-insights';

export default function Header() {
  aa('setUserToken', userToken);
  analytics.identify(userToken)
  analytics.page()
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
         Gotta Click &apos;em All!
      </h1>
      <p className="header-subtitle">
        adding Insights to {' '}
        <a href="https://github.com/algolia/react-instantsearch">
          React InstantSearch Hooks
        </a>
      </p>
    </header>
  );
}

