import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { copyToClipboard } from '../utils/helpers';
import '../styles/Account.css';

interface AccountInfo {
  bank: string;
  account: string;
  holder: string;
  relation: string;
  name: string;
}

const Account: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [copied, setCopied] = useState<string | null>(null);
  const [groomOpen, setGroomOpen] = useState(true);
  const [brideOpen, setBrideOpen] = useState(false);

  const groomAccounts: AccountInfo[] = [
    {
      bank: '토스은행',
      account: '123-456-789012',
      holder: '신랑 이동진',
      relation: '신랑',
      name: '이민호',
    },
    {
      bank: '토스은행',
      account: '123-456-789012',
      holder: '신랑 아버지 이승국',
      relation: '신랑 아버지',
      name: '이승국',
    },
    {
      bank: '토스은행',
      account: '123-456-789012',
      holder: '신랑 어머니 장하은',
      relation: '신랑 어머니',
      name: '장하은',
    },
  ];

  const brideAccounts: AccountInfo[] = [
    {
      bank: '토스은행',
      account: '123-456-789012',
      holder: '신부 이예인',
      relation: '신부',
      name: '김소연',
    },
    {
      bank: '토스은행',
      account: '123-456-789012',
      holder: '신부 아버지 이태관',
      relation: '신부 아버지',
      name: '김태수',
    },
    {
      bank: '토스은행',
      account: '123-456-789012',
      holder: '신부 어머니 김양주',
      relation: '신부 어머니',
      name: '박미영',
    },
  ];

  const handleCopy = async (account: string, holder: string) => {
    const success = await copyToClipboard(account);
    if (success) {
      setCopied(holder);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleKakaoPay = () => {
    alert('카카오페이 송금 기능은 실제 배포 시 연동됩니다.');
  };

  const renderAccountCard = (account: AccountInfo, side: 'groom' | 'bride') => (
    <div className="account-card-new" key={`${side}-${account.holder}`}>
      <div className="account-card-header">
        <span className="account-relation">{account.relation}</span>
        <span className="account-name">{account.name}</span>
      </div>
      <div className="account-card-body">
        <div className="account-number-section">
          <span className="bank-name">{account.bank}</span>
          <span className="account-num">{account.account}</span>
        </div>
        <div className="account-actions">
          <button
            className="icon-btn copy-btn"
            onClick={() => handleCopy(account.account, account.holder)}
            title="계좌번호 복사"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button
            className="icon-btn kakaopay-btn"
            onClick={handleKakaoPay}
            title="카카오페이 송금"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.89 2.04 5.41 5.08 6.74L6 22l4.5-3.5c.5.07 1 .1 1.5.1 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={elementRef} className={`account-section-new section ${isVisible ? 'animate' : ''}`}>
      <h2 className="account-title-new">마음 전하실 곳</h2>

      <div className="account-divider-top"></div>
      
      <p className="account-subtitle">
        참석이 어려우신 분들을 위해 기재했습니다<br />
        너그러운 마음으로 양해 부탁드립니다
      </p>
      
      <div className="account-content-new">
        {/* 신랑측 아코디언 */}
        <div className="account-accordion">
          <button
            className={`accordion-header ${groomOpen ? 'active' : ''}`}
            onClick={() => setGroomOpen(!groomOpen)}
          >
            <span>신랑측에게</span>
            <svg
              className={`accordion-icon ${groomOpen ? 'open' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div className={`accordion-content ${groomOpen ? 'open' : ''}`}>
            <div className="account-cards-list">
              {groomAccounts.map((account) => renderAccountCard(account, 'groom'))}
            </div>
          </div>
        </div>

        {/* 신부측 아코디언 */}
        <div className="account-accordion">
          <button
            className={`accordion-header ${brideOpen ? 'active' : ''}`}
            onClick={() => setBrideOpen(!brideOpen)}
          >
            <span>신부측에게</span>
            <svg
              className={`accordion-icon ${brideOpen ? 'open' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div className={`accordion-content ${brideOpen ? 'open' : ''}`}>
            <div className="account-cards-list">
              {brideAccounts.map((account) => renderAccountCard(account, 'bride'))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;

