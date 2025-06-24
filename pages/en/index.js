import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const Quiz = dynamic(() => import('../../components/Quiz'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Ethical Psychologist</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <LanguageSwitcher />

      <header className="menu-top">
        <div className="header-bar">
          <button className="toggle-button">☰</button>
        </div>
        <nav>
          <ul>
            <li id="home"><a href="#home">Home</a></li>
            <li id="servizi"><a href="#servizi">Services</a></li>
            <li id="percorsi"><a href="#percorsi">Paths</a></li>
            <li id="quiz"><a href="#quiz">Quiz</a></li>
            <li id="prenotazione"><a href="#prenotazione">Booking</a></li>
            <li id="contatti"><a href="#contatti">Contacts</a></li>
            <li id="diario"><a href="#diario">Diary</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <img src="/images/background.png" alt="Hero Image" className="hero-img" />
        <div className="hero-rotating-container">
          <div className="single-line-rotating-text">
            <span className="static-part">psicologia</span>
            <span className="rotating-part">
              <span className="word alizarin">surprising.</span>
              <span className="word wisteria">healing.</span>
              <span className="word peter-river">exciting.</span>
              <span className="word emerald">transformative.</span>
              <span className="word sun-flower">powerful.</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="servizi">
        <div className="section-content">
          <h2 className="fade-in"><strong>A groundbreaking project</strong></h2>
          <p className="fade-in">Discover a new way to approach mental well-being.</p>
        </div>
      </section>

      <section className="section section-darker" id="percorsi">
        <div className="section-content">
          <h2 className="fade-in"><strong>Personalized paths</strong></h2>
          <p className="fade-in">Every step forward is a victory. Nothing is impossible.</p>
        </div>
      </section>

      <section className="section section-dark" id="quiz">
        <div className="section-content">
          <h2 className="fade-in"><strong>Quiz</strong></h2>
          <Quiz />
        </div>
      </section>

      <section className="section section-darkest" id="prenotazione">
        <div className="section-content">
          <h2 className="fade-in"><strong>Book your session</strong></h2>
          <p className="fade-in">Schedule your meeting easily, in person or online.</p>
        </div>
      </section>

      <section className="section section-dark" id="diario">
        <div className="section-content">
          <h2 className="fade-in"><strong>Your Journal</strong></h2>
          <textarea id="diarioTextarea" className="diario-textarea fade-in" placeholder="Write your journal here..."></textarea>
        </div>
      </section>

      <section className="section section-darker" id="contatti">
        <div className="section-content">
          <h2 className="fade-in"><strong>Contact me</strong></h2>
          <p className="fade-in">Scroll down to find out how to reach me anytime.</p>
          <div className="bubble fade-in" id="contactBubble">
            <div className="loader" id="loaderDots"></div>
            <div id="typedtext"></div>
          </div>
          <a href="mailto:info@tua-mail.com?subject=Richiesta%20Info" className="fade-in letter-container" id="letterContainer">
            <div className="letter-image">
              <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                  <div className="letter-border"></div>
                  <div className="letter-title"></div>
                  <div className="letter-context"></div>
                  <div className="letter-stamp">
                    <div className="letter-stamp-inner"></div>
                  </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
              </div>
              <div className="shadow"></div>
            </div>
          </a>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Ethical Psychologist. All rights reserved.</p>
      </footer>

      <Script src="/js/script.js" strategy="afterInteractive" />
      <Script src="/js/rotatingText.js" strategy="afterInteractive" />
    </>
  );
}
