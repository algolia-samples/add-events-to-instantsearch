import algoliasearch from 'algoliasearch'

export const appId = process.env.REACT_APP_ALGOLIA_APP_ID || ''
export const appKey = process.env.REACT_APP_ALGOLIA_API_KEY || ''
export const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME || ''
export const userToken = process.env.REACT_APP_USER_TOKEN || ''

// Replica index names for sorting - fallback to base index + suffix if not configured
export const indexNamePriceAsc = process.env.REACT_APP_ALGOLIA_INDEX_NAME_PRICE_ASC || `${indexName}_price_asc`
export const indexNamePriceDesc = process.env.REACT_APP_ALGOLIA_INDEX_NAME_PRICE_DESC || `${indexName}_price_desc`

export const searchClient = algoliasearch(appId, appKey)
