import { AnalyticsBrowser } from '@segment/analytics-next'

const writeKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || ''

export const analytics = AnalyticsBrowser.load({ writeKey: writeKey })
