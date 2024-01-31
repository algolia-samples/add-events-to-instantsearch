import { AnalyticsBrowser } from '@segment/analytics-next'

const writeKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || ''

export const analytics = AnalyticsBrowser.load({ writeKey: writeKey })

// This allows us to call events from the console
window.analytics = analytics
