import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;
  const other = locale === 'it' ? 'en' : 'it';
  return (
    <div className={styles.switcher}>
      <Link href={asPath} locale={other} className={styles.link}>
        {other.toUpperCase()}
      </Link>
    </div>
  );
}
