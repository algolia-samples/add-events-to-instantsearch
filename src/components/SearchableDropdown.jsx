import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRefinementList } from 'react-instantsearch';

export default function SearchableDropdown({ attribute, placeholder, transformItems }) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList({
    attribute,
    limit: 100,
    showMore: true,
    showMoreLimit: 500,
    transformItems,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuStyle, setMenuStyle] = useState({});
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Calculate menu position for mobile quick filters
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const isMobileQuickFilter = buttonRef.current.closest('.mobile-quick-filters');

      if (isMobileQuickFilter && window.innerWidth <= 1024) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setMenuStyle({
          top: `${buttonRect.bottom + window.scrollY}px`,
        });
      } else {
        setMenuStyle({});
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchForItems(value);
  };

  const handleSelect = (value) => {
    refine(value);
  };

  const handleClear = () => {
    items.forEach(item => {
      if (item.isRefined) {
        refine(item.value);
      }
    });
  };

  const selectedItems = items.filter(item => item.isRefined);
  const availableItems = items.filter(item => !item.isRefined);

  // Generate contextual label from attribute name
  const getSelectionLabel = () => {
    if (selectedItems.length === 0) {
      return placeholder || 'Select...';
    }

    // Map attribute to singular/plural labels
    const labelMap = {
      'set': { singular: 'Set', plural: 'Sets' },
      'artist': { singular: 'Artist', plural: 'Artists' },
      'types': { singular: 'Type', plural: 'Types' },
      'rarity': { singular: 'Rarity', plural: 'Rarities' },
    };

    const labels = labelMap[attribute];
    if (labels) {
      const label = selectedItems.length === 1 ? labels.singular : labels.plural;
      return `${selectedItems.length} ${label}`;
    }

    // Fallback for unknown attributes
    return `${selectedItems.length} selected`;
  };

  return (
    <div className="searchable-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="searchable-dropdown__toggle"
        onClick={() => setIsOpen(!isOpen)}
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
            {selectedItems.length > 0 && (
              <div className="searchable-dropdown__selected-section">
                <div className="searchable-dropdown__section-header">
                  <span>Selected ({selectedItems.length})</span>
                  <button
                    className="searchable-dropdown__clear-btn"
                    onClick={handleClear}
                    type="button"
                  >
                    Clear all
                  </button>
                </div>
                {selectedItems.map((item) => (
                  <label
                    key={item.value}
                    className="searchable-dropdown__item searchable-dropdown__item--selected"
                  >
                    <input
                      type="checkbox"
                      checked={item.isRefined}
                      onChange={() => handleSelect(item.value)}
                      className="searchable-dropdown__checkbox"
                    />
                    <span className="searchable-dropdown__item-label">{item.label}</span>
                    <span className="searchable-dropdown__item-count">{item.count.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            )}

            {availableItems.length > 0 ? (
              <>
                {selectedItems.length > 0 && (
                  <div className="searchable-dropdown__section-header">
                    Available
                  </div>
                )}
                {availableItems.map((item) => (
                  <label
                    key={item.value}
                    className="searchable-dropdown__item"
                  >
                    <input
                      type="checkbox"
                      checked={item.isRefined}
                      onChange={() => handleSelect(item.value)}
                      className="searchable-dropdown__checkbox"
                    />
                    <span className="searchable-dropdown__item-label">{item.label}</span>
                    <span className="searchable-dropdown__item-count">{item.count.toLocaleString()}</span>
                  </label>
                ))}
              </>
            ) : (
              <div className="searchable-dropdown__no-results">
                No results found
              </div>
            )}

            {canToggleShowMore && (
              <button
                className="searchable-dropdown__show-more"
                onClick={toggleShowMore}
                type="button"
              >
                {isShowingMore ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

SearchableDropdown.propTypes = {
  attribute: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  transformItems: PropTypes.func,
};
