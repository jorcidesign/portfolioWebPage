'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/data/types';
import { MolTagList } from '@/components/molecules/MolTagList';
import styles from './OrgProjectDetail.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface OrgProjectDetailProps {
  project: Project;
  nextProject: Project;
}

export function OrgProjectDetail({ project, nextProject }: OrgProjectDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const {
    title, client, year, category, tags, description,
    coverImage, accentColor, url,
  } = project;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Cover image: clip-path wipe + subtle pan
      tl.fromTo(
        '.pd-cover-wrap',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power2.inOut' },
      )
        .from('.pd-cover-inner', { yPercent: 12, duration: 1.4, ease: 'power2.out' }, 0)
        .from('.pd-eyebrow', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
        .from('.pd-title', { opacity: 0, y: 40, duration: 0.9, stagger: 0.08 }, '-=0.55')
        .from('.pd-meta-item', { opacity: 0, y: 16, duration: 0.6, stagger: 0.07 }, '-=0.6');

      // Description reveals on scroll
      gsap.from('.pd-body-item', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pd-body',
          start: 'top 78%',
        },
      });

      // Next project teaser
      gsap.from('.pd-next-item', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pd-next',
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={sectionRef} className={styles['org-project-detail']}>

      {/* ── Back link ─────────────────────────────────────── */}
      <div className={styles['back-row']}>
        <Link href="/works" className={styles['back-link']}>
          <span aria-hidden="true">←</span> Works
        </Link>
      </div>

      {/* ── Hero cover image ──────────────────────────────── */}
      <div className={`${styles['cover-wrap']} pd-cover-wrap`}>
        <div className={`${styles['cover-inner']} pd-cover-inner`}>
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            sizes="100vw"
            priority
            className={styles['cover-img']}
          />
          <div
            className={styles['cover-tint']}
            style={{ '--tint': accentColor } as React.CSSProperties}
          />
        </div>
      </div>

      {/* ── Title block ───────────────────────────────────── */}
      <div className={styles['title-block']}>
        <span className={`${styles.eyebrow} pd-eyebrow`}>{category}</span>
        <h1 className={`${styles.title} pd-title`}>{title}</h1>

        {/* ── Meta row ──────────────────────────────────────── */}
        <div className={styles['meta-row']}>
          <div className={`${styles['meta-item']} pd-meta-item`}>
            <span className={styles['meta-label']}>Client</span>
            <span className={styles['meta-value']}>{client}</span>
          </div>
          <div className={`${styles['meta-item']} pd-meta-item`}>
            <span className={styles['meta-label']}>Year</span>
            <span className={styles['meta-value']}>{year}</span>
          </div>
          <div className={`${styles['meta-item']} pd-meta-item`}>
            <span className={styles['meta-label']}>Stack</span>
            <div className={styles['meta-value']}>
              <MolTagList tags={tags} />
            </div>
          </div>
          {url && (
            <div className={`${styles['meta-item']} pd-meta-item`}>
              <span className={styles['meta-label']}>Live</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['meta-link']}
              >
                View site ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Body: description ─────────────────────────────── */}
      <div className={`${styles.body} pd-body`}>
        <div className={styles.divider} />
        <p className={`${styles.description} pd-body-item`}>{description}</p>
      </div>

      {/* ── Next project ──────────────────────────────────── */}
      <div className={`${styles['next-section']} pd-next`}>
        <div className={styles.divider} />
        <div className={styles['next-inner']}>
          <span className={`${styles['next-label']} pd-next-item`}>Next project</span>
          <Link
            href={`/works/${nextProject.slug}`}
            className={`${styles['next-link']} pd-next-item`}
            data-cursor="view"
          >
            <span className={styles['next-title']}>{nextProject.title}</span>
            <span className={styles['next-arrow']} aria-hidden="true">→</span>
          </Link>
          <span className={`${styles['next-category']} pd-next-item`}>
            {nextProject.category}
          </span>
        </div>
      </div>

    </article>
  );
}
