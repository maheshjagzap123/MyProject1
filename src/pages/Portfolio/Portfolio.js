import React from 'react';
import ApplyForm from '../../components/ApplyForm/ApplyForm';
import { sendPortfolioEnquiry } from '../../services/emailService';
import { portfolioPackages } from '../../data/siteData';
import './Portfolio.css';

const FIELDS = [
  { name:'name',        label:'Full Name',    required:true,  placeholder:'Your name' },
  { name:'email',       label:'Email',        required:true,  type:'email', placeholder:'you@example.com' },
  { name:'phone',       label:'Mobile',       required:true,  type:'tel',   placeholder:'10-digit number' },
  {
    name:'serviceType', label:'Service Interested In', type:'select', required:true,
    options:['Starter Portfolio','Professional Portfolio','Premium Portfolio','Rampwalk Video','Zed Card','Custom Package'],
  },
  {
    name:'message', label:'Tell Us More', type:'textarea', fullRow:true,
    placeholder:'Any specific requirements, preferred dates, or questions…',
  },
];

export default function Portfolio() {
  return (
    <div className="portfolio-page">
      <div className="page-banner portfolio-banner">
        <span className="section-tag">Delhi Studio</span>
        <h1>Fashion Portfolio Service</h1>
        <p>Professional fashion portfolio shoots — affordable packages for models at every stage</p>
      </div>

      {/* Packages */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom:52 }}>
            <span className="section-tag">Pricing</span>
            <h2 className="section-heading">Portfolio Packages</h2>
            <span className="gold-divider center" />
          </div>
          <div className="portfolio-packages">
            {portfolioPackages.map(pkg => (
              <div key={pkg.name} className={`portfolio-pkg ${pkg.popular ? 'portfolio-pkg--popular' : ''}`}>
                {pkg.popular && <div className="portfolio-pkg__badge">Most Popular</div>}
                <div className="portfolio-pkg__name">{pkg.name}</div>
                <div className="portfolio-pkg__price">{pkg.price}</div>
                <div className="portfolio-pkg__shots">{pkg.shots}</div>
                <div className="portfolio-pkg__outfits">{pkg.outfits}</div>
                <ul className="portfolio-pkg__features">
                  {pkg.features.map(f => <li key={f}><span className="text-gold">✓</span> {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="section section-off container portfolio-body">
        <div className="portfolio-info">
          <span className="section-tag">Book a Session</span>
          <h2 className="section-heading">Start Your<br />Portfolio Journey</h2>
          <span className="gold-divider" />
          <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:24 }}>
            Our Delhi NCR studio is equipped with professional lighting, backdrops, and a team of experienced photographers and stylists. Sessions available weekdays and weekends.
          </p>
          <div className="portfolio-why">
            {[
              { icon:'💡', text:'Professional lighting & studio setup' },
              { icon:'👗', text:'Stylist assistance included in premium packages' },
              { icon:'⚡', text:'Quick turnaround — photos in 3–5 business days' },
              { icon:'📱', text:'High-resolution digital delivery' },
            ].map(w => (
              <div key={w.text} className="portfolio-why-item">
                <span>{w.icon}</span>
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>
        <ApplyForm
          title="Portfolio Shoot Enquiry"
          fields={FIELDS}
          onSubmit={sendPortfolioEnquiry}
          appliedFor="Portfolio Service Enquiry"
        />
      </section>
    </div>
  );
}
