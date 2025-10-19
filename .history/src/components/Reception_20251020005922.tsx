import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { copyToClipboard } from '../utils/helpers';
import '../styles/Reception.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const Reception: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const mapRef = useRef<HTMLDivElement>(null);
  const [addressCopied, setAddressCopied] = useState(false);
  
  const venueName = '중문 마을회관';
  const venueAddress = '제주특별자치도 서귀포시 중문로26번길 7';
  const venueDate = '2026년 1월 17일 토요일 오전 10시';
  
  const lat = 33.25381330431267;
  const lng = 126.42511348753668;

  useEffect(() => {
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        return;
      }

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // 커스텀 오버레이 생성
        const content = document.createElement('div');
        content.className = 'custom-overlay';
        content.innerHTML = `
          <div style="position:relative;padding:15px 40px 15px 20px;font-size:16px;font-weight:600;color:#333;background:white;border-radius:18px;box-shadow:0 4px 16px rgba(0,0,0,0.2);min-width:180px;text-align:center;">
            ${venueName}
            <button class="close-btn" style="position:absolute;top:8px;right:8px;width:24px;height:24px;border:none;background:transparent;cursor:pointer;font-size:20px;color:#999;line-height:1;padding:0;">×</button>
          </div>
        `;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1.5,
        });
        customOverlay.setMap(map);

        // 닫기 버튼 이벤트
        const closeBtn = content.querySelector('.close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            customOverlay.setMap(null);
          });
        }
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts++;
        
        if (window.kakao && window.kakao.maps) {
          clearInterval(timer);
          loadKakaoMap();
        } else if (attempts > 50) {
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, []);

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(venueAddress);
    if (success) {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    } else {
      alert('주소 복사에 실패했습니다.');
    }
  };

  const handleKakaoMap = () => {
    const kakaoUrl = `https://map.kakao.com/link/map/${encodeURIComponent(venueName)},${lat},${lng}`;
    window.open(kakaoUrl, '_blank');
  };

  const handleNaverMap = () => {
    const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venueName)}?c=${lng},${lat},15,0,0,0,dh`;
    window.open(naverUrl, '_blank');
  };

  return (
    <section ref={elementRef} className={`reception-section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title reception-title">RECEPTION</h2>
      
      <div className="reception-content">
        {/* 안내 메시지 */}
        <div className="reception-message">
          <p>
            거리가 멀어 예식에 참석하시기 어려운 분들을<br />
            위해 혼례에 앞서 피로연 자리를 마련하였습니다.
          </p>
          <p>
            귀한 발걸음으로 두 사람의 앞날을 축복하여<br />
            주시면 더 큰 기쁨과 격려가 되겠습니다.
          </p>
        </div>

        {/* 피로연 날짜 정보 */}
        <div className="reception-date-info">
          <p className="reception-date">{venueDate}</p>
        </div>

        {/* 예식장 정보 */}
        <div className="venue-info-header">
          <h3 className="venue-name-large">{venueName}</h3>
          <p className="venue-address-main">
            {venueAddress}
            <button 
              className={`copy-icon-btn ${addressCopied ? 'copied' : ''}`}
              onClick={handleCopyAddress}
              title="주소 복사"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </p>
        </div>

        {/* 카카오맵 */}
        <div className="map-wrapper">
          <div className="map-container-new">
            <div id="reception-map" ref={mapRef} className="kakao-map"></div>
            <div className="map-buttons-overlay">
              <button className="map-overlay-btn kakao-map-btn" onClick={handleKakaoMap} title="카카오맵 열기">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.89 2.04 5.41 5.08 6.74L6 22l4.5-3.5c.5.07 1 .1 1.5.1 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
              </button>
              <button className="map-overlay-btn naver-map-btn" onClick={handleNaverMap} title="네이버지도 열기">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* 교통 안내 */}
        <div className="transportation-info-new">
          <div className="transport-item">
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
              </svg>
              <span className="transport-label">자동차</span>
            </div>
            <div className="transport-details">
              <p className="transport-detail-text">제주국제공항에서 차량으로 약 40분</p>
              <p className="transport-detail-text">서귀포시 방면 1132번 도로 이용</p>
            </div>
          </div>

          <div className="transport-divider"></div>

          <div className="transport-item">
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="5" width="16" height="14" rx="2" ry="2"></rect>
                <line x1="4" y1="11" x2="20" y2="11"></line>
                <rect x="6" y="7" width="5" height="3"></rect>
                <rect x="13" y="7" width="5" height="3"></rect>
                <circle cx="7.5" cy="16" r="1"></circle>
                <circle cx="16.5" cy="16" r="1"></circle>
                <line x1="7.5" y1="19" x2="7.5" y2="20"></line>
                <line x1="16.5" y1="19" x2="16.5" y2="20"></line>
              </svg>
              <span className="transport-label">버스</span>
            </div>
            <div className="transport-details">
              <p className="transport-detail-text">제주국제공항 ⟩ 600번 버스 ⟩ 중문관광단지 하차</p>
              <p className="transport-detail-text">제주시외버스터미널 ⟩ 중문 방면 버스 이용</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reception;


