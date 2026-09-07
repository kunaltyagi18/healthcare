import { ListFilter, Search, X } from 'lucide-react';

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
}) {
  return (
    <div className="product-filters" role="search">
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
          <button className="product-search-clear" onClick={onClear} aria-label="Clear product search">
            <X size={17} />
          </button>
        )}
      </div>

      <label className="product-select-field">
        <ListFilter size={18} aria-hidden="true" />
        <span className="sr-only">Filter by category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </label>

      <label className="product-select-field">
        <span className="sr-only">Filter by sub-category</span>
        <select value={subCategory} onChange={(event) => onSubCategoryChange(event.target.value)}>
          <option value="">All sub-categories</option>
          {subCategories.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </label>
    </div>
  );
}
