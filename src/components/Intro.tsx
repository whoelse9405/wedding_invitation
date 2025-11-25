import React, { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';
import '../styles/Intro.css';

const Intro: React.FC = () => {
  const [petalImages, setPetalImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // 벚꽃 이미지 생성
    const petal1 = document.createElement('img');
    petal1.src = './images/petal1.svg';
    const petal2 = document.createElement('img');
    petal2.src = './images/petal2.svg';
    
    setPetalImages([petal1, petal2]);
  }, []);

  return (
    <section className="intro-section">
      <div className="intro-container">
        {/* 꽃잎 효과 */}
        {petalImages.length > 0 && (
          <Snowfall
            speed={[1, 1.5]}
            wind={[-0.5, 2.0]}
            images={petalImages}
            radius={[8, 20]}
            snowflakeCount={50}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100vh',
              zIndex: 105,
            }}
          />
        )}
        
        {/* 상단 텍스트 오버레이 */}
        <div className="intro-text-overlay">
          <h1 className="intro-names">
            <span className="groom-name">DONGJIN</span>
            <span className="name-divider">&</span>
            <span className="bride-name">YEIN</span>
          </h1>
        </div>
        
        {/* 메인 이미지 */}
        <div className="intro-image">
          <img 
            src="./images/main/main.jpg" 
            alt="Wedding Cover" 
          />
        </div>
        
        {/* 하단 정보 오버레이 */}
        <div className="intro-info-overlay">
          <p className="intro-date">2026년 1월 25일 토요일 오후 2시 30분</p>
          <p className="intro-venue">아르베 웨딩</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;

