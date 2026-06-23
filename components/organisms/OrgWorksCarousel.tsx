'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProjects } from '@/data/projects';
import { home } from '@/data/home';
import { MolProjectCard } from '@/components/molecules/MolProjectCard';
import { MolScrollIndicator } from '@/components/molecules/MolScrollIndicator';
import styles from './OrgWorksCarousel.module.scss';

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, '0');
const total = featuredProjects.length;

export function OrgWorksCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // getScrollAmount is a function so GSAP recalculates on refresh (resize)
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // floor(progress × total) gives equal segments per card
            // clamp so the View All card doesn't push past last project
            const idx = Math.min(Math.floor(self.progress * total), total - 1);
            setActiveIndex(idx);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles['org-works-carousel']}
      aria-label="Selected works"
      data-header-dark
    >
      {/* ── Header: eyebrow + counter ─────────────────────── */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>{home.works.eyebrow}</span>
        <span className={styles.counter} aria-live="polite">
          {pad(activeIndex + 1)}&thinsp;/&thinsp;{pad(total)}
        </span>
      </div>

      {/* ── Horizontal track ──────────────────────────────── */}
      <div
        ref={trackRef}
        className={styles.track}
        data-cursor="drag"
      >
        {featuredProjects.map((project, i) => (
          <MolProjectCard
            key={project.slug}
            project={project}
            variant="hero"
            index={i}
            priority={i === 0}
          />
        ))}

        {/* ── "View all" end card ─────────────────────────── */}
        <a href="/works" className={styles['end-card']} data-cursor="view">
          <span className={styles['end-card-label']}>{home.works.cta}</span>
          <span className={styles['end-card-arrow']} aria-hidden="true">→</span>
        </a>
      </div>

      {/* ── Footer: scroll hint ───────────────────────────── */}
      <div className={styles.footer}>
        <MolScrollIndicator direction="right" label="scroll to explore" />
      </div>
    </section>
  );
}
