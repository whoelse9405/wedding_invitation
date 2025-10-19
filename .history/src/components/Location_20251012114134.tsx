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
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [addressCopied, setAddressCopied] = useState(false);
  
  const venueName = '아르베';
  const venueAddress = '서울특별시 강남구 봉은사로 302';
  const venuePhone = '02-564-7031';
  
  // 아르베 웨딩홀 좌표
  const lat = 37.508705;
  const lng = 127.039438;

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

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:10px;font-size:14px;text-align:center;min-width:150px;">
                      <strong>${venueName}</strong>
                    </div>`,
        });
        infowindow.open(map, marker);
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
    <section ref={elementRef} className={`location-section section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title location-title">LOCATION</h2>
      
      <div className="location-content">
        {/* 예식장 정보 */}
        <div className="venue-info-header">
          <h3 className="venue-name-large">
            {venueName} 서울 그랜드볼룸
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
            <button className="map-overlay-btn" onClick={handleKakaoMap}>
              카카오맵 열기
            </button>
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
              <span className="transport-label">자차</span>
            </div>
            <div className="transport-details">
              <p className="transport-detail-text">네비게이션 : '서울 웨스턴조선호텔' 검색</p>
              <p className="transport-detail-text">서울시 중구 소공로 106 서울 웨스턴조선호텔</p>
            </div>
          </div>

          <div className="transport-divider"></div>

          <div className="transport-item">
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="18" height="13" rx="2"></rect>
                <path d="M3 10h18"></path>
                <circle cx="7" cy="15" r="1"></circle>
                <circle cx="17" cy="15" r="1"></circle>
              </svg>
              <span className="transport-label">버스</span>
            </div>
            <div className="transport-details">
              <p className="transport-detail-text">172(우리은행종로지점 방면)</p>
              <p className="transport-detail-text">서울광장역 하차 ⟩ 데미타스커피 원종 방면 ⟩ 도보 5분</p>
              <p className="transport-detail-text transport-spacing">405(롯데백화점 방면)</p>
              <p className="transport-detail-text">서울광장역 하차 ⟩ 데미타스커피 원종 방면 ⟩ 도보 5분</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

