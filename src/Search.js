import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox
} from 'react-instantsearch-hooks-web';

import { Panel } from './Panel';

const searchClient = algoliasearch('OKF83BFQS4', '2ee1381ed11d3fe70b60605b1e2cd3f4');

function handleClick() {
  alert("boop!");
}

function Hit(props) {
  return (
    <article>
      <Link to={`card/${props.hit.objectID}`}>
        <img
          src={props.hit.images.small}
          className="product__image"
          alt={props.hit.name}
        />
      </Link>
      <div className="search__desc">
        <h1><Highlight attribute="name" hit={props.hit} /></h1>
        <br />
        <strong className="hit-type">{props.hit.types[0]}</strong>
        <br />
        <strong className="hit-info">{props.hit.rarity} | {props.hit.hp}</strong>
      </div>
      <button onClick={handleClick}>Boop</button>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default function Search() {
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

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="pokemon-cards">
          <Configure hitsPerPage={10} />
          <div className="search-panel">
            <div className="search-panel__filters">
              <Panel header="set">
                <RefinementList attribute="set" />
              </Panel>
              <Panel header="type">
                <RefinementList attribute="types" />
              </Panel>
              <Panel header="rarity">
                <RefinementList attribute="rarity" />
              </Panel>
            </div>
            <div className="search-panel__results">
              <SearchBox placeholder="Search for cards" className="searchbox" />
              <Hits hitComponent={Hit} />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

