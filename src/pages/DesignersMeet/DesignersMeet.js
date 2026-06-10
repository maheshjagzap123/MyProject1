import React from 'react';
import ApplyForm from '../../components/ApplyForm/ApplyForm';
import { sendDesignerApplication } from '../../services/emailService';
import './DesignersMeet.css';

const DESIGNER_FIELDS = [
  { name:'name',            label:'Full Name',              required:true,  placeholder:'Your full name' },
  { name:'email',           label:'Email Address',          required:true,  type:'email', placeholder:'you@example.com' },
  { name:'phone',           label:'Mobile Number',          required:true,  type:'tel',   placeholder:'10-digit number' },
  { name:'city',            label:'City / State',           required:true,  placeholder:'Your city' },
  { name:'brandName',       label:'Brand / Label Name',     required:true,  placeholder:'Your brand or label' },
  {
    name:'specialization', label:'Specialization', type:'select', required:true,
    options:['Bridal Wear','Western Wear','Fusion Wear','Men\'s Fashion','Children\'s Fashion','Accessories','Other'],
  },
  { name:'experienceYears', label:'Years of Experience',    required:false, type:'number', placeholder:'e.g. 3' },
  { name:'portfolioLink',   label:'Portfolio / Instagram Link', required:false, placeholder:'https://…' },
];

export default function DesignersMeet() {
  return (
    <div className="designers-page">
      <div className="page-banner designers-banner">
        <span className="section-tag">First Event in the Sequel</span>
        <h1>Designer's Meet – II</h1>
        <p>National fashion designing competition — showcase your collection to industry experts</p>
      </div>

      <section className="section container designers-body">
        <div className="designers-info">
          <span className="section-tag">About the Event</span>
          <h2 className="section-heading">India's Designer Stage</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:28 }}>
            Designer's Meet is Fashion Runway's national competition for talented fashion designers. Impress our jury of industry veterans, win exciting opportunities, and secure your place at the grand Designer Verse '26 finale.
          </p>

          <div className="designers-perks">
            {[
              { icon:'🏆', title:'Cash Prizes & Trophies', desc:'Win recognition and rewards for your creative talent.' },
              { icon:'📸', title:'Media Coverage', desc:"Featured across Fashion Runway's digital platforms and press." },
              { icon:'🤝', title:'Industry Connect', desc:'Network directly with buyers, stylists, and fashion houses.' },
              { icon:'👗', title:'Walk at Mega Show', desc:'Selected designers get to show their collection at Designer Verse.' },
            ].map(p => (
              <div key={p.title} className="designers-perk">
                <span>{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="designers-criteria">
            <h3>Eligibility & Criteria</h3>
            <ul>
              <li>✦ Open to all Indian fashion designers (freshers & professionals)</li>
              <li>✦ Original designs only — no plagiarism</li>
              <li>✦ Minimum 3 outfits required for showcase</li>
              <li>✦ Participants must be available on the event date</li>
            </ul>
          </div>
        </div>

        <div>
          <ApplyForm
            title="Apply for Designer's Meet"
            fields={DESIGNER_FIELDS}
            onSubmit={sendDesignerApplication}
            appliedFor="Designer's Meet – II"
          />
        </div>
      </section>
    </div>
  );
}
