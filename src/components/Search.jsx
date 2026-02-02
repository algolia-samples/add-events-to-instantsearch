import React, { useState } from 'react';
import { searchClient, indexName } from '../utilities/algolia';
import {
  Chat,
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox
} from 'react-instantsearch';
import RangeSlider from './RangeSlider';
import { Panel } from './Panel';
import aa from 'search-insights';
import { userToken } from '../utilities/algolia';

// Set user token for insights
aa('setUserToken', userToken);
import Header from './Header';
import Hit from './Hit';
import Item from './Item';
import FilterDrawer from './FilterDrawer';

export default function Search() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
          <div className="search-header">
            <div className="search-header-row">
              <button
                className="filter-toggle-btn"
                onClick={() => setIsFilterOpen(true)}
                aria-label="Open filters"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
                <span>Filters</span>
              </button>
              <SearchBox placeholder="Search for cards" className="searchbox" />
            </div>
            <Chat
              agentId="b4bb7553-fe20-47fd-b5e6-417f6b6dc22a"
              itemComponent={Item}
              placeholder="Ask me anything about Pokemon cards..."
            />
          </div>

          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
          <div className="search-panel">
            <div className="search-panel__filters">
              <Panel header="price">
                <RangeSlider
                  attribute="pricing.cardmarket.avg"
                  min={0}
                  max={2500}
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
              <Panel header="variant">
                <RefinementList attribute="subtypes" searchable={true} searchablePlaceholder="Search variants..." />
              </Panel>
              <Panel header="artist">
                <RefinementList attribute="artist" searchable={true} searchablePlaceholder="Search artists..." />
              </Panel>
            </div>
            <div className="search-panel__results">
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

