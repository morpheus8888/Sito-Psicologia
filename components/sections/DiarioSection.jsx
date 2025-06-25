'use client'
import { Trans, t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export default function DiarioSection() {
  const { i18n } = useLingui()
  return (
    <section className="section section-dark" id="diario">
      <div className="section-content">
        <h2 className="fade-in"><strong><Trans>Il tuo Diario</Trans></strong></h2>
        <textarea className="diario-textarea fade-in" placeholder={i18n._(t`Scrivi qui il tuo diario...`)}></textarea>
      </div>
    </section>
  )
}
