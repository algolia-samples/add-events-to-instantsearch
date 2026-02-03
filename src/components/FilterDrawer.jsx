import React from 'react';
import PropTypes from 'prop-types';
import RangeSlider from './RangeSlider';
import { Panel } from './Panel';
import VariantFilter from './VariantFilter';
import SearchableDropdown from './SearchableDropdown';

export default function FilterDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="filter-drawer-overlay" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`filter-drawer ${isOpen ? 'filter-drawer--open' : ''}`}>
        <div className="filter-drawer-header">
          <h2>Filters</h2>
          <button className="filter-drawer-close" onClick={onClose} aria-label="Close filters">
            ✕
          </button>
        </div>

        <div className="filter-drawer-content">
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
          <Panel header="variant">
            <VariantFilter />
          </Panel>
          <Panel header="value">
            <RangeSlider
              attribute="pricing.cardmarket.avg"
              min={0}
              max={2500}
            />
          </Panel>
        </div>
      </div>
    </>
  );
}

FilterDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
