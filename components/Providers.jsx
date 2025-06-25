'use client'
import { useEffect } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Providers({ children }) {
  const pathname = usePathname()
  let locale = 'it'
  if (pathname && pathname.startsWith('/en')) locale = 'en'

  useEffect(() => {
    import(`../locales/${locale}/messages.js`).then(m => {
      i18n.load(locale, m.messages || m.default)
      i18n.activate(locale)
    })
  }, [locale])

  return (
    <SessionProvider>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        {children}
      </I18nProvider>
    </SessionProvider>
  )
}
