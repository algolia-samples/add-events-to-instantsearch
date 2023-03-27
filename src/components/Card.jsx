import React from 'react';
import PropTypes from 'prop-types';
import pokeball from '../assets/pokeball_icon.svg';
import { useSearchParams } from 'react-router-dom';
import { indexName, userToken } from '../utilities/algolia'
import aa from 'search-insights'

function handleClick(objectID, queryID) {
  // this should send conversion event. Needs: objectID(s), index, queryID, user token
  aa('convertedObjectIDsAfterSearch', {
      userToken: userToken,
      index:  indexName,
      eventName: 'Card Caught',
      queryID: queryID,
      objectIDs: [objectID]
  });
}

export default function Card({data}) {
  const [searchParams] = useSearchParams();
  return (
    <div className="row">
      <div className="column">
        <h1>{data.name}</h1>
        <ul>
          <li><strong className="hit-info">{data.set}</strong></li>
          <li><strong className="hit-type">{data.types[0]}</strong></li>
          <li><strong className="hit-info">{data.rarity}</strong></li>
          <li><strong className="hit-info">{data.hp} HP</strong></li>
        {'evolvesTo' in data &&
          <li><strong className="hit-info">Evolves to: {data.evolvesTo}</strong></li>
        }
        {'evolvesFrom' in data &&
          <li><strong className="hit-info">Evolves from: {data.evolvesFrom}</strong></li>
        }
        </ul>
        <button onClick={() => handleClick(data.objectID, searchParams.get('queryID'))}>
          <img className="pokeball" src={pokeball} alt="Catch" height="120px" width="120px" border="0"/>
          <br />Catch &apos;em!
        </button>
      </div>
      <div className="column">
        <div className="detailCardContainer">
          <img
            className="detailCardImage"
            src={data.images.large}
            alt={data.name}
          />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
