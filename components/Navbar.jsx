'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Trans } from '@lingui/macro'
import LanguagePicker from './LanguagePicker'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/', label: <Trans>Home</Trans> },
    { href: '/quiz', label: <Trans>Quiz</Trans> },
    { href: '/diario', label: <Trans>Diario</Trans> },
    { href: '/contatti', label: <Trans>Contatti</Trans> }
  ]

  const toggleMenu = () => setOpen(o => !o)
  const closeMenu = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <button className={styles.menuBtn} onClick={toggleMenu} aria-expanded={open}>☰</button>
        <LanguagePicker />
        <div className={styles.auth}>
          {!session ? (
            <>
              <Link href="/login" onClick={closeMenu}>Login</Link>
              <Link href="/register" onClick={closeMenu}>Registrati</Link>
            </>
          ) : (
            <>
              <span>{session.user.email}</span>
              <button onClick={() => signOut()}><Trans>Logout</Trans></button>
            </>
          )}
        </div>
      </div>
      <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
        <ul>
          {navLinks.map(l => (
            <li key={l.href} className={pathname === l.href ? styles.active : ''}>
              <Link href={l.href} onClick={closeMenu}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
