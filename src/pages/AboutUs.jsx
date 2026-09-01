

import {
  Activity,
  BadgeCheck,
  Factory,
  Globe,
  Headphones,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';

export function AboutUs() {
  return (
    <div className="au-page">

      {/* ── SECTION 1: INTRO ── */}
      <section className="au-s1">
        {/* Left: Text */}
        <div className="au-s1-left">
          <div className="au-eyebrow">
            <span>ABOUT US</span>
            <div className="au-eyebrow-line" />
          </div>

          <h1 className="au-s1-heading">
            Empowering Recovery.<br />
            Advancing Care.<br />
            <span className="green">Transforming Lives.</span>
          </h1>
          <div className="au-green-bar" />

          <p className="au-body">
            Shivshakti Healthcare Equipments is a trusted name in the world of physiotherapy and rehabilitation solutions. We design, manufacture and supply a comprehensive range of advanced equipment that supports therapists in delivering effective treatment and helps patients achieve a better quality of life.
          </p>
          <p className="au-body">
            Driven by innovation, built with precision and backed by professional support – we are committed to being your reliable partner in every step of the healing journey.
          </p>

          <div className="au-s1-features">
            {[
              { icon: <Users size={26} strokeWidth={1.5} />, title: 'Complete Therapy Solutions', desc: 'Wide range of equipment for every therapy need under one roof.' },
              { icon: <Factory size={26} strokeWidth={1.5} />, title: 'Modern Manufacturing', desc: 'Advanced infrastructure and stringent quality control at every stage.' },
              { icon: <ShieldCheck size={26} strokeWidth={1.5} />, title: 'Nationwide Delivery', desc: 'Timely delivery and a reliable supply chain across India.' },
              { icon: <Globe size={26} strokeWidth={1.5} />, title: 'Global Reach', desc: 'Trusted by therapists and institutions worldwide.' },
            ].map(f => (
              <div className="au-s1-feat" key={f.title}>
                <div className="au-s1-feat-icon">{f.icon}</div>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="au-s1-right">
          <img src="/about_showroom.jpg" alt="Showroom" />
          <div className="au-s1-watermark">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 2 L36 10 L36 24 C36 31 28 37 20 39 C12 37 4 31 4 24 L4 10 Z" fill="#1a5fa8" />
              <path d="M18 13 L18 27 M13 20 L27 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div>
              <div className="au-wm-brand">SVS</div>
              <strong>SHIVSHAKTI</strong>
              <span>HEALTHCARE EQUIPMENTS</span>
              <small>Precision. Performance. Purpose.</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY CHOOSE US ── */}
      <section className="au-s2">
        {/* Left panel */}
        <div className="au-s2-left">
          <div className="au-s2-left-text">
            <div className="au-eyebrow green-eye">
              <span>WHY CHOOSE US?</span>
              <div className="au-eyebrow-line" />
            </div>
            <h2 className="au-s2-heading">
              Built on Trust.<br />
              Focused on <span className="blue">Results.</span>
            </h2>
            <div className="au-green-bar" />
            <p className="au-body">
              We go beyond products – we deliver solutions that bring real value to your practice and real results for your patients.
            </p>
          </div>
          <div className="au-s2-knee">
            <img src="/about_knee_therapy.jpg" alt="Knee Therapy" />
          </div>
        </div>

        <div className="au-s2-right">
          {[
            { icon: <Target size={26} />, title: 'Therapist-Centric Approach', desc: 'Every product is designed with therapist input to ensure ease of use and better outcomes.', img: '/about_thumb_device.jpg', color: 'blue' },
            { icon: <Lightbulb size={26} />, title: 'Innovation That Heals', desc: 'We continuously innovate to integrate the latest technology with practical therapy needs.', img: '/about_thumb_electro.jpg', color: 'green' },
            { icon: <BadgeCheck size={26} />, title: 'Quality You Can Rely On', desc: 'High-grade components, precision engineering and rigorous testing for uncompromised quality.', img: '/about_thumb_device.jpg', color: 'blue' },
            { icon: <Headphones size={26} />, title: 'Support That Stays With You', desc: 'From product guidance to after-sales service, our team is always ready to help you.', img: '/about_thumb_support.jpg', color: 'green' },
          ].map(r => (
            <div className="au-s2-row" key={r.title}>
              <div className={`au-s2-icon au-s2-icon-${r.color}`}>{r.icon}</div>
              <div className="au-s2-row-text">
                <strong>{r.title}</strong>
                <p>{r.desc}</p>
              </div>
              <div className="au-s2-thumb">
                <img src={r.img} alt={r.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: OUR COMMITMENT ── */}
      <section className="au-s3">
        <div className="container">
          <div className="au-s3-header">
            <div className="au-s3-line" />
            <h2>Our <span className="green">Commitment</span> to You</h2>
            <div className="au-s3-line" />
          </div>
          <div className="au-s3-grid">
            {[
              { icon: <ShieldCheck size={30} />, color: 'navy', title: 'Patient Safety\nFirst', desc: 'Designed for safety, comfort and effective therapy outcomes.' },
              { icon: <Activity size={30} />, color: 'green', title: 'Ethical &\nTransparent', desc: 'Honest practices, clear communication and fair dealings.' },
              { icon: <Users size={30} />, color: 'navy', title: 'Strong Professional\nPartnerships', desc: 'We grow together with therapists, clinics and institutions.' },
              { icon: <Activity size={30} />, color: 'green', title: 'Continuous\nImprovement', desc: 'We listen, learn and evolve to serve you better every day.' },
              { icon: <MapPin size={30} />, color: 'navy', title: 'Proudly\nIndian', desc: 'Designed, developed and manufactured in India.' },
              { icon: <Globe size={30} />, color: 'green', title: 'Trusted\nWorldwide', desc: 'Delivering reliable solutions to clients across the globe.' },
            ].map(c => (
              <div className="au-s3-item" key={c.title}>
                <div className={`au-s3-icon au-icon-${c.color}`}>{c.icon}</div>
                <strong>{c.title.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</strong>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TRUST FOOTER ── */}
      <section className="au-s4">
        <div className="au-s4-img">
          <img src="/about_building.jpg" alt="Shivshakti HQ" />
          <div className="au-s4-overlay">SVS &nbsp; SVS</div>
        </div>
        <div className="au-s4-content">
          <svg className="au-s4-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100,0 C-30,20 -30,80 100,100 Z" fill="#0b1f3a" />
            <path d="M100,0 C-30,20 -30,80 100,100 Z" fill="none" stroke="#208b49" strokeWidth="1" opacity="0.5" />
          </svg>
          <h2>Your Trust. Our Responsibility.</h2>
          <p>Together, we create a healthier tomorrow.</p>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;
