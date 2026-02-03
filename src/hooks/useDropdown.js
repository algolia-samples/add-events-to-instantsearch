import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for shared dropdown behavior including:
 * - Open/close state management
 * - Click-outside detection
 * - Mobile positioning for quick filters
 * - Search query state
 */
export function useDropdown() {
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
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    menuStyle,
    dropdownRef,
    buttonRef,
    handleSearch,
    toggleDropdown,
  };
}
