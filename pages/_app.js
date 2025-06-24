import '../styles/globals.css';
import '../styles/quiz.css';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();

  useEffect(() => {
    async function load() {
      const messages = await import(`../locales/${locale}/messages.js`);
      i18n.load(locale, messages);
      i18n.activate(locale);
    }
    load();
  }, [locale]);

  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}
