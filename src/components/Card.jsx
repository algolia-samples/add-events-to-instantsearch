import React from 'react';
import PropTypes from 'prop-types';
import pokeball from '../assets/pokeball_icon.svg';
import { useSearchParams } from 'react-router-dom';
import { indexName, userToken } from '../utilities/algolia'
import aa from 'search-insights'
import { getDetailedPricing } from '../utilities/priceHelpers'

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

// Helper to render TCGPlayer compact table
function TCGPlayerTable({ tcgplayerData }) {
  if (!tcgplayerData) return null;

  TCGPlayerTable.propTypes = {
    tcgplayerData: PropTypes.object
  };

  // Get all variations
  const variations = tcgplayerData.variations;

  // Price types we want to display in order
  const priceTypes = ['lowPrice', 'marketPrice', 'midPrice', 'highPrice'];
  const priceLabels = {
    lowPrice: 'Low',
    marketPrice: 'Market',
    midPrice: 'Mid',
    highPrice: 'High'
  };

  // Build a map of variation -> priceType -> value
  const priceMap = {};
  variations.forEach(variation => {
    priceMap[variation.variation] = {};
    variation.prices.forEach(price => {
      priceMap[variation.variation][price.type] = price.formatted;
    });
  });

  return (
    <div className="pricing-source-compact">
      <div className="pricing-header">
        <h3>TCGPlayer ({tcgplayerData.currency})</h3>
        {tcgplayerData.updated && (
          <span className="pricing-updated-inline">
            Updated: {new Date(tcgplayerData.updated).toLocaleDateString()}
          </span>
        )}
      </div>
      <table className="pricing-table-compact">
        <thead>
          <tr>
            <th>Variation</th>
            {priceTypes.map(type => (
              <th key={type}>{priceLabels[type]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variations.map(variation => (
            <tr key={variation.variation}>
              <td className="variation-label">{variation.variationLabel}</td>
              {priceTypes.map(type => (
                <td key={type} className="price-value">
                  {priceMap[variation.variation][type] || 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper to render Cardmarket compact table
function CardmarketTable({ cardmarketData }) {
  if (!cardmarketData) return null;

  CardmarketTable.propTypes = {
    cardmarketData: PropTypes.object
  };

  const variations = cardmarketData.variations;

  // Price types we want to display
  const priceTypes = ['low', 'avg', 'avg7', 'avg30', 'trend'];
  const priceLabels = {
    low: 'Low',
    avg: 'Avg',
    avg7: '7-day',
    avg30: '30-day',
    trend: 'Trend'
  };

  // Build price map
  const priceMap = {};
  variations.forEach(variation => {
    priceMap[variation.variation] = {};
    variation.prices.forEach(price => {
      priceMap[variation.variation][price.type] = price.formatted;
    });
  });

  return (
    <div className="pricing-source-compact">
      <div className="pricing-header">
        <h3>Cardmarket ({cardmarketData.currency})</h3>
        {cardmarketData.updated && (
          <span className="pricing-updated-inline">
            Updated: {new Date(cardmarketData.updated).toLocaleDateString()}
          </span>
        )}
      </div>
      <table className="pricing-table-compact">
        <thead>
          <tr>
            <th>Variation</th>
            {priceTypes.map(type => (
              <th key={type}>{priceLabels[type]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variations.map(variation => (
            <tr key={variation.variation}>
              <td className="variation-label">{variation.variationLabel}</td>
              {priceTypes.map(type => (
                <td key={type} className="price-value">
                  {priceMap[variation.variation][type] || 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Card({data}) {
  const [searchParams] = useSearchParams();
  const pricingData = getDetailedPricing(data.pricing);

  // Separate TCGPlayer and Cardmarket data
  const tcgplayerData = pricingData?.find(p => p.source === 'TCGPlayer');
  const cardmarketData = pricingData?.find(p => p.source === 'Cardmarket');

  return (
    <div className="card-detail-container">
      <div className="card-detail-content">
        <h1>{data.name}</h1>

        {/* Card Battle Info */}
        <div className="card-info-section">
          <h3>Card Information</h3>
          <div className="card-info-grid">
            <div className="info-item">
              <span className="info-label">Set:</span>
              <span className="info-value">{data.set}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className="info-value hit-type">{data.types[0]}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rarity:</span>
              <span className="info-value">{data.rarity}</span>
            </div>
            <div className="info-item">
              <span className="info-label">HP:</span>
              <span className="info-value">{data.hp}</span>
            </div>
            {'evolvesFrom' in data && (
              <div className="info-item">
                <span className="info-label">Evolves from:</span>
                <span className="info-value">{data.evolvesFrom}</span>
              </div>
            )}
            {'evolvesTo' in data && (
              <div className="info-item">
                <span className="info-label">Evolves to:</span>
                <span className="info-value">{data.evolvesTo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Information */}
        {pricingData && (
          <div className="pricing-section-compact">
            <h3>Pricing</h3>
            {tcgplayerData && <TCGPlayerTable tcgplayerData={tcgplayerData} />}
            {cardmarketData && <CardmarketTable cardmarketData={cardmarketData} />}
          </div>
        )}

        <button onClick={() => handleClick(data.objectID, searchParams.get('queryID'))}>
          <img className="pokeball" src={pokeball} alt="Catch" height="120px" width="120px" border="0"/>
          <br />Catch &apos;em!
        </button>
      </div>

      <div className="card-detail-image">
        <img
          className="detailCardImage"
          src={data.images.large}
          alt={data.name}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
