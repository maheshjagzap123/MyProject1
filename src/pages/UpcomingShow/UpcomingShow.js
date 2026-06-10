import React from 'react';
import { Link } from 'react-router-dom';
import { eventSequel } from '../../data/siteData';
import './UpcomingShow.css';

export default function UpcomingShow() {
  return (
    <div className="upcoming-page">
      {/* Banner */}
      <div className="upcoming-hero">
        <div className="upcoming-hero__overlay">
          <div className="container">
            <span className="section-tag">Sequel 2026</span>
            <h1>Upcoming Fashion Show</h1>
            <p>Discover the latest trends with our Mega Events — Designer Verse '26</p>
            <div className="upcoming-hero__ticker">
              MEGA FASHION SHOW DESIGNER VERSE '26 &nbsp; ✦ &nbsp; MEGA FASHION SHOW DESIGNER VERSE '26 &nbsp; ✦ &nbsp; MEGA FASHION SHOW DESIGNER VERSE '26
            </div>
          </div>
        </div>
      </div>

      {/* Sequel breakdown */}
      <section className="section container">
        <div className="text-center" style={{ marginBottom: 52 }}>
          <span className="section-tag">Event Series</span>
          <h2 className="section-heading">Sequel of Designer Verse '26</h2>
          <span className="gold-divider center" />
          <p className="section-sub">
            Fashion Runway plans sequel-wise events for our final Mega Show. Be part of every stage.
          </p>
        </div>

        <div className="upcoming-steps">
          {eventSequel.map((ev, i) => (
            <div key={ev.id} className={`upcoming-step ${i % 2 === 1 ? 'upcoming-step--reverse' : ''}`}>
              <div className="upcoming-step__img">
                <img src={ev.image} alt={ev.title} loading="lazy" />
                <div className="upcoming-step__num">{String(i + 1).padStart(2, '0')}</div>
              </div>
              <div className="upcoming-step__content">
                <span className="section-tag">{ev.tag}</span>
                <h2>{ev.title}</h2>
                <span className="gold-divider" />
                <p className="upcoming-step__meta">📅 {ev.date} &nbsp; | &nbsp; 📍 {ev.city}</p>
                <p style={{ color:'var(--gray)', lineHeight:1.8, marginBottom:20 }}>{ev.description}</p>
                <ul className="upcoming-step__list">
                  {ev.highlights.map(h => <li key={h}><span className="text-gold">✦</span> {h}</li>)}
                </ul>
                {ev.applyLink ? (
                  <Link to={ev.applyLink} className="btn btn-gold" style={{ marginTop:12 }}>
                    {i === 0 ? 'Apply as Designer' : 'Apply as Model'}
                  </Link>
                ) : (
                  <div className="upcoming-step__soon">
                    <span>Registration opens soon</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery strip */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <span className="section-tag">Past Shows</span>
            <h2 className="section-heading">Glimpses of Our Events</h2>
            <span className="gold-divider center" />
          </div>
          <div className="gallery-grid">
            <img className="span-2" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Show 1" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" alt="Show 2" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80" alt="Show 3" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80" alt="Show 4" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80" alt="Show 5" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  );
}
