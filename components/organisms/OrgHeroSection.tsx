'use client';

import { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '@/data/about';
import { AtomCreativeHeading } from '@/components/atoms/AtomCreativeHeading';
import { AtomHoverReveal } from '@/components/atoms/AtomHoverReveal';
import styles from './OrgHeroSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function OrgHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const skills = useMemo(
    () => about.hero.skills.split('/').map((s) => s.trim()).filter(Boolean),
    [],
  );

  // Title parallax via ScrollTrigger (plays nicely with Lenis)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles['org-hero-section']}>
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

        <div
          className={`${styles['hero__image']} ${styles['reveal-curtain']}`}
          style={{ '--delay': '200ms' } as React.CSSProperties}
        >
          <AtomHoverReveal
            srcA={about.hero.image}
            srcB={about.hero.scanImage}
          />
        </div>

        <div className={styles['hero__location']}>{about.hero.location}</div>
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
