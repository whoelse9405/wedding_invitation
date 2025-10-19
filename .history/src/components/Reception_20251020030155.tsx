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
          <div style="position:relative;padding:10px 32px 10px 16px;font-size:15px;font-weight:600;color:#333;background:white;border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,0.2);min-width:160px;text-align:center;">
            ${venueName}
            <button class="close-btn" style="position:absolute;top:6px;right:6px;width:20px;height:20px;border:none;background:transparent;cursor:pointer;font-size:18px;color:#999;line-height:1;padding:0;">×</button>
          </div>
        `;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 2.0,
        });
        customOverlay.setMap(map);

        // 닫기 버튼 이벤트
        const closeBtn = content.querySelector('.close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            customOverlay.setMap(null);
          });
        }

        // 마커 클릭 이벤트 - 오버레이 토글
        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (customOverlay.getMap()) {
            customOverlay.setMap(null);
          } else {
            customOverlay.setMap(map);
          }
        });
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
    const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venueName)} 문화의 집?c=${lng},${lat},15,0,0,0,dh`;
    window.open(naverUrl, '_blank');
  };

  return (
    <section ref={elementRef} className={`reception-section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title reception-title">피로연 안내</h2>
      
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* 상단 지붕 - 내부 윈드실드 */}
                <path d="M 7.5 5 L 9 3.5 C 9.5 3 10 2.8 11 2.8 L 13 2.8 C 14 2.8 14.5 3 15 3.5 L 16.5 5 L 18.5 5 C 19 5 19.5 5.3 20 6 L 21 7.5" strokeWidth="1.3"/>
                {/* 상단 지붕 - 외부 라인 */}
                <path d="M 6 6 L 7.5 4 C 8 3.3 9 2.5 10.5 2.5 L 13.5 2.5 C 15 2.5 16 3.3 16.5 4 L 18 6" strokeWidth="1.8"/>
                
                {/* 좌측 사이드미러 */}
                <path d="M 3 6.5 L 2 7 L 2 8 L 3 8.5" strokeWidth="1.5" strokeLinejoin="miter"/>
                <line x1="3" y1="7.5" x2="5" y2="7.5" strokeWidth="1.5"/>
                
                {/* 우측 사이드미러 */}
                <path d="M 21 6.5 L 22 7 L 22 8 L 21 8.5" strokeWidth="1.5" strokeLinejoin="miter"/>
                <line x1="21" y1="7.5" x2="19" y2="7.5" strokeWidth="1.5"/>
                
                {/* 자동차 본체 외곽 */}
                <path d="M 3 8.5 L 3 15 C 3 15.5 3.3 16 3.8 16.2 L 4.5 16.5 L 4.5 18 C 4.5 18.5 4.8 19 5.3 19 L 6.5 19 C 6.8 19 7 18.8 7 18.5 L 7 17" strokeWidth="1.8"/>
                <path d="M 21 8.5 L 21 15 C 21 15.5 20.7 16 20.2 16.2 L 19.5 16.5 L 19.5 18 C 19.5 18.5 19.2 19 18.7 19 L 17.5 19 C 17.2 19 17 18.8 17 18.5 L 17 17" strokeWidth="1.8"/>
                
                {/* 좌측 헤드라이트 (각진 형태) */}
                <path d="M 5 10 L 6.5 9.5 L 8 10 L 7.5 11.5 L 5.5 11.5 Z" strokeWidth="1.5" strokeLinejoin="miter"/>
                
                {/* 우측 헤드라이트 (각진 형태) */}
                <path d="M 19 10 L 17.5 9.5 L 16 10 L 16.5 11.5 L 18.5 11.5 Z" strokeWidth="1.5" strokeLinejoin="miter"/>
                
                {/* 하단 범퍼 중앙 */}
                <path d="M 8.5 15.5 L 9.5 16.5 L 14.5 16.5 L 15.5 15.5" strokeWidth="1.5" strokeLinejoin="miter"/>
                
                {/* 좌측 타이어 하우징 */}
                <path d="M 4.5 16.5 L 6 17 L 7 17" strokeWidth="1.3"/>
                
                {/* 우측 타이어 하우징 */}
                <path d="M 19.5 16.5 L 18 17 L 17 17" strokeWidth="1.3"/>
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
                {/* 상단 표시 */}
                <rect x="8" y="2.5" width="8" height="1.5" rx="0.5" ry="0.5"></rect>
                {/* 버스 본체 */}
                <rect x="3.5" y="5" width="17" height="13" rx="2" ry="2" strokeWidth="2"></rect>
                {/* 좌측 창문 */}
                <rect x="6" y="7.5" width="5" height="4"></rect>
                {/* 우측 창문 */}
                <rect x="13" y="7.5" width="5" height="4"></rect>
                {/* 중간 가로선 */}
                <line x1="3.5" y1="12.5" x2="20.5" y2="12.5" strokeWidth="2"></line>
                {/* 문 표시 (=) */}
                <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" strokeWidth="1.2"></line>
                <line x1="9.5" y1="16.5" x2="14.5" y2="16.5" strokeWidth="1.2"></line>
                {/* 좌측 사이드미러 */}
                <rect x="1.5" y="8" width="2" height="3"></rect>
                {/* 우측 사이드미러 */}
                <rect x="20.5" y="8" width="2" height="3"></rect>
                {/* 좌측 바퀴 */}
                <circle cx="7.5" cy="19" r="1.2" strokeWidth="1.5"></circle>
                {/* 우측 바퀴 */}
                <circle cx="16.5" cy="19" r="1.2" strokeWidth="1.5"></circle>
                {/* 좌측 바퀴 아래 선 */}
                <line x1="7.5" y1="20.5" x2="7.5" y2="21.5" strokeWidth="1.5"></line>
                {/* 우측 바퀴 아래 선 */}
                <line x1="16.5" y1="20.5" x2="16.5" y2="21.5" strokeWidth="1.5"></line>
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


