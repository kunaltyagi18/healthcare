import React from 'react';
import { ChevronRight, Factory, ShieldCheck, Users, ArrowRight, Quote } from 'lucide-react';
import { SectionHeading, ReachStrip } from '../components/Shared';
import { categories, reasons, solutions, qualityPoints, industries } from '../data/siteData';
import { HeroSection } from '../HeroCarousel';

export default function HomePage({ page, onNavigate }) {
  const navigate = (p) => {
    if(onNavigate) onNavigate(p);
  };

  return (
    <>
      <HeroSection activePage={page} onNavigate={onNavigate} />

      <section className="section-shell category-section">
        <div className="container">
          <SectionHeading title="Our Product Categories" centered />
          <div className="category-grid">
            {categories.slice(0, 8).map((item) => (
              <button className="category-card" key={item.title} onClick={() => navigate('products')}>
                <div className="cat-img-wrap">
                  <img src={item.img} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <span className="text-link">View Products <ChevronRight size={14} /></span>
              </button>
            ))}
          </div>
          <div className="view-all-wrap">
            <button className="view-all-btn" onClick={() => navigate('products')}>
              View All Categories <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      <section className="section-shell about-preview">
        <div className="container split-grid">
          <div className="about-img-wrap">
            <img src="/about_building.jpg" alt="Shivshakti Healthcare Equipments building" />
          </div>
          <div className="about-copy">
            <SectionHeading eyebrow="About Us" title="SHIVSHAKTI HEALTHCARE EQUIPMENTS" description="SHIVSHAKTI HEALTHCARE EQUIPMENTS is a trusted name in the manufacturing and supply of high-quality physiotherapy, rehabilitation, occupational therapy, sensory and medical equipment." />
            <p className="body-copy">With a strong focus on innovation, quality and customer satisfaction, we design equipment that enhances clinical outcomes and improves quality of life.</p>
            <div className="mini-points">
              <span><Factory size={24} /><b>Modern Manufacturing</b><small>State-of-the-art facilities with precision engineering</small></span>
              <span><ShieldCheck size={24} /><b>Quality Focused</b><small>Robust quality control at every stage of production</small></span>
              <span><Users size={24} /><b>Customer Centric</b><small>Reliable solutions tailored to your needs</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell why-choose-section">
        <div className="container">
          <SectionHeading title="Why Choose Us" centered />
          <div className="why-strip">
            {reasons.map((item) => {
              const IconComponent = item.icon;
              return (
                <div className="why-strip-item" key={item.title}>
                  <div className="why-strip-icon" style={{ color: item.color }}>
                    <IconComponent size={52} strokeWidth={1.5} />
                  </div>
                  <div className="why-strip-text">
                    <h4 style={{ color: item.color }}>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <SectionHeading title="Solutions for Every Care Space" centered />
          <div className="solutions-grid">
            {solutions.map((item) => (
              <button
                className="solution-card"
                key={item.title}
                onClick={() => navigate('solutions')}
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="sol-overlay" />
                <div className="sol-content">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                </div>
                <b><ArrowRight size={18} /></b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell split-quality-section">
        <div className="container">
          <SectionHeading title="Quality & Certifications" centered description="We follow stringent quality management systems to ensure safety, reliability and performance." />
          <div className="quality-strip">
            {qualityPoints.map((item) => {
              const IconComponent = item.icon;
              return (
                <div className="quality-strip-item" key={item.title}>
                  <div className="quality-icon"><IconComponent size={36} strokeWidth={1.5} /></div>
                  <h4>{item.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell split-industry-section">
        <div className="container">
          <SectionHeading title="Industries We Serve" centered />
          <div className="industry-strip">
            {industries.map((item) => {
              const IconComponent = item.icon;
              return (
                <div className="industry-strip-item" key={item.title}>
                  <div className="industry-icon"><IconComponent size={36} strokeWidth={1.5} /></div>
                  <h4>{item.title}</h4>
                </div>
              );
            })}
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
