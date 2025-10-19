import React from 'react';
import '../styles/Intro.css';

const Intro: React.FC = () => {
  return (
    <section className="intro-section">
      <div className="intro-container">
        {/* 상단 텍스트 */}
        <div className="intro-text-top">
          <p className="intro-subtitle">WEDDING INVITATION</p>
          <h1 className="intro-title">
            <span className="groom-name">이동진</span>
            <span className="divider">&</span>
            <span className="bride-name">이예인</span>
          </h1>
        </div>
        
        {/* 메인 이미지 */}
        <div className="intro-image">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" 
            alt="Wedding Cover" 
          />
        </div>
        
        {/* 하단 정보 */}
        <div className="intro-info">
          <p className="intro-date">2026. 01. 25. SAT PM 2:30</p>
          <p className="intro-venue">아르베</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;

