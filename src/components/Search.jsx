import React from 'react';
import { searchClient, indexName } from '../utilities/algolia';
import {
  Chat,
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RangeInput,
  RefinementList,
  SearchBox
} from 'react-instantsearch';
import 'instantsearch.css/themes/algolia-min.css';
import { Panel } from './Panel';
import aa from 'search-insights';
import { userToken } from '../utilities/algolia';

// Set user token for insights
aa('setUserToken', userToken);
import Header from './Header';
import Hit from './Hit';
import Item from './Item';

export default function Search() {
  return (
    <div>
      <Header />
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName={indexName}
          routing={true}
          insights={{
            insightsClient: aa,
            insightsInitParams: {
              useCookie: true
            }
          }}
        >
          <Configure
            hitsPerPage={12}
            clickAnalytics={true}
          />
          <SearchBox placeholder="Search for cards" className="searchbox" />
          <div className="search-panel">
            <div className="search-panel__filters">
              <Panel header="price">
                <RangeInput
                  attribute="pricing.cardmarket.avg"
                  min={0}
                  max={3000}
                />
              </Panel>
              <Panel header="set">
                <RefinementList
                  attribute="set"
                  searchable={true}
                  searchablePlaceholder="Search sets..."
                />
              </Panel>
              <Panel header="type">
                <RefinementList attribute="types" />
              </Panel>
              <Panel header="rarity">
                <RefinementList attribute="rarity" />
              </Panel>
            </div>
            <div className="search-panel__results">
              <Chat
                agentId="b4bb7553-fe20-47fd-b5e6-417f6b6dc22a"
                itemComponent={Item}
                placeholder="Ask me anything about Pokemon cards..."
              />
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

