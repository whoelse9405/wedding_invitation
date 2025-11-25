import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { openNaverMap, openKakaoMap, copyToClipboard } from '../utils/helpers';
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

  // const handleCall = () => {
  //   callPhone(venuePhone);
  // };

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
      <h2 className="section-title location-title">오시는 길</h2>
      
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
                {/* 둥근 사각형 테두리 */}
                <rect x="2" y="2" width="20" height="20" rx="4" ry="4" strokeWidth="2.5"></rect>
                {/* P 문자 - 세로선 */}
                <line x1="9" y1="7" x2="9" y2="17" strokeWidth="2.5" strokeLinecap="round"></line>
                {/* P 문자 - 상단 곡선 부분 */}
                <path d="M 9 7 L 13 7 C 14.5 7 15.5 8 15.5 9.5 C 15.5 11 14.5 12 13 12 L 9 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="transport-label">주차</span>
            </div>
            <div className="transport-details">
              <p className="transport-detail-text"><strong>도보 5분 소요 - 2시간 무료 주차</strong></p>
              <p className="transport-detail-text">제1 주차장: 서울시 강남구 논현동 237-12 경복주차장</p>
              <p className="transport-detail-text">제2 주차장: 서울시 강남구 언주로 603 국민은행</p>
              <p className="transport-detail-text">제3 주차장: 서울시 강남구 언주로 609 PAX타워</p>
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
              <p className="transport-detail-text"><strong>아크로힐스논현 하차(구 경복아파트)</strong></p>
              <p className="transport-detail-text">지선버스: 3412번, 6411번</p>
              <p className="transport-detail-text transport-spacing"><strong>라움아트센터, 시티프라움더강남 하차</strong></p>
              <p className="transport-detail-text">간선버스: 141번, 242번</p>
            </div>
          </div>

          <div className="transport-divider"></div>

          <div className="transport-item">
            <div className="transport-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {/* 지하철 외부 테두리 (상단 둥근 사각형) */}
                <path d="M 4 22 L 4 7 C 4 4.5 5.5 3 8 3 L 16 3 C 18.5 3 20 4.5 20 7 L 20 22" strokeLinejoin="round"/>
                {/* 중앙 상단 큰 창문 (채워진 직사각형) */}
                <rect x="6" y="5.5" width="12" height="8" rx="1" fill="currentColor" stroke="none"/>
                {/* 하단 좌측 바퀴 (채워진 원) */}
                <circle cx="8" cy="17.5" r="1.5" fill="currentColor" stroke="none"/>
                {/* 하단 우측 바퀴 (채워진 원) */}
                <circle cx="16" cy="17.5" r="1.5" fill="currentColor" stroke="none"/>
                {/* 하단 X자 레일 - 좌측 사선 */}
                <path d="M 7 21 L 10.5 24" strokeLinecap="round" strokeWidth="2.5"/>
                {/* 하단 X자 레일 - 우측 사선 */}
                <path d="M 17 21 L 13.5 24" strokeLinecap="round" strokeWidth="2.5"/>
                {/* 하단 레일 연결선 */}
                <line x1="6.5" y1="23.5" x2="17.5" y2="23.5" strokeWidth="2"/>
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

