import {
  Award,
  Diamond,
  Eye,
  Gem,
  Globe,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

/* ── DATA ── */
const certs = [
  {
    num: '01',
    badge: 'ISO',
    badgeStyle: 'iso-blue',
    title: 'ISO 9001:2015',
    sub: 'Quality Management System',
    desc: 'Reflects our dedication to continuous improvement and customer satisfaction.',
    link: '/certifications/SHIVSHAKTI HEALTHCARE EQUIPMENTS (1).pdf',
  },
  {
    num: '02',
    badge: 'ISO',
    badgeStyle: 'iso-blue',
    title: 'ISO 13485:2016',
    sub: 'Quality Management System for Medical Devices',
    desc: 'Ensures consistent quality and safety in every product and process.',
    link: '/certifications/ISO_13485_2016_Certificate.pdf',
  },
  {
    num: '03',
    badge: 'ISO',
    badgeStyle: 'iso-blue',
    title: 'ISO 14001:2015',
    sub: 'Environmental Management System',
    desc: 'We follow responsible practices to protect the environment and build a sustainable future.',
    link: '/certifications/ISO_14001_2015_Certificate.pdf',
  },
  {
    num: '04',
    badge: 'ISO',
    badgeStyle: 'iso-blue',
    title: 'ISO 45001:2018',
    sub: 'Occupational Health & Safety Management Systems',
    desc: 'Certifies our commitment to a safe and healthy working environment for our workforce.',
    link: '/certifications/ISO_45001_2018_Certificate.pdf',
  },
  {
    num: '05',
    badge: 'GMP',
    badgeStyle: 'gmp',
    title: 'GMP Certified',
    sub: 'Good Manufacturing Practices',
    desc: 'Certified for following Good Manufacturing Practices across our full range of therapy and medical equipment.',
    link: '/certifications/GMP_Certificate.pdf',
  },
  {
    num: '06',
    badge: 'FDA',
    badgeStyle: 'fda',
    title: 'FDA Compliance',
    sub: 'FDA Regulatory Guideline for Food and Drug Administration',
    desc: 'Assessed and certified for manufacturing, supply, import and export of physiotherapy equipment.',
    link: '/certifications/FDA SHIVSHAKTI HEALTHCARE EQUIPMENTS.pdf',
  },
  {
    num: '07',
    badge: 'CE',
    badgeStyle: 'ce',
    title: 'CE Certification',
    sub: 'European Conformity',
    desc: 'Meets essential European safety, health and environmental requirements.',
    link: '/certifications/CE_CERTIFICATE_ANNEXURE_UP_TO_1009_NO_ACCO.pdf',
  },
  {
    num: '08',
    badge: 'IEC',
    badgeStyle: 'iec',
    title: 'IEC 60601-1:2015',
    sub: 'Medical Electrical Equipment Safety Standard',
    desc: 'Confirms our products meet essential international safety and performance requirements.',
    link: '/certifications/IEC_60601-1_2015_Certificate.pdf',
  },
  {
    num: '09',
    badge: 'GST',
    badgeStyle: 'gst',
    title: 'GST Registered',
    sub: 'Government of India — GST REG-06',
    desc: 'Officially registered under the Goods and Services Tax Act, 2017.',
    link: '/certifications/GST Registration Certificate.pdf',
  },
  {
    num: '10',
    badge: 'MSME',
    badgeStyle: 'msme',
    title: 'MSME Registered',
    sub: 'Government of India',
    desc: 'Recognized by the Ministry of MSME for our contribution to the growth of Indian manufacturing.',
    link: '/certifications/MSME SHIVSHAKTI NEW.pdf',
  },
  {
    num: '11',
    badge: 'IEC',
    badgeStyle: 'iec',
    title: 'IEC Certificate',
    sub: 'Import Export Certificate',
    desc: 'Certified by the Government of India for Import and Export.',
    link: '/certifications/OEWPS3977E.pdf',
  }
];


const commitments = [
  {
    icon: <Gem size={28} />,
    color: 'navy',
    title: 'Precision by Design',
    desc: 'Every product is thoughtfully engineered for consistent performance and reliable clinical outcomes.',
  },
  {
    icon: <ShieldCheck size={28} />,
    color: 'green',
    title: 'Safety at Every Step',
    desc: 'Rigorous quality checks and strict standards ensure maximum safety for therapists and patients.',
  },
  {
    icon: <Lightbulb size={28} />,
    color: 'navy',
    title: 'Innovation with Purpose',
    desc: 'We invest in innovation to create advanced, effective and user-friendly therapy solutions.',
  },
  {
    icon: <Leaf size={28} />,
    color: 'green',
    title: 'Responsible Practices',
    desc: 'Ethical practices and sustainable operations are at the core of everything we do for a better tomorrow.',
  },
  {
    icon: <Handshake size={28} />,
    color: 'navy',
    title: 'Partnership that Lasts',
    desc: 'Building long-term partnerships through trust, transparency and dependable support at every stage.',
  },
];

/* ── SUB-COMPONENTS ── */

export function CertBadge({ badge, style }) {
  if (style === 'iso-blue') {
    return (
      <div className="qc-cert-logo qc-iso">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e4b85" strokeWidth="3" />
          <path d="M50 5 C75 5 90 25 90 50 C90 75 75 95 50 95 C25 95 10 75 10 50 C10 25 25 5 50 5 Z" fill="none" stroke="#1e4b85" strokeWidth="2" opacity="0.4" />
          <path d="M5 50 L95 50 M15 25 L85 25 M15 75 L85 75" fill="none" stroke="#1e4b85" strokeWidth="2" opacity="0.4" />
          <path d="M35 10 C35 10 20 25 20 50 C20 75 35 90 35 90 M65 10 C65 10 80 25 80 50 C80 75 65 90 65 90" fill="none" stroke="#1e4b85" strokeWidth="2" opacity="0.4" />
          <text x="50" y="65" fontSize="42" fontWeight="900" fill="#1e4b85" textAnchor="middle" letterSpacing="2">ISO</text>
        </svg>
      </div>
    );
  }
  if (style === 'ce') {
    return (
      <div className="qc-cert-logo qc-ce">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <path d="M45 25 A 25 25 0 0 0 45 75 M90 25 A 25 25 0 0 0 90 75" fill="none" stroke="#101828" strokeWidth="8" />
          <path d="M65 50 L85 50" fill="none" stroke="#101828" strokeWidth="8" />
        </svg>
      </div>
    );
  }
  if (style === 'msme') {
    return (
      <div className="qc-cert-logo qc-msme">
        <svg viewBox="0 0 100 100" width="70" height="70">
          <path d="M50 15 L80 30 L80 60 C80 80 65 90 50 95 C35 90 20 80 20 60 L20 30 Z" fill="none" stroke="#101828" strokeWidth="5" />
          <circle cx="50" cy="45" r="12" fill="none" stroke="#101828" strokeWidth="4" />
          <path d="M35 75 C45 65 55 65 65 75" fill="none" stroke="#101828" strokeWidth="4" />
        </svg>
        <div className="qc-msme-text">MSME</div>
      </div>
    );
  }
  if (style === 'gmp') {
    return (
      <div className="qc-cert-logo qc-gmp">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#7c3aed" strokeWidth="3" />
          <path d="M30 45 L50 65 L70 30" fill="none" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="qc-msme-text" style={{color: '#7c3aed'}}>GMP</div>
      </div>
    );
  }
  if (style === 'fda') {
    return (
      <div className="qc-cert-logo qc-fda">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <rect x="10" y="30" width="80" height="40" rx="8" fill="none" stroke="#d4281e" strokeWidth="5" />
          <text x="50" y="58" fontSize="32" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fill="#d4281e" textAnchor="middle" letterSpacing="0">FDA</text>
        </svg>
      </div>
    );
  }
  if (style === 'iec') {
    return (
      <div className="qc-cert-logo qc-iec">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#0e7490" strokeWidth="3" strokeDasharray="10 5" />
          <text x="50" y="60" fontSize="28" fontWeight="900" fill="#0e7490" textAnchor="middle" letterSpacing="1">IEC</text>
        </svg>
      </div>
    );
  }
  if (style === 'gst') {
    return (
      <div className="qc-cert-logo qc-gst">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="#b45309" strokeWidth="4" />
          <text x="50" y="58" fontSize="24" fontWeight="900" fill="#b45309" textAnchor="middle">GST</text>
        </svg>
      </div>
    );
  }
  if (style === 'mii') {
    return (
      <div className="qc-cert-logo qc-mii">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <path d="M20 50 Q40 40 50 30 T80 50 T50 70 T20 50 Z" fill="none" stroke="#101828" strokeWidth="4" />
          <circle cx="50" cy="50" r="5" fill="#101828" />
          <path d="M40 55 L60 55" stroke="#101828" strokeWidth="3" />
        </svg>
        <div className="qc-mii-text">MAKE IN INDIA</div>
      </div>
    );
  }
  return null;
}

export function CertificationGrid({ data }) {
  const renderCard = (c) => {
    const CardElement = c.link ? 'a' : 'div';
    const cardProps = c.link
      ? { href: c.link, target: "_blank", rel: "noopener noreferrer", className: `qc-cert-card qc-card-${c.badgeStyle} clickable-card` }
      : { className: `qc-cert-card qc-card-${c.badgeStyle}` };
    return (
      <CardElement key={c.num} {...cardProps}>
        <CertBadge badge={c.badge} style={c.badgeStyle} />
        <strong className="qc-cert-title">{c.title}</strong>
        <span className="qc-cert-sub">{c.sub}</span>
        <p className="qc-cert-desc">{c.desc}</p>
        {c.link && (
          <div className="qc-view-cert">
            <Eye size={14} strokeWidth={2} /> <span>View Certificate</span>
          </div>
        )}
        <div className="qc-num-badge">{c.num}</div>
      </CardElement>
    );
  };

  return (
    <div className="qc-cert-wrapper">
      <div className="qc-cert-grid">
        {data.map(renderCard)}
      </div>
    </div>
  );
}


export function CommitmentRow({ data }) {
  return (
    <div className="qc-commit-row">
      {data.map((c) => (
        <div className="qc-commit-item" key={c.title}>
          <div className={`qc-commit-icon qc-icon-${c.color}`}>{c.icon}</div>
          <strong>{c.title}</strong>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function CertificationsHero() {
  return (
    <section className="qc-hero">
      <div className="qc-hero-bg">
        <img src="/about_showroom.jpg" alt="Physiotherapy Showroom" />
      </div>
      <div className="qc-hero-curve"></div>

      <div className="qc-hero-content">
        {/* Left */}
        <div className="qc-hero-left">
          {/* Logo block */}
          <div className="qc-logo-block">
            <div style={{ height: '80px', overflow: 'hidden', marginTop: '-5px' }}>
              <img src="/logo.png" alt="SVS Logo" style={{ height: '145px', width: 'auto', objectFit: 'contain', display: 'block', clipPath: 'inset(5px 0 0 0)' }} />
            </div>
            <div>
              <strong>SHIVSHAKTI</strong>
              <span>HEALTHCARE EQUIPMENTS</span>
              <small>Technology for Therapy. Care for Life.</small>
            </div>
          </div>

          {/* Trust rows */}
          <div className="qc-trust-rows">
            <div className="qc-trust-row">
              <div className="qc-tr-badge navy"><Handshake size={22} strokeWidth={1.5} /></div>
              <div className="qc-tr-text">
                <b className="qc-tr-big">TRUST</b>
                <b className="qc-tr-sub">THAT GROWS WITH QUALITY.</b>
              </div>
            </div>
            <div className="qc-diamond-sep"><span>◆</span></div>
            <div className="qc-trust-row">
              <div className="qc-tr-badge green"><Award size={22} strokeWidth={1.5} /></div>
              <div className="qc-tr-text">
                <b className="qc-tr-big">QUALITY</b>
                <b className="qc-tr-sub">THAT STANDS WITH CARE.</b>
              </div>
            </div>
            <div className="qc-diamond-sep"><span>◆</span></div>
            <div className="qc-trust-row">
              <div className="qc-tr-badge navy"><HeartHandshake size={22} strokeWidth={1.5} /></div>
              <div className="qc-tr-text">
                <b className="qc-tr-big">CARE</b>
                <b className="qc-tr-sub">THAT MAKES A DIFFERENCE.</b>
              </div>
            </div>
          </div>

          {/* Paragraphs */}
          <p className="qc-hero-p">Our certifications reflect our unwavering commitment to quality, patient safety, responsible manufacturing and continuous innovation.</p>
          <p className="qc-hero-p bold">Every solution we deliver is supported by standards you can depend on, every time.</p>

          {/* Banner strip */}
          <div className="qc-banner-strip">
            {[
              { icon: <Globe size={24} />, line1: 'Globally Accredited', line2: 'Standards' },
              { icon: <Award size={24} />, line1: 'Consistent Quality', line2: 'Assurance' },
              { icon: <ShieldCheck size={24} />, line1: 'Reliable Performance', line2: 'You Can Count On' },
              { icon: <Users size={24} />, line1: 'Trusted by Healthcare', line2: 'Professionals' },
            ].map((item, i) => (
              <div className="qc-strip-item" key={i}>
                <div className="qc-strip-icon">{item.icon}</div>
                <span>{item.line1}<br />{item.line2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: text overlay */}
        <div className="qc-hero-right">
          <div className="qc-img-overlay">
            <p>Empowering Recovery.</p>
            <p className="qc-text-green">Enriching Lives.</p>
            <div className="qc-img-diamond-sep"><span>◆</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BottomBanner() {
  return (
    <section className="qc-bottom">
      <div className="qc-bottom-inner">
        {/* Gold emblem */}
        <div className="qc-emblem">
          <div className="qc-emblem-laurel" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="gold3d" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde08b" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#aa7c11" />
                </linearGradient>

                <path id="leafL" d="M 0 0 C -5 -3 -7 -10 -2 -14 C 2 -8 4 -3 0 0 Z" fill="url(#gold3d)" />
                <path id="leafR" d="M 0 0 C 5 -3 7 -10 2 -14 C -2 -8 -4 -3 0 0 Z" fill="url(#gold3d)" />
              </defs>
              {/* Bottom Stand / Plate */}
              <ellipse cx="50" cy="96" rx="40" ry="7" fill="#081220" stroke="url(#gold3d)" strokeWidth="1.5" />
              <ellipse cx="50" cy="96" rx="34" ry="4" fill="none" stroke="url(#gold3d)" strokeWidth="0.75" opacity="0.6" />

              {/* Stems connected at the bottom */}
              <g transform="translate(50, 95) scale(1.35, 1.05) translate(-50, -95)">
                <path d="M 50 95 C 10 95 0 50 15 15" fill="none" stroke="url(#gold3d)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 50 95 C 90 95 100 50 85 15" fill="none" stroke="url(#gold3d)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Left Branch Leaves */}
                <use href="#leafL" x="35" y="91" transform="rotate(-70 35 91)" />
                <use href="#leafR" x="35" y="91" transform="rotate(-50 35 91)" />

                <use href="#leafL" x="19" y="77" transform="rotate(-40 19 77)" />
                <use href="#leafR" x="19" y="77" transform="rotate(-20 19 77)" />

                <use href="#leafL" x="10" y="60" transform="rotate(-10 10 60)" />
                <use href="#leafR" x="10" y="60" transform="rotate(10 10 60)" />

                <use href="#leafL" x="8" y="42" transform="rotate(10 8 42)" />
                <use href="#leafR" x="8" y="42" transform="rotate(30 8 42)" />

                <use href="#leafL" x="12" y="24" transform="rotate(30 12 24)" />
                <use href="#leafR" x="12" y="24" transform="rotate(50 12 24)" />

                {/* Right Branch Leaves */}
                <use href="#leafR" x="65" y="91" transform="rotate(70 65 91)" />
                <use href="#leafL" x="65" y="91" transform="rotate(50 65 91)" />

                <use href="#leafR" x="81" y="77" transform="rotate(40 81 77)" />
                <use href="#leafL" x="81" y="77" transform="rotate(20 81 77)" />

                <use href="#leafR" x="90" y="60" transform="rotate(10 90 60)" />
                <use href="#leafL" x="90" y="60" transform="rotate(-10 90 60)" />

                <use href="#leafR" x="92" y="42" transform="rotate(-10 92 42)" />
                <use href="#leafL" x="92" y="42" transform="rotate(-30 92 42)" />

                <use href="#leafR" x="88" y="24" transform="rotate(-30 88 24)" />
                <use href="#leafL" x="88" y="24" transform="rotate(-50 88 24)" />
              </g>

              {/* Shield Main */}
              <path d="M50 10 L80 16 L80 52 C80 75 50 90 50 90 C50 90 20 75 20 52 L20 16 Z" fill="#081020" stroke="url(#gold3d)" strokeWidth="7" strokeLinejoin="round" />
              <path d="M50 15 L76 20 L76 51 C76 70 50 84 50 84 C50 84 24 70 24 51 L24 20 Z" fill="none" stroke="url(#gold3d)" strokeWidth="1" opacity="0.6" />
              
              {/* Inner Text & Cross */}
              <path d="M50 33 L50 43 M45 38 L55 38" stroke="url(#gold3d)" strokeWidth="3" />
              <text x="50" y="62" fontSize="18" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fill="url(#gold3d)" textAnchor="middle" letterSpacing="0">SVS</text>
            </svg>
          </div>
        </div>

        {/* Heading + text */}
        <div className="qc-bottom-text">
          <h2>
            STANDARDS WE UPHOLD.<br />
            QUALITY WE DELIVER.<br />
            CONFIDENCE YOU DESERVE.
          </h2>
          <p>Our certifications represent more than approvals — they reflect our promise of safe, effective and reliable therapy solutions, every single day.</p>
        </div>

        {/* 2×2 grid */}
        <div className="qc-bottom-grid">
          {[
            { icon: <ShieldCheck size={22} />, label: 'Tested for Safety' },
            { icon: <Settings size={22} />, label: 'Engineered for Performance' },
            { icon: <Users size={22} />, label: 'Trusted by Professionals' },
            { icon: <HeartPulse size={22} />, label: 'Focused on Better Outcomes' },
          ].map((g) => (
            <div className="qc-bottom-g-item" key={g.label}>
              <div className="qc-bg-icon">{g.icon}</div>
              <span>{g.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact strip */}
      <div className="qc-contact-strip">
        <div className="qc-contact-item">
          <Phone size={16} />
          <span>+91 96540 30003</span>
        </div>
        <div className="qc-contact-divider" />
        <div className="qc-contact-item">
          <Mail size={16} />
          <span>info@shivshaktihealthcare.in</span>
        </div>
        <div className="qc-contact-divider" />
        <div className="qc-contact-item">
          <Globe size={16} />
          <span>www.shivshaktihealthcare.in</span>
        </div>
        <div className="qc-contact-divider" />
        <div className="qc-contact-item">
          <MapPin size={16} />
          <span>New Delhi, India</span>
        </div>
      </div>
    </section>
  );
}

function SectionDivider({ text }) {
  return (
    <div className="qc-section-divider">
      <div className="qc-div-line" />
      <span className="qc-div-diamond">◆</span>
      <h2 className="qc-div-heading">{text}</h2>
      <span className="qc-div-diamond">◆</span>
      <div className="qc-div-line" />
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function QualityPage() {
  return (
    <div className="qc-page">
      {/* Section 1 */}
      <CertificationsHero />

      {/* Section 2 */}
      <SectionDivider text="CERTIFIED STANDARDS. TRUST YOU CAN RELY ON." />

      {/* Section 3 */}
      <div className="qc-cert-section container">
        <CertificationGrid data={certs} />
      </div>

      {/* Section 4 */}
      <SectionDivider text="OUR COMMITMENT. YOUR CONFIDENCE." />

      {/* Section 5 */}
      <div className="qc-commit-section container">
        <CommitmentRow data={commitments} />
      </div>

      {/* Section 6 */}
      <BottomBanner />
    </div>
  );
}
