import React from 'react';
import { searchClient, indexName } from '../utilities/algolia';
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox
} from 'react-instantsearch-hooks-web';
import InsightsMiddleware from './InsightsMiddleware';
import { Panel } from './Panel';
import Header from './Header';
import Hit from './Hit';

export default function Search() {
  return (
    <div>
      <Header />
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName={indexName}
          routing={true}
        >
          <InsightsMiddleware />
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

