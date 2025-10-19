import React, { useEffect, useRef } from 'react';
import { openNaverMap, openKakaoMap, callPhone } from '../utils/helpers';
import '../styles/Location.css';

declare global {
  interface Window {
    kakao: any;
  }
}

const Location: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const venueName = '아르베';
  const venueAddress = '서울특별시 강남구 봉은사로 302';
  const venuePhone = '02-564-7031';
  const venueFloor = '3층 그랜드홀';
  
  // 아르베 웨딩홀 좌표
  const lat = 37.508705;
  const lng = 127.039438;

  useEffect(() => {
    // 카카오맵 초기화
    if (mapRef.current && window.kakao && window.kakao.maps) {
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
                    <strong>${venueName}</strong><br/>
                    ${venueFloor}
                  </div>`,
      });
      infowindow.open(map, marker);
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

  return (
    <section className="location-section section">
      <h2 className="section-title">Location</h2>
      
      <div className="location-content">
        {/* 예식장 정보 */}
        <div className="venue-info">
          <h3 className="venue-name">{venueName}</h3>
          <p className="venue-floor">{venueFloor}</p>
          <p className="venue-address">{venueAddress}</p>
          <a href={`tel:${venuePhone}`} className="venue-phone">{venuePhone}</a>
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

