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
import { useEffect, useRef } from 'react';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 사용자 상호작용 후 재생
    const playAudio = () => {
      audioRef.current?.play();
      document.removeEventListener('click', playAudio);
    };
    document.addEventListener('click', playAudio);
    return () => document.removeEventListener('click', playAudio);
  }, []);

  return (
    <div className="App">
      <audio ref={audioRef} loop>
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>
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
  );
}

export default App;

