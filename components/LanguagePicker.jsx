import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './LanguagePicker.module.css';

export default function LanguagePicker() {
  const pathname = usePathname() || '/';
  const locale = pathname.startsWith('/en') ? 'en' : 'it';
  const asPath = pathname.replace(/^\/(en|it)/, '') || '/';
  const [open, setOpen] = useState(false);

  const langs = [
    { code: 'it', label: 'Italiano' },
    { code: 'en', label: 'English' }
  ];

  const toggle = () => setOpen(!open);

  return (
    <div className={styles.picker}>
      <button onClick={toggle} className={styles.button} aria-expanded={open}>
        {locale.toUpperCase()} ▼
      </button>
      {open && (
        <ul className={styles.dropdown} role="listbox">
          {langs.map(l => (
            <li key={l.code} className={styles.item} role="option" aria-selected={locale===l.code}>
              <Link href={asPath} locale={l.code} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
