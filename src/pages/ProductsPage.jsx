import { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, Search, X, PackageSearch, ChevronDown,
  Zap, Activity, ArrowUpDown, Stethoscope, ShoppingCart, Hand, Circle, Thermometer, BedDouble,
  HeartPulse, Puzzle, Sparkles, Grid, Dumbbell, Footprints, Target, Scissors, ClipboardCheck, Wind, Scale
} from 'lucide-react';
import { categories } from '../data/siteData';

const categoryGroups = [
  {
    title: 'Electrotherapy Range',
    items: [
      { name: 'Electrotherapy Equipments', icon: Zap },
      { name: 'Combination Electrotherapy Equipments', icon: Activity },
      { name: 'Electrotherapy Equipments Accessories', icon: Zap },
      { name: 'Traction & CPM Therapy Equipments', icon: ArrowUpDown },
    ],
  },
  {
    title: 'Physiotherapy Range',
    items: [
      { name: 'Physiotherapy Equipments', icon: Stethoscope },
      { name: 'Medical Trolley & Stools', icon: ShoppingCart },
      { name: 'Hand & Leg Physiotherapy Equipments', icon: Hand },
      { name: 'Physiotherapy Exercise Balls', icon: Circle },
      { name: 'Hot and Cold Therapy Equipments', icon: Thermometer },
      { name: 'Treatment Tables', icon: BedDouble },
    ],
  },
  {
    title: 'Rehabilitation & Occupational Therapy',
    items: [
      { name: 'Rehabilitation Equipments', icon: HeartPulse },
      { name: 'Occupational Therapy Equipments', icon: Puzzle },
    ],
  },
  {
    title: 'Sensory & Cognitive Therapy',
    items: [
      { name: 'Sensory Therapy Equipments', icon: Sparkles },
      { name: 'Peg Boards', icon: Grid },
      { name: 'Puzzles', icon: Puzzle },
      { name: 'Puzzles & Trays', icon: Puzzle },
      { name: 'Flash Cards', icon: Grid },
    ],
  },
  {
    title: 'Exercise & Fitness',
    items: [
      { name: 'Exercise Therapy Equipments', icon: Dumbbell },
      { name: 'Gait & Balance Training Equipment', icon: Footprints },
      { name: 'Fitness Equipments', icon: Dumbbell },
    ],
  },
  {
    title: 'Specialized Therapy & Surgical',
    items: [
      { name: 'Acupuncture Therapy Equipments', icon: Target },
      { name: 'Surgical Equipments', icon: Scissors },
      { name: 'Assessment & Measurement Equipment', icon: ClipboardCheck },
      { name: 'Blood Circulation & Air Compression Therapy Equipments', icon: Wind },
      { name: 'Chiro & Physio Massager', icon: Hand },
    ],
  },
  {
    title: 'Brand Equipment Lines',
    items: [
      { name: 'BTL Physiotherapy Equipments', icon: Stethoscope, badge: 'BTL' },
      { name: 'Tapsi Physiotherapy Equipments', icon: Stethoscope, badge: 'Tapsi' },
      { name: 'HMS Physiotherapy Equipments', icon: Stethoscope, badge: 'HMS' },
    ],
  },
  {
    title: 'Slimming',
    items: [
      { name: 'Slimming Equipment', icon: Scale },
    ],
  },
];

