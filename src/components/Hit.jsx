import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Highlight,
} from 'react-instantsearch-hooks-web';

export default function Hit({hit, sendEvent}) {
  return (
    <article>
      <Link to={`card/${hit.objectID}`} onClick={()=>sendEvent('click', hit, 'Card Clicked')}>
        <img
          className="card"
          src={hit.images.small}
          alt={hit.name}
        />
      </Link>
      <div className="search__desc">
        <h1><Highlight attribute="name" hit={hit} /></h1>
        <br />
        <strong className="hit-type">{hit.types[0]}</strong>
        <br />
        <strong className="hit-info">{hit.rarity} | {hit.hp}</strong>
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  sendEvent: PropTypes.func.isRequired,
};

