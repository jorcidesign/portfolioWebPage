'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './OrgPageTransition.module.scss';

export function OrgPageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first mount — preloader already handles the entrance
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    // Cover → brief hold → reveal
    const tl = gsap.timeline();
    tl.set(panel, { yPercent: 100, display: 'block' })
      .to(panel, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' })
      .to(panel, { yPercent: -100, duration: 0.65, ease: 'power3.inOut' }, '+=0.05')
      .set(panel, { display: 'none' });

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div
      ref={panelRef}
      className={styles['org-page-transition']}
      aria-hidden="true"
      style={{ display: 'none' }}
    />
  );
}
