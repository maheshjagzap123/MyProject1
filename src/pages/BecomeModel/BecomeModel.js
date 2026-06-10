import React from 'react';
import ApplyForm from '../../components/ApplyForm/ApplyForm';
import { sendModelApplication } from '../../services/emailService';
import './BecomeModel.css';

const FIELDS = [
  { name:'name',        label:'Full Name',       required:true, placeholder:'Your full name' },
  { name:'email',       label:'Email',           required:true, type:'email', placeholder:'you@example.com' },
  { name:'phone',       label:'Mobile Number',   required:true, type:'tel',   placeholder:'10-digit number' },
  { name:'city',        label:'City',            required:true, placeholder:'Your city' },
  { name:'age',         label:'Age',             required:true, type:'number', placeholder:'Your age' },
  { name:'height',      label:'Height',          required:true, placeholder:'e.g. 5\'9"' },
  {
    name:'modelType', label:'Category', type:'select', required:true,
    options:['Fresher','Experienced','Ramp Model','Commercial Model','Child Model'],
  },
  {
    name:'experience', label:'About Yourself', type:'textarea', fullRow:true,
    placeholder:'Tell us about your interests, goals, and any prior experience…',
  },
];

export default function BecomeModel() {
  const steps = [
    { num:'01', title:'Apply Online', desc:'Fill our quick application form with your details.' },
    { num:'02', title:'Initial Screening', desc:'Our team reviews your profile and contacts shortlisted candidates.' },
    { num:'03', title:'Audition Round', desc:'Attend in-person auditions in your nearest city.' },
    { num:'04', title:'Selection & Training', desc:'Selected candidates get runway training and grooming.' },
    { num:'05', title:'Walk the Ramp', desc:'Represent Fashion Runway at our upcoming mega show.' },
  ];

  return (
    <div className="become-page">
      <div className="page-banner become-banner">
        <span className="section-tag">Start Your Journey</span>
        <h1>Become a Model</h1>
        <p>Your first step towards a professional modeling career in India</p>
      </div>

      {/* Process */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom:48 }}>
            <span className="section-tag">How It Works</span>
            <h2 className="section-heading">Your Path to the Runway</h2>
            <span className="gold-divider center" />
          </div>
          <div className="become-steps">
            {steps.map((s, i) => (
              <div key={s.num} className={`become-step ${i === 2 ? 'become-step--active' : ''}`}>
                <div className="become-step__num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="section container become-body">
        <div className="become-info">
          <span className="section-tag">Who We're Looking For</span>
          <h2 className="section-heading">Are You the<br />Next Face of Fashion?</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:24 }}>
            We welcome freshers as young as 15 and experienced professionals. Whether you want to walk the ramp, do commercial shoots, or build a full modeling career — Fashion Runway is your launchpad.
          </p>
          <div className="become-requirements">
            {[
              { label:'Age', val:'15 years and above' },
              { label:'Height', val:'5\'5" and above (flexible)' },
              { label:'Location', val:'Pan India – multi-city auditions' },
              { label:'Experience', val:'Not required for freshers' },
            ].map(r => (
              <div key={r.label} className="become-req-row">
                <span className="become-req-label">{r.label}</span>
                <span className="become-req-val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
        <ApplyForm
          title="Apply to Become a Model"
          fields={FIELDS}
          onSubmit={sendModelApplication}
          appliedFor="Become a Model"
        />
      </section>
    </div>
  );
}
