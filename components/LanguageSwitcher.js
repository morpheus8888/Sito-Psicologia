import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;
  const other = locale === 'it' ? 'en' : 'it';
  return (
    <Link href={asPath} locale={other} className="lang-switcher">
      {other.toUpperCase()}
    </Link>
  );
}
