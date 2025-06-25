import { useSession } from 'next-auth/react';

export default function Diario() {
  const { data: session } = useSession();
  return (
    <div className="section section-dark" style={{minHeight:'50vh', padding:'2rem'}}>
      <h1>Diario Privato</h1>
      {session && <p>Benvenuto, {session.user.email}</p>}
      <p>Contenuto riservato...</p>
    </div>
  );
}
