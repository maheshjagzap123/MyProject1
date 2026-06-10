import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ApplySuccess.css';
import './ApplySuccess.css';

export default function ApplySuccess() {
  const { state } = useLocation();
  const name       = state?.name       || 'Applicant';
  const appliedFor = state?.appliedFor || 'Fashion Runway';

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-card__icon">✓</div>
          <span className="section-tag">Application Received</span>
          <h1>Thank You, {name}!</h1>
          <p className="success-card__sub">
            Your application for <strong>{appliedFor}</strong> has been successfully submitted.
            Our team will review your details and reach out to you via email or phone within 2–3 business days.
          </p>
          <div className="success-card__steps">
            {[
              { num:'01', label:'Application Submitted', done:true },
              { num:'02', label:'Team Review (2–3 days)', done:false },
              { num:'03', label:'You Get Contacted', done:false },
              { num:'04', label:'Next Steps Shared', done:false },
            ].map(s => (
              <div key={s.num} className={`success-step ${s.done ? 'success-step--done' : ''}`}>
                <div className="success-step__circle">{s.done ? '✓' : s.num}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="success-card__note">
            <p>📧 A confirmation will be sent to your email. Check spam if you don't see it.</p>
            <p style={{ marginTop:6 }}>📞 For urgent queries: <a href="tel:+917290081087">+91 72900 81087</a></p>
          </div>
          <div className="success-card__actions">
            <Link to="/" className="btn btn-gold">Back to Home</Link>
            <Link to="/upcoming-show" className="btn btn-outline-gold">View Events</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
