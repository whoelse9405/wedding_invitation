import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/Gallery.css';

const Gallery: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // 갤러리 이미지 배열 (public/images/gallery 폴더의 이미지들)
  const images = [
    './images/gallery/1.jpg',
    './images/gallery/2.jpg',
    './images/gallery/3.jpg',
    './images/gallery/4.jpg',
    './images/gallery/5.jpg',
    './images/gallery/6.jpg',
    './images/gallery/7.jpg',
    './images/gallery/8.jpg',
    './images/gallery/9.jpg',
    './images/gallery/10.jpg',
    './images/gallery/11.jpg',
    './images/gallery/12.jpg',
    './images/gallery/13.jpg',
    './images/gallery/14.jpg',
    './images/gallery/15.jpg',
    './images/gallery/16.jpg',
    './images/gallery/17.jpg',
    './images/gallery/18.jpg',
    './images/gallery/19.jpg',
    './images/gallery/20.jpg',
    './images/gallery/21.jpg',
    './images/gallery/22.jpg',
    './images/gallery/23.jpg',
    './images/gallery/24.jpg',
    './images/gallery/25.jpg',
    './images/gallery/26.jpg',
    './images/gallery/27.jpg',
    './images/gallery/28.jpg',
    './images/gallery/29.jpg',
  ];

  const initialImageCount = 6; // 처음에 보여줄 이미지 개수
  const displayedImages = showAll ? images : images.slice(0, initialImageCount);

  const handleToggleShowAll = () => {
    if (showAll) {
      // 접기 시 갤러리 섹션 상단으로 스크롤
      elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll(!showAll);
  };

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
    <section ref={elementRef} className={`gallery-section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title">갤러리</h2>
      
      <div className="gallery-content">
        <div className="gallery-grid">
          {displayedImages.map((image, index) => (
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
                <svg className="gallery-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {images.length > initialImageCount && (
          <div className="gallery-load-more">
            <button 
              className={`load-more-btn ${showAll ? 'collapse' : ''}`}
              onClick={handleToggleShowAll}
            >
              <span className="load-more-icon">{showAll ? '∧' : '∨'}</span>
              <span className="load-more-text">{showAll ? '접기' : '더 보기'}</span>
            </button>
          </div>
        )}
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

