'use client';

import { useRef, useEffect, useMemo } from 'react';
import { about } from '@/data/about';
import { AtomCreativeHeading } from '@/components/atoms/AtomCreativeHeading';
import styles from './OrgHeroSection.module.scss';

export function OrgHeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const skills = useMemo(
    () => about.hero.skills.split('/').map((s) => s.trim()).filter(Boolean),
    []
  );

  useEffect(() => {
    function onScroll() {
      if (!titleRef.current) return;
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const offset = window.scrollY * -0.4;
        if (titleRef.current) {
          titleRef.current.style.transform = `translateY(${offset}px)`;
        }
        rafId.current = null;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <section className={styles['org-hero-section']}>
      <div className={styles['hero__title']} ref={titleRef}>
        <AtomCreativeHeading title={about.hero.title} />
      </div>

      <div className={styles['hero__stage']}>
        <div
          className={`${styles['hero__content']} ${styles['reveal-curtain']}`}
          style={{ '--delay': '150ms' } as React.CSSProperties}
        >
          <div className={styles['hero__services']}>
            {skills.map((skill, i) => (
              <p
                key={skill}
                className={styles['reveal-curtain']}
                style={{ '--delay': `${280 + i * 70}ms` } as React.CSSProperties}
              >
                <span>/ {skill}</span>
              </p>
            ))}
          </div>
        </div>

        <figure
          className={`${styles['hero__image']} ${styles['reveal-curtain']}`}
          style={{ '--delay': '200ms' } as React.CSSProperties}
        >
          <img
            src={about.hero.image}
            alt={about.hero.title}
            loading="eager"
            decoding="async"
          />
        </figure>

        <div className={styles['hero__location']}>
          {about.hero.location}
        </div>
      </div>

      <div
        className={`${styles['hero__description']} ${styles['reveal-curtain']}`}
        style={{ '--delay': '450ms' } as React.CSSProperties}
      >
        <p>{about.hero.paragraph.join(' ')}</p>
      </div>
    </section>
  );
}
