import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonData } from "../effects/usePokemonData";
import Card from './Card';
import Header from './Header';

const CardDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { error, data, loading } = usePokemonData(params.cardID);

  const goBack = () => {
    navigate(-1);
  }

  if (loading) {
    return <>Loading card details...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <button onClick={goBack}><h2>⬅ Back</h2></button>
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
