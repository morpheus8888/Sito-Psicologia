import '../styles/globals.css';
import '../styles/quiz.css';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar.jsx';

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();

  useEffect(() => {
    async function load() {
      const messages = await import(`../locales/${locale}/messages.js`);
      i18n.load(locale, messages.messages || messages.default);
      i18n.activate(locale);
    }
    load();
  }, [locale]);

  return (
    <SessionProvider session={pageProps.session}>
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <Navbar />
        <Component {...pageProps} />
      </I18nProvider>
    </SessionProvider>
  );
}
