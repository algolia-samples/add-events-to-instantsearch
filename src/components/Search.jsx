import React, { useState } from 'react';
import { searchClient, indexName, indexNamePriceAsc, indexNamePriceDesc } from '../utilities/algolia';
import {
  Chat,
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  SortBy
} from 'react-instantsearch';
import aa from 'search-insights';
import { userToken } from '../utilities/algolia';

// Set user token for insights
aa('setUserToken', userToken);
import Header from './Header';
import Hit from './Hit';
import Item from './Item';
import FilterDrawer from './FilterDrawer';
import SearchableDropdown from './SearchableDropdown';
import VariantsDropdown from './VariantsDropdown';

export default function Search() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <Header />
      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName={indexNamePriceDesc}
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
            <div className="search-controls-row">
              <SearchBox placeholder="Search for cards" className="searchbox" />
              <button
                className="filter-toggle-btn filter-toggle-btn--icon-only"
                onClick={() => setIsFilterOpen(true)}
                aria-label="Open filters"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="18" x2="20" y2="18"/>
                </svg>
                <span className="filter-toggle-btn__text">Filters</span>
              </button>
              <div className="mobile-quick-filters">
                <SearchableDropdown
                  attribute="set"
                  placeholder="Set"
                />
                <SearchableDropdown
                  attribute="artist"
                  placeholder="Artist"
                />
              </div>
              <SortBy
                items={[
                  { label: 'Sort A-Z', value: indexName },
                  { label: 'Sort Price ↑', value: indexNamePriceAsc },
                  { label: 'Sort Price ↓', value: indexNamePriceDesc }
                ]}
              />
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
              <h2 className="search-panel__filters-header">Filters</h2>
              <SearchableDropdown
                attribute="set"
                placeholder="Set"
              />
              <SearchableDropdown
                attribute="artist"
                placeholder="Artist"
              />
              <SearchableDropdown
                attribute="types"
                placeholder="Type"
              />
              <SearchableDropdown
                attribute="rarity"
                placeholder="Rarity"
              />
              <VariantsDropdown />
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

