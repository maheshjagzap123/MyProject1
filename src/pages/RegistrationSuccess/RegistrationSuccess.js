import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { eventInfo } from '../../data/siteData';
import './RegistrationSuccess.css';

export default function RegistrationSuccess() {
  const { state } = useLocation();
  const name     = state?.name     || 'Participant';
  const category = state?.category || 'Pageant';
  const regId    = state?.regId    || 'GIM2026DEMO';
  const email    = state?.email    || '';
  const fee      = state?.fee      || '';

  return (
    <div className="success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-card__crown">♛</div>

          <span className="section-tag" style={{ marginBottom: 8 }}>Registration Confirmed</span>
          <h1>Congratulations, {name}!</h1>
          <p className="success-card__sub">
            Your registration for <strong>{category}</strong> at <strong>{eventInfo.name}</strong> has been successfully received.
          </p>

          {/* Reg ID */}
          <div className="success-reg-id">
            <span>Your Registration ID</span>
            <strong>{regId}</strong>
            <small>Save this ID — required for event check-in</small>
          </div>

          {/* Summary */}
          <div className="success-summary">
            <div><span>Event</span><strong>{eventInfo.name}</strong></div>
            <div><span>Date</span><strong>{eventInfo.date}</strong></div>
            <div><span>Venue</span><strong>{eventInfo.venue}, {eventInfo.city}</strong></div>
            <div><span>Category</span><strong>{category}</strong></div>
            {fee && <div><span>Fee Paid</span><strong style={{ color:'var(--gold)' }}>{fee}</strong></div>}
            {email && <div><span>Email</span><strong>{email}</strong></div>}
          </div>

          {/* Steps */}
          <div className="success-steps">
            {[
              { num: '01', label: 'Registration Received', done: true },
              { num: '02', label: 'Payment Verification (24 hrs)', done: false },
              { num: '03', label: 'Confirmation Call from Team', done: false },
              { num: '04', label: 'Orientation & Rehearsal Details', done: false },
              { num: '05', label: 'Grand Finale – Walk the Ramp!', done: false },
            ].map(s => (
              <div key={s.num} className={`success-step ${s.done ? 'success-step--done' : ''}`}>
                <div className="success-step__circle">{s.done ? '✓' : s.num}</div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="success-note">
            <p>📧 A confirmation email will be sent to <strong>{email || 'your email'}</strong>. Check your spam folder if not received.</p>
            <p>📞 For queries: <a href={`tel:${eventInfo.phone}`}>{eventInfo.phone}</a></p>
          </div>

          <div className="success-actions">
            <Link to="/"         className="btn btn-gold">Back to Home</Link>
            <Link to="/about"    className="btn btn-outline-gold">View Event Details</Link>
            <Link to="/gallery"  className="btn btn-dark">View Gallery</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
