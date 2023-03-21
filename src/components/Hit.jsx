import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Highlight,
} from 'react-instantsearch-hooks-web';

export default function Hit(props) {
  return (
    <article>
      <Link to={`card/${props.hit.objectID}`}>
        <img
          src={props.hit.images.small}
          className="product__image"
          alt={props.hit.name}
        />
      </Link>
      <div className="search__desc">
        <h1><Highlight attribute="name" hit={props.hit} /></h1>
        <br />
        <strong className="hit-type">{props.hit.types[0]}</strong>
        <br />
        <strong className="hit-info">{props.hit.rarity} | {props.hit.hp}</strong>
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

