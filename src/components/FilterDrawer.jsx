import React from 'react';
import PropTypes from 'prop-types';
import { RefinementList } from 'react-instantsearch';
import RangeSlider from './RangeSlider';
import { Panel } from './Panel';

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
          <Panel header="price">
            <RangeSlider
              attribute="pricing.cardmarket.avg"
              min={0}
              max={2500}
            />
          </Panel>
          <Panel header="variant">
            <RefinementList
              attribute="subtypes"
              searchable={true}
              searchablePlaceholder="Search variants..."
            />
          </Panel>
          <Panel header="set">
            <RefinementList
              attribute="set"
              searchable={true}
              searchablePlaceholder="Search sets..."
            />
          </Panel>
          <Panel header="artist">
            <RefinementList
              attribute="artist"
              searchable={true}
              searchablePlaceholder="Search artists..."
            />
          </Panel>
          <Panel header="type">
            <RefinementList attribute="types" />
          </Panel>
          <Panel header="rarity">
            <RefinementList attribute="rarity" />
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
