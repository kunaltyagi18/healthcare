import { useState } from 'react';
import {
  Activity,
  Armchair,
  BedDouble,
  Circle,
  ClipboardCheck,
  Dumbbell,
  Footprints,
  Grid,
  Hand,
  HeartPulse,
  Move,
  Puzzle,
  RotateCw,
  Ruler,
  Scale,
  Scissors,
  Search,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Target,
  Thermometer,
  Wind,
  Zap,
} from 'lucide-react';

const categoryGroups = [
  {
    title: 'Electrotherapy Range',
    items: [
      { name: 'Electrotherapy Equipments', icon: Zap },
      { name: 'Combination Electrotherapy Equipments', icon: Activity },
      { name: 'Electrotherapy Equipments Accessories', icon: Zap },
      { name: 'Traction & CPM Therapy Equipments', icon: RotateCw },
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

function CategorySection({ title, items, searchQuery }) {
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredItems.length === 0) return null;

  return (
    <div className="cat-page-group">
      <h3 className="cat-page-group-title">{title}</h3>
      <div className="cat-page-grid">
        {filteredItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a href="#products" className="cat-page-card" key={idx}>
              {item.badge && <span className="cat-badge">{item.badge}</span>}
              <div className="cat-icon-wrap">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <strong className="cat-name">{item.name}</strong>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="cat-page">
      {/* Header */}
      <section className="cat-page-header">
        <div className="container">
          <span className="cat-eyebrow">OUR RANGE</span>
          <h1 className="cat-heading">Explore Our Product Categories</h1>
          <p className="cat-subtext">Browse our complete range of physiotherapy, rehabilitation and medical equipment categories.</p>
          
          <div className="cat-search-wrap">
            <Search size={18} className="cat-search-icon" />
            <input 
              type="text" 
              className="cat-search-input" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Grid List */}
      <section className="cat-page-body section-shell">
        <div className="container">
          {categoryGroups.map((group, i) => (
            <CategorySection 
              key={i} 
              title={group.title} 
              items={group.items} 
              searchQuery={searchQuery} 
            />
          ))}
          {categoryGroups.every(g => 
            g.items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0
          ) && (
            <div className="cat-no-results">
              <Search size={40} strokeWidth={1} color="#8a9bb0" />
              <p>No categories found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
