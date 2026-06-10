import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { eventInfo } from '../../data/siteData';
import './Contact.css';

export default function Contact() {
  const [form,   setForm]   = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name:'', email:'', phone:'', subject:'', message:'' });
  };

  return (
    <div className="contact-page">
      <div className="page-banner contact-banner">
        <span className="section-tag">Reach Out</span>
        <h1>Contact Us</h1>
        <p>Questions about registration, categories, or the event? We are here to help.</p>
      </div>

      <section className="section container contact-body">
        {/* Left */}
        <div className="contact-left">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-heading">We'd Love to<br />Hear From You</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.85, marginBottom:28 }}>
            Whether you are a contestant, parent, sponsor, or media partner — our team is ready to assist you within 24 hours.
          </p>

          <div className="contact-info-list">
            {[
              { icon:'📞', label:'Phone',         val: eventInfo.phone,  href: `tel:${eventInfo.phone}` },
              { icon:'✉️', label:'Email',         val: eventInfo.email,  href: `mailto:${eventInfo.email}` },
              { icon:'📍', label:'Venue',         val: `${eventInfo.venue}, ${eventInfo.city}` },
              { icon:'⏰', label:'Office Hours',  val: 'Mon – Sat, 10 AM to 7 PM IST' },
            ].map(c => (
              <div key={c.label} className="contact-info-item">
                <div className="contact-info-item__icon">{c.icon}</div>
                <div>
                  <span className="contact-info-item__label">{c.label}</span>
                  {c.href
                    ? <a href={c.href} className="contact-info-item__val contact-info-item__val--link">{c.val}</a>
                    : <span className="contact-info-item__val">{c.val}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="contact-whatsapp">
            <a
              href={`https://wa.me/${eventInfo.whatsapp}?text=Hi%2C%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(eventInfo.name)}`}
              target="_blank" rel="noreferrer"
              className="btn contact-wa-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <Link to="/register" className="btn btn-gold">Register Now ✦</Link>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          <h3>Send a Message</h3>
          <span className="gold-divider" />

          {status === 'success' && (
            <div className="form-alert form-alert-success">
              ✅ Thank you! We have received your message and will respond within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Optional" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select subject</option>
                  <option>Registration Query</option>
                  <option>Payment Issue</option>
                  <option>Category Information</option>
                  <option>Sponsorship / Partnership</option>
                  <option>Media Enquiry</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Write your message here…" required />
            </div>
            <button type="submit" className="btn btn-gold" style={{ width:'100%', padding:'15px' }} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
