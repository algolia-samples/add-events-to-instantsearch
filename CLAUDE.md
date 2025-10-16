# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application demonstrating how to integrate Algolia search insights and analytics events into a Pokemon card search interface using React InstantSearch v7. The app tracks view, click, and conversion events for search analytics.

## Development Commands

- `npm install` - Install dependencies
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Architecture

### Core Structure
- **React Router**: Main navigation between search (`/`) and card details (`/card/:cardID`)
- **React InstantSearch v7**: Primary search interface framework
- **search-insights**: Algolia's analytics library for tracking events

### Key Components

**Search Flow (`src/components/Search.jsx`)**:
- Main search interface with filters (set, type, rarity)
- Uses InstantSearch provider with built-in insights configuration
- Configured for routing and click analytics
- Insights configured directly on InstantSearch component via `insights` prop

**Hit Component (`src/components/Hit.jsx`)**:
- Individual search result card
- Implements click event tracking via `sendEvent('click', hit, 'Card Clicked')`
- Links to card details with queryID parameter

**Card Details (`src/components/CardDetails.jsx` + `src/components/Card.jsx`)**:
- Detail view for individual Pokemon cards
- Implements conversion tracking when "Catch 'em!" button is clicked
- Uses `convertedObjectIDsAfterSearch` event with queryID from URL params

### Event Tracking Pattern

The app implements Algolia's three-tier analytics:

1. **View Events**: Automatically tracked by built-in insights middleware
2. **Click Events**: Tracked in Hit component via `sendEvent` prop
3. **Conversion Events**: Tracked in Card component via `aa('convertedObjectIDsAfterSearch')`

### Configuration

**Environment Variables** (`.env`):
- `REACT_APP_ALGOLIA_APP_ID` - Algolia application ID
- `REACT_APP_ALGOLIA_API_KEY` - Algolia search API key
- `REACT_APP_ALGOLIA_INDEX_NAME` - Index name (pokemon-cards)
- `REACT_APP_USER_TOKEN` - User identifier for analytics
- `REACT_APP_SEGMENT_WRITE_KEY` - Segment analytics key

**Algolia Setup** (`src/utilities/algolia.js`):
- Exports configured search client and credentials
- Central configuration point for all Algolia interactions

### Data Fetching

**Custom Hook** (`src/effects/usePokemonData.js`):
- Fetches individual card data using Algolia's `getObject` API
- Handles loading states and error management
- Used by CardDetails component

### Branch Structure

- `main` - Complete implementation with all events
- `step-zero-base` - Base app without analytics
- `step-one-middleware` - Adds view event tracking
- `step-two-clicks` - Adds click event tracking  
- `step-three-convert` - Adds conversion event tracking

## Key Integration Points

When modifying this codebase:

1. **Event Tracking**: Maintain the three-tier event pattern (view/click/convert)
2. **QueryID Preservation**: Ensure queryID flows from search → hit → card details for conversion attribution
3. **Insights Configuration**: Keep `insights` prop configuration on InstantSearch component for automatic view tracking
4. **User Token**: Maintain consistent userToken across all analytics calls (set via `aa('setUserToken', userToken)`)
5. **Search Configuration**: Keep `clickAnalytics={true}` in Configure component

## Migration Notes

This codebase has been upgraded from `react-instantsearch-hooks-web` (v6) to `react-instantsearch` (v7):

- **Package Change**: `react-instantsearch-hooks-web` → `react-instantsearch`
- **Insights Integration**: No longer requires separate `InsightsMiddleware` component
- **Built-in Insights**: Insights are now configured directly via the `insights` prop on `<InstantSearch>`
- **Automatic Setup**: The insights client and user token are configured in the Search component