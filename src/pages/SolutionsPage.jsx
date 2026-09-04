import {
  Activity, ArrowRight, BadgeCheck, Building2, Dumbbell,
  GraduationCap, HeartHandshake, Layers, Lightbulb,
  Maximize2, Settings, ShieldCheck, Sparkles,
  Stethoscope, Target, Users, Landmark,
  Zap, Eye, Hand, Footprints, Star, FlipHorizontal,
} from 'lucide-react';
import { industries } from '../data/siteData';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const heroFeatures = [
  {
    icon: Settings,
    color: '#1a5fa8',
    title: 'Smart Planning',
    desc: 'Designed around your goals',
  },
  {
    icon: ShieldCheck,
    color: '#208b49',
    title: 'Quality Equipment',
    desc: 'Reliable & trusted solutions',
  },
  {
    icon: Lightbulb,
    color: '#7c3aed',
    title: 'Expert Support',
    desc: 'Guidance at every step',
  },
  {
    icon: Target,
    color: '#f97316',
    title: 'Better Outcomes',
    desc: 'Enhanced care and recovery',
  },
];

export const solutionCards = [
  {
    id: 'physio',
    theme: 'blue',
    accent: '#1a5fa8',
    accentLight: '#eef4fc',
    title: 'Physiotherapy Clinic Setup',
    img: '/sol_physio.jpg',
    desc: 'Well-designed physiotherapy clinics that enable effective treatment, support faster recovery and enhance patient comfort.',
    tags: [
      { icon: Layers, label: 'Treatment Tables' },
      { icon: Zap, label: 'Electrotherapy Equipment' },
      { icon: Activity, label: 'Exercise Equipment' },
      { icon: Maximize2, label: 'Ergonomic Design' },
    ],
  },
  {
    id: 'rehab',
    theme: 'green',
    accent: '#208b49',
    accentLight: '#edf7f1',
    title: 'Rehabilitation Centre Setup',
    img: '/sol_rehab.jpg',
    desc: 'Comprehensive rehabilitation centre solutions focused on recovery, mobility, independence and overall well-being.',
    tags: [
      { icon: Activity, label: 'Neuro Rehab Equipment' },
      { icon: Footprints, label: 'Mobility Training' },
      { icon: Target, label: 'Strength & Balance Training' },
      { icon: HeartHandshake, label: 'Post-Surgical Rehabilitation' },
    ],
  },
  {
    id: 'sensory',
    theme: 'purple',
    accent: '#7c3aed',
    accentLight: '#f5f0ff',
    title: 'Sensory Room Solutions',
    img: '/sol_sensory.jpg',
    desc: 'Engaging sensory spaces that support relaxation, sensory integration, focus and emotional well-being.',
    tags: [
      { icon: Star, label: 'Sensory Lighting' },
      { icon: FlipHorizontal, label: 'Interactive Panels' },
      { icon: Sparkles, label: 'Soft Play Equipment' },
      { icon: Eye, label: 'Tactile & Visual Stimuli' },
    ],
  },
  {
    id: 'ot',
    theme: 'orange',
    accent: '#f97316',
    accentLight: '#fff5ed',
    title: 'Occupational Therapy Space',
    img: '/sol_hospital.jpg',
    desc: 'Functional occupational therapy spaces that build motor skills, independence and confidence in daily living.',
    tags: [
      { icon: Hand, label: 'Swings & Climbers' },
      { icon: BadgeCheck, label: 'Fine Motor Activities' },
      { icon: Users, label: 'Daily Living Training' },
      { icon: Layers, label: 'Functional Activities' },
    ],
  },
];

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function HeroFeature({ icon: Icon, color, title, desc }) {
  return (
    <div className="sol-hero-feature">
      <div className="sol-hf-icon" style={{ background: color + '18', color }}>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <div>
        <strong className="sol-hf-title">{title}</strong>
        <p className="sol-hf-desc">{desc}</p>
      </div>
    </div>
  );
}

