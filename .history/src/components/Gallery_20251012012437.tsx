import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/Gallery.css';

const Gallery: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // 임시 이미지 배열 (나중에 실제 이미지로 교체)
  const images = [
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    'https://images.unsplash.com/photo-1606216794079-c4d3e3c72a21?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    'https://images.unsplash.com/photo-1594842645256-4c60f76e0a9c?w=800&q=80',
    'https://images.unsplash.com/photo-1522673607181-8c57e30ed1e7?w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80',
    'https://images.unsplash.com/photo-1525258090185-a2e050c0e148?w=800&q=80',
  ];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <section className="gallery-section section">
      <h2 className="section-title">Gallery</h2>
      
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image} 
              alt={`Wedding Photo ${index + 1}`}
              loading="lazy"
            />
            <div className="gallery-overlay">
              <span className="gallery-icon">+</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div 
          className="lightbox" 
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="lightbox-close" onClick={closeLightbox}>
            ✕
          </button>
          
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[currentImage]} 
              alt={`Wedding Photo ${currentImage + 1}`}
            />
          </div>
          
          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
          
          <div className="lightbox-counter">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

