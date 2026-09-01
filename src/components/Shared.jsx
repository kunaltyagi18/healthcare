import React from 'react';
import { ArrowRight } from 'lucide-react';

export function SectionHeading({ eyebrow, title, description, centered = false, light = false }) {
  return (
    <div className={`section-heading${centered ? ' centered' : ''}${light ? ' light' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ReachStrip() {
  return (
    <div className="reach-strip">
      <div className="container">
        <span>Made in India</span><i /><span>Nationwide Reach</span><i /><span>Global Supply</span>
      </div>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, action, onAction }) {
  return (
    <section className="page-intro">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
        {action && (
          <button className="button green" onClick={onAction}>
            {action} <ArrowRight size={17} />
          </button>
        )}
      </div>
    </section>
  );
}
