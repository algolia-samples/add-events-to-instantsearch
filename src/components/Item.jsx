import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Highlight,
} from 'react-instantsearch';

export default function Item({ item }) {
  return (
    <div className="item">
      <Link to={`card/${item.objectID}`}>
        <img
          className="card item-card"
          src={item.images.small}
          alt={item.name}
        />
      </Link>
      <div className="item-desc">
        <h3>{item.name}</h3>
        <strong className="item-type">{item.types[0]}</strong>
        <br />
        <strong className="item-info">{item.rarity} | {item.hp}</strong>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};