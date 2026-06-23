import Link from 'next/link';
import { AtomLogo } from '@/components/atoms/AtomLogo';
import { contact } from '@/data/contact';
import styles from './OrgFooter.module.scss';

export function OrgFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles['org-footer']}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <AtomLogo />
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <Link href="/works" className={styles['nav-link']}>Works</Link>
            <Link href="/about" className={styles['nav-link']}>About</Link>
            <Link href="/contact" className={styles['nav-link']}>Contact</Link>
          </nav>

          <div className={styles.socials}>
            <a
              href={contact.socials.github}
              className={styles['social-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={contact.socials.linkedin}
              className={styles['social-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={styles['social-link']}
            >
              Email
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} Jorge Del Aguila. All rights reserved.
          </p>
          <p className={styles.credit}>Designed &amp; built by Jorge</p>
        </div>
      </div>
    </footer>
  );
}
