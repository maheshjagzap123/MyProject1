import React from 'react';
import ApplyForm from '../../components/ApplyForm/ApplyForm';
import { sendModelApplication } from '../../services/emailService';
import './ModelScreening.css';

const MODEL_FIELDS = [
  { name:'name',        label:'Full Name',      required:true,  placeholder:'Your full name' },
  { name:'email',       label:'Email Address',  required:true,  type:'email', placeholder:'you@example.com' },
  { name:'phone',       label:'Mobile Number',  required:true,  type:'tel',   placeholder:'10-digit number' },
  { name:'city',        label:'City',           required:true,  placeholder:'Your city' },
  { name:'age',         label:'Age',            required:true,  type:'number', placeholder:'Age' },
  { name:'height',      label:'Height',         required:true,  placeholder:'e.g. 5\'8"' },
  {
    name:'modelType', label:'Model Type', type:'select', required:true,
    options:['Fresher Model','Experienced Model','Child Model (13-17)'],
  },
  {
    name:'experience', label:'Brief Experience / About You', type:'textarea', required:false,
    placeholder:'Tell us a bit about yourself and any prior modeling experience…', fullRow:true,
  },
];

const PAST_IMAGES = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&q=80',
];

export default function ModelScreening() {
  return (
    <div className="screening-page">
      {/* Banner */}
      <div className="page-banner screening-banner">
        <span className="section-tag">Second Event in the Sequel</span>
        <h1>Model Screening – II</h1>
        <p>For the selection of sedulous freshers & experienced models across the Nation</p>
      </div>

      {/* Info + Form */}
      <section className="section container screening-body">
        <div className="screening-info">
          <span className="section-tag">About the Event</span>
          <h2 className="section-heading">Your Runway to Stardom</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:24 }}>
            Fashion Runway's Model Screening is India's most exciting model hunt. We scout fresh faces and experienced models from across the country to walk the ramp at Designer Verse '26 — our grand mega fashion show.
          </p>

          <div className="screening-detail-cards">
            {[
              { icon:'📅', label:'Date', val:'10 August 2026' },
              { icon:'📍', label:'Cities', val:'Delhi · Mumbai · Chandigarh' },
              { icon:'👗', label:'Who Can Apply', val:'Freshers & Experienced (age 15+)' },
              { icon:'🏆', label:'Benefit', val:'Walk at Designer Verse \'26 Mega Show' },
            ].map(d => (
              <div key={d.label} className="screening-detail-card">
                <span className="screening-detail-card__icon">{d.icon}</span>
                <div>
                  <span className="screening-detail-card__label">{d.label}</span>
                  <span className="screening-detail-card__val">{d.val}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop:32, marginBottom:16 }}>What to Expect</h3>
          <ul className="screening-list">
            {[
              'Multi-city audition rounds',
              'Professional judges from the fashion industry',
              'Selected models walk at the Mega Show',
              'Runway training & grooming sessions',
              'Featured in Fashion Runway media coverage',
              'Portfolio opportunity post selection',
            ].map(i => <li key={i}><span className="text-gold">✦</span>{i}</li>)}
          </ul>
        </div>

        <div>
          <ApplyForm
            title="Apply for Model Screening"
            fields={MODEL_FIELDS}
            onSubmit={sendModelApplication}
            appliedFor="Model Screening – II"
          />
        </div>
      </section>

      {/* Past Screening Gallery */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom:40 }}>
            <span className="section-tag">Past Events</span>
            <h2 className="section-heading">Successfully Completed Model Screening – I</h2>
            <span className="gold-divider center" />
            <p className="section-sub">Glimpses of our successfully completed events</p>
          </div>
          <div className="gallery-grid">
            {PAST_IMAGES.map((img, i) => (
              <img key={i} src={img} alt={`Screening ${i+1}`} loading="lazy" className={i === 0 ? 'span-2' : ''} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
