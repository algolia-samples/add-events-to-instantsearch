import React from 'react';
import { useRefinementList } from 'react-instantsearch';
import PropTypes from 'prop-types';

function VariantRefinement({ attribute, label }) {
  const { items, refine } = useRefinementList({ attribute });

  // Find the "true" item since we only care about checking if variant exists
  const trueItem = items.find(item => item.value === 'true');

  if (!trueItem) return null;

  return (
    <label className="ais-RefinementList-label">
      <input
        type="checkbox"
        className="ais-RefinementList-checkbox"
        checked={trueItem.isRefined}
        onChange={() => refine(trueItem.value)}
      />
      <span className="ais-RefinementList-labelText">{label}</span>
      <span className="ais-RefinementList-count">{trueItem.count}</span>
    </label>
  );
}

VariantRefinement.propTypes = {
  attribute: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default function VariantFilter() {
  return (
    <div className="ais-RefinementList">
      <ul className="ais-RefinementList-list">
        <li className="ais-RefinementList-item">
          <VariantRefinement attribute="variants.holo" label="Holo" />
        </li>
        <li className="ais-RefinementList-item">
          <VariantRefinement attribute="variants.reverse" label="Reverse Holo" />
        </li>
        <li className="ais-RefinementList-item">
          <VariantRefinement attribute="variants.firstEdition" label="1st Edition" />
        </li>
        <li className="ais-RefinementList-item">
          <VariantRefinement attribute="variants.wPromo" label="Promo" />
        </li>
      </ul>
    </div>
  );
}
