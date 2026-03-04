'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './FilterDropdown.module.css';

export default function FilterDropdown({ label, options, onSelect, selected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleSelect = (optionLabel, optionLink) => {
    onSelect(optionLabel);
    setIsOpen(false);
    if (optionLink) {
      window.location.href = optionLink;
    }
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'object' && option.label) {
      return option.label;
    }
    return option;
  };

  const getOptionLink = (option) => {
    if (typeof option === 'object' && option.link) {
      return option.link;
    }
    return null;
  };

  return (
    <div 
      className={styles.dropdown} 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        className={`${styles.dropdownButton} ${isOpen ? styles.active : ''}`}
        type="button"
      >
        <span className={styles.label}>
          {label}
          {selected && <span className={styles.selected}> ({selected})</span>}
        </span>
        <span className={styles.arrow}>▼</span>
      </button>

      {isOpen && options && options.length > 0 && (
        <div 
          className={styles.dropdownMenu}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {options.map((option, index) => {
            const optionLabel = getOptionLabel(option);
            const optionLink = getOptionLink(option);

            return (
              <button
                key={`${optionLabel}-${index}`}
                className={styles.dropdownItem}
                onClick={() => handleSelect(optionLabel, optionLink)}
                type="button"
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
