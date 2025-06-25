
import '../styles/globals.css'
import '../styles/quiz.css'
import Navbar from '../components/Navbar'
import Providers from '../components/Providers'

export default function RootLayout({ children }) {

  return (
    <html lang="it">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
