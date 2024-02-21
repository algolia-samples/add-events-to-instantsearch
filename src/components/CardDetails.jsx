import React from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { usePokemonData } from "../effects/usePokemonData";
import Card from './Card';
import Header from './Header';
import { analytics } from '../utilities/segment';
import { indexName } from '../utilities/algolia.js';

const CardDetails = () => {
  const params = useParams();
  const [searchParams, getSearchParams] = useSearchParams();
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


  analytics.track('Product Clicked', {
    product_id: params.cardID,
    position: searchParams.get('position'),
    search_index: indexName,
  });

  return (
    <div>
      <Header />
      <div className="container">
        <button onClick={goBack}><h2>⬅ Back</h2></button>
        <Card data={data} />
      </div>
    </div>
  )
}

export default CardDetails;
