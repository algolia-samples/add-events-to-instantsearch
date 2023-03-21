import React from 'react';
import PropTypes from 'prop-types';
import pokeball from '../assets/pokeball_icon.svg';

function handleClick() {
  alert("boop!");
}

export default function Card(props) {
  return (
    <>
      <div className="row">
        <div className="column">
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
          <button onClick={handleClick}>
            <img className="pokeball" src={pokeball} alt="Catch" height="100px" width="100px" border="0"/>
            <br />Catch &apos;em!
          </button>
        </div>
        <div className="column">
          <img
            className="card"
            src={props.data.images.large}
            alt={props.data.name}
          />
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
