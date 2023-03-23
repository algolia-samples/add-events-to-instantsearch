import aa from 'search-insights'

import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import { useLayoutEffect } from 'react'

export default function InsightsMiddleware() {
  const { use } = useInstantSearch()

  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: aa,
      insightsInitParams: {
        useCookie: true
      }
    })

    aa('setUserToken', 'Ash Ketchum');

    return use(middleware)
  }, [use])

  return null
}

