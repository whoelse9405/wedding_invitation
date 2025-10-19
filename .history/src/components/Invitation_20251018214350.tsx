import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/Invitation.css';

const Invitation: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={elementRef} className={`invitation-section ${isVisible ? 'animate' : ''}`}>
      <div className="invitation-content">
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
      </div>
    </section>
  );
};

export default Invitation;

