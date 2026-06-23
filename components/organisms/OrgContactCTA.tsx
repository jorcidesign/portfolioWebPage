'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { home } from '@/data/home';
import { contact } from '@/data/contact';
import styles from './OrgContactCTA.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function OrgContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.cta-reveal', {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles['org-contact-cta']}
      data-header-dark
    >
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} cta-reveal`}>{home.contact.eyebrow}</span>

        <h2 className={`${styles.title} cta-reveal`}>
          {home.contact.title.split('\n').map((line, i) => (
            <span key={i} className={styles['title-line']}>{line}</span>
          ))}
        </h2>

        <p className={`${styles.description} cta-reveal`}>{home.contact.description}</p>

        <Link
          href={`mailto:${contact.email}`}
          className={`${styles.button} cta-reveal`}
          data-cursor="view"
        >
          <span className={styles['button-text']}>{home.contact.cta}</span>
          <span className={styles['button-arrow']} aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className={styles.glow} aria-hidden="true" />
    </section>
  );
}
