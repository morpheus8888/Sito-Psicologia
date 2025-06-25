'use client'
import HeroSection from '../components/sections/HeroSection'
import ServiziSection from '../components/sections/ServiziSection'
import PercorsiSection from '../components/sections/PercorsiSection'
import EndlessScroll from '../components/EndlessScroll'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiziSection />
      <PercorsiSection />
      <EndlessScroll />
    </>
  )
}
