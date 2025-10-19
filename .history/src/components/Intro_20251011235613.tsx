import React from 'react';
import '../styles/Intro.css';

const Intro: React.FC = () => {
  return (
    <section className="intro-section">
      <div className="intro-image-container">
        {/* 이미지 위 - 신랑/신부 이름 */}
        <div className="intro-names-overlay">
          <h1 className="intro-names">
            <span className="groom-name">이동진</span>
            <span className="divider-heart">♥</span>
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
        
        {/* 이미지 아래 - 일시와 장소 */}
        <div className="intro-info-overlay">
          <p className="intro-date">2026년 1월 25일 토요일 오후 2시 30분</p>
          <p className="intro-venue">아르베</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;

