import algoliasearch from 'algoliasearch'

export const appId = process.env.REACT_APP_ALGOLIA_APP_ID || ''
export const appKey = process.env.REACT_APP_ALGOLIA_API_KEY || ''
export const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME || ''
export const userToken = process.env.REACT_APP_USER_TOKEN || ''
export const searchClient = algoliasearch(appId, appKey)
