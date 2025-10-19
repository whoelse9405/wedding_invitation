import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { callPhone, sendSMS } from '../utils/helpers';
import '../styles/Contact.css';

interface ContactPerson {
  name: string;
  phone: string;
  relation: string;
}

const Contact: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

  const contacts = {
    groom: {
      name: '동진',
      nameEn: 'DONGJIN',
      fatherName: '이승국',
      motherName: '장하은',
      persons: [
        { name: '이동진', phone: '010-4039-8579', relation: '신랑' },
        { name: '이승국', phone: '010-3892-8579', relation: '아버지' },
        { name: '장하은', phone: '010-3188-5323', relation: '어머니' },
      ] as ContactPerson[],
    },
    bride: {
      name: '예인',
      nameEn: 'YEIN',
      fatherName: '이태관',
      motherName: '김양주',
      persons: [
        { name: '이예인', phone: '010-8891-6225', relation: '신부' },
        { name: '이태관', phone: '010-2696-6224', relation: '아버지' },
        { name: '김양주', phone: '010-2696-7779', relation: '어머니' },
      ] as ContactPerson[],
    },
  };

  const handleCall = (phone: string) => {
    callPhone(phone);
  };

  const handleSMS = (phone: string) => {
    sendSMS(phone);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const renderContactCard = (person: ContactPerson) => (
    <div className="contact-person-card" key={person.phone}>
      <div className="contact-person-header">
        <span className="contact-person-name">{person.name}</span>
        {person.relation && <span className="contact-person-relation">{person.relation}</span>}
      </div>
      <div className="contact-person-actions">
        <button className="contact-action-btn sms-action" onClick={() => handleSMS(person.phone)}>
          문자 보내기
        </button>
        <button className="contact-action-btn call-action" onClick={() => handleCall(person.phone)}>
          전화하기
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section ref={elementRef} className={`contact-section-new ${isVisible ? 'animate' : ''}`}>
        <div className="contact-parents-display">
          <div className="parents-line">
            <span className="parents-group">
              <span className="parent-name">{contacts.groom.fatherName}</span>
              <span className="separator">·</span>
              <span className="parent-name">{contacts.groom.motherName}</span>
            </span>
            <span className="relation-text">의 아들</span>
            <span className="child-name">
              {contacts.groom.name}
              <span className="name-en">{contacts.groom.nameEn}</span>
            </span>
          </div>
          
          <div className="parents-line">
            <span className="parents-group">
              <span className="parent-name">{contacts.bride.fatherName}</span>
              <span className="separator">·</span>
              <span className="parent-name">{contacts.bride.motherName}</span>
            </span>
            <span className="relation-text">의 딸</span>
            <span className="child-name">
              {contacts.bride.name}
              <span className="name-en">{contacts.bride.nameEn}</span>
            </span>
          </div>
        </div>

        <button className="contact-open-btn" onClick={handleOpenModal}>
          축하 연락하기
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </section>

      {modalOpen && (
        <div className="contact-modal-overlay" onClick={handleCloseModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="modal-title">축하 연락하기</h2>
            <p className="modal-subtitle">직접 축하의 마음을 전해보세요</p>

            <div className="modal-tabs">
              <button
                className={`modal-tab ${activeTab === 'groom' ? 'active' : ''}`}
                onClick={() => setActiveTab('groom')}
              >
                신랑에게
              </button>
              <button
                className={`modal-tab ${activeTab === 'bride' ? 'active' : ''}`}
                onClick={() => setActiveTab('bride')}
              >
                신부에게
              </button>
            </div>

            <div className="modal-content">
              {activeTab === 'groom' && (
                <div className="contact-persons-list">
                  {contacts.groom.persons.map((person) => renderContactCard(person))}
                </div>
              )}
              {activeTab === 'bride' && (
                <div className="contact-persons-list">
                  {contacts.bride.persons.map((person) => renderContactCard(person))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;

