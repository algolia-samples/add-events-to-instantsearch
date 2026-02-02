import React from 'react';
import PropTypes from 'prop-types';
import pokeball from '../assets/pokeball_icon.svg';
import { useSearchParams } from 'react-router-dom';
import { indexName, userToken } from '../utilities/algolia'
import aa from 'search-insights'
import { getDetailedPricing, getSimplePriceDisplay } from '../utilities/priceHelpers'

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
  return colors[variant] || '#3B4CCA';
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
  const pricing = getSimplePriceDisplay(data.pricing);
  const primaryPrice = pricing?.tcgplayer || pricing?.cardmarket;
  const variants = getVariantTypes(data.variants);

  // Separate TCGPlayer and Cardmarket data
  const tcgplayerData = pricingData?.find(p => p.source === 'TCGPlayer');
  const cardmarketData = pricingData?.find(p => p.source === 'Cardmarket');

  return (
    <div className="card-detail-container">
      <div className="card-detail-content">
        {/* Name header with Pokemon blue border and card number */}
        <div className="card-detail-name-header">
          <h1>{data.name}</h1>
          {data.number && (
            <span className="card-detail-number">#{data.number}</span>
          )}
        </div>

        {/* Primary price display - prominent */}
        {primaryPrice && (
          <div className="hit-price-prominent">
            {primaryPrice.formatted}
          </div>
        )}

        {/* Variant badges */}
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

        {/* Card Battle Info - styled like hit details */}
        <div className="search__desc">
          <div className="hit-details">
            <div className="hit-detail-row">
              <span className="hit-label">Set:</span>
              <span className="hit-value hit-value-emphasized">{data.set}</span>
            </div>
            {data.artist && (
              <div className="hit-detail-row">
                <span className="hit-label">Artist:</span>
                <span className="hit-value hit-value-emphasized">{data.artist}</span>
              </div>
            )}
            <div className="hit-detail-row">
              <span className="hit-label">Rarity:</span>
              <span className="hit-value">{data.rarity}</span>
            </div>
            {data.types && data.types.length > 0 && (
              <div className="hit-detail-row">
                <span className="hit-label">Type:</span>
                <span className="hit-value">{data.types[0]}</span>
              </div>
            )}
            {data.hp && (
              <div className="hit-detail-row">
                <span className="hit-label">HP:</span>
                <span className="hit-value">{data.hp}</span>
              </div>
            )}
            {'evolvesFrom' in data && (
              <div className="hit-detail-row">
                <span className="hit-label">Evolves from:</span>
                <span className="hit-value">{data.evolvesFrom}</span>
              </div>
            )}
            {'evolvesTo' in data && (
              <div className="hit-detail-row">
                <span className="hit-label">Evolves to:</span>
                <span className="hit-value">{data.evolvesTo}</span>
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
