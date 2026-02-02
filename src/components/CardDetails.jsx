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
    navigate('/');
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
        <button className="back-button" onClick={goBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back</span>
        </button>
        <Card data={data} />
      </div>
    </div>
  )
}

export default CardDetails;
