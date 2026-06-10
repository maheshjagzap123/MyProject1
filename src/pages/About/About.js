import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { eventInfo, categories, benefits, timeline } from '../../data/siteData';
import './About.css';

export default function About() {
  const [activeTab, setActiveTab] = useState('kids');
  const activeCat = categories.find(c => c.id === activeTab);

  return (
    <div className="about-page">
      {/* Banner */}
      <div className="page-banner about-banner">
        <span className="section-tag">Know the Event</span>
        <h1>About the Pageant</h1>
        <p>Everything you need to know about {eventInfo.name}</p>
      </div>

      {/* Event overview */}
      <section className="section">
        <div className="container about-overview">
          <div className="about-overview__text">
            <span className="section-tag">Our Story</span>
            <h2 className="section-heading">{eventInfo.name}</h2>
            <span className="gold-divider" />
            <p style={{ color:'var(--gray)', lineHeight:1.9, marginBottom:20 }}>
              {eventInfo.name} is {eventInfo.tagline} — a premier platform that celebrates beauty, talent, and
              confidence across Maharashtra. Now in its {eventInfo.edition}, this event brings together
              participants from every corner of the state to compete for their crown.
            </p>
            <p style={{ color:'var(--gray)', lineHeight:1.9, marginBottom:28 }}>
              From kids to seasoned professionals, every category is designed to provide a world-class
              experience — from professional grooming and ramp training to media coverage and brand collaborations.
            </p>
            <div className="about-details-row">
              {[
                { icon:'📅', label:'Event Date',  val: eventInfo.date },
                { icon:'📍', label:'Venue',       val: eventInfo.venue },
                { icon:'🏙️', label:'City',        val: eventInfo.city },
                { icon:'🎭', label:'Edition',     val: eventInfo.edition },
              ].map(d => (
                <div key={d.label} className="about-detail-card">
                  <span className="about-detail-card__icon">{d.icon}</span>
                  <div>
                    <span className="about-detail-card__label">{d.label}</span>
                    <span className="about-detail-card__val">{d.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-overview__img">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85" alt="Event" />
            <div className="about-overview__img-badge">
              <span>✦</span>
              <strong>{eventInfo.edition}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Categories deep-dive */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-tag">Categories</span>
            <h2 className="section-heading">Choose Your Category</h2>
            <span className="gold-divider center" />
          </div>

          <div className="cat-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`cat-tab ${activeTab === cat.id ? 'cat-tab--active' : ''}`}
                style={activeTab === cat.id ? { borderColor: cat.color, color: cat.color } : {}}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>

          {activeCat && (
            <div className="cat-detail" style={{ '--cat-color': activeCat.color }}>
              <div className="cat-detail__left">
                <div className="cat-detail__badge" style={{ background: activeCat.color }}>
                  {activeCat.subtitle}
                </div>
                <h2 className="cat-detail__title">{activeCat.title}</h2>
                <p className="cat-detail__age">Age Group: {activeCat.ageRange}</p>
                <p className="cat-detail__desc">{activeCat.desc}</p>
                <div className="cat-detail__fee">
                  <span>Registration Fee</span>
                  <strong style={{ color: activeCat.color }}>{activeCat.fee}</strong>
                </div>
                <Link to={`/register?category=${activeCat.id}`} className="btn btn-gold" style={{ marginTop: 8 }}>
                  Apply for {activeCat.title} →
                </Link>
              </div>
              <div className="cat-detail__prizes">
                <h3>🏆 Prizes & Rewards</h3>
                <ul>
                  {activeCat.prizes.map(p => (
                    <li key={p}>
                      <span className="text-gold">✦</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="section-tag">Schedule</span>
            <h2 className="section-heading text-white">Event Timeline</h2>
            <span className="gold-divider center" />
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-item__dot" />
                <div className="timeline-item__date">{item.date}</div>
                <div className="timeline-item__body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="section-tag">Why Participate</span>
            <h2 className="section-heading">Benefits of Joining</h2>
            <span className="gold-divider center" />
          </div>
          <div className="about-benefits-grid">
            {benefits.map(b => (
              <div key={b.title} className="about-benefit-card">
                <div className="about-benefit-card__icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-black">
        <div className="container text-center">
          <span className="section-tag">Take Action</span>
          <h2 className="section-heading text-white" style={{ marginBottom: 16 }}>
            Ready to Win Your <span className="text-gold">Crown?</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.5)', marginBottom:32, maxWidth:460, margin:'0 auto 32px' }}>
            Registrations are open. Limited seats per category. Don't miss this opportunity!
          </p>
          <Link to="/register" className="btn btn-gold">Register Now ✦</Link>
        </div>
      </section>
    </div>
  );
}
