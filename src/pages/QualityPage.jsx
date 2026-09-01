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
    badge: 'FDA',
    badgeStyle: 'fda',
    title: 'FDA Compliance',
    sub: 'FDA Regulatory Guideline for Food and Drug Administration',
    desc: 'Assessed and certified for manufacturing, supply, import and export of physiotherapy, rehabilitation, occupational, surgical, fitness and beauty care equipment.',
    link: '/certifications/FDA SHIVSHAKTI HEALTHCARE EQUIPMENTS.pdf',
  },
  {
    num: '02',
    badge: 'GMP',
    badgeStyle: 'gmp',
    title: 'GMP Certified',
    sub: 'Good Manufacturing Practices',
    desc: 'Certified for following Good Manufacturing Practices across our full range of therapy and medical equipment.',
    link: '/certifications/GMP_Certificate.pdf',
  },
  {
    num: '03',
    badge: 'ISO',
    badgeStyle: 'iso-blue',
    title: 'ISO 13485:2016',
    sub: 'Medical Devices — Quality Management Systems',
    desc: 'Ensures consistent quality and safety in the design, manufacture and supply of medical devices.',
    link: '/certifications/ISO_13485_2016_Certificate.pdf',
  },
  {
    num: '04',
    badge: 'ISO',
    badgeStyle: 'iso-green',
    title: 'ISO 14001:2015',
    sub: 'Environmental Management Systems',
    desc: 'Reflects our commitment to responsible, environmentally sustainable manufacturing practices.',
    link: '/certifications/ISO_14001_2015_Certificate.pdf',
  },
  {
    num: '05',
    badge: 'ISO',
    badgeStyle: 'iso-teal',
    title: 'ISO 45001:2018',
    sub: 'Occupational Health & Safety Management Systems',
    desc: 'Certifies our commitment to a safe and healthy working environment for our workforce.',
    link: '/certifications/ISO_45001_2018_Certificate.pdf',
  },
  {
    num: '06',
    badge: 'IEC',
    badgeStyle: 'iec',
    title: 'IEC 60601-1:2015',
    sub: 'Medical Electrical Equipment Safety Standard',
    desc: 'Confirms our products meet essential international safety and performance requirements for medical electrical equipment.',
    link: '/certifications/IEC_60601-1_2015_Certificate.pdf',
  },
  {
    num: '07',
    badge: '🏛',
    badgeStyle: 'msme',
    title: 'MSME / Udyam Registered',
    sub: 'Government of India — Ministry of MSME',
    desc: 'Registered under the Udyam scheme, recognized by the Government of India as a Micro enterprise in manufacturing.',
    link: '/certifications/MSME SHIVSHAKTI NEW.pdf',
  },
  {
    num: '08',
    badge: 'GST',
    badgeStyle: 'gst',
    title: 'GST Registered',
    sub: 'Government of India — GST REG-06',
    desc: 'Officially registered under the Goods and Services Tax Act, 2017.',
    link: '/certifications/GST Registration Certificate.pdf',
  },
  {
    num: '09',
    badge: 'CE',
    badgeStyle: 'ce',
    title: 'CE Certification',
    sub: 'European Conformity — Annexure up to 1009',
    desc: 'Certified to meet essential European safety, health and environmental protection requirements for medical equipment.',
    link: '/certifications/CE_CERTIFICATE_ANNEXURE_UP_TO_1009_NO_ACCO.pdf',
  },
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

function CertBadge({ badge, style }) {
  if (style === 'iso-blue') {
    return (
      <div className="qc-cert-logo qc-iso-blue">
        <span>ISO</span>
        <div className="qc-iso-inner">CERTIFIED</div>
      </div>
    );
  }
  if (style === 'iso-green') {
    return (
      <div className="qc-cert-logo qc-iso-green">
        <span>ISO</span>
        <div className="qc-iso-inner">CERTIFIED</div>
      </div>
    );
  }
  if (style === 'iso-teal') {
    return (
      <div className="qc-cert-logo qc-iso-teal">
        <span>ISO</span>
        <div className="qc-iso-inner">CERTIFIED</div>
      </div>
    );
  }
  if (style === 'fda') {
    return (
      <div className="qc-cert-logo qc-fda">
        <span>FDA</span>
      </div>
    );
  }
  if (style === 'gmp') {
    return (
      <div className="qc-cert-logo qc-gmp">
        <span>GMP</span>
      </div>
    );
  }
  if (style === 'iec') {
    return (
      <div className="qc-cert-logo qc-iec">
        <span>IEC</span>
      </div>
    );
  }
  if (style === 'gst') {
    return (
      <div className="qc-cert-logo qc-gst">
        <span>GST</span>
      </div>
    );
  }
  if (style === 'ce') {
    return (
      <div className="qc-cert-logo qc-ce">
        <span>CE</span>
      </div>
    );
  }
  if (style === 'msme') {
    return (
      <div className="qc-cert-logo qc-msme">
        <span style={{ fontSize: 28 }}>🏛</span>
        <small>MSME</small>
      </div>
    );
  }
  return null;
}

export function CertificationGrid({ data }) {
  const topRow = data.slice(0, 5);
  const bottomRow = data.slice(5);

  const renderCard = (c) => {
    const CardElement = c.link ? 'a' : 'div';
    const cardProps = c.link
      ? { href: c.link, target: "_blank", rel: "noopener noreferrer", className: "qc-cert-card clickable-card" }
      : { className: "qc-cert-card" };
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
      <div className="qc-cert-grid qc-cert-grid--5">{topRow.map(renderCard)}</div>
      <div className="qc-cert-grid qc-cert-grid--4">{bottomRow.map(renderCard)}</div>
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
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
              <path d="M20 2 L36 10 L36 24 C36 31 28 37 20 39 C12 37 4 31 4 24 L4 10 Z" fill="#0f2a52" />
              <path d="M18 13 L18 27 M13 20 L27 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
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
          <div className="qc-emblem-laurel">
            <svg width="80" height="90" viewBox="0 0 80 90" fill="none">
              <ellipse cx="40" cy="45" rx="38" ry="43" fill="none" stroke="#c9962e" strokeWidth="2.5" />
              <path d="M12 68 Q40 80 68 68" stroke="#c9962e" strokeWidth="2" fill="none" />
              <path d="M8 55 Q10 40 15 28 Q20 16 30 10" stroke="#c9962e" strokeWidth="1.5" fill="none" />
              <path d="M72 55 Q70 40 65 28 Q60 16 50 10" stroke="#c9962e" strokeWidth="1.5" fill="none" />
              {/* Shield cross */}
              <path d="M40 20 L50 25 L50 36 C50 41 45 45 40 47 C35 45 30 41 30 36 L30 25 Z" fill="#c9962e" />
              <path d="M38 27 L38 40 M34 33 L46 33" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="qc-emblem-label">SVS</div>
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
