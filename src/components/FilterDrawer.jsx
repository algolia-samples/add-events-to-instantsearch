import React from 'react';
import PropTypes from 'prop-types';
import { RefinementList } from 'react-instantsearch';
import RangeSlider from './RangeSlider';
import { Panel } from './Panel';
import VariantFilter from './VariantFilter';

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
          <Panel header="set">
            <RefinementList
              attribute="set"
              searchable={true}
              searchablePlaceholder="Search sets..."
              limit={5}
              showMore={true}
              showMoreLimit={20}
            />
          </Panel>
          <Panel header="artist">
            <RefinementList
              attribute="artist"
              searchable={true}
              searchablePlaceholder="Search artists..."
              limit={5}
              showMore={true}
              showMoreLimit={20}
            />
          </Panel>
          <Panel header="variant">
            <VariantFilter />
          </Panel>
          <Panel header="type">
            <RefinementList attribute="types" />
          </Panel>
          <Panel header="rarity">
            <RefinementList attribute="rarity" />
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
