'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { home } from '@/data/home';
import styles from './OrgPreloader.module.scss';

interface OrgPreloaderProps {
  onComplete: () => void;
}

export function OrgPreloader({ onComplete }: OrgPreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.body.classList.add('is-loading');

    const lines = lineInnerRefs.current.filter(Boolean) as HTMLDivElement[];
    const root = rootRef.current;
    if (!root || lines.length === 0) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('is-loading');
        onComplete();
      },
    });

    // ─── Entrance: lines slide up one by one ────────────────────
    tl.set(lines, { yPercent: 110 });

    lines.forEach((line, i) => {
      tl.to(
        line,
        { yPercent: 0, duration: 0.9, ease: 'power3.out' },
        i * 0.18,
      );
    });

    // ─── Hold ───────────────────────────────────────────────────
    tl.addLabel('hold', `+=${0.5}`);

    // ─── Exit: lines slide back down ────────────────────────────
    tl.to(
      lines,
      {
        yPercent: -110,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power3.in',
      },
      'hold',
    );

    // ─── Panel wipes up off-screen ──────────────────────────────
    tl.to(
      root,
      {
        yPercent: -100,
        duration: 0.85,
        ease: 'power3.inOut',
      },
      'hold+=0.25',
    );

    return () => {
      tl.kill();
      document.body.classList.remove('is-loading');
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className={styles['org-preloader']} aria-hidden="true">
      <div className={styles.content}>
        {home.preloader.lines.map((line, i) => (
          <div key={i} className={styles['line-clip']}>
            <div
              className={styles['line-inner']}
              ref={(el) => { lineInnerRefs.current[i] = el; }}
              style={{ fontSize: `var(--text-${line.size})` }}
            >
              {line.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
