'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { home } from '@/data/home';
import { about } from '@/data/about';
import styles from './OrgAboutTeaser.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function OrgAboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
        },
      });

      gsap.to(imgInnerRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles['org-about-teaser']}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={`${styles.eyebrow} about-reveal`}>{home.about.eyebrow}</span>
          <h2 className={`${styles.title} about-reveal`}>
            {home.about.title.split('\n').map((line, i) => (
              <span key={i} className={styles['title-line']}>{line}</span>
            ))}
          </h2>
          <p className={`${styles.bio} about-reveal`}>{about.bio.short}</p>
          <Link href="/about" className={`${styles.cta} about-reveal`}>
            {home.about.cta}
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles['image-wrap']}>
          <div ref={imgInnerRef} className={styles['image-inner']}>
            <Image
              src={about.hero.image}
              alt="Jorge Del Aguila"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className={styles['image-el']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
