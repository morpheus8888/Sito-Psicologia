'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import QuizSection from './sections/QuizSection'
import PrenotazioneSection from './sections/PrenotazioneSection'
import DiarioSection from './sections/DiarioSection'
import ContattiSection from './sections/ContattiSection'
import FooterSection from './sections/FooterSection'

const sections = [
  { path: '/quiz', Component: QuizSection },
  { path: '/prenotazione', Component: PrenotazioneSection },
  { path: '/diario', Component: DiarioSection },
  { path: '/contatti', Component: ContattiSection },
  { path: '/fine', Component: FooterSection }
]

export default function EndlessScroll() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const { ref, inView } = useInView({ rootMargin: '200px' })

  useEffect(() => {
    if (inView && index < sections.length) {
      router.replace(sections[index].path, { scroll: false })
      setIndex(i => i + 1)
    }
  }, [inView])

  return (
    <>
      {sections.slice(0, index).map(({ Component }, i) => (
        <Component key={i} />
      ))}
      {index < sections.length && <div ref={ref} style={{ height: '1px' }} />}
    </>
  )
}
