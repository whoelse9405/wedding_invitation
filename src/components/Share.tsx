import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { copyToClipboard, shareKakao } from '../utils/helpers';
import '../styles/Share.css';

const Share: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const [copied, setCopied] = useState(false);
  
  const shareUrl = window.location.href;
  const shareTitle = '동진♥예인의 결혼식에 초대합니다';
  const shareDescription = '피로연: 2026년 1월 17일 토요일 오전 10시 | 제주 중문 마을회관\n예식: 2026년 1월 25일 토요일 오후 2시 30분 | 아르베 웨딩';
  const shareImage = `${window.location.origin}/images/main/main.jpg`;

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
    <section ref={elementRef} className={`share-section ${isVisible ? 'animate' : ''}`}>
      <div className="share-content">
        <div className="share-buttons">
          <button className="share-btn kakao-btn" onClick={handleKakaoShare}>
            <span className="share-text">카카오톡으로 청첩장 전하기</span>
            <svg className="share-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
          
          <button 
            className={`share-btn url-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyUrl}
          >
            <span className="share-text">{copied ? '복사 완료!' : '청첩장 주소 복사하기'}</span>
            <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Share;
