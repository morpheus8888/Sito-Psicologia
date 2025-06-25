'use client'
import dynamic from 'next/dynamic'
import { Trans } from '@lingui/macro'

const Quiz = dynamic(() => import('../Quiz'), { ssr: false })

export default function QuizSection() {
  return (
    <section className="section section-dark" id="quiz">
      <div className="section-content">
        <h2 className="fade-in"><strong><Trans>Quiz</Trans></strong></h2>
        <Quiz />
      </div>
    </section>
  )
}
