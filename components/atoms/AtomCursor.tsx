'use client';

import { useEffect, useRef, useState } from 'react';
import { useCursor } from '@/hooks/useCursor';
import type { CursorType } from '@/data/types';
import styles from './AtomCursor.module.scss';

export function AtomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { type, label, setCursor } = useCursor();

  useEffect(() => {
    const mouse = { x: -200, y: -200 };
    const lerped = { x: -200, y: -200 };
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inner dot: direct (no lerp)
      innerRef.current?.style.setProperty(
        'transform',
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`,
      );

      // Detect cursor type from DOM via data-cursor attribute
      const target = e.target as Element;
      const dataEl = target.closest('[data-cursor]');
      if (dataEl) {
        const cursorAttr = dataEl.getAttribute('data-cursor') as CursorType;
        const cursorLabel = dataEl.getAttribute('data-cursor-label') ?? '';
        setCursor(cursorAttr, cursorLabel);
      } else if (target.closest('a, button')) {
        setCursor('hover');
      } else {
        setCursor('default');
      }
    };

    const onLeave = () => setIsVisible(false);

    const loop = () => {
      lerped.x += (mouse.x - lerped.x) * 0.1;
      lerped.y += (mouse.y - lerped.y) * 0.1;
      outerRef.current?.style.setProperty(
        'transform',
        `translate3d(${lerped.x}px, ${lerped.y}px, 0) translate(-50%, -50%)`,
      );
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    document.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className={[
          styles.outer,
          styles[`type-${type}`],
          isVisible ? styles.visible : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {(type === 'view' || type === 'drag') && (
          <span className={styles.label}>
            {type === 'view' ? 'VIEW' : '← →'}
          </span>
        )}
        {label && type !== 'view' && type !== 'drag' && (
          <span className={styles.label}>{label}</span>
        )}
      </div>
      <div
        ref={innerRef}
        className={[styles.inner, isVisible ? styles.visible : ''].filter(Boolean).join(' ')}
        aria-hidden="true"
      />
    </>
  );
}
