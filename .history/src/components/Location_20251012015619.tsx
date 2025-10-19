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
    // 카카오맵 API 초기화
    const initializeMap = () => {
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
    };

    // 카카오맵 API가 로드되었는지 확인하고 초기화
    if (window.kakao && window.kakao.maps) {
      // kakao.maps.load()를 사용하여 API가 완전히 준비될 때까지 대기
      window.kakao.maps.load(() => {
        initializeMap();
      });
    } else {
      // API 스크립트가 아직 로드되지 않은 경우 대기
      const checkKakaoMap = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakaoMap);
          window.kakao.maps.load(() => {
            initializeMap();
          });
        }
      }, 100);

      return () => clearInterval(checkKakaoMap);
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
      <h2 className="section-title">Location</h2>
      
      <div className="location-content">
        {/* 예식장 정보 */}
        <div className="venue-info">
          <div className="venue-name-wrapper">
            <h3 className="venue-name">{venueName}</h3>
            <a href={`tel:${venuePhone}`} className="phone-icon-link" title="전화 연결">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </a>
          </div>
          
          <div className="venue-address-wrapper">
            <p className="venue-address">{venueAddress}</p>
            <button 
              className={`copy-address-btn ${addressCopied ? 'copied' : ''}`}
              onClick={handleCopyAddress}
              title="주소 복사"
            >
              {addressCopied ? '복사됨' : '복사'}
            </button>
          </div>
        </div>

        {/* 카카오맵 */}
        <div className="map-container">
          <div id="map" ref={mapRef} className="kakao-map"></div>
        </div>
        
        {/* 길찾기 버튼 */}
        <div className="map-buttons">
          <button className="btn btn-primary" onClick={handleNaverMap}>
            네이버 지도
          </button>
          <button className="btn btn-primary" onClick={handleKakaoMap}>
            카카오맵
          </button>
          <button className="btn btn-primary" onClick={handleCall}>
            전화 연결
          </button>
        </div>
        
        {/* 교통 안내 */}
        <div className="transportation-info">
          <div className="transport-section">
            <h4 className="transport-title">지하철</h4>
            <div className="transport-content">
              <p>2호선 강남역 3번 출구 도보 5분</p>
              <p>신분당선 강남역 4번 출구 도보 3분</p>
            </div>
          </div>

          <div className="transport-section">
            <h4 className="transport-title">버스</h4>
            <div className="transport-content">
              <p>간선: 146, 148, 241, 301</p>
              <p>지선: 3411, 4412</p>
            </div>
          </div>

          <div className="transport-section">
            <h4 className="transport-title">주차</h4>
            <div className="transport-content">
              <p>건물 지하 1~3층 주차 가능</p>
              <p>3시간 무료 주차권 제공</p>
              <p className="parking-note">※ 주차 공간이 협소하오니 가급적 대중교통을 이용해 주시기 바랍니다</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

