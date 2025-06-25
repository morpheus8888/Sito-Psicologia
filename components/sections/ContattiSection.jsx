'use client'
import { Trans } from '@lingui/macro'

export default function ContattiSection() {
  return (
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
  )
}
