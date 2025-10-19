import React, { useState } from 'react';
import { copyToClipboard, shareKakao } from '../utils/helpers';
import '../styles/Share.css';

const Share: React.FC = () => {
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
    <section className="share-section section">
      <h2 className="section-title">청첩장 공유하기</h2>
      
      <p className="share-intro">
        소중한 분들께 저희 소식을 전해주세요
      </p>
      
      <div className="share-content">
        <div className="share-buttons">
          <button className="share-btn kakao-btn" onClick={handleKakaoShare}>
            <span className="share-icon">💬</span>
            <span className="share-text">카카오톡 공유</span>
          </button>
          
          <button 
            className={`share-btn url-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyUrl}
          >
            <span className="share-icon">{copied ? '✓' : '🔗'}</span>
            <span className="share-text">{copied ? 'URL 복사됨!' : 'URL 복사'}</span>
          </button>
        </div>
        
        <div className="share-note">
          <p className="note-icon">💡</p>
          <div className="note-content">
            <p className="note-title">카카오톡 공유 설정 안내</p>
            <p className="note-text">
              카카오톡 공유 기능을 사용하려면<br />
              Kakao Developers에서 앱을 등록하고<br />
              JavaScript Key를 발급받아야 합니다.
            </p>
            <div className="note-steps">
              <p><strong>1.</strong> developers.kakao.com 접속</p>
              <p><strong>2.</strong> 앱 생성 및 플랫폼 등록</p>
              <p><strong>3.</strong> JavaScript Key 복사</p>
              <p><strong>4.</strong> index.html에 Kakao SDK 추가</p>
              <p><strong>5.</strong> helpers.ts에 Key 입력</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Share;

