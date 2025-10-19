import React from 'react';
import { callPhone, sendSMS } from '../utils/helpers';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const contacts = {
    groom: {
      name: '신랑 홍길동',
      phone: '010-1234-5678',
      father: {
        name: '아버지 홍아버',
        phone: '010-1111-2222',
      },
      mother: {
        name: '어머니 홍어머',
        phone: '010-3333-4444',
      },
    },
    bride: {
      name: '신부 이영희',
      phone: '010-8765-4321',
      father: {
        name: '아버지 이아버',
        phone: '010-5555-6666',
      },
      mother: {
        name: '어머니 이어머',
        phone: '010-7777-8888',
      },
    },
  };

  const handleCall = (phone: string) => {
    callPhone(phone);
  };

  const handleSMS = (phone: string) => {
    sendSMS(phone);
  };

  return (
    <section className="contact-section section">
      <h2 className="section-title">Contact</h2>
      
      <div className="contact-content">
        <div className="contact-group">
          <h3 className="contact-side-title">신랑측</h3>
          
          <div className="contact-card card">
            <div className="contact-main">
              <p className="contact-name">{contacts.groom.name}</p>
              <div className="contact-buttons">
                <button 
                  className="contact-btn call-btn"
                  onClick={() => handleCall(contacts.groom.phone)}
                >
                  📞 전화하기
                </button>
                <button 
                  className="contact-btn sms-btn"
                  onClick={() => handleSMS(contacts.groom.phone)}
                >
                  💬 문자하기
                </button>
              </div>
            </div>
            
            <div className="contact-parents">
              <div className="contact-parent">
                <p className="parent-label">혼주</p>
                <p className="parent-name">{contacts.groom.father.name}</p>
                <div className="parent-buttons">
                  <button 
                    className="parent-btn"
                    onClick={() => handleCall(contacts.groom.father.phone)}
                  >
                    📞
                  </button>
                  <button 
                    className="parent-btn"
                    onClick={() => handleSMS(contacts.groom.father.phone)}
                  >
                    💬
                  </button>
                </div>
              </div>
              
              <div className="contact-parent">
                <p className="parent-label">혼주</p>
                <p className="parent-name">{contacts.groom.mother.name}</p>
                <div className="parent-buttons">
                  <button 
                    className="parent-btn"
                    onClick={() => handleCall(contacts.groom.mother.phone)}
                  >
                    📞
                  </button>
                  <button 
                    className="parent-btn"
                    onClick={() => handleSMS(contacts.groom.mother.phone)}
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-divider">♥</div>

        <div className="contact-group">
          <h3 className="contact-side-title">신부측</h3>
          
          <div className="contact-card card">
            <div className="contact-main">
              <p className="contact-name">{contacts.bride.name}</p>
              <div className="contact-buttons">
                <button 
                  className="contact-btn call-btn"
                  onClick={() => handleCall(contacts.bride.phone)}
                >
                  📞 전화하기
                </button>
                <button 
                  className="contact-btn sms-btn"
                  onClick={() => handleSMS(contacts.bride.phone)}
                >
                  💬 문자하기
                </button>
              </div>
            </div>
            
            <div className="contact-parents">
              <div className="contact-parent">
                <p className="parent-label">혼주</p>
                <p className="parent-name">{contacts.bride.father.name}</p>
                <div className="parent-buttons">
                  <button 
                    className="parent-btn"
                    onClick={() => handleCall(contacts.bride.father.phone)}
                  >
                    📞
                  </button>
                  <button 
                    className="parent-btn"
                    onClick={() => handleSMS(contacts.bride.father.phone)}
                  >
                    💬
                  </button>
                </div>
              </div>
              
              <div className="contact-parent">
                <p className="parent-label">혼주</p>
                <p className="parent-name">{contacts.bride.mother.name}</p>
                <div className="parent-buttons">
                  <button 
                    className="parent-btn"
                    onClick={() => handleCall(contacts.bride.mother.phone)}
                  >
                    📞
                  </button>
                  <button 
                    className="parent-btn"
                    onClick={() => handleSMS(contacts.bride.mother.phone)}
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

