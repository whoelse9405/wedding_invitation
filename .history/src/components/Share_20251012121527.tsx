import React, { useState, useEffect, useRef } from 'react';
import { copyToClipboard, shareKakao } from '../utils/helpers';
import '../styles/Share.css';

const Share: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const shareUrl = window.location.href;
  const shareTitle = '신랑♥신부의 결혼식에 초대합니다';
  const shareDescription = '2026년 1월 25일 오후 2시 30분';
  const shareImage = `${window.location.origin}/images/main/cover.jpg`;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // 섹션이 화면에 들어오기 시작할 때부터 계산
      const startOffset = windowHeight;
      const endOffset = windowHeight * 0.3;
      
      // 스크롤 진행도 계산 (0 ~ 1)
      let progress = 0;
      if (rect.top < startOffset && rect.top > -sectionHeight) {
        progress = Math.max(0, Math.min(1, (startOffset - rect.top) / (startOffset - endOffset)));
      } else if (rect.top <= -sectionHeight) {
        progress = 1;
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert('URL 복사에 실패했습니다.');
    }
  };

  const handleKakaoShare = () => {
    shareKakao(shareTitle, shareDescription, shareImage, shareUrl);
  };

  // 봉투 플랩 회전 각도 계산 (0도 -> -120도)
  const flapRotation = scrollProgress * -120;
  // 편지 위치 계산 (0% -> -50%)
  const letterTranslate = scrollProgress * -50;
  // 버튼 투명도 (스크롤 50% 이후부터 나타남)
  const buttonOpacity = Math.max(0, (scrollProgress - 0.5) * 2);

  return (
    <section ref={sectionRef} className="share-section-envelope">
      <div className="envelope-container">
        {/* 편지 봉투 */}
        <div className="envelope-wrapper">
          {/* 봉투 뒷면 */}
          <div className="envelope-back">
            <svg viewBox="0 0 400 300" className="envelope-svg">
              <defs>
                <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f5f3f0', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#ebe9e4', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* 봉투 본체 */}
              <rect x="50" y="100" width="300" height="150" 
                    fill="url(#envelopeGradient)" 
                    stroke="#d5d3ce" 
                    strokeWidth="2"/>
              {/* 좌측 삼각형 */}
              <path d="M 50 100 L 200 200 L 50 250 Z" 
                    fill="#ebe9e4" 
                    stroke="#d5d3ce" 
                    strokeWidth="2"/>
              {/* 우측 삼각형 */}
              <path d="M 350 100 L 200 200 L 350 250 Z" 
                    fill="#e3e1dc" 
                    stroke="#d5d3ce" 
                    strokeWidth="2"/>
            </svg>
          </div>

          {/* 편지 내용 */}
          <div 
            className="letter-content"
            style={{ 
              transform: `translateY(${letterTranslate}%)`,
              opacity: Math.min(1, scrollProgress * 1.5)
            }}
          >
            {/* 상단 리본 장식 */}
            <div className="ribbon-decoration">
              <svg viewBox="0 0 100 40" className="ribbon-svg">
                <defs>
                  <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#e8c4d8', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#f5d5e5', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#e8c4d8', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                {/* 왼쪽 리본 */}
                <path d="M 30 5 L 35 15 L 30 25 L 10 25 L 10 30 L 35 20 Z" 
                      fill="url(#ribbonGradient)" 
                      stroke="#d8b4c8" 
                      strokeWidth="0.5"/>
                {/* 오른쪽 리본 */}
                <path d="M 70 5 L 65 15 L 70 25 L 90 25 L 90 30 L 65 20 Z" 
                      fill="url(#ribbonGradient)" 
                      stroke="#d8b4c8" 
                      strokeWidth="0.5"/>
                {/* 중앙 매듭 */}
                <circle cx="50" cy="15" r="8" 
                        fill="#f5d5e5" 
                        stroke="#d8b4c8" 
                        strokeWidth="0.5"/>
              </svg>
            </div>

            {/* 버튼들 */}
            <div className="share-buttons-new" style={{ opacity: buttonOpacity }}>
              <button className="share-btn-new kakao-btn-new" onClick={handleKakaoShare}>
                카카오톡으로 공유하기
              </button>
              
              <button 
                className={`share-btn-new url-btn-new ${copied ? 'copied' : ''}`}
                onClick={handleCopyUrl}
              >
                {copied ? 'URL 복사 완료!' : 'url 링크 복사하기'}
              </button>
            </div>

            {/* 하단 텍스트 */}
            <div className="share-footer" style={{ opacity: buttonOpacity }}>
              <p className="share-domain">smallbigwedding.kr</p>
            </div>
          </div>

          {/* 봉투 상단 플랩 */}
          <div 
            className="envelope-flap"
            style={{ 
              transform: `rotateX(${flapRotation}deg)`,
              transformOrigin: 'bottom center'
            }}
          >
            <svg viewBox="0 0 400 150" className="envelope-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#e8e4db', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#ded8cf', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M 50 150 L 200 50 L 350 150 Z" 
                    fill="url(#flapGradient)" 
                    stroke="#d5d3ce" 
                    strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Share;

