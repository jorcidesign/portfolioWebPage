'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { allProjects } from '@/data/projects';
import { MolProjectCard } from '@/components/molecules/MolProjectCard';
import styles from './OrgWorksGrid.module.scss';

const ALL = 'All';

// Unique categories preserving project order
const categories = [
  ALL,
  ...Array.from(new Set(allProjects.map((p) => p.category))),
];

const pad = (n: number) => String(n).padStart(2, '0');

export function OrgWorksGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState(ALL);
  const didMount = useRef(false);

  const filtered =
    activeFilter === ALL
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  // One-shot entrance: header + filters + first wave of cards
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.wg-header', { y: 32, opacity: 0, duration: 0.8, stagger: 0.1 })
        .from('.wg-pill', { y: 16, opacity: 0, duration: 0.5, stagger: 0.05 }, '-=0.4')
        .add(() => { didMount.current = true; });
    }, section);

    return () => ctx.revert();
  }, []);

  // Re-animate grid cards on filter change (skip on first mount)
  useEffect(() => {
    if (!didMount.current) return;
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.from('.wg-card', {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
      });
    }, grid);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className={styles['org-works-grid']}>

      {/* ── Page header ─────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles['header-top']}>
          <span className={`${styles.eyebrow} wg-header`}>Selected works</span>
          <span className={`${styles.total} wg-header`}>{pad(allProjects.length)}</span>
        </div>
        <h1 className={`${styles.title} wg-header`}>Works.</h1>
      </div>

      {/* ── Filter bar ──────────────────────────────────── */}
      <div
        className={styles['filter-bar']}
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles['filter-pill']} wg-pill ${activeFilter === cat ? styles.active : ''}`}
            onClick={() => setActiveFilter(cat)}
            aria-pressed={activeFilter === cat}
            type="button"
          >
            {cat}
            {cat !== ALL && (
              <span className={styles['pill-count']}>
                {allProjects.filter((p) => p.category === cat).length}
              </span>
            )}
          </button>
        ))}

        <span className={styles['filter-total']}>
          {pad(filtered.length)}&thinsp;/&thinsp;{pad(allProjects.length)}
        </span>
      </div>

      {/* ── Grid ─────────────────────────────────────────── */}
      <div ref={gridRef} className={styles.grid}>
        {filtered.map((project, i) => {
          const isWide = i === 0 && activeFilter === ALL;
          return (
            <div
              key={project.slug}
              className={`${styles['grid-item']} ${isWide ? styles['grid-item-wide'] : ''} wg-card`}
              style={{
                '--card-i': i,
                '--card-ratio': isWide ? '16 / 7' : '4 / 3',
              } as CSSProperties}
            >
              <MolProjectCard
                project={project}
                variant="grid"
                index={i}
                priority={i < 2}
              />
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className={styles.empty}>No projects in this category yet.</p>
        )}
      </div>

    </section>
  );
}
