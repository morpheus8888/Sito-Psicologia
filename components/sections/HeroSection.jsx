'use client'
import { Trans } from '@lingui/macro'

export default function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <img src="/images/background.png" alt="Hero" className="hero-img" />
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
  )
}
