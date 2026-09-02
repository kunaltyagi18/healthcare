import { useEffect, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail
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
import CategoriesPage from './pages/CategoriesPage';

// Data & Icons
import { CONTACT, categories } from './data/siteData';
import { Facebook, Instagram, Youtube, WhatsApp } from './components/icons/SocialIcons';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Products', page: 'products' },
  { label: 'Solutions', page: 'solutions' },
  { label: 'Quality & Certifications', page: 'quality' },
  { label: 'Catalogue', page: 'catalogue' },
  { label: 'Contact Us', page: 'contact' },
];

function getPage() {
  const value = window.location.hash.replace('#', '');
  return navItems.some((item) => item.page === value) ? value : 'home';
}

function navigate(page) {
  window.location.hash = page === 'home' ? '' : page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <button className="brand footer-brand" onClick={() => navigate('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px', border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
            <div style={{ background: '#fff', padding: '6px 12px', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="Shivshakti Logo" className="site-logo" style={{ height: '85px', width: 'auto', objectFit: 'contain', clipPath: 'inset(3px 0 0 0)', marginTop: '-3px' }} />
            </div>
            <span style={{ textAlign: 'left', lineHeight: '1.3', fontSize: '18px' }}>SHIVSHAKTI <strong>HEALTHCARE</strong><br /><small style={{ display: 'block', marginTop: '4px', fontSize: '12px', letterSpacing: '0.1em', color: '#0e2a4a', fontWeight: '800' }}>EQUIPMENTS</small></span>
          </button>
          <div className="footer-contact">
            <span><MapPin size={14} /> {CONTACT.address}</span>
            <span><Phone size={14} /> {CONTACT.phone}</span>
            <a href={CONTACT.emailHref} className="footer-contact-link"><Mail size={14} /> {CONTACT.email}</a>
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          {navItems.slice(0, 6).map((item) => <button key={item.page} onClick={() => navigate(item.page)}>{item.label}</button>)}
        </div>
        <div>
          <h3>Our Products</h3>
          {categories.slice(0, 6).map((item) => <button key={item.title} onClick={() => navigate('products')}>{item.title}</button>)}
        </div>
        <div>
          <h3>Connect With Us</h3>
          <button className="whatsapp" onClick={() => navigate('contact')}>Chat on WhatsApp <ArrowRight size={15} /></button>
          <div className="socials">
            <a href="https://www.facebook.com/share/1HJxtcBHZW/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={17} /></a>
            <a href="#contact" aria-label="YouTube"><Youtube size={17} /></a>
            <a href="https://www.instagram.com/shivshakti_healthcare_eqs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-wrapper">
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Shivshakti Healthcare Equipments. All Rights Reserved.</span>
          <span>Designed with <span style={{ color: '#ff7474' }}>♥</span> for Better Healthcare</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const handleHash = () => setPage(getPage());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
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
    return <><main>{content}</main><Footer /></>;
  }
  return (
    <>
      <HeroSection activePage={page} onNavigate={onNavigate} hideCarousel />
      <main>{content}</main>
      <Footer />
    </>
  );
}

export default App;
