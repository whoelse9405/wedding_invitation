import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/Guestbook.css';

const Guestbook: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  // Google Forms URL을 여기에 입력하세요
  const googleFormUrl = 'YOUR_GOOGLE_FORM_URL';
  
  return (
    <section ref={elementRef} className={`guestbook-section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title">방명록</h2>
      
      <p className="guestbook-intro">
        축하의 마음을 전해주세요<br />
        소중한 메시지 감사히 읽겠습니다
      </p>
      
      <div className="guestbook-content">
        <div className="guestbook-placeholder">
          <h3>방명록 기능</h3>
          <p className="guestbook-description">
            방명록 기능을 사용하려면<br />
            다음 중 하나를 선택하여 구현할 수 있습니다:
          </p>
          
          <div className="guestbook-options">
            <div className="option-card">
              <h4>1. Google Forms</h4>
              <p>무료이며 설정이 간단합니다</p>
              <ul>
                <li>Google Forms에서 설문 생성</li>
                <li>임베드 코드 복사</li>
                <li>이 컴포넌트에 추가</li>
              </ul>
            </div>
            
            <div className="option-card">
              <h4>2. Firebase</h4>
              <p>실시간 댓글 시스템 구현</p>
              <ul>
                <li>Firebase 프로젝트 생성</li>
                <li>Firestore 설정</li>
                <li>읽기/쓰기 컴포넌트 구현</li>
              </ul>
            </div>
            
            <div className="option-card">
              <h4>3. GitHub Issues</h4>
              <p>GitHub를 활용한 댓글 시스템</p>
              <ul>
                <li>utterances 또는 giscus 사용</li>
                <li>GitHub 저장소 필요</li>
                <li>간단한 스크립트 추가</li>
              </ul>
            </div>
          </div>
          
          <div className="implementation-note">
            <p>
              <strong>구현 팁</strong><br />
              Google Forms를 사용하는 것이 가장 빠르고 쉬운 방법입니다.<br />
              Forms 생성 후 "보내기" → "임베드" 코드를 복사하여 사용하세요.
            </p>
          </div>
        </div>
        
        {/* Google Forms 임베드 예시 (실제 URL로 교체하세요) */}
        {googleFormUrl !== 'YOUR_GOOGLE_FORM_URL' && (
          <div className="guestbook-form">
            <iframe
              src={googleFormUrl}
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="방명록"
            >
              로딩중...
            </iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;

