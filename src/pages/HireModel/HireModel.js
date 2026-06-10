import React from 'react';
import ApplyForm from '../../components/ApplyForm/ApplyForm';
import { sendHireModelEnquiry } from '../../services/emailService';
import './HireModel.css';

const FIELDS = [
  { name:'name',           label:'Your Name',          required:true,  placeholder:'Full name' },
  { name:'email',          label:'Email Address',      required:true,  type:'email', placeholder:'you@company.com' },
  { name:'phone',          label:'Phone Number',       required:true,  type:'tel',   placeholder:'10-digit number' },
  { name:'company',        label:'Company / Brand',    required:false, placeholder:'Your organisation' },
  {
    name:'eventType', label:'Event Type', type:'select', required:true,
    options:['Fashion Show','Product Launch','Commercial Shoot','Print Campaign','Wedding','Corporate Event','Other'],
  },
  { name:'eventDate',      label:'Event Date',         required:false, type:'date' },
  { name:'eventLocation',  label:'Event Location',     required:false, placeholder:'City and venue' },
  { name:'modelsRequired', label:'No. of Models Needed', required:true, type:'number', placeholder:'e.g. 5' },
  {
    name:'budget', label:'Approximate Budget', type:'select', required:false,
    options:['Under ₹10,000','₹10,000 – ₹25,000','₹25,000 – ₹50,000','₹50,000 – ₹1,00,000','Above ₹1,00,000'],
  },
  {
    name:'message', label:'Additional Requirements', type:'textarea', fullRow:true,
    placeholder:'Describe specific look, gender preference, outfit requirements, etc…',
  },
];

export default function HireModel() {
  const categories = [
    { icon:'👗', title:'Ramp Models', desc:'Professional runway trained models for fashion shows and product launches.' },
    { icon:'📸', title:'Print Models', desc:'Models experienced in editorial, catalogue, and advertising shoots.' },
    { icon:'🎬', title:'Commercial Models', desc:'Camera-ready models for TV commercials and digital campaigns.' },
    { icon:'💍', title:'Bridal Models', desc:'Elegant models for bridal showcases, jewellery campaigns, and wedding events.' },
    { icon:'👔', title:'Male Models', desc:'Versatile male talent for fashion, grooming, lifestyle, and commercial work.' },
    { icon:'🧒', title:'Child Models', desc:"Child-safe, professional young models for kids' brands and campaigns." },
  ];

  return (
    <div className="hire-page">
      <div className="page-banner hire-banner">
        <span className="section-tag">Book Professional Talent</span>
        <h1>Hire a Model</h1>
        <p>Find the perfect model for your event, shoot, or campaign</p>
      </div>

      {/* Model categories */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <span className="section-tag">Our Talent</span>
            <h2 className="section-heading">Model Categories</h2>
            <span className="gold-divider center" />
          </div>
          <div className="hire-categories">
            {categories.map(c => (
              <div key={c.title} className="hire-category-card">
                <div className="hire-category-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="section container hire-body">
        <div className="hire-info">
          <span className="section-tag">Book Talent</span>
          <h2 className="section-heading">Tell Us Your<br />Requirements</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:24 }}>
            Submit your enquiry and our talent management team will get back to you within 24 hours with the best-matched profiles for your requirements.
          </p>
          <div className="hire-process">
            {['Submit Enquiry','Team Reviews','Model Profiles Shared','Finalize & Confirm'].map((s, i) => (
              <div key={s} className="hire-process-step">
                <div className="hire-process-step__num">{String(i+1).padStart(2,'0')}</div>
                <span>{s}</span>
                {i < 3 && <div className="hire-process-step__arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
        <ApplyForm
          title="Model Hire Enquiry"
          fields={FIELDS}
          onSubmit={sendHireModelEnquiry}
          appliedFor="Hire a Model Enquiry"
        />
      </section>
    </div>
  );
}
