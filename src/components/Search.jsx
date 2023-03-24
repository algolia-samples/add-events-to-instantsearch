import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox
} from 'react-instantsearch-hooks-web';
import { Panel } from './Panel';
import Header from './Header';
import Hit from './Hit';

const searchClient = algoliasearch('OKF83BFQS4', '2ee1381ed11d3fe70b60605b1e2cd3f4');

export default function Search() {
  return (
    <div>
      <Header />
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="pokemon-cards"
          routing={true}
        >
          <Configure
            hitsPerPage={12} 
          />
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

