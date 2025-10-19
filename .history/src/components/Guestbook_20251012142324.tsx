import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/Guestbook.css';

const Guestbook: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const commentBoxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // utterances 스크립트 생성
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME'); // 여기에 GitHub 저장소 주소 입력
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    
    if (commentBoxRef.current) {
      commentBoxRef.current.appendChild(script);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      if (commentBoxRef.current) {
        commentBoxRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <section ref={elementRef} className={`guestbook-section ${isVisible ? 'animate' : ''}`}>
      <h2 className="section-title">방명록</h2>
      
      <p className="guestbook-intro">
        축하의 마음을 전해주세요<br />
        소중한 메시지 감사히 읽겠습니다
      </p>
      
      <div className="guestbook-content">
        <div className="utterances-wrapper" ref={commentBoxRef}></div>
      </div>
    </section>
  );
};

export default Guestbook;
