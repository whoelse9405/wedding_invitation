import React from 'react';
import { openNaverMap, openKakaoMap, callPhone } from '../utils/helpers';
import '../styles/Location.css';

const Location: React.FC = () => {
  const venueName = '웨딩홀 이름';
  const venueAddress = '서울특별시 강남구 테헤란로 123';
  const venuePhone = '02-1234-5678';
  const venueFloor = '3층 그랜드홀';
  
  // 좌표는 실제 장소에 맞게 수정하세요
  const lat = 37.5665;
  const lng = 126.9780;

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
        <div className="location-info card">
          <h3 className="venue-name">{venueName}</h3>
          <p className="venue-floor">{venueFloor}</p>
          
          <div className="info-item">
            <span className="info-icon">📍</span>
            <p className="info-text">{venueAddress}</p>
          </div>
          
          <div className="info-item">
            <span className="info-icon">☎️</span>
            <p className="info-text clickable" onClick={handleCall}>
              {venuePhone}
            </p>
          </div>
        </div>
        
        <div className="map-container">
          {/* 카카오맵 또는 네이버 지도 임베드 */}
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <p>지도를 표시하려면<br />지도 API 키가 필요합니다</p>
            <p className="map-note">
              네이버 지도 또는 카카오맵 API를<br />
              추가하여 지도를 표시할 수 있습니다
            </p>
          </div>
        </div>
        
        <div className="map-buttons">
          <button className="btn btn-primary" onClick={handleNaverMap}>
            <span>네이버 지도</span>
          </button>
          <button className="btn btn-primary" onClick={handleKakaoMap}>
            <span>카카오맵</span>
          </button>
        </div>
        
        <div className="transportation-info">
          <h4 className="transport-title">🚇 대중교통 안내</h4>
          <div className="transport-items">
            <div className="transport-item">
              <strong>지하철</strong>
              <p>2호선 강남역 3번 출구 도보 5분</p>
              <p>신분당선 강남역 4번 출구 도보 3분</p>
            </div>
            <div className="transport-item">
              <strong>버스</strong>
              <p>간선: 146, 148, 241, 301</p>
              <p>지선: 3411, 4412</p>
            </div>
          </div>
          
          <h4 className="transport-title">🚗 주차 안내</h4>
          <div className="parking-info">
            <p>건물 지하 1~3층 주차 가능</p>
            <p>3시간 무료 주차권 제공</p>
            <p className="parking-note">※ 주차 공간이 협소하오니 가급적 대중교통을 이용해 주시기 바랍니다</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

