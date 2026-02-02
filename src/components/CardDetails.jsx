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
        <button className="back-button" onClick={goBack}>⬅ Back</button>
        <Card data={data} />
      </div>
    </div>
  )
}

export default CardDetails;
