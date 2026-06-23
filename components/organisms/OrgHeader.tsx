'use client';

import { useRef, useEffect } from 'react';
import { contact } from '@/data/contact';
import { AtomLogo } from '@/components/atoms/AtomLogo';
import { AtomNavLink } from '@/components/atoms/AtomNavLink';
import { AtomLink } from '@/components/atoms/AtomLink';
import { AtomMenuHandler } from '@/components/atoms/AtomMenuHandler';
import styles from './OrgHeader.module.scss';

interface OrgHeaderProps {
  isMenuOpen?: boolean;
  onMenuToggle: () => void;
}

export function OrgHeader({ isMenuOpen = false, onMenuToggle }: OrgHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  // Watch [data-header-dark] sections — flip header color when they enter/leave
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const darkSections = document.querySelectorAll('[data-header-dark]');
    if (!darkSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        header.setAttribute('data-theme', anyVisible ? 'dark' : 'light');
      },
      { threshold: 0.01 },
    );

    darkSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={styles['nav-container']} data-theme="light">
      <div className={styles['nav-wrapper']}>
        <div className={`${styles.logo} ${styles['interactive-element']}`}>
          <AtomLogo />
        </div>

        <div className={`${styles.nav} ${styles['desktop-only']} ${styles['interactive-element']}`}>
          <nav className={styles['nav-list']}>
            <AtomNavLink to="/works" withComma>Works</AtomNavLink>
            <AtomNavLink to="/about" withComma>About</AtomNavLink>
            <AtomNavLink to="/contact">Contact</AtomNavLink>
          </nav>
        </div>

        <div className={`${styles.socials} ${styles['desktop-only']} ${styles['interactive-element']}`}>
          <AtomLink href={contact.socials.github} isExternal>Github</AtomLink>
          <AtomLink href={contact.socials.linkedin} isExternal>LinkedIn</AtomLink>
          <AtomLink href={`mailto:${contact.email}`} isExternal>Email</AtomLink>
        </div>

        <div className={`${styles['menu-toggle']} ${styles['mobile-only']} ${styles['interactive-element']}`}>
          <AtomMenuHandler isOpen={isMenuOpen} onToggle={onMenuToggle} />
        </div>
      </div>
    </header>
  );
}
