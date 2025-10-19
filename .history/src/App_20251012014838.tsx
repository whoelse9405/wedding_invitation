import { useEffect, useRef, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Intro from './components/Intro';
import Invitation from './components/Invitation';
import DateTime from './components/DateTime';
import Location from './components/Location';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Account from './components/Account';
import Guestbook from './components/Guestbook';
import Share from './components/Share';
import Footer from './components/Footer';
import './styles/global.css';
import './styles/sections-unified.css';
import './styles/MusicPlayer.css';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 오디오 볼륨 설정
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 볼륨 50%로 설정
    }

    // 자동 재생 시도
    const tryAutoPlay = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          setIsMuted(false);
        }
      } catch (error) {
        // 자동 재생이 차단된 경우, 사용자 상호작용 대기
        console.log('자동 재생이 차단되었습니다. 사용자 클릭을 기다립니다.');
        const playOnInteraction = async () => {
          try {
            if (audioRef.current && !isPlaying) {
              audioRef.current.volume = 0.5;
              await audioRef.current.play();
              setIsPlaying(true);
              setIsMuted(false);
              document.removeEventListener('click', playOnInteraction);
            }
          } catch (err) {
            console.error('재생 실패:', err);
            alert('음악 파일이 없습니다. public 폴더에 bgm.mp3 파일을 추가해주세요.');
          }
        };
        document.addEventListener('click', playOnInteraction);
        
        return () => document.removeEventListener('click', playOnInteraction);
      }
    };

    const timer = setTimeout(tryAutoPlay, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.pause();
        setIsMuted(true);
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => {
          console.error('재생 실패:', err);
          alert('음악 파일이 없습니다. public 폴더에 bgm.mp3 파일을 추가해주세요.');
        });
        setIsMuted(false);
        setIsPlaying(true);
      }
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      
      <div className="App">
        <audio ref={audioRef} loop preload="auto">
          <source src="bgm.mp3" type="audio/mpeg" />
          브라우저가 오디오를 지원하지 않습니다.
        </audio>
        
        {/* 음악 컨트롤 버튼 */}
        <button 
          className={`music-control-btn ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? '음악 재생' : '음악 일시정지'}
        >
          <div className="music-icon">
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
              </svg>
            )}
          </div>
        </button>

        <Intro />
        <Invitation />
        <DateTime />
        <Location />
        <Gallery />
        <Contact />
        <Account />
        <Guestbook />
        <Share />
        <Footer />
      </div>
    </>
  );
}

export default App;

