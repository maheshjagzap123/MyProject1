import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventInfo, categories, stats, testimonials, benefits } from '../../data/siteData';
import './Home.css';

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

export default function Home() {
  const time = useCountdown(eventInfo.eventDate);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content container">
          <div className="hero__text">
            <span className="hero__edition">{eventInfo.edition}</span>
            <h1 className="hero__title">
              {eventInfo.name.split(' ').slice(0, 2).join(' ')}<br />
              <span className="text-gold">{eventInfo.name.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="hero__tagline">{eventInfo.tagline}</p>
            <div className="hero__meta">
              <span>📅 {eventInfo.date}</span>
              <span>📍 {eventInfo.venue}, {eventInfo.city}</span>
            </div>
            <div className="hero__btns">
              <Link to="/register" className="btn btn-gold">Register Now ✦</Link>
              <Link to="/about"    className="btn btn-outline-white">Learn More</Link>
            </div>
          </div>

          {/* Countdown */}
          <div className="hero__countdown">
            <p className="hero__countdown-label">Event Starts In</p>
            {[
              { val: time.days,    unit: 'Days' },
              { val: time.hours,   unit: 'Hours' },
              { val: time.minutes, unit: 'Mins' },
              { val: time.seconds, unit: 'Secs' },
            ].map(({ val, unit }) => (
              <div key={unit} className="countdown-block">
                <span className="countdown-num">{String(val).padStart(2, '0')}</span>
                <span className="countdown-unit">{unit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i}>
              <span>LITTLE ICON</span><span>TEEN ICON</span>
              <span>MISS ICON</span><span>MRS ICON</span>
              <span>MR ICON</span><span>GRAND FINALE</span>
              <span>REGISTER NOW</span><span>GLAM ICON 2026</span>
              <span>LITTLE ICON</span><span>TEEN ICON</span>
              <span>MISS ICON</span><span>MRS ICON</span>
              <span>MR ICON</span><span>GRAND FINALE</span>
              <span>REGISTER NOW</span><span>GLAM ICON 2026</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-strip">
        <div className="container" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap' }}>
          {stats.map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <span className="section-tag">Compete & Win</span>
            <h2 className="section-heading">Pageant Categories</h2>
            <span className="gold-divider center" />
            <p className="section-sub">
              Choose your category, register today, and take your first step towards the crown!
            </p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat.id} className="cat-card">
                <div className="cat-card__icon" style={{ background: cat.color + '20', color: cat.color }}>
                  {cat.icon}
                </div>
                <div className="cat-card__badge" style={{ background: cat.color }}>{cat.subtitle}</div>
                <h3 className="cat-card__title">{cat.title}</h3>
                <p className="cat-card__age">Age: {cat.ageRange}</p>
                <p className="cat-card__desc">{cat.desc}</p>
                <div className="cat-card__fee">
                  <span className="cat-card__fee-label">Registration Fee</span>
                  <span className="cat-card__fee-val" style={{ color: cat.color }}>{cat.fee}</span>
                </div>
                <Link to={`/register?category=${cat.id}`} className="btn btn-outline-gold" style={{ width:'100%', justifyContent:'center' }}>
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="section-tag">Why Join</span>
            <h2 className="section-heading text-white">What You Win & Gain</h2>
            <span className="gold-divider center" />
          </div>
          <div className="benefits-grid">
            {benefits.map(b => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-card__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="section-tag">Success Stories</span>
            <h2 className="section-heading">What Our Winners Say</h2>
            <span className="gold-divider center" />
          </div>
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-card__quote">"</div>
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="home-cta section section-black">
        <div className="container text-center">
          <span className="section-tag">Don't Miss Out</span>
          <h2 className="section-heading text-white" style={{ marginBottom: 16 }}>
            Your Crown is <span className="text-gold">Waiting for You</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.55)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Registrations close soon. Secure your spot at {eventInfo.name} {new Date(eventInfo.eventDate).getFullYear()}.
          </p>
          <div style={{ display:'flex', gap: 16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/register" className="btn btn-gold">Register Now ✦</Link>
            <Link to="/about"    className="btn btn-outline-gold">View Categories</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
