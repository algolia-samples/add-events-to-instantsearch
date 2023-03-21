import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import algoliasearch from 'algoliasearch';
import Card from './Card';
import Header from './Header';

const searchClient = algoliasearch('OKF83BFQS4', '2ee1381ed11d3fe70b60605b1e2cd3f4');
const index = searchClient.initIndex('pokemon-cards');

const CardDetails = () => {
  const params = useParams();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

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
        <button onClick={goBack}>⬅ Back</button>
        <Card data={data} />
        <p>
          <strong>Data</strong>
          <code>{JSON.stringify(data, null, 2)}</code>
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
