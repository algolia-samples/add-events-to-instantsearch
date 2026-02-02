import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getSimplePriceDisplay } from '../utilities/priceHelpers';

export default function Item({ item }) {
  const pricing = getSimplePriceDisplay(item.pricing);
  const primaryPrice = pricing?.tcgplayer || pricing?.cardmarket;

  return (
    <div className="item">
      <Link to={`card/${item.objectID}`}>
        <img
          className="card item-card"
          src={item.images.small}
          alt={`${item.name} Pokemon card`}
          loading="lazy"
        />
      </Link>
      <div className="item-desc">
        <h3>{item.name}</h3>
        <div className="item-line">{item.set}</div>
        <div className="item-line">
          {item.rarity}
          {primaryPrice && <span> • {primaryPrice.formatted}</span>}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};