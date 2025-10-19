import React from 'react';
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

function App() {
  return (
    <div className="App">
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

