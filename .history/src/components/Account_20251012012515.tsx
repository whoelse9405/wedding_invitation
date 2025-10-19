import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { copyToClipboard } from '../utils/helpers';
import '../styles/Account.css';

interface AccountInfo {
  bank: string;
  account: string;
  holder: string;
}

const Account: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [copied, setCopied] = useState<string | null>(null);

  const groomAccounts: AccountInfo[] = [
    {
      bank: '국민은행',
      account: '94039857958',
      holder: '신랑 이동진',
    },
    {
      bank: '국민은행',
      account: '123-45-678901',
      holder: '혼주 이승국',
    },
    {
      bank: '우리은행',
      account: '1002-123-456789',
      holder: '혼주 장하연',
    },
  ];

  const brideAccounts: AccountInfo[] = [
    {
      bank: '카카오뱅크',
      account: '3333-01-2345678',
      holder: '신부 이예인',
    },
    {
      bank: '하나은행',
      account: '123-456789-01234',
      holder: '혼주 이태관',
    },
    {
      bank: '농협은행',
      account: '352-1234-5678-90',
      holder: '혼주 김양주',
    },
  ];

  const handleCopy = async (account: string, holder: string) => {
    const success = await copyToClipboard(account);
    if (success) {
      setCopied(holder);
      setTimeout(() => setCopied(null), 2000);
    } else {
      alert('계좌번호 복사에 실패했습니다.');
    }
  };

  const renderAccountCard = (account: AccountInfo, side: 'groom' | 'bride') => (
    <div className="account-item" key={`${side}-${account.holder}`}>
      <div className="account-info">
        <p className="account-holder">{account.holder}</p>
        <p className="account-details">
          <span className="account-bank">{account.bank}</span>
          <span className="account-number">{account.account}</span>
        </p>
      </div>
      <button
        className={`account-copy-btn ${copied === account.holder ? 'copied' : ''}`}
        onClick={() => handleCopy(account.account, account.holder)}
      >
        {copied === account.holder ? '복사됨' : '복사'}
      </button>
    </div>
  );

  return (
    <section ref={elementRef} className={`account-section section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title">마음 전하실 곳</h2>
      
      <p className="account-intro">
        참석이 어려우신 분들을 위해<br />
        계좌번호를 안내드립니다
      </p>
      
      <div className="account-content">
        <div className="account-group">
          <h3 className="account-side-title">신랑측 계좌</h3>
          <div className="account-list">
            {groomAccounts.map((account) => renderAccountCard(account, 'groom'))}
          </div>
        </div>

        <div className="account-divider">
          <div className="divider-line"></div>
          <div className="divider-icon">♥</div>
          <div className="divider-line"></div>
        </div>

        <div className="account-group">
          <h3 className="account-side-title">신부측 계좌</h3>
          <div className="account-list">
            {brideAccounts.map((account) => renderAccountCard(account, 'bride'))}
          </div>
        </div>
      </div>

      <div className="account-notice">
        <p>보내주신 마음 소중히 간직하겠습니다</p>
      </div>
    </section>
  );
};

export default Account;

