import React from 'react';
import '../styles/Invitation.css';

const Invitation: React.FC = () => {
  return (
    <section className="invitation-section section">
      <div className="invitation-content">
        <div className="invitation-ornament">❀</div>
        
        <h2 className="invitation-title">소중한 분들을 초대합니다</h2>
        
        <p className="invitation-message">
          서로가 마주보며 다져온 사랑을<br />
          이제 함께 한 곳을 바라보며<br />
          걸어갈 수 있는 큰 사랑으로 키우고자 합니다.<br />
          <br />
          저희 두 사람이 사랑의 이름으로<br />
          평생을 함께 하고자 하오니<br />
          오셔서 축복해 주시면 감사하겠습니다.
        </p>
        
        <div className="invitation-parents">
          <div className="parent-info">
            <p className="parent-label">신랑측 혼주</p>
            <p className="parent-names">
              <span>아버지 홍길동</span>
              <span>어머니 김영희</span>
            </p>
            <p className="parent-child">의 장남 <strong>홍신랑</strong></p>
          </div>
          
          <div className="divider-ornament">♥</div>
          
          <div className="parent-info">
            <p className="parent-label">신부측 혼주</p>
            <p className="parent-names">
              <span>아버지 이철수</span>
              <span>어머니 박순자</span>
            </p>
            <p className="parent-child">의 장녀 <strong>이신부</strong></p>
          </div>
        </div>
        
        <div className="invitation-ornament">❀</div>
      </div>
    </section>
  );
};

export default Invitation;

