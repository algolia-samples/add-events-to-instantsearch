/**
 * Utility functions for parsing and formatting Pokemon card pricing data
 */

/**
 * Labels for different price types with explanations
 */
export const PRICE_LABELS = {
  // TCGPlayer labels
  marketPrice: { label: 'Market Price', description: 'Current market average price' },
  lowPrice: { label: 'Low Price', description: 'Lowest available price' },
  highPrice: { label: 'High Price', description: 'Highest recent sale' },
  midPrice: { label: 'Mid Price', description: 'Median price point' },
  directLowPrice: { label: 'Direct Low', description: 'Lowest direct seller price' },

  // Cardmarket labels
  avg: { label: 'Average', description: 'Average selling price' },
  avg1: { label: 'Average (1 day)', description: 'Average price over last 1 day' },
  avg7: { label: 'Average (7 days)', description: 'Average price over last 7 days' },
  avg30: { label: 'Average (30 days)', description: 'Average price over last 30 days' },
  low: { label: 'Low Price', description: 'Lowest available price' },
  trend: { label: 'Trend Price', description: 'Current price trend' }
};

/**
 * Labels for card variations
 */
export const VARIATION_LABELS = {
  normal: 'Normal',
  'reverse-holofoil': 'Reverse Holofoil',
  'holo': 'Holofoil',
  '1stedition': '1st Edition'
};

/**
 * Format a price with currency symbol
 * @param {number} price - The price value
 * @param {string} currency - Currency code ('USD', 'EUR', etc.)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'USD') => {
  if (price === null || price === undefined || isNaN(price)) {
    return 'N/A';
  }

  const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥'
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${parseFloat(price).toFixed(2)}`;
};

/**
 * Parse TCGPlayer pricing data
 * @param {object} tcgplayer - TCGPlayer pricing object
 * @returns {object} Structured TCGPlayer data
 */
export const parseTCGPlayerPricing = (tcgplayer) => {
  if (!tcgplayer) return null;

  const currency = tcgplayer.unit || 'USD';
  const variations = [];

  // Extract variations (normal, reverse-holofoil, etc.)
  Object.entries(tcgplayer).forEach(([key, value]) => {
    // Skip metadata fields
    if (key === 'unit' || key === 'updated' || typeof value !== 'object') {
      return;
    }

    const prices = [];
    Object.entries(value).forEach(([priceType, priceValue]) => {
      if (priceType === 'productId') return; // Skip product ID

      prices.push({
        type: priceType,
        label: PRICE_LABELS[priceType]?.label || priceType,
        description: PRICE_LABELS[priceType]?.description || '',
        value: priceValue,
        formatted: formatPrice(priceValue, currency)
      });
    });

    variations.push({
      variation: key,
      variationLabel: VARIATION_LABELS[key] || key,
      prices: prices.filter(p => p.value !== null && p.value !== undefined)
    });
  });

  return {
    source: 'TCGPlayer',
    currency,
    updated: tcgplayer.updated,
    variations: variations.filter(v => v.prices.length > 0)
  };
};

/**
 * Parse Cardmarket pricing data
 * Cardmarket uses suffixes like -holo instead of nested variations
 * @param {object} cardmarket - Cardmarket pricing object
 * @returns {object} Structured Cardmarket data
 */
export const parseCardmarketPricing = (cardmarket) => {
  if (!cardmarket) return null;

  const currency = cardmarket.unit || 'EUR';

  // Group prices by variation suffix
  const variationGroups = {
    normal: [],
    holo: []
  };

  Object.entries(cardmarket).forEach(([key, value]) => {
    // Skip metadata fields
    if (key === 'unit' || key === 'updated' || key === 'idProduct' || typeof value !== 'number') {
      return;
    }

    // Determine if this is holo or normal
    const isHolo = key.endsWith('-holo');
    const baseKey = isHolo ? key.replace('-holo', '') : key;
    const variation = isHolo ? 'holo' : 'normal';

    variationGroups[variation].push({
      type: baseKey,
      label: PRICE_LABELS[baseKey]?.label || baseKey,
      description: PRICE_LABELS[baseKey]?.description || '',
      value: value,
      formatted: formatPrice(value, currency)
    });
  });

  const variations = [];

  if (variationGroups.normal.length > 0) {
    variations.push({
      variation: 'normal',
      variationLabel: 'Normal',
      prices: variationGroups.normal
    });
  }

  if (variationGroups.holo.length > 0) {
    variations.push({
      variation: 'holo',
      variationLabel: 'Holofoil',
      prices: variationGroups.holo
    });
  }

  return {
    source: 'Cardmarket',
    currency,
    updated: cardmarket.updated,
    variations
  };
};

/**
 * Get a simple price display for search results (primary market price)
 * @param {object} pricing - Full pricing object
 * @returns {object} Object with primary prices from each source
 */
export const getSimplePriceDisplay = (pricing) => {
  if (!pricing) return null;

  const result = {};

  // Get TCGPlayer market price (prefer normal variation)
  if (pricing.tcgplayer) {
    const currency = pricing.tcgplayer.unit || 'USD';
    const normalPrice = pricing.tcgplayer.normal?.marketPrice;
    if (normalPrice) {
      result.tcgplayer = {
        value: normalPrice,
        formatted: formatPrice(normalPrice, currency),
        currency
      };
    }
  }

  // Get Cardmarket average price
  if (pricing.cardmarket) {
    const currency = pricing.cardmarket.unit || 'EUR';
    const avgPrice = pricing.cardmarket.avg;
    if (avgPrice) {
      result.cardmarket = {
        value: avgPrice,
        formatted: formatPrice(avgPrice, currency),
        currency
      };
    }
  }

  return Object.keys(result).length > 0 ? result : null;
};

/**
 * Get all pricing details for comprehensive card detail display
 * @param {object} pricing - Full pricing object
 * @returns {object} Complete parsed pricing data
 */
export const getDetailedPricing = (pricing) => {
  if (!pricing) return null;

  const result = [];

  const tcgplayer = parseTCGPlayerPricing(pricing.tcgplayer);
  if (tcgplayer) {
    result.push(tcgplayer);
  }

  const cardmarket = parseCardmarketPricing(pricing.cardmarket);
  if (cardmarket) {
    result.push(cardmarket);
  }

  return result.length > 0 ? result : null;
};
