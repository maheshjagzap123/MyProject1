import React from 'react';
import ApplyForm from '../../components/ApplyForm/ApplyForm';
import { sendWorkshopRegistration } from '../../services/emailService';
import { workshopDetails } from '../../data/siteData';
import './Workshop.css';

const WORKSHOP_FIELDS = [
  { name:'name',            label:'Full Name',        required:true,  placeholder:'Your full name' },
  { name:'email',           label:'Email Address',    required:true,  type:'email', placeholder:'you@example.com' },
  { name:'phone',           label:'Mobile Number',    required:true,  type:'tel',   placeholder:'10-digit number' },
  { name:'city',            label:'City',             required:true,  placeholder:'Your city' },
  { name:'age',             label:'Age',              required:true,  type:'number', placeholder:'Your age' },
  {
    name:'workshopType', label:'Workshop Interest', type:'select', required:true,
    options:['Runway Walk Training','Posing & Photoshoot','Full Modeling Workshop','Online Session'],
  },
  {
    name:'experienceLevel', label:'Experience Level', type:'select', required:true,
    options:['Absolute Beginner','Some Experience','Professional – Refresher'],
  },
];

export default function Workshop() {
  return (
    <div className="workshop-page">
      <div className="page-banner workshop-banner">
        <span className="section-tag">Join Us</span>
        <h1>Modeling Workshop</h1>
        <p>Explore and elevate your modeling potential with our exclusive workshops</p>
      </div>

      {/* About */}
      <section className="section container workshop-body">
        <div className="workshop-info">
          <span className="section-tag">About the Workshop</span>
          <h2 className="section-heading">Upcoming Fashion<br />Modeling Workshop</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:24 }}>
            {workshopDetails.title} — designed to refine your skills, boost your confidence, and prepare you for the runway and beyond. Coached by industry experts with 10+ years on the ramp.
          </p>

          <div className="workshop-meta-row">
            <div className="workshop-meta-item">
              <span className="workshop-meta-label">Date</span>
              <span className="workshop-meta-val">{workshopDetails.date}</span>
            </div>
            <div className="workshop-meta-item">
              <span className="workshop-meta-label">Age Group</span>
              <span className="workshop-meta-val">{workshopDetails.ageGroup}</span>
            </div>
            <div className="workshop-meta-item">
              <span className="workshop-meta-label">Mode</span>
              <span className="workshop-meta-val">{workshopDetails.mode}</span>
            </div>
          </div>

          <h3>Topics Covered</h3>
          <div className="workshop-topics">
            {workshopDetails.topics.map(t => (
              <span key={t} className="workshop-topic-chip">✦ {t}</span>
            ))}
          </div>

          <h3 style={{ marginTop:28 }}>Who Can Join?</h3>
          <ul className="workshop-who-list">
            {workshopDetails.whoCanJoin.map(w => <li key={w}><span className="text-gold">✦</span>{w}</li>)}
          </ul>

          <div className="workshop-cta-strip">
            <p className="workshop-cta-text">YES! You can be the next top model. Then why wait…</p>
            <span className="workshop-types">
              {['Freshers Workshop','Fashion Workshop','Rampwalk Workshop','Photography','Portfolio Service'].map(t => (
                <span key={t}>{t}</span>
              ))}
            </span>
          </div>
        </div>

        <div>
          <ApplyForm
            title="Register for Workshop"
            fields={WORKSHOP_FIELDS}
            onSubmit={sendWorkshopRegistration}
            appliedFor="Modeling Workshop"
          />
        </div>
      </section>
    </div>
  );
}
