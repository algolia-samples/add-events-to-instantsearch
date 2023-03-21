import React from 'react';
import PropTypes from 'prop-types';

function handleClick() {
  alert("boop!");
}

export default function Card(props) {
  return (
    <>
      <article>
        <div className="search__desc">
          <h1>{props.data.name}</h1>
          <ul>
            <li><strong className="hit-info">{props.data.set}</strong></li>
            <li><strong className="hit-type">{props.data.types[0]}</strong></li>
            <li><strong className="hit-info">{props.data.rarity}</strong></li>
            <li><strong className="hit-info">{props.data.hp} HP</strong></li>
          {'evolvesTo' in props.data &&
            <li><strong className="hit-info">Evolves to: {props.data.evolvesTo}</strong></li>
          }
          {'evolvesFrom' in props.data &&
            <li><strong className="hit-info">Evolves from: {props.data.evolvesFrom}</strong></li>
          }
          </ul>
          <button onClick={handleClick}>Boop</button>
        </div>
        <img
          src={props.data.images.large}
          className="product__image"
          alt={props.data.name}
        />
      </article>
    </>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
