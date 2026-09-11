import usePageTitle from '../utils/usePageTitle';
import { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { PageIntro } from '../components/Shared';
import { CONTACT } from '../data/siteData';

export default function ContactPage() {
  usePageTitle('Contact Us');
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/tyagikunal1818@gmail.com", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  return (
    <>
      <PageIntro 
        eyebrow="CONTACT US" 
        title="Let's create a better care space." 
        description="Share a few details about your requirement and our team will get back to you with the right next step." 
      />
      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">WE ARE HERE TO HELP</span>
            <h2>Talk to a care space specialist.</h2>
            <p>Have a question about a product, a complete setup or after-sales support? We would be happy to help.</p>
            <div className="contact-cards">
              <div className="contact-line"><span><Phone size={22} strokeWidth={2} /></span><div><b>Call us</b><small>{CONTACT.phone}</small></div></div>
              <a href={CONTACT.emailHref} className="contact-line" style={{textDecoration:'none'}}><span><Mail size={22} strokeWidth={2} /></span><div><b>Email us</b><small>{CONTACT.email}</small></div></a>
              <div className="contact-line"><span><MapPin size={22} strokeWidth={2} /></span><div><b>Visit us</b><small>{CONTACT.address}</small></div></div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Website Enquiry" />
              <input type="hidden" name="_template" value="table" />
              <div className="form-header" style={{ marginBottom: '30px' }}>
                <span className="eyebrow" style={{ color: 'var(--blue)' }}>SEND QUERY</span>
                <h2 style={{ fontSize: '28px', color: 'var(--navy)', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.02em' }}>Contact our team</h2>
              </div>
              <div className="form-row">
                <label>Your name<input name="Name" required placeholder="Enter your name" /></label>
                <label>Phone number<input type="tel" name="Phone" required pattern="[0-9]{10}" maxLength="10" minLength="10" title="Please enter a valid 10-digit phone number" placeholder="10-digit mobile number" /></label>
              </div>
              <label>Work email<input name="Email" type="email" required placeholder="you@company.com" /></label>
              <label>What can we help with?<textarea name="Message" required rows={4} placeholder="Tell us about your space or product requirement" /></label>
              <button type="submit" className="submit-enquiry-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Request received' : 'Send enquiry'} <ArrowRight size={17} />
              </button>
              {status === 'success' && <p className="success-message">Thank you. Our team will be in touch soon.</p>}
              {status === 'error' && <p className="error-message" style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>Something went wrong. Please try again later.</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
