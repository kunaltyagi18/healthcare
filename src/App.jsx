import { useEffect, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  X
} from 'lucide-react';
import { HeroSection } from './HeroCarousel.jsx';

// Pages
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ProductsPage from './pages/ProductsPage';
import SolutionsPage from './pages/SolutionsPage';
import QualityPage from './pages/QualityPage';
import CataloguePage from './pages/CataloguePage';
import ContactPage from './pages/ContactPage';

// Data & Icons
import { CONTACT } from './data/siteData';
import { Facebook, Instagram, WhatsApp, Youtube } from './components/icons/SocialIcons';
import useImageProtection from './utils/useImageProtection';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Solutions', page: 'solutions' },
  { label: 'Quality & Certifications', page: 'quality' },
  { label: 'Catalogue', page: 'catalogue' },
  { label: 'Contact Us', page: 'contact' },
];

const footerProductCategories = [
  'Electrotherapy Equipment',
  'Sensory Therapy Equipment',
  'Occupational Therapy Equipment',
  'Exercise Therapy Equipment',
  'Rehabilitation Equipment',
  'Treatment Tables',
];

function FloatingWhatsAppButton() {
  const [showLabel, setShowLabel] = useState(true);

  return (
    <div className="floating-whatsapp-wrap">
      {showLabel && (
        <div className="floating-whatsapp-label">
          <span>Contact us on WhatsApp</span>
          <button
            type="button"
            className="floating-whatsapp-dismiss"
            onClick={() => setShowLabel(false)}
            aria-label="Hide WhatsApp message"
            title="Hide message"
          >
            <X size={13} />
          </button>
        </div>
      )}
      <a
        className="floating-whatsapp"
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Shivshakti Healthcare Equipments on WhatsApp at ${CONTACT.phone}`}
      >
        <WhatsApp size={42} />
      </a>
    </div>
  );
}

function getPage() {
  const hashValue = window.location.hash.replace('#', '');
  if (navItems.some((item) => item.page === hashValue)) return hashValue;

  const value = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return navItems.some((item) => item.page === value) ? value : 'home';
}

function navigate(page) {
  if (page === 'home') {
    const currentPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const nextPath = navItems.some((item) => item.page === currentPath) ? '/' : window.location.pathname;
    window.history.pushState('', document.title, nextPath + window.location.search);
    window.dispatchEvent(new Event('hashchange'));
  } else {
    window.location.hash = page;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container footer-grid">
        <div>
          <button className="brand footer-brand" onClick={() => navigate('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px', border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
            <div className="footer-logo-frame">
              <img src="/svs_logo_new.png" alt="Shivshakti Logo" className="site-logo footer-logo" />
            </div>
            <span style={{ textAlign: 'left', lineHeight: '1.3', fontSize: '18px' }}>SHIVSHAKTI <strong>HEALTHCARE</strong><br /><small style={{ display: 'block', marginTop: '4px', fontSize: '15px', letterSpacing: '0.1em', color: '#fff', fontWeight: '800' }}>EQUIPMENTS</small></span>
          </button>
          <div className="footer-contact">
            <span><MapPin size={14} /> {CONTACT.address}</span>
            <span><Phone size={14} /> {CONTACT.phone}</span>
            <a href={CONTACT.emailHref} className="footer-contact-link"><Mail size={14} /> {CONTACT.email}</a>
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          {navItems.map((item) => <button key={item.page} onClick={() => navigate(item.page)}>{item.label}</button>)}
        </div>
        <div>
          <h3>Product Catalogue</h3>
          {footerProductCategories.map((category) => (
            <button key={category} onClick={() => navigate('products')}>{category}</button>
          ))}
        </div>
        <div>
          <h3>Connect With Us</h3>
          <a className="whatsapp" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsApp size={17} /> Chat on WhatsApp <ArrowRight size={15} />
          </a>
          <div className="socials">
            <a href="https://www.facebook.com/share/1HJxtcBHZW/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={17} /></a>
            <a href="https://www.youtube.com/@SHIVSHAKTIHEALTHCAREEQUIPMENTS" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={17} /></a>
            <a href="https://www.instagram.com/shivshakti_healthcare_eqs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-wrapper">
        <div className="footer-container footer-bottom">
          <span>© {new Date().getFullYear()} Shivshakti Healthcare Equipments. All Rights Reserved.</span>
          <span>Designed with <span style={{ color: '#ff7474' }}>♥</span> for Better Healthcare</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useImageProtection();
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const handleHash = () => setPage(getPage());
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  function onNavigate(p) {
    navigate(p);
  }

  const content =
    page === 'home' ? <HomePage page={page} onNavigate={onNavigate} /> :
      page === 'about' ? <AboutUs /> :
        page === 'products' ? <ProductsPage onNavigate={onNavigate} /> :
          page === 'solutions' ? <SolutionsPage onNavigate={onNavigate} /> :
            page === 'quality' ? <QualityPage /> :
              page === 'catalogue' ? <CataloguePage /> :
                <ContactPage />;

  // For non-home pages, still show the new HeroSection header (without the carousel)
  // We render HeroSection only on home; other pages get a standalone header wrapper
  if (page === 'home') {
    return <><main>{content}</main><Footer /><FloatingWhatsAppButton /></>;
  }
  return (
    <>
      <HeroSection activePage={page} onNavigate={onNavigate} hideCarousel />
      <main>{content}</main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}

export default App;
