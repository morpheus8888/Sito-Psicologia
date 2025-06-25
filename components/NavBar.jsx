import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import LanguagePicker from './LanguagePicker';
import { Trans } from '@lingui/macro';

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="menu-top">
      <div className="header-bar">
        <button className="toggle-button">☰</button>
        <LanguagePicker />
        <div style={{marginLeft:'auto'}}>
          {!session && (
            <>
              <Link href="/login" style={{marginRight:'10px'}}>Login</Link>
              <Link href="/register">Registrati</Link>
            </>
          )}
          {session && (
            <>
              <span style={{marginRight:'10px'}}>{session.user.email}</span>
              <button onClick={() => signOut()}>Logout</button>
            </>
          )}
        </div>
      </div>
      <nav>
        <ul>
          <li id="home"><a href="#home"><Trans>Home</Trans></a></li>
          <li id="servizi"><a href="#servizi"><Trans>Servizi</Trans></a></li>
          <li id="percorsi"><a href="#percorsi"><Trans>Percorsi</Trans></a></li>
          <li id="quiz"><a href="#quiz"><Trans>Quiz</Trans></a></li>
          <li id="prenotazione"><a href="#prenotazione"><Trans>Prenotazione</Trans></a></li>
          <li id="contatti"><a href="#contatti"><Trans>Contatti</Trans></a></li>
          <li id="diario-link"><Link href="/diario">Diario</Link></li>
        </ul>
      </nav>
    </header>
  );
}
