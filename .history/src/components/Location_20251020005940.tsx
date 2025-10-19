import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { openNaverMap, openKakaoMap, callPhone, copyToClipboard } from '../utils/helpers';
import '../styles/Location.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const Location: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const mapRef = useRef<HTMLDivElement>(null);
  const [addressCopied, setAddressCopied] = useState(false);
  
  const venueName = '아르베 웨딩';
  const venueAddress = '서울특별시 강남구 봉은사로 302';
  const venuePhone = '02-564-7031';
  
  // 아르베 웨딩홀 좌표
  const lat = 37.508662287893564;
  const lng = 127.03926076982607;

  useEffect(() => {
    // 카카오맵 스크립트 로드 대기 및 초기화
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        return;
      }

      // kakao.maps.load()로 API 로드 후 지도 생성
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성
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

    // 카카오맵 API 스크립트가 로드될 때까지 대기
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
          // 5초 후 타임아웃
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, []);

  const handleNaverMap = () => {
    openNaverMap(venueName, lat, lng);
  };

  const handleKakaoMap = () => {
    openKakaoMap(venueName, lat, lng);
  };

  const handleCall = () => {
    callPhone(venuePhone);
  };

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(venueAddress);
    if (success) {
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    } else {
      alert('주소 복사에 실패했습니다.');
    }
  };

  return (
    <section ref={elementRef} className={`location-section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title location-title">LOCATION</h2>
      
      <div className="location-content">
        {/* 예식장 정보 */}
        <div className="venue-info-header">
          <h3 className="venue-name-large">
            {venueName}
            <a href={`tel:${venuePhone}`} className="phone-icon-inline" title="전화 연결">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </a>
          </h3>
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
            <div id="map" ref={mapRef} className="kakao-map"></div>
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
              <span className="transport-label">주차</span>
            </div>
            <div className="transport-details">
              <p className="transport-detail-text">도보 5분 소요 - 2시간 무료 주차</p>
              <p className="transport-detail-text">제1 주차장: 서울시 강남구 논현동 237-12 경복주차장</p>
              <p className="transport-detail-text">제2 주차장: 서울시 강남구 언주로 603 국민은행</p>
              <p className="transport-detail-text">제3 주차장: 서울시 강남구 언주로 609 PAX타워</p>
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
              <p className="transport-detail-text">아크로힐스논현 하차(구 경복아파트)</p>
              <p className="transport-detail-text">지선버스: 3412번, 6411번</p>
              <p className="transport-detail-text transport-spacing">라움아트센터, 시티프라움더강남 하차</p>
              <p className="transport-detail-text">간선버스: 141번, 242번</p>
            </div>
          </div>

          <div className="transport-divider"></div>

          <div className="transport-item">
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="8" width="20" height="12" rx="2"></rect>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <circle cx="8" cy="16" r="1"></circle>
                <circle cx="16" cy="16" r="1"></circle>
                <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2"></path>
              </svg>
              <span className="transport-label">지하철</span>
            </div>
            <div className="transport-details">
              <div className="subway-item">
                <p className="subway-title">
                  <span className="subway-line line-9">9호선</span>
                </p>
                <p className="subway-detail">선정릉역 4번 출구 ⟩ 도보 5분</p>
                <p className="subway-detail">언주역 5번 출구 ⟩ 도보 5분</p>
              </div>
              
              <div className="subway-item">
                <p className="subway-title">
                  <span className="subway-line line-bundang">분당선</span>
                </p>
                <p className="subway-detail">언주역 5번 출구 ⟩ 도보 5분</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

