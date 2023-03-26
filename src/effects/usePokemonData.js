import { searchClient, indexName } from '../utilities/algolia';
import { useEffect, useState } from "react";

const index = searchClient.initIndex(indexName);

export const usePokemonData = (cardId) => {
  const [pokemonData, setPokemonData] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    index
      .getObject(cardId)
      .then((response) => {
        setPokemonData({
          data: response,
          error: null,
          loading: false,
        });
      })
      .catch((err) => {
        setPokemonData({
          data: null,
          error: err.message,
          loading: false,
        });
      });
  }, []);

  return pokemonData;
};
