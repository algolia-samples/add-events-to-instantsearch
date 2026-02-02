import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Highlight,
} from 'react-instantsearch';
import { getSimplePriceDisplay } from '../utilities/priceHelpers';

// Helper to get all variant types from variants object
function getVariantTypes(variants) {
  if (!variants) return [];

  const variantList = [];

  // Add all active variants
  if (variants.firstEdition) variantList.push('1st Ed');
  if (variants.wPromo) variantList.push('Promo');
  if (variants.holo) variantList.push('Holo');
  if (variants.reverse) variantList.push('Reverse');

  return variantList;
}

// Helper to get variant badge color
function getVariantColor(variant) {
  const colors = {
    '1st Ed': '#e74c3c',
    'Promo': '#ff6b6b',
    'Holo': '#f39c12',
    'Reverse': '#9b59b6'
  };
  return colors[variant] || '#8e43e7';
}

export default function Hit({hit, sendEvent}) {
  const pricing = getSimplePriceDisplay(hit.pricing);
  const primaryPrice = pricing?.tcgplayer || pricing?.cardmarket;
  const variants = getVariantTypes(hit.variants);

  return (
    <article className="hit-card" aria-label={`${hit.name} Pokemon card`}>
      <div className="hit-card-image-wrapper">
        <Link
          to={`card/${hit.objectID}?queryID=${hit.__queryID}`}
          onClick={()=>sendEvent('click', hit, 'Card Clicked')}
          aria-label={`View details for ${hit.name}`}
        >
          <img
            className="card"
            src={hit.images.small}
            alt={`${hit.name} Pokemon card`}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="search__desc">
        <div className="hit-header">
          <h1><Highlight attribute="name" hit={hit} /></h1>
        </div>

        {primaryPrice && (
          <div className="hit-price-prominent">
            {primaryPrice.formatted}
          </div>
        )}

        {variants.length > 0 && (
          <div className="hit-variants-row">
            <span className="hit-label">Variants:</span>
            <div className="variant-badges" role="list" aria-label="Card variants">
              {variants.map((variant) => (
                <span
                  key={variant}
                  className="variant-badge"
                  style={{ backgroundColor: getVariantColor(variant) }}
                  role="listitem"
                  aria-label={`${variant} variant`}
                >
                  {variant}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="hit-details">
          <div className="hit-detail-row">
            <span className="hit-label">Set:</span>
            <span className="hit-value"><Highlight attribute="set" hit={hit} /></span>
          </div>
          {hit.artist && (
            <div className="hit-detail-row">
              <span className="hit-label">Artist:</span>
              <span className="hit-value"><Highlight attribute="artist" hit={hit} /></span>
            </div>
          )}
          <div className="hit-detail-row">
            <span className="hit-label">Rarity:</span>
            <span className="hit-value">{hit.rarity}</span>
          </div>
          {hit.number && (
            <div className="hit-detail-row">
              <span className="hit-label">Card #:</span>
              <span className="hit-value">{hit.number}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  sendEvent: PropTypes.func.isRequired,
};

