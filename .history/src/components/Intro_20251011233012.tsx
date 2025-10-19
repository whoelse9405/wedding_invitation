import React from 'react';
import '../styles/Intro.css';

const Intro: React.FC = () => {
  return (
    <section className="intro-section">
      <div className="intro-image">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" 
          alt="Wedding Cover" 
        />
      </div>
      <div className="intro-content">
        <p className="intro-subtitle">2026년 1월 25일 토요일 오후 2시 30분</p>
        <h1 className="intro-names">
          <span className="groom-name">신랑</span>
          <span className="divider-heart">♥</span>
          <span className="bride-name">신부</span>
        </h1>
        <p className="intro-message">
          소중한 분들을 모시고<br />
          저희 두 사람의 결혼식을 올리게 되었습니다<br />
          오셔서 축복해 주시면 감사하겠습니다
        </p>
      </div>
    </section>
  );
};

export default Intro;

