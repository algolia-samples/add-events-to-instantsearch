import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Highlight,
} from 'react-instantsearch';
import { getSimplePriceDisplay } from '../utilities/priceHelpers';

export default function Hit({hit, sendEvent}) {
  const pricing = getSimplePriceDisplay(hit.pricing);
  const primaryPrice = pricing?.tcgplayer || pricing?.cardmarket;

  return (
    <article>
      <Link to={`card/${hit.objectID}?queryID=${hit.__queryID}`} onClick={()=>sendEvent('click', hit, 'Card Clicked')}>
        <img
          className="card"
          src={hit.images.small}
          alt={hit.name}
        />
      </Link>
      <div className="search__desc">
        <h1><Highlight attribute="name" hit={hit} /></h1>
        <div className="hit-line">
          <span className="hit-label">Set:</span> <Highlight attribute="set" hit={hit} />
        </div>
        <div className="hit-line">
          <span className="hit-label">Rarity:</span> {hit.rarity}
        </div>
        {primaryPrice && (
          <div className="hit-line">
            <span className="hit-label">Avg. Value:</span> <span className="hit-price">{primaryPrice.formatted}</span>
          </div>
        )}
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  sendEvent: PropTypes.func.isRequired,
};

