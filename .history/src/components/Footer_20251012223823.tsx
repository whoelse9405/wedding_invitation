import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-symbol">
          <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L50 100" stroke="#a8a8a8" strokeWidth="2"/>
            <circle cx="50" cy="15" r="8" stroke="#a8a8a8" strokeWidth="2" fill="none"/>
            <path d="M30 20 Q50 35 70 20" stroke="#a8a8a8" strokeWidth="1.5" fill="none"/>
            <path d="M35 30 Q50 40 65 30" stroke="#a8a8a8" strokeWidth="1.5" fill="none"/>
            <path d="M40 40 Q50 48 60 40" stroke="#a8a8a8" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <p className="footer-copyright">
          © DONGJIN & YEIN
        </p>
      </div>
    </footer>
  );
};

export default Footer;

