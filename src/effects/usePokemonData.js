import algoliasearch from "algoliasearch";
import { useEffect, useState } from "react";

const searchClient = algoliasearch(
  "OKF83BFQS4",
  "2ee1381ed11d3fe70b60605b1e2cd3f4"
);
const index = searchClient.initIndex("pokemon-cards");

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
