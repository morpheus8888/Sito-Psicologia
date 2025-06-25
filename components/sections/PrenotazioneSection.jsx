'use client'
import { Trans } from '@lingui/macro'

export default function PrenotazioneSection() {
  return (
    <section className="section section-darkest" id="prenotazione">
      <div className="section-content">
        <h2 className="fade-in"><strong><Trans>Prenota il tuo incontro</Trans></strong></h2>
        <p className="fade-in"><Trans>Prenota facilmente la tua seduta, in presenza o online.</Trans></p>
      </div>
    </section>
  )
}
