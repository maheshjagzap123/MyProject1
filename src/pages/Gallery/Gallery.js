import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryImages, winners, eventInfo } from '../../data/siteData';
import './Gallery.css';

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="gallery-page">
      <div className="page-banner gallery-banner">
        <span className="section-tag">Memories</span>
        <h1>Event Gallery</h1>
        <p>Relive the glamour from our past editions</p>
      </div>

      {/* Past Winners */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="section-tag">Hall of Fame</span>
            <h2 className="section-heading">Our Champions</h2>
            <span className="gold-divider center" />
            <p className="section-sub">Celebrating the winners who walked the ramp and won their crown at {eventInfo.name}.</p>
          </div>
          <div className="winners-grid">
            {winners.map(w => (
              <div key={w.name} className="winner-card">
                <div className="winner-card__img-wrap">
                  <img src={w.img} alt={w.name} loading="lazy" />
                  <div className="winner-card__crown">♛</div>
                </div>
                <div className="winner-card__body">
                  <h3>{w.name}</h3>
                  <span className="winner-card__title">{w.title}</span>
                  <span className="winner-card__city">📍 {w.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section section-off">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <span className="section-tag">Photo Gallery</span>
            <h2 className="section-heading">Event Highlights</h2>
            <span className="gold-divider center" />
          </div>
          <div className="photo-gallery">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`gallery-item ${i === 0 ? 'gallery-item--wide' : ''}`}
                onClick={() => setLightbox(img)}
              >
                <img src={img.src} alt={img.label} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span>{img.label}</span>
                  <div className="gallery-item__zoom">⤢</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox.src} alt={lightbox.label} onClick={e => e.stopPropagation()} />
          <p>{lightbox.label}</p>
        </div>
      )}

      {/* CTA */}
      <section className="section section-dark">
        <div className="container text-center">
          <span className="section-tag">Be Part of History</span>
          <h2 className="section-heading text-white" style={{ marginBottom:16 }}>
            Create Your Own <span className="text-gold">Stage Moment</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.5)', marginBottom:32, maxWidth:460, margin:'0 auto 32px' }}>
            Register now for {eventInfo.edition} and become a part of this prestigious event!
          </p>
          <Link to="/register" className="btn btn-gold">Register Now ✦</Link>
        </div>
      </section>
    </div>
  );
}
