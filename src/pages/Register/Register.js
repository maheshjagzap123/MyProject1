import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories, eventInfo } from '../../data/siteData';
import './Register.css';

const CITIES = [
  'Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Kolhapur',
  'Thane','Navi Mumbai','Amravati','Satara','Raigad','Other',
];

function generateRegId() {
  return 'GIM' + new Date().getFullYear() + Math.random().toString(36).toUpperCase().slice(2, 8);
}

export default function Register() {
  const navigate  = useNavigate();
  const { search } = useLocation();
  const preCategory = new URLSearchParams(search).get('category') || '';

  const [step,    setStep]    = useState(1);
  const [errors,  setErrors]  = useState({});
  const [preview, setPreview] = useState(null);
  const [payMode, setPayMode] = useState('upi');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', gender: '',
    category: preCategory, age: '', height: '',
    city: '', state: 'Maharashtra', address: '',
    instagram: '', facebook: '',
    photo: null, consent: false,
  });

  useEffect(() => {
    if (preCategory) setForm(f => ({ ...f, category: preCategory }));
  }, [preCategory]);

  const selectedCat = categories.find(c => c.id === form.category);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.fullName.trim())  e.fullName  = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit mobile required';
    if (!form.gender)    e.gender   = 'Please select gender';
    if (!form.category)  e.category = 'Please select a category';
    if (!form.age || form.age < 4 || form.age > 60) e.age = 'Valid age required';
    if (!form.height.trim()) e.height = 'Height is required';
    if (!form.city)      e.city     = 'Please select your city';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.photo)   e.photo   = 'Please upload a photograph';
    if (!form.consent) e.consent = 'You must agree to the terms';
    return e;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErrors(er => ({ ...er, photo: 'File must be under 5MB' })); return; }
    setForm(f => ({ ...f, photo: file }));
    setErrors(er => ({ ...er, photo: '' }));
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validateStep2();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    // Simulate API call / payment processing
    await new Promise(r => setTimeout(r, 1800));
    const regId = generateRegId();
    navigate('/registration-success', {
      state: { name: form.fullName, category: selectedCat?.title, regId, email: form.email, fee: selectedCat?.fee },
    });
  };

  return (
    <div className="register-page">
      {/* Banner */}
      <div className="page-banner register-banner">
        <span className="section-tag">Join the Pageant</span>
        <h1>Register Now</h1>
        <p>{eventInfo.name} – {eventInfo.edition}</p>
      </div>

      <section className="section">
        <div className="container register-layout">

          {/* Progress Steps */}
          <div className="reg-steps">
            {['Personal Details', 'Photo & Payment', 'Confirmation'].map((s, i) => (
              <div key={s} className={`reg-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="reg-step__circle">{step > i + 1 ? '✓' : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          <div className="register-body">
            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="reg-card">
                <h2 className="reg-card__title">Personal Details</h2>
                <span className="gold-divider" />

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="As per Aadhaar" />
                    {errors.fullName && <span className="field-err">{errors.fullName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
                    {errors.email && <span className="field-err">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit number" maxLength={10} />
                    {errors.phone && <span className="field-err">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label>Gender *</label>
                    <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    {errors.gender && <span className="field-err">{errors.gender}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category *</label>
                    <select value={form.category} onChange={e => set('category', e.target.value)}>
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.title} – {c.subtitle} ({c.ageRange})</option>
                      ))}
                    </select>
                    {errors.category && <span className="field-err">{errors.category}</span>}
                  </div>
                  <div className="form-group">
                    <label>Age *</label>
                    <input type="number" value={form.age} onChange={e => set('age', e.target.value)} placeholder="Your age" min={4} max={60} />
                    {errors.age && <span className="field-err">{errors.age}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Height *</label>
                    <input value={form.height} onChange={e => set('height', e.target.value)} placeholder='e.g. 5&apos;6" or 168 cm' />
                    {errors.height && <span className="field-err">{errors.height}</span>}
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <select value={form.city} onChange={e => set('city', e.target.value)}>
                      <option value="">Select City</option>
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    {errors.city && <span className="field-err">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Full Address</label>
                  <textarea value={form.address} onChange={e => set('address', e.target.value)} rows={2} placeholder="Your address (optional)" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Instagram Profile (optional)</label>
                    <input value={form.instagram} onChange={e => set('instagram', e.target.value)} placeholder="@yourhandle" />
                  </div>
                  <div className="form-group">
                    <label>Facebook Profile (optional)</label>
                    <input value={form.facebook} onChange={e => set('facebook', e.target.value)} placeholder="facebook.com/yourprofile" />
                  </div>
                </div>

                {selectedCat && (
                  <div className="reg-fee-note" style={{ borderColor: selectedCat.color }}>
                    <span>Selected: <strong style={{ color: selectedCat.color }}>{selectedCat.title}</strong></span>
                    <span>Registration Fee: <strong style={{ color: selectedCat.color }}>{selectedCat.fee}</strong></span>
                  </div>
                )}

                <button className="btn btn-gold reg-next-btn" onClick={handleNext}>
                  Next: Upload Photo & Pay →
                </button>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="reg-card">
                <h2 className="reg-card__title">Photo & Payment</h2>
                <span className="gold-divider" />

                {/* Photo upload */}
                <div className="photo-upload-section">
                  <h3>Upload Your Photograph</h3>
                  <p>Clear, recent photo — face clearly visible. JPG/PNG, max 5MB.</p>
                  <div className="photo-upload-area">
                    {preview ? (
                      <div className="photo-preview">
                        <img src={preview} alt="Preview" />
                        <button type="button" className="photo-remove" onClick={() => { setPreview(null); set('photo', null); }}>✕</button>
                      </div>
                    ) : (
                      <label className="photo-upload-label">
                        <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display:'none' }} />
                        <div className="photo-upload-placeholder">
                          <span>📷</span>
                          <strong>Click to Upload</strong>
                          <small>JPG, PNG – Max 5MB</small>
                        </div>
                      </label>
                    )}
                  </div>
                  {errors.photo && <span className="field-err">{errors.photo}</span>}
                </div>

                {/* Payment section */}
                <div className="payment-section">
                  <h3>Payment</h3>
                  {selectedCat && (
                    <div className="payment-amount">
                      <span>Registration Fee ({selectedCat.title})</span>
                      <strong style={{ color: selectedCat.color }}>{selectedCat.fee}</strong>
                    </div>
                  )}

                  <div className="payment-modes">
                    {[
                      { id:'upi',      label:'UPI / QR Code' },
                      { id:'razorpay', label:'Razorpay (Card/Net Banking)' },
                      { id:'phonepay', label:'PhonePe' },
                    ].map(m => (
                      <button
                        type="button"
                        key={m.id}
                        className={`pay-mode-btn ${payMode === m.id ? 'pay-mode-btn--active' : ''}`}
                        onClick={() => setPayMode(m.id)}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {payMode === 'upi' && (
                    <div className="upi-section">
                      <div className="upi-qr">
                        <div className="upi-qr__placeholder">
                          <span>QR</span>
                          <small>Scan with any UPI app</small>
                        </div>
                      </div>
                      <div className="upi-id">
                        <span>UPI ID:</span>
                        <code>glamicon@upi</code>
                        <button type="button" onClick={() => navigator.clipboard?.writeText('glamicon@upi')} className="copy-btn">Copy</button>
                      </div>
                      <p className="upi-note">After payment, proceed to submit. Our team will verify within 24 hours.</p>
                    </div>
                  )}

                  {payMode === 'razorpay' && (
                    <div className="gateway-note">
                      <span>💳</span>
                      <div>
                        <strong>Razorpay Secure Payment</strong>
                        <p>You will be redirected to Razorpay's secure checkout after submitting the form. Accepts all cards, net banking, and wallets.</p>
                      </div>
                    </div>
                  )}

                  {payMode === 'phonepay' && (
                    <div className="gateway-note">
                      <span>📱</span>
                      <div>
                        <strong>PhonePe Payment</strong>
                        <p>You will be redirected to PhonePe's secure payment gateway to complete your registration fee payment.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Consent */}
                <div className="consent-row">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={form.consent}
                    onChange={e => set('consent', e.target.checked)}
                  />
                  <label htmlFor="consent">
                    I agree to the terms & conditions, event rules, and give consent for my photos/videos to be used for promotional purposes.
                  </label>
                </div>
                {errors.consent && <span className="field-err">{errors.consent}</span>}

                <div className="reg-btn-row">
                  <button type="button" className="btn btn-outline-gold" onClick={() => { setStep(1); window.scrollTo({top:0}); }}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-gold" disabled={loading}>
                    {loading ? 'Processing…' : 'Submit & Pay ✦'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar summary */}
          <aside className="register-sidebar">
            <div className="sidebar-card">
              <h3>📋 Event Summary</h3>
              <ul>
                <li><span>Event</span><strong>{eventInfo.name}</strong></li>
                <li><span>Date</span><strong>{eventInfo.date}</strong></li>
                <li><span>Venue</span><strong>{eventInfo.venue}</strong></li>
                <li><span>City</span><strong>{eventInfo.city}</strong></li>
                {selectedCat && (
                  <>
                    <li><span>Category</span><strong>{selectedCat.title}</strong></li>
                    <li><span>Age Group</span><strong>{selectedCat.ageRange}</strong></li>
                    <li><span>Fee</span><strong style={{ color: selectedCat.color }}>{selectedCat.fee}</strong></li>
                  </>
                )}
              </ul>
            </div>
            <div className="sidebar-card sidebar-card--dark">
              <h3>📞 Need Help?</h3>
              <p>Contact our registration team for any queries.</p>
              <a href={`tel:${eventInfo.phone}`} className="btn btn-gold" style={{ width:'100%', justifyContent:'center', marginTop:12 }}>
                Call Us
              </a>
              <a href={`https://wa.me/${eventInfo.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline-gold" style={{ width:'100%', justifyContent:'center', marginTop:10 }}>
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
