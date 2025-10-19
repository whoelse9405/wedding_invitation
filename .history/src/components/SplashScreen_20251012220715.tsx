import React, { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  // 스플래시 설정 (수정 가능)
  const splashConfig = {
    line1: 'we are getting married',
    line2: '2026년 1월 25일',
    duration: 3500, // 스플래시 총 표시 시간 (ms)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // 페이드 아웃 후 제거
    }, splashConfig.duration);

    return () => clearTimeout(timer);
  }, [onFinish, splashConfig.duration]);

  if (!isVisible) {
    return (
      <div className="splash-screen fade-out">
        <div className="splash-content">
          <h1 className="splash-text line1">{splashConfig.line1}</h1>
          <p className="splash-text line2">{splashConfig.line2}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <h1 className="splash-text line1">{splashConfig.line1}</h1>
        <p className="splash-text line2">{splashConfig.line2}</p>
      </div>
    </div>
  );
};

export default SplashScreen;

