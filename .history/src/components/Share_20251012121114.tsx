import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { copyToClipboard, shareKakao } from '../utils/helpers';
import '../styles/Share.css';

const Share: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [copied, setCopied] = useState(false);
  
  const shareUrl = window.location.href;
  const shareTitle = '신랑♥신부의 결혼식에 초대합니다';
  const shareDescription = '2026년 1월 25일 오후 2시 30분';
  const shareImage = `${window.location.origin}/images/main/cover.jpg`;

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

  return (
    <section ref={elementRef} className={`share-section-new section ${isVisible ? 'animate' : ''}`}>
      <div className="share-container">
        {/* 편지 봉투 배경 SVG */}
        <div className="envelope-background">
          <svg viewBox="0 0 400 300" className="envelope-svg">
            <defs>
              <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f0ede5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#e8e4db', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* 봉투 본체 */}
            <path d="M 50 100 L 200 200 L 350 100 L 350 250 L 50 250 Z" 
                  fill="url(#envelopeGradient)" 
                  stroke="#d0ccc3" 
                  strokeWidth="2"/>
            {/* 봉투 플랩 왼쪽 */}
            <path d="M 50 100 L 200 200 L 50 250 Z" 
                  fill="#e8e4db" 
                  stroke="#d0ccc3" 
                  strokeWidth="2"/>
            {/* 봉투 플랩 오른쪽 */}
            <path d="M 350 100 L 200 200 L 350 250 Z" 
                  fill="#e0dcd3" 
                  stroke="#d0ccc3" 
                  strokeWidth="2"/>
          </svg>
        </div>

        {/* 버튼들 */}
        <div className="share-buttons-new">
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
        <div className="share-footer">
          <p className="share-domain">smallbigwedding.kr</p>
        </div>
      </div>
    </section>
  );
};

export default Share;

