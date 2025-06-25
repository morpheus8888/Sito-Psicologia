
import '../styles/globals.css'
import '../styles/quiz.css'
import Navbar from '../components/Navbar'
import Providers from '../components/Providers'
import Script from 'next/script'

export default function RootLayout({ children }) {

  return (
    <html lang="it">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Script src="/js/script.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