export function SolutionCard({ card, onNavigate }) {
  return (
    <div className="sol-card" style={{ '--card-accent': card.accent, '--card-accent-light': card.accentLight }}>
      <div className="sol-card-top-bar" style={{ background: card.accent }} />
      <div className="sol-card-header">
        <h3 className="sol-card-title" style={{ color: card.accent }}>
          {card.title}
        </h3>
        <div className="sol-card-underline" style={{ background: card.accent }} />
      </div>
      <div className="sol-card-img-wrap">
        <img src={card.img} alt={card.title} loading="lazy" />
      </div>
      <div className="sol-card-body">
        <p className="sol-card-desc">{card.desc}</p>
        <div className="sol-card-tags">
          {card.tags.map((tag) => {
            const Icon = tag.icon;
            return (
              <div className="sol-tag" key={tag.label}>
                <Icon size={20} strokeWidth={1.5} style={{ color: card.accent }} />
                <span>{tag.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="sol-card-arrow"
        style={{ background: card.accent }}
        onClick={() => onNavigate('contact')}
        aria-label={`Learn more about ${card.title}`}
      >
        <ArrowRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function IndustryItem({ icon: Icon, label }) {
  return (
    <div className="sol-industry-item">
      <div className="sol-ind-icon">
        <Icon size={30} strokeWidth={1.5} />
      </div>
      <span>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function SolutionsPage({ onNavigate }) {
  return (
    <div className="sol-page">

      {/* ── Hero ── */}
      <section className="sol-hero">
        <div className="sol-hero-image-layer">
          <img src="/slide1_physio.jpg" alt="Physiotherapy room" />
        </div>
        <svg className="sol-hero-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="solHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f6ff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path d="M0,0 L58,0 C38,30 43,70 63,100 L0,100 Z" fill="url(#solHeroGrad)" />
          <path d="M58,0 C38,30 43,70 63,100 L61.5,100 C41.5,70 36.5,30 56.5,0 Z" fill="#0f2a52" />
          <path d="M56.5,0 C36.5,30 41.5,70 61.5,100 L60,100 C40,70 35,30 55,0 Z" fill="#208b49" />
        </svg>

        <div className="sol-hero-inner container">
          <div className="sol-hero-left">
            <div className="sol-eyebrow-row">
              <span className="sol-eyebrow-line" />
              <span className="sol-eyebrow-text">CARE SPACE SOLUTIONS</span>
              <span className="sol-eyebrow-line" />
            </div>
            <h1 className="sol-hero-heading">
              <span className="sol-h-navy">Complete Care Space</span><br />
              <span className="sol-h-navy">Solutions</span><br />
              <span className="sol-h-green">For Every Need</span>
            </h1>
            <p className="sol-hero-subtext">
              From planning to installation, we help you create functional, safe and future-ready spaces that inspire better care and outcomes.
            </p>
            <div className="sol-hero-features">
              {heroFeatures.map((f) => (
                <HeroFeature key={f.title} {...f} />
              ))}
            </div>
          </div>
          <div className="sol-hero-right" style={{ visibility: 'hidden' }}>
            {/* Empty space to force grid layout and expose background image */}
          </div>
        </div>
      </section>

      {/* ── Solution Cards ── */}
      <section className="sol-cards-section">
        <div className="container">
          <div className="sol-cards-grid">
            {solutionCards.map((card) => (
              <SolutionCard key={card.id} card={card} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="sol-industries-section">
        <div className="container">
          <div className="sol-industries-inner">
            <div className="sol-ind-heading-wrap">
              <span className="sol-eyebrow-line sol-line-dark" />
              <h2 className="sol-ind-heading">INDUSTRIES WE SERVE</h2>
              <span className="sol-eyebrow-line sol-line-dark" />
            </div>
            <div className="sol-ind-underline" />
            <div className="sol-industries-grid">
              {industries.map((item) => (
                <IndustryItem key={item.title} icon={item.icon} label={item.title} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
