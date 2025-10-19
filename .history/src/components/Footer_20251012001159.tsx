import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-message">
          감사합니다 ♥
        </p>
        <p className="footer-names">
          이동진 · 이예인
        </p>
        <p className="footer-date">
          2026. 01. 25
        </p>
        <div className="footer-divider"></div>
        <p className="footer-copyright">
          © 2026 Wedding Invitation
        </p>
      </div>
    </footer>
  );
};

export default Footer;

