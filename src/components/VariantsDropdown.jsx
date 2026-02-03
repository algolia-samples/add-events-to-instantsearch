import React from 'react';
import { useRefinementList } from 'react-instantsearch';
import { useDropdown } from '../hooks/useDropdown';

export default function VariantsDropdown() {
  // Use separate hooks for each variant attribute
  const holo = useRefinementList({ attribute: 'variants.holo' });
  const reverse = useRefinementList({ attribute: 'variants.reverse' });
  const firstEdition = useRefinementList({ attribute: 'variants.firstEdition' });
  const promo = useRefinementList({ attribute: 'variants.wPromo' });

  // Use shared dropdown behavior
  const {
    isOpen,
    searchQuery,
    menuStyle,
    dropdownRef,
    buttonRef,
    handleSearch,
    toggleDropdown,
  } = useDropdown();

  // Define variant options with their hooks
  const variants = [
    {
      label: 'Holo',
      hook: holo,
      attribute: 'variants.holo'
    },
    {
      label: 'Reverse Holo',
      hook: reverse,
      attribute: 'variants.reverse'
    },
    {
      label: '1st Edition',
      hook: firstEdition,
      attribute: 'variants.firstEdition'
    },
    {
      label: 'Promo',
      hook: promo,
      attribute: 'variants.wPromo'
    },
  ];

  const handleToggle = (variantHook) => {
    // Find the "true" item and toggle it
    const trueItem = variantHook.items.find(item => item.value === 'true');
    if (trueItem) {
      variantHook.refine(trueItem.value);
    }
  };

  const handleClearAll = () => {
    variants.forEach(variant => {
      const trueItem = variant.hook.items.find(item => item.value === 'true' && item.isRefined);
      if (trueItem) {
        variant.hook.refine(trueItem.value);
      }
    });
  };

  // Get selected variants
  const selectedVariants = variants.filter(variant => {
    const trueItem = variant.hook.items.find(item => item.value === 'true');
    return trueItem && trueItem.isRefined;
  });

  // Filter variants by search query
  const filteredVariants = variants.filter(variant =>
    variant.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSelectionLabel = () => {
    if (selectedVariants.length === 0) {
      return 'Variants';
    }
    const label = selectedVariants.length === 1 ? 'Variant' : 'Variants';
    return `${selectedVariants.length} ${label}`;
  };

  // Get count for a variant (count of items with that variant)
  const getVariantCount = (variantHook) => {
    const trueItem = variantHook.items.find(item => item.value === 'true');
    return trueItem ? trueItem.count : 0;
  };

  // Check if variant is selected
  const isVariantSelected = (variantHook) => {
    const trueItem = variantHook.items.find(item => item.value === 'true');
    return trueItem && trueItem.isRefined;
  };

  return (
    <div className="searchable-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="searchable-dropdown__toggle"
        onClick={toggleDropdown}
        type="button"
      >
        <span className="searchable-dropdown__label">
          {getSelectionLabel()}
        </span>
        <svg
          className={`searchable-dropdown__arrow ${isOpen ? 'searchable-dropdown__arrow--open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="searchable-dropdown__menu" style={menuStyle}>
          <div className="searchable-dropdown__search">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="searchable-dropdown__search-input"
              autoFocus
            />
          </div>

          <div className="searchable-dropdown__items">
            {selectedVariants.length > 0 && (
              <div className="searchable-dropdown__selected-section">
                <div className="searchable-dropdown__section-header">
                  <span>Selected ({selectedVariants.length})</span>
                  <button
                    className="searchable-dropdown__clear-btn"
                    onClick={handleClearAll}
                    type="button"
                  >
                    Clear all
                  </button>
                </div>
                {filteredVariants.filter(variant => isVariantSelected(variant.hook)).map((variant) => (
                  <label
                    key={variant.attribute}
                    className="searchable-dropdown__item searchable-dropdown__item--selected"
                  >
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => handleToggle(variant.hook)}
                      className="searchable-dropdown__checkbox"
                    />
                    <span className="searchable-dropdown__item-label">{variant.label}</span>
                    <span className="searchable-dropdown__item-count">
                      {getVariantCount(variant.hook).toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {filteredVariants.filter(variant => !isVariantSelected(variant.hook)).length > 0 ? (
              <>
                {selectedVariants.length > 0 && (
                  <div className="searchable-dropdown__section-header">
                    Available
                  </div>
                )}
                {filteredVariants.filter(variant => !isVariantSelected(variant.hook)).map((variant) => {
                  const count = getVariantCount(variant.hook);
                  if (count === 0) return null; // Don't show variants with 0 items

                  return (
                    <label
                      key={variant.attribute}
                      className="searchable-dropdown__item"
                    >
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleToggle(variant.hook)}
                        className="searchable-dropdown__checkbox"
                      />
                      <span className="searchable-dropdown__item-label">{variant.label}</span>
                      <span className="searchable-dropdown__item-count">
                        {count.toLocaleString()}
                      </span>
                    </label>
                  );
                })}
              </>
            ) : (
              !selectedVariants.some(v => filteredVariants.includes(v)) && (
                <div className="searchable-dropdown__no-results">
                  No results found
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
