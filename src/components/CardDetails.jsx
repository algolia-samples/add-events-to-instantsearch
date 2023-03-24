import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonData } from "../usePokemonData";
import Card from "./Card";
import Header from "./Header";

const CardDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { error, data, loading } = usePokemonData(params.cardID);

  const goBack = () => {
    navigate(-1);
  };

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
        <button onClick={goBack}>
          <h2>⬅ Back</h2>
        </button>
        <Card data={data} />
        <p>
          <strong>Data</strong>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </p>
        <p>
          <strong>Params Props: </strong>
          <pre>
            <code>{JSON.stringify(params, null, 2)}</code>
          </pre>
        </p>
      </div>
    </div>
  );
};

export default CardDetails;
