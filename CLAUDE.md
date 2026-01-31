# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application demonstrating how to integrate Algolia search insights and analytics events into a Pokemon card search interface using React InstantSearch v7. The app tracks view, click, and conversion events for search analytics. It also includes an Agent Studio Chat widget integration for conversational search.

## Development Commands

- `npm install` - Install dependencies
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run publish` - Build and deploy to Vercel production

## Architecture

### Core Structure
- **React Router**: Main navigation between search (`/`) and card details (`/card/:cardID`)
- **React InstantSearch v7**: Primary search interface framework
- **search-insights**: Algolia's analytics library for tracking events
- **Agent Studio Chat**: Conversational search widget integrated into the search interface
- **Segment Analytics**: Optional analytics integration for tracking user behavior

### Key Components

**Search Flow (`src/components/Search.jsx`)**:
- Main search interface with filters (set, type, rarity)
- Uses InstantSearch provider with built-in insights configuration
- Configured for routing and click analytics
- Insights configured directly on InstantSearch component via `insights` prop
- Includes Chat component with Agent Studio integration (agentId: b4bb7553-fe20-47fd-b5e6-417f6b6dc22a)

**Hit Component (`src/components/Hit.jsx`)**:
- Individual search result card
- Implements click event tracking via `sendEvent('click', hit, 'Card Clicked')`
- Links to card details with queryID parameter

**Item Component (`src/components/Item.jsx`)**:
- Pokemon card display component used by Chat widget
- Shows card image, name, type, rarity, and HP
- Links to card details page

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

**Segment Setup** (`src/utilities/segment.js`):
- Initializes Segment Analytics Browser client
- Loads analytics using the REACT_APP_SEGMENT_WRITE_KEY
- Exposes analytics globally via window.analytics

### Data Fetching

**Custom Hook** (`src/effects/usePokemonData.js`):
- Fetches individual card data using Algolia's `getObject` API
- Handles loading states and error management
- Used by CardDetails component

### Branch Structure

- `main` - Complete implementation with all events
- `add-chat-widget` - Current branch with Agent Studio Chat integration
- `step-zero-base` - Base app without analytics
- `step-one-middelware` - Adds view event tracking (note: branch name has typo)
- `step-two-clicks` - Adds click event tracking
- `step-three-convert` - Adds conversion event tracking
- `segment-events` - Branch with Segment analytics integration
- `pre-segment-events` - State before Segment integration

## Key Integration Points

When modifying this codebase:

### Core Tenets (Always Follow)

1. **Start every conversation by creating a new Git branch**
- Before making any code changes, create a new branch for the work done in this conversation.
- Branch names should be short, descriptive, and use kebab-case (e.g. `feat/search-ui`, `fix/chat-hit-template`, `chore/docs-update`).

2. **Follow JavaScript + React best practices**
- Prefer functional components and hooks.
- Keep components small, composable, and easy to test.
- Use clear naming, consistent formatting, and avoid unnecessary abstractions.
- Keep state as local as possible; lift state only when needed.
- Handle async work safely (cancellation/guards where appropriate).

3. **Cleanups/refactors require asking first**
- If you notice code that “should be cleaned up,” **do not refactor immediately**.
- Instead:
- Call it out explicitly as a proposed cleanup.
- Explain why it’s beneficial (readability, bugs, perf, consistency).
- Ask for approval before doing it.
- Exception: very small fixes required to complete the requested change (e.g. lint error caused by your edits) are OK, but keep them minimal and scoped.

4. **Prefer pre-built Algolia InstantSearch components**
- Use InstantSearch’s built-in widgets/components before building custom UI.
- Favor composability (widget + slot/templating) over re-implementing behavior.
- **Chat:** When a chat experience is needed, use the **pre-built Chat component** and its corresponding **Hit template** rather than custom chat rendering.

5. **Search Configuration**: Keep `clickAnalytics={true}` in Configure component
6. **Chat Widget**: The Agent Studio Chat component requires an agentId and uses the Item component for rendering results
7. **Segment Integration**: Optional Segment analytics is initialized in src/utilities/segment.js

## Chat Widget Integration

The app includes Algolia's Agent Studio Chat widget for conversational search:

- **Component**: `<Chat>` from `react-instantsearch`
- **Agent ID**: b4bb7553-fe20-47fd-b5e6-417f6b6dc22a
- **Item Component**: Uses custom `Item.jsx` to render Pokemon cards in chat responses
- **Placeholder**: "Ask me anything about Pokemon cards..."
- **Integration**: Embedded directly in the search interface alongside traditional search results

## Migration Notes

This codebase has been upgraded from `react-instantsearch-hooks-web` (v6) to `react-instantsearch` (v7):

- **Package Change**: `react-instantsearch-hooks-web` → `react-instantsearch`
- **Insights Integration**: No longer requires separate `InsightsMiddleware` component
- **Built-in Insights**: Insights are now configured directly via the `insights` prop on `<InstantSearch>`
- **Automatic Setup**: The insights client and user token are configured in the Search component
- **Chat Widget**: Added in v7 as a built-in component for Agent Studio integration
