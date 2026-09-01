import { useState } from 'react';
import { ChevronRight, ChevronDown, Search, X, PackageSearch } from 'lucide-react';
import { PageIntro } from '../components/Shared';
import { categories } from '../data/siteData';

/* ── Search Bar ── */
function CategorySearchBar({ value, onChange, total, shown, filter, onFilterChange, categoryGroups }) {
  return (
    <div className="cat-search-wrapper">
      <div className="cat-search-row">
        <div className="cat-search-bar">
          <Search size={17} className="cat-search-icon" strokeWidth={2.5} />
          <input
            id="category-search"
            type="text"
            className="cat-search-input"
            placeholder="Search for products, categories..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
          />
          {value && (
            <button className="cat-search-clear" onClick={() => onChange('')} aria-label="Clear search">
              <X size={15} strokeWidth={2.5} />
            </button>
          )}
        </div>
        <div className="cat-filter-dropdown-wrap">
          <select
            className="cat-filter-dropdown"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            aria-label="Filter by category group"
          >
            <option value="">All Categories</option>
            {categoryGroups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <ChevronDown size={15} className="cat-filter-chevron" strokeWidth={2.5} />
        </div>
      </div>
      {value && (
        <p className="cat-search-count">
          Showing <strong>{shown}</strong> of <strong>{total}</strong> categories
        </p>
      )}
    </div>
  );
}

/* ── Category Card ── */
function CategoryCard({ item, onNavigate }) {
  return (
    <button
      className="cat-prod-card"
      onClick={() => onNavigate('contact')}
      aria-label={`Enquire about ${item.title}`}
    >
      <div className="cat-prod-img-wrap">
        <img src={item.img} alt={item.title} loading="lazy" />
        <div className="cat-prod-img-overlay" />
      </div>
      <div className="cat-prod-body">
        <h3 className="cat-prod-title">{item.title}</h3>
        <span className="cat-prod-link">
          Enquire <ChevronRight size={13} strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
}

/* ── Empty State ── */
function EmptyState({ query, onClear }) {
  return (
    <div className="cat-empty-state">
      <PackageSearch size={48} strokeWidth={1.3} className="cat-empty-icon" />
      <p className="cat-empty-text">
        No categories found for <strong>"{query}"</strong>
      </p>
      <button className="cat-empty-clear" onClick={onClear}>
        Clear search
      </button>
    </div>
  );
}

/* ── Main Page ── */
export default function ProductsPage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  // Use all category titles for the dropdown
  const categoryGroups = categories.map((c) => c.title);

  const filtered = categories.filter((c) => {
    const matchesQuery = query.trim()
      ? c.title.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesFilter = filter ? c.title === filter : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <PageIntro
        eyebrow="OUR PRODUCTS"
        title="Everything you need for better care."
        description="Browse dependable equipment categories designed for clinics, rehabilitation centres, hospitals, schools and wellness spaces."
      />
      <section className="section-shell">
        <div className="container">
          <CategorySearchBar
            value={query}
            onChange={setQuery}
            total={categories.length}
            shown={filtered.length}
            filter={filter}
            onFilterChange={setFilter}
            categoryGroups={categoryGroups}
          />
          {filtered.length === 0 ? (
            <EmptyState query={query} onClear={() => setQuery('')} />
          ) : (
            <div className="cat-prod-grid">
              {filtered.map((item) => (
                <CategoryCard key={item.title} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
