import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

const CardDetails = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">Adding Insights to InstanSearch</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch Hooks
          </a>
        </p>
      </header>

      <h1>This is the card details page for {params.cardID}</h1>
      <p>
        <strong>Location Props: </strong>
        <code>{JSON.stringify(location, null, 2)}</code>
      </p>
      <p>
        <strong>Params Props: </strong>
        <code>{JSON.stringify(params, null, 2)}</code>
      </p>
    </div>
  )
}

export default CardDetails;
