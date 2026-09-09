import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ListFilter, Search, X } from 'lucide-react';

function FilterDropdown({
  id,
  label,
  value,
  options,
  icon,
  isOpen,
  isActive,
  onToggle,
  onChange,
  className = '',
}) {
  const selectedLabel = value || options[0]?.label || label;

  return (
    <div className={`product-select-field ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''} ${className}`}>
      <button
        type="button"
        className="product-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        onClick={onToggle}
      >
        {icon}
        <span className="sr-only">Filter by {label.toLowerCase()}</span>
        <span className="product-select-value">{selectedLabel}</span>
        <ChevronDown className="product-select-chevron" size={17} aria-hidden="true" />
      </button>

      {isOpen && (
        <div id={`${id}-options`} className="product-select-menu" role="listbox" aria-label={`Filter by ${label.toLowerCase()}`}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option.value}
              className={`product-select-option${value === option.value ? ' is-selected' : ''}`}
              key={option.value || 'all'}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductFilters({
  query,
  category,
  subCategory,
  categories,
  subCategories,
  onQueryChange,
  onCategoryChange,
  onSubCategoryChange,
  onClear,
  onClearSearch,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const filterSectionRef = useRef(null);
  const hasActiveFilters = Boolean(query.trim() || category || subCategory);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!filterSectionRef.current?.contains(event.target)) setOpenDropdown(null);
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setOpenDropdown(null);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function toggleDropdown(name) {
    setOpenDropdown((currentDropdown) => currentDropdown === name ? null : name);
  }

  function handleCategoryChange(value) {
    setOpenDropdown(null);
    onCategoryChange(value);
  }

  function handleSubCategoryChange(value) {
    setOpenDropdown(null);
    onSubCategoryChange(value);
  }

  const categoryOptions = [
    { label: 'All categories', value: '' },
    ...categories.map((item) => ({ label: item, value: item })),
  ];
  const subCategoryOptions = [
    { label: 'All sub-categories', value: '' },
    ...subCategories.map((item) => ({ label: item, value: item })),
  ];

  return (
    <div className="product-filter-section" ref={filterSectionRef}>
      <div className={`product-filters${category ? ' has-sub-category' : ''}${hasActiveFilters ? ' has-active-filters' : ''}`} role="search">
        <div className="product-search-field">
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search product name, model, category or description..."
            aria-label="Search products"
          />
          {query && (
            <button type="button" className="product-search-clear" onClick={onClearSearch} aria-label="Clear product search">
              <X size={17} />
            </button>
          )}
        </div>

        <FilterDropdown
          id="category-filter"
          label="category"
          value={category}
          options={categoryOptions}
          icon={<ListFilter size={18} aria-hidden="true" />}
          isOpen={openDropdown === 'category'}
          isActive={Boolean(category)}
          onToggle={() => toggleDropdown('category')}
          onChange={handleCategoryChange}
        />

        {category && (
          <FilterDropdown
            id="sub-category-filter"
            label="sub-category"
            value={subCategory}
            options={subCategoryOptions}
            isOpen={openDropdown === 'subCategory'}
            isActive={Boolean(subCategory)}
            className="product-select-field--sub-category"
            onToggle={() => toggleDropdown('subCategory')}
            onChange={handleSubCategoryChange}
          />
        )}
      </div>

      {hasActiveFilters && (
        <button type="button" className="product-filters-clear" onClick={onClear}>
          <X size={14} aria-hidden="true" />
          Clear filters
        </button>
      )}
    </div>
  );
}
