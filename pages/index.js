import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const Quiz = dynamic(() => import('../components/Quiz'), { ssr: false });

export default function Home() {
  const { i18n } = useLingui();
  return (
    <>
      <Head>
        <title><Trans>Psicologa Etica</Trans></title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <section className="hero-section" id="home">
        <img src="/images/background.png" alt="Hero Image" className="hero-img" />
        <div className="hero-rotating-container">
          <div className="single-line-rotating-text">
            <span className="static-part"><Trans>psicologia</Trans></span>
            <span className="rotating-part">
              <span className="word alizarin"><Trans>sorprendente.</Trans></span>
              <span className="word wisteria"><Trans>curativa.</Trans></span>
              <span className="word peter-river"><Trans>emozionante.</Trans></span>
              <span className="word emerald"><Trans>trasformativa.</Trans></span>
              <span className="word sun-flower"><Trans>potente.</Trans></span>
            </span>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="servizi">
        <div className="section-content">
          <h2 className="fade-in"><strong><Trans>Un progetto rivoluzionario</Trans></strong></h2>
          <p className="fade-in"><Trans>Scopri un nuovo modo di affrontare il benessere mentale.</Trans></p>
        </div>
      </section>

      <section className="section section-darker" id="percorsi">
        <div className="section-content">
          <h2 className="fade-in"><strong><Trans>Percorsi personalizzati</Trans></strong></h2>
          <p className="fade-in"><Trans>Ogni passo avanti è una conquista. Nulla è impossibile.</Trans></p>
        </div>
      </section>

      <section className="section section-dark" id="quiz">
        <div className="section-content">
          <h2 className="fade-in"><strong><Trans>Quiz</Trans></strong></h2>
          <Quiz />
        </div>
      </section>

      <section className="section section-darkest" id="prenotazione">
        <div className="section-content">
          <h2 className="fade-in"><strong><Trans>Prenota il tuo incontro</Trans></strong></h2>
          <p className="fade-in"><Trans>Prenota facilmente la tua seduta, in presenza o online.</Trans></p>
        </div>
      </section>

      <section className="section section-dark" id="diario">
        <div className="section-content">
          <h2 className="fade-in"><strong><Trans>Il tuo Diario</Trans></strong></h2>
          <textarea id="diarioTextarea" className="diario-textarea fade-in" placeholder={i18n._(t`Scrivi qui il tuo diario...`)}></textarea>
        </div>
      </section>

      <section className="section section-darker" id="contatti">
        <div className="section-content">
          <h2 className="fade-in"><strong><Trans>Contattami</Trans></strong></h2>
          <p className="fade-in"><Trans>Scorri in basso per sapere come contattarmi in qualsiasi momento.</Trans></p>
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
        <p>&copy; 2025 <Trans>Psicologa Etica. Tutti i diritti riservati.</Trans></p>
      </footer>

      <Script src="/js/script.js" strategy="afterInteractive" />
      <Script src="/js/rotatingText.js" strategy="afterInteractive" />
    </>
  );
}
