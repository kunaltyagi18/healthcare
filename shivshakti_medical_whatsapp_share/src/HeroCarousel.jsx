import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Hand,
  Layers,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Smile,
  Target,
  Users,
  Zap,
  X,
} from 'lucide-react';

/* ─── SVG Social Icons ─── */
const Facebook = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Instagram = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const Youtube = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 7.1C2.5 7.1 2 9 2 12c0 3 .5 4.9.5 4.9C3 18.3 4.3 19.6 5.8 19.8 8.1 20 12 20 12 20s3.9 0 6.2-.2c1.5-.2 2.8-1.5 3.3-2.9C22 16.9 22 15 22 12c0-3-.5-4.9-.5-4.9C21 5.7 19.7 4.4 18.2 4.2 15.9 4 12 4 12 4s-3.9 0-6.2.2C4.3 4.4 3 5.7 2.5 7.1z" />
    <path d="m10 15 5-3-5-3v6z" />
  </svg>
);
const WhatsApp = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ─── Nav Items ─── */
const navItems = [
  { label: 'Home', page: 'home', active: true },
  { label: 'About Us', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Solutions', page: 'solutions' },
  { label: 'Quality & Certifications', page: 'quality' },
  { label: 'Catalogue', page: 'catalogue' },
  { label: 'Contact Us', page: 'contact' },
];

/* ─── Slide Data ─── */
const slides = [
  {
    id: 1,
    image: '/slide1_physio.jpg',
    panelTheme: 'light',
    panelSolid: '#f8fafc',
    panelTransparent: 'rgba(248, 250, 252, 0)',
    accentColor: '#1a5fa8',
    headingLine1: 'Advanced Physiotherapy',
    headingLine2: 'Equipment for',
    highlight: 'Effective Therapy',
    highlightColor: '#208b49',
    subtext: 'Empowering therapists to deliver better care and faster recovery.',
    features: [
      { icon: Activity, label: 'Effective', label2: 'Pain Relief' },
      { icon: Zap, label: 'Enhances', label2: 'Mobility' },
      { icon: Target, label: 'Faster', label2: 'Recovery' },
      { icon: Users, label: 'Trusted by', label2: 'Professionals' },
    ],
    primaryBtn: { text: 'EXPLORE PHYSIOTHERAPY RANGE', color: '#003bb3' },
    outlineBtn: { text: 'REQUEST A QUOTE' },
  },
  {
    id: 2,
    image: '/slide2_sensory.jpg',
    panelTheme: 'light',
    panelSolid: 'rgba(244, 240, 248, 0.96)',
    panelTransparent: 'rgba(244, 240, 248, 0)',
    accentColor: '#7c3aed',
    headingLine1: 'Sensory Lights & Equipment',
    headingLine2: 'to Stimulate, Soothe',
    highlight: '& Support',
    highlightColor: '#208b49',
    subtext: 'A complete range of sensory lights and tools designed to create engaging sensory environments.',
    features: [
      { icon: Eye, label: 'Visual', label2: 'Stimulation' },
      { icon: Smile, label: 'Calms &', label2: 'Relaxes' },
      { icon: Brain, label: 'Improves Focus', label2: '& Attention' },
      { icon: Shield, label: 'Supports Sensory', label2: 'Development' },
    ],
    primaryBtn: { text: 'EXPLORE SENSORY RANGE', color: '#6d28d9' },
    outlineBtn: { text: 'REQUEST A QUOTE' },
    textColor: '#0e2a4a',
    subtextColor: '#475569',
  },
  {
    id: 3,
    image: '/slide3_ot.jpg',
    panelTheme: 'light',
    panelSolid: 'rgba(246, 250, 248, 0.97)',
    panelTransparent: 'rgba(246, 250, 248, 0)',
    accentColor: '#1a5fa8',
    headingLine1: 'Occupational Therapy Equipment',
    headingLine2: 'for',
    highlight: 'Better Independence',
    highlightColor: '#208b49',
    subtext: 'Specialized OT tools and equipment to improve motor skills, daily living activities and overall independence.',
    features: [
      { icon: Hand, label: 'Improves Motor', label2: 'Skills' },
      { icon: Layers, label: 'Enhances Daily', label2: 'Living Activities' },
      { icon: Target, label: 'Builds Strength', label2: '& Coordination' },
      { icon: Users, label: 'Encourages', label2: 'Independence' },
    ],
    primaryBtn: { text: 'EXPLORE OT RANGE', color: '#003bb3' },
    outlineBtn: { text: 'REQUEST A QUOTE' },
  },
  {
    id: 4,
    image: '/slide4_machines.jpg',
    panelTheme: 'blue',
    panelSolid: 'rgba(240, 248, 255, 0.97)',
    panelTransparent: 'rgba(240, 248, 255, 0)',
    accentColor: '#1a5fa8',
    headingLine1: 'Comprehensive Range of',
    headingLine2: 'Physiotherapy Machines',
    highlight: 'for Every Clinical Need',
    highlightColor: '#208b49',
    subtext: 'Reliable. Innovative. Effective.\nEverything you need for complete patient care.',
    inlineFeatures: [
      { icon: CheckCircle, label: 'Advanced Technology' },
      { icon: CheckCircle, label: 'Safe' },
      { icon: CheckCircle, label: 'Clinically Proven' },
    ],
    primaryBtn: { text: 'VIEW ALL PRODUCTS', color: '#003bb3' },
    outlineBtn: { text: 'REQUEST A QUOTE' },
  },
];


/* ─── Top Bar ─── */
function TopBar() {
  return (
    <div className="hc-topbar">
      <div className="hc-topbar-inner">
        <div className="hc-topbar-left">
          <a href="tel:+918920199593" className="hc-topbar-item">
            <Phone size={12} />
            <span>+91 89201 99593</span>
          </a>
          <a href="mailto:shivshaktihealthcareequipments@gmail.com" className="hc-topbar-item">
            <Mail size={12} />
            <span>shivshaktihealthcareequipments@gmail.com</span>
          </a>
          <span className="hc-topbar-item hc-topbar-loc">
            <MapPin size={12} />
            <span>New Delhi, India</span>
          </span>
        </div>
        <div className="hc-topbar-right">
          <a href="https://www.facebook.com/share/1HJxtcBHZW/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hc-social-btn"><Facebook size={13} /></a>
          <a href="https://www.instagram.com/shivshakti_healthcare_eqs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hc-social-btn"><Instagram size={13} /></a>
          <a href="https://www.youtube.com/@SHIVSHAKTIHEALTHCAREEQUIPMENTS" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hc-social-btn"><Youtube size={13} /></a>
        </div>
      </div>
    </div>
  );
}

/* ─── Sticky Header ─── */
function StickyHeader({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`hc-header${scrolled ? ' hc-header--scrolled' : ''}`}>
      <div className="hc-header-inner">
        {/* Logo */}
        <button className="hc-logo" onClick={() => onNavigate('home')} aria-label="Go to home">
          <img src="/svs_logo_new.png" alt="Shivshakti Logo" className="site-logo" />
          <div className="hc-logo-text">
            <span className="hc-logo-name">SHIVSHAKTI</span>
            <span className="hc-logo-sub">HEALTHCARE EQUIPMENTS</span>
            <span className="hc-logo-tag">Committed to Better Therapy</span>
          </div>
        </button>

        {/* Mobile toggle */}
        <button
          className="hc-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Nav */}
        <nav className={`hc-nav${menuOpen ? ' hc-nav--open' : ''}`} role="navigation">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={`hc-nav-item${activePage === item.page ? ' hc-nav-item--active' : ''}`}
              onClick={() => { onNavigate(item.page); setMenuOpen(false); }}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={13} className="hc-nav-chevron" />}
            </button>
          ))}
          {/* CTA */}
          <button
            className="hc-header-cta"
            onClick={() => { onNavigate('contact'); setMenuOpen(false); }}
          >
            REQUEST A QUOTE <ArrowRight size={14} />
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ─── Individual Slide ─── */
function SlideContent({ slide, isActive }) {
  const isDark = slide.panelTheme === 'dark';
  const textColor = isDark ? (slide.textColor || '#fff') : '#0e2a4a';
  const subtextColor = isDark ? (slide.subtextColor || 'rgba(255,255,255,0.72)') : '#64778b';
  const iconBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(26,95,168,0.08)';
  const iconColor = isDark ? slide.accentColor || '#a855f7' : slide.accentColor || '#1a5fa8';
  const iconLabelColor = isDark ? 'rgba(255,255,255,0.85)' : '#0e2a4a';

  return (
    <div className={`hc-slide${isActive ? ' hc-slide--active' : ''}`}>
      {/* Background image */}
      <div
        className="hc-slide-bg"
        style={{ backgroundImage: `url(${slide.image})` }}
        data-image-protected="true"
        aria-hidden="true"
      />
      {/* Dark gradient overlay on image side */}
      <div className="hc-slide-overlay" aria-hidden="true" />

      {/* Content panel — absolutely overlaid on left side of full-width image */}
      <div
        className="hc-slide-panel"
        style={{
          '--panel-solid': slide.panelSolid,
          '--panel-transparent': slide.panelTransparent,
          background: `linear-gradient(to right,
            ${slide.panelSolid} 0%,
            ${slide.panelSolid} 50%,
            ${slide.panelTransparent} 100%
          )`,
        }}
      >
        <div className="hc-slide-copy">
          {slide.eyebrow && (
            <div className="hc-slide-eyebrow">
              {slide.eyebrow}
              <span className="hc-slide-eyebrow-line"></span>
            </div>
          )}

          {/* Heading */}
          <h2 className="hc-slide-heading" style={{ color: textColor }}>
            <span>{slide.headingLine1}</span>
            <br />
            <span>{slide.headingLine2} </span>
            <span className="hc-slide-highlight" style={{ color: slide.highlightColor }}>
              {slide.highlight}
            </span>
          </h2>

          {slide.subheading && (
            <h3 className="hc-slide-subheading" style={{ color: textColor }}>
              {slide.subheading}
            </h3>
          )}

          {/* Subtext */}
          <p className="hc-slide-subtext" style={{ color: subtextColor }}>
            {slide.subtext}
          </p>

          {/* Feature icons row */}
          {slide.features && (
            <div className="hc-slide-features">
              {slide.features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div className="hc-feature-item" key={i}>
                    <div className="hc-feature-icon" style={{ background: iconBg, color: iconColor }}>
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <span className="hc-feature-label" style={{ color: iconLabelColor }}>
                      {f.label}<br />{f.label2}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inline Feature icons row */}
          {slide.inlineFeatures && (
            <div className="hc-slide-inline-features" style={{ display: 'flex', gap: '16px', marginBottom: '22px', flexWrap: 'wrap', alignItems: 'center' }}>
              {slide.inlineFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div className="hc-inline-feature-item" key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icon size={16} color="#208b49" strokeWidth={2.5} />
                    <span style={{ fontSize: '11px', fontWeight: '800', color: iconLabelColor, letterSpacing: '0.02em' }}>{f.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Buttons */}
          <div className="hc-slide-buttons">
            <button
              className="hc-btn-primary"
              style={{ background: slide.primaryBtn.color, borderColor: slide.primaryBtn.color }}
            >
              {slide.primaryBtn.text} <ArrowRight size={14} />
            </button>
            <button
              className="hc-btn-outline"
              style={{
                borderColor: slide.outlineBtn?.outlineColor || (isDark ? 'rgba(255,255,255,0.4)' : '#003bb3'),
                color: isDark ? '#fff' : '#003bb3',
              }}
            >
              <WhatsApp size={15} />
              {slide.outlineBtn.text}
            </button>
          </div>
        </div>
      </div>

      {/* Slide 4 — special right sidebar list */}
      {slide.sidePanel && (
        <div className="hc-side-panel">
          {slide.sidePanel.map((item, i) => {
            const Icon = item.icon;
            return (
              <div className="hc-side-panel-item" key={i}>
                <div className="hc-side-panel-icon"><Icon size={15} /></div>
                <span>{item.text}</span>
                <ChevronRight size={13} className="hc-side-chevron" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Hero Carousel ─── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const total = slides.length;

  const goTo = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((index + total) % total);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Auto-play and robust timer management
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    timerRef.current = id;
    
    return () => clearInterval(id); // Safe cleanup of specific interval
  }, [total]);

  // Pause on hover
  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resumeTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
  };

  return (
    <div
      className="hc-carousel"
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      aria-label="Hero image carousel"
    >
      {/* Slides */}
      <div className="hc-carousel-track">
        {slides.map((slide, i) => (
          <SlideContent key={slide.id} slide={slide} isActive={i === current} />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        className="hc-arrow hc-arrow--prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        className="hc-arrow hc-arrow--next"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot pagination */}
      <div className="hc-dots" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hc-dot${i === current ? ' hc-dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Full Hero Section (TopBar + Header + Carousel) ─── */
export function HeroSection({ activePage, onNavigate, hideCarousel = false }) {
  return (
    <div className="hc-root">
      <TopBar />
      <StickyHeader activePage={activePage} onNavigate={onNavigate} />
      {!hideCarousel && <HeroCarousel />}
    </div>
  );
}

export default HeroSection;
