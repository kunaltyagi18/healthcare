import { Factory, ShieldCheck, Users, Quote, Target, Lightbulb, BadgeCheck, Headphones, Globe } from 'lucide-react';
import { SectionHeading, ReachStrip } from '../components/Shared';
import { qualityPoints, industries } from '../data/siteData';
import { HeroSection } from '../HeroCarousel';
import { solutionCards } from '../data/solutionCards';
import { SolutionCard } from './SolutionsPage';
import FeaturedProducts from '../components/FeaturedProducts';
import usePageTitle from '../utils/usePageTitle';
export default function HomePage({ page, onNavigate }) {
  usePageTitle('Physiotherapy & Rehabilitation Equipment Manufacturer');
  return (
    <>
      <HeroSection activePage={page} onNavigate={onNavigate} />

      <FeaturedProducts onNavigate={onNavigate} />

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
            { icon: <BadgeCheck size={26} />, title: 'Quality You Can Rely On', desc: 'High-grade components, precision engineering and rigorous testing for uncompromised quality.', img: '/slide4_machines.jpg', color: 'blue' },
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

      <section className="section-shell solutions-overview">
        <div className="container" style={{ width: 'min(1740px, calc(100% - 48px))', maxWidth: 'none' }}>
          <SectionHeading title="Solutions for Every Care Space" centered />
          <div className="home-cards-grid" style={{ marginTop: '40px' }}>
            {solutionCards.map((card) => (
              <SolutionCard key={card.id} card={card} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="quality-industries-section">
        <div className="container">
          <div className="quality-industries-block quality-block">
            <SectionHeading
              title="Quality & Certifications"
              description="We follow stringent quality management systems to ensure safety, reliability and performance."
              centered
            />
            <div className="quality-strip" role="list">
              {qualityPoints.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div className="quality-strip-item" key={item.title} role="listitem">
                    <div className="quality-icon"><IconComponent size={36} strokeWidth={1.45} /></div>
                    <h4>{item.title}</h4>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sol-industries-inner" style={{ marginTop: '64px' }}>
            <div className="sol-ind-heading-wrap">
              <span className="sol-eyebrow-line sol-line-dark" />
              <h2 className="sol-ind-heading">INDUSTRIES WE SERVE</h2>
              <span className="sol-eyebrow-line sol-line-dark" />
            </div>
            <div className="sol-ind-underline" />
            <div className="sol-industries-grid">
              {industries.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="sol-industry-item" key={item.title}>
                    <div className="sol-ind-icon">
                      <Icon size={30} strokeWidth={1.5} />
                    </div>
                    <span>{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell testimonial-section">
        <div className="container testimonial-card">
          <div className="testimonial-intro">
            <div className="trust-badge"><Quote size={20} /></div>
            <h3>Trusted by Healthcare Professionals</h3>
            <p>Our equipment is chosen by clinics and institutions that value quality, durability and dependable support.</p>
          </div>
          <div className="quote-copy">
            <Quote size={28} className="quote-mark" />
            <p>"The equipment quality is excellent and has made a real difference in our patient outcomes. Their support and service are truly reliable."</p>
            <strong>- Dr. Mehta</strong>
            <span>Rehabilitation Centre, Pune</span>
          </div>
          <div className="testimonial-visual">
            <img src="/sol_physio.jpg" alt="Physiotherapy clinic" />
          </div>
        </div>
      </section>

      <ReachStrip />
    </>
  );
}