/* ── Category Card ── */
function CategoryCard({ item, img, onNavigate }) {
  const Icon = item.icon;
  return (
    <button
      className="cat-prod-card"
      onClick={() => onNavigate('contact')}
      aria-label={`Enquire about ${item.name}`}
    >
      <div className="cat-prod-img-wrap">
        <img src={img || '/placeholder.jpg'} alt={item.name} loading="lazy" />
        <div className="cat-prod-img-overlay" />
        <div className="cat-prod-icon-badge">
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
      <div className="cat-prod-body">
        {item.badge && <span className="cat-badge" style={{marginBottom:'8px', display:'inline-block', fontSize:'11px', background:'#f1f5f9', color:'#0e2a4a', padding:'2px 8px', borderRadius:'12px', fontWeight:'700'}}>{item.badge}</span>}
        <h3 className="cat-prod-title">{item.name}</h3>
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allCategoryItems = categoryGroups.flatMap(g => g.items.map(i => i.name));
  
  // Filter groups if a category filter is selected
  const visibleGroups = filter 
    ? categoryGroups.map(g => ({ ...g, items: g.items.filter(item => item.name === filter) })).filter(g => g.items.length > 0)
    : categoryGroups;

  // Count total categories and total visible
  let totalCategories = 0;
  let shownCategories = 0;
  
  visibleGroups.forEach(g => {
    totalCategories += g.items.length;
    shownCategories += g.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).length;
  });

  return (
    <div className="cat-page">
      {/* Header */}
      <section className="cat-page-header" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', padding: '64px 0 48px', textAlign: 'center' }}>
        <div className="container">
          <span className="cat-eyebrow" style={{ display: 'inline-block', color: '#208b49', fontSize: '13px', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '12px' }}>OUR RANGE</span>
          <h1 className="cat-heading" style={{ color: '#1c5fa8', fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: '850', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Explore Our Product Categories</h1>
          <p className="cat-subtext" style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px' }}>Browse our complete range of physiotherapy, rehabilitation and medical equipment categories.</p>
          
          <div className="cat-search-wrap" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div className="cat-search-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', position: 'relative' }}>
              <div style={{ position: 'relative', flex: '1' }}>
                <Search size={20} className="cat-search-icon" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input 
                  type="text" 
                  className="cat-page-search-input" 
                  style={{ width: '100%', padding: '16px 48px 16px 52px', borderRadius: '999px', border: '1px solid #e2e8f0', fontSize: '16px', outline: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', color: '#0e2a4a', background: '#fff' }}
                  placeholder="Search categories..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button 
                    onClick={() => setQuery('')} 
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(100, 116, 139, 0.1)', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Clear search"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                )}
              </div>
              
              <div className="cat-filter-dropdown-wrap" ref={dropdownRef} style={{ position: 'relative', width: '220px', flexShrink: 0 }}>
                <button
                  className="cat-filter-dropdown"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: '999px', border: '1px solid #e2e8f0', background: '#fff', color: '#0e2a4a', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Filter by category group"
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{filter || "All Categories"}</span>
                  <ChevronDown size={18} strokeWidth={2.5} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>
                
                {isOpen && (
                  <ul className="custom-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '0', right: '0', background: '#fff', borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', padding: '8px', zIndex: 10, margin: 0, listStyle: 'none', maxHeight: '300px', overflowY: 'auto' }}>
                    <li 
                      className={filter === "" ? "active" : ""} 
                      style={{ padding: '10px 16px', cursor: 'pointer', borderRadius: '8px', fontSize: '14.5px', color: filter === "" ? '#208b49' : '#0e2a4a', background: filter === "" ? '#f1f8f4' : 'transparent', fontWeight: filter === "" ? '700' : '500' }}
                      onClick={() => { setFilter(""); setIsOpen(false); }}
                    >
                      All Categories
                    </li>
                    {allCategoryItems.map((catName) => (
                      <li 
                        key={catName} 
                        style={{ padding: '10px 16px', cursor: 'pointer', borderRadius: '8px', fontSize: '14.5px', color: filter === catName ? '#208b49' : '#1c5fa8', background: filter === catName ? '#f1f8f4' : 'transparent', fontWeight: filter === catName ? '700' : '500' }}
                        onClick={() => { setFilter(catName); setIsOpen(false); }}
                      >
                        {catName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {query && (
              <p style={{ marginTop: '16px', fontSize: '14px', color: '#64748b' }}>
                Showing <strong>{shownCategories}</strong> of <strong>{totalCategories}</strong> categories
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Grid List */}
      <section className="cat-page-body section-shell">
        <div className="container">
          {shownCategories === 0 ? (
            <EmptyState query={query} onClear={() => setQuery('')} />
          ) : (
            visibleGroups.map((group, i) => {
              const filteredItems = group.items.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
              );

              if (filteredItems.length === 0) return null;

              return (
                <div className="cat-page-group" key={i} style={{ marginBottom: '48px' }}>
                  <h3 className="cat-page-group-title" style={{ fontSize: '22px', fontWeight: '800', color: '#1c5fa8', margin: '0 0 24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>{group.title}</h3>
                  <div className="cat-prod-grid">
                    {filteredItems.map((item, idx) => {
                      const catData = categories.find(c => c.title === item.name);
                      return (
                        <CategoryCard 
                          key={idx} 
                          item={item} 
                          img={catData ? catData.img : null} 
                          onNavigate={onNavigate} 
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
