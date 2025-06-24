import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const Quiz = dynamic(() => import('../components/Quiz'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Psicologa Etica</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header className="menu-top">
        <div className="header-bar">
          <button className="toggle-button">☰</button>
        </div>
        <nav>
          <ul>
            <li id="home"><a href="#home">Home</a></li>
            <li id="servizi"><a href="#servizi">Servizi</a></li>
            <li id="percorsi"><a href="#percorsi">Percorsi</a></li>
            <li id="quiz"><a href="#quiz">Quiz</a></li>
            <li id="prenotazione"><a href="#prenotazione">Prenotazione</a></li>
            <li id="contatti"><a href="#contatti">Contatti</a></li>
            <li id="diario"><a href="#diario">Diario</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <img src="/images/background.png" alt="Hero Image" className="hero-img" />
        <div className="hero-rotating-container">
          <div className="single-line-rotating-text">
            <span className="static-part">psicologia</span>
            <span className="rotating-part">
              <span className="word alizarin">sorprendente.</span>
              <span className="word wisteria">curativa.</span>
              <span className="word peter-river">emozionante.</span>
              <span className="word emerald">trasformativa.</span>
              <span className="word sun-flower">potente.</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="servizi">
        <div className="section-content">
          <h2 className="fade-in"><strong>Un progetto rivoluzionario</strong></h2>
          <p className="fade-in">Scopri un nuovo modo di affrontare il benessere mentale.</p>
        </div>
      </section>

      <section className="section section-darker" id="percorsi">
        <div className="section-content">
          <h2 className="fade-in"><strong>Percorsi personalizzati</strong></h2>
          <p className="fade-in">Ogni passo avanti è una conquista. Nulla è impossibile.</p>
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
          <h2 className="fade-in"><strong>Prenota il tuo incontro</strong></h2>
          <p className="fade-in">Prenota facilmente la tua seduta, in presenza o online.</p>
        </div>
      </section>

      <section className="section section-dark" id="diario">
        <div className="section-content">
          <h2 className="fade-in"><strong>Il tuo Diario</strong></h2>
          <textarea id="diarioTextarea" className="diario-textarea fade-in" placeholder="Scrivi qui il tuo diario..."></textarea>
        </div>
      </section>

      <section className="section section-darker" id="contatti">
        <div className="section-content">
          <h2 className="fade-in"><strong>Contattami</strong></h2>
          <p className="fade-in">Scorri in basso per sapere come contattarmi in qualsiasi momento.</p>
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
        <p>&copy; 2025 Psicologa Etica. Tutti i diritti riservati.</p>
      </footer>

      <Script src="/js/script.js" strategy="afterInteractive" />
      <Script src="/js/rotatingText.js" strategy="afterInteractive" />
    </>
  );
}
