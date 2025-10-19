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
  const venueAddress = '서울 종로구 돈화문로11가길 47';
  const venueDate = '2026년 1월 17일 토요일 오전 10시';
  
  // 투아워게스트 가든 좌표 (실제 좌표로 변경 필요)
  const lat = 37.5796;
  const lng = 126.9904;

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

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:10px;font-size:14px;text-align:center;min-width:150px;">
                      <strong>${venueName}</strong>
                    </div>`,
        });
        infowindow.open(map, marker);
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

  return (
    <section ref={elementRef} className={`reception-section section ${isVisible ? 'animate' : ''}`}>
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
        
        {/* 피로연 정보 */}
        <div className="reception-info-card">
          <h3 className="reception-subtitle">신랑 이동진 · 신부 이예인 피로연</h3>
          
          <div className="reception-details">
            <p className="reception-date">{venueDate}</p>
            <p className="reception-venue">{venueName}</p>
            <div className="reception-address-wrapper">
              <p className="reception-address">{venueAddress}</p>
              <button 
                className={`copy-address-icon ${addressCopied ? 'copied' : ''}`}
                onClick={handleCopyAddress}
                title="주소 복사"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 지도 */}
        <div className="reception-map-container">
          <div id="reception-map" ref={mapRef} className="reception-map"></div>
        </div>
      </div>
    </section>
  );
};

export default Reception;


