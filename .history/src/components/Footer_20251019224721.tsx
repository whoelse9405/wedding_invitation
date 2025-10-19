import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <section className="footer-section">
      <div className="footer-content">
        <div className="footer-symbol">
          <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 우아한 필기체 스타일 심볼 */}
            <path 
              d="M 30 20 Q 35 15, 45 18 T 65 25 Q 70 28, 72 35 T 70 45 Q 68 50, 60 52 L 45 56 Q 35 58, 30 62" 
              stroke="#9a9a9a" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M 50 40 L 50 120 Q 50 130, 45 135" 
              stroke="#9a9a9a" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M 35 100 L 65 100" 
              stroke="#9a9a9a" 
              strokeWidth="2" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="footer-copyright">
          © TO OUR GUEST
        </p>
      </div>

      <div className="footer-content">
        <br>d</br>
      </div>
    </section>
  );
};

export default Footer;

