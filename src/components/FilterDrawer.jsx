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
          <div className="filter-group">
            <label className="filter-label">Set</label>
            <SearchableDropdown
              attribute="set"
              placeholder="Select sets..."
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Artist</label>
            <SearchableDropdown
              attribute="artist"
              placeholder="Select artists..."
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Type</label>
            <SearchableDropdown
              attribute="types"
              placeholder="Select types..."
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Rarity</label>
            <SearchableDropdown
              attribute="rarity"
              placeholder="Select rarities..."
            />
          </div>
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
