import usePageTitle from '../utils/usePageTitle';
import { BookOpen, Phone, ShieldCheck } from 'lucide-react';
import { catalogueServing, catalogueWhyConnect, CONTACT, IMAGES } from '../data/siteData';
import { WhatsApp } from '../components/icons/SocialIcons';

export default function CataloguePage() {
  usePageTitle('Product Catalogue');
  return (
    <div className="catalogue-wrapper">
      <div className="cat-card-container new-cat-card">
        <div className="new-cat-header">
          <div className="cat-icon-circle-new">
            <BookOpen size={44} color="#1f7a3d" strokeWidth={1.8} />
          </div>
          <div className="cat-req-line">
            <span className="cat-line-light" />
            <span className="cat-req-text">Request Our</span>
            <span className="cat-line-light" />
          </div>
          <h1 className="cat-main-title">
            <span className="text-navy">For</span> <span className="text-green">Catalogue</span>
          </h1>
          <div className="cat-dots-divider">
            <span className="line-green" />
            <span className="dot navy" />
            <span className="dot green" />
            <span className="dot navy" />
            <span className="line-green" />
          </div>
          <p className="cat-desc">
            Explore our complete range of premium{' '}
            <strong className="text-navy">Physiotherapy, Rehabilitation, Occupational Therapy & Sensory Equipment</strong>
            {' '}— designed for professional care, better recovery and a healthier tomorrow.
          </p>
        </div>

        <div className="new-cat-body">
          <div className="new-cat-left">
            <a href={CONTACT.phoneHref} className="cat-contact-box call-box">
              <div className="cat-cb-icon hex-green"><Phone size={28} color="#fff" /></div>
              <div className="cat-cb-text">
                <span className="cat-cb-label text-navy">CALL US</span>
                <span className="cat-cb-number text-green">{CONTACT.phone}</span>
                <span className="cat-cb-sub">Talk to our experts for quick assistance</span>
              </div>
            </a>

            <div className="cat-or-divider">
              <span className="cat-div-line" />
              <span className="cat-or-badge">OR</span>
              <span className="cat-div-line" />
            </div>

            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="cat-contact-box cat-cb-wa">
              <div className="cat-cb-wa-bg" />
              <div className="cat-cb-icon circle-light-green"><WhatsApp size={36} color="#fff" /></div>
              <div className="cat-cb-text" style={{ position: 'relative', zIndex: 1 }}>
                <span className="cat-cb-label text-navy">CHAT ON WHATSAPP</span>
                <span className="cat-cb-number text-green">{CONTACT.phone}</span>
                <span className="cat-cb-sub">Connect instantly on WhatsApp</span>
              </div>
            </a>

            <div className="cat-need-banner">
              <div className="cat-need-icon"><ShieldCheck size={36} color="#0f2a52" strokeWidth={1.8} /></div>
              <div className="cat-need-text">
                <strong className="text-navy">Need our latest catalogue?</strong>
                <p>Simply call or WhatsApp us, and we will share the complete product catalogue directly with you.</p>
              </div>
              <img src={IMAGES.catalogueBook} alt="Catalogue Book" className="cat-book-img" loading="lazy" />
            </div>
          </div>

          <div className="new-cat-right">
            <h3 className="why-connect-title">
              <span className="text-navy">WHY CONNECT</span><br />
              <span className="text-green">WITH US?</span>
            </h3>
            <div className="why-connect-line"><span className="dot" /></div>
            {catalogueWhyConnect.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="why-c-item" key={item.title} style={idx === catalogueWhyConnect.length - 1 ? { borderBottom: 'none' } : undefined}>
                  <div className="why-c-icon-shadow">
                    <div className={`why-c-icon ${item.color === 'green' ? 'green-icon' : 'blue-icon'}`}>
                      <Icon size={22} color="#fff" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="why-c-text">
                    <strong className={item.color === 'green' ? 'text-green' : 'text-navy'}>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cat-serving-banner">
          <div className="serving-ribbon-left" />
          <div className="serving-ribbon-right" />
          <h4>SERVING A WIDE RANGE OF HEALTHCARE PROFESSIONALS</h4>
          <div className="cat-serving-grid">
            {catalogueServing.map((item) => {
              const Icon = item.icon;
              return (
                <div className="cat-s-item" key={item.title}>
                  <Icon size={32} strokeWidth={1.8} />
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cat-bottom-strip">
          <div className="cat-bs-left">
            <div className="bs-wa-icon"><WhatsApp size={24} color="#fff" /></div>
            <p>We&apos;ll share the latest <strong className="text-navy">catalogue</strong> directly on your <strong className="text-green">WhatsApp.</strong></p>
          </div>
          <div className="cat-bs-divider" />
          <div className="cat-bs-right">
            <span>Better Equipment.</span>
            <span>Better Care. <span style={{ color: '#208b49' }}>Better Tomorrow.</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
