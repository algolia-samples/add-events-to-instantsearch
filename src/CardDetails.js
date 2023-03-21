import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import algoliasearch from 'algoliasearch';
import Card from './components/Card';
import Header from './components/Header';

const searchClient = algoliasearch('OKF83BFQS4', '2ee1381ed11d3fe70b60605b1e2cd3f4');
const index = searchClient.initIndex('pokemon-cards');

const CardDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    index.getObject(params.cardID)
      .then((response) => {
        setData(response)
        setError(null)
      })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);
  
  const location = useLocation();
  const params = useParams();

  if (!data) {
    return (
      <>
        Loading card details...
      </>
    )
  }

  return (
    <div>
      <Header />
      <div className="container">
        This is the card details page for {params.cardID}
        <Card data={data} />
        <p>
          <strong>Data</strong>
          <code>{JSON.stringify(data, null, 2)}</code>
        </p>
        <p>
          <strong>Location Props: </strong>
          <code>{JSON.stringify(location, null, 2)}</code>
        </p>
        <p>
          <strong>Params Props: </strong>
          <code>{JSON.stringify(params, null, 2)}</code>
        </p>
      </div>
    </div>
  )
}

export default CardDetails;
