'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AtomMenuHandler.module.scss';

interface AtomMenuHandlerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AtomMenuHandler({
  isOpen = false,
  onToggle,
}: AtomMenuHandlerProps) {
  const textMenuRef = useRef<HTMLSpanElement>(null);
  const textCloseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.set(textMenuRef.current, { yPercent: -100, opacity: 0 });
      gsap.set(textCloseRef.current, { yPercent: 0, opacity: 1 });
    } else {
      gsap.set(textMenuRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(textCloseRef.current, { yPercent: 100, opacity: 0 });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'power3.out' } });

    if (isOpen) {
      tl.to(textMenuRef.current, { yPercent: -100, opacity: 0 }, 0);
      tl.fromTo(
        textCloseRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1 },
        0.05,
      );
    } else {
      tl.to(textCloseRef.current, { yPercent: -100, opacity: 0 }, 0);
      tl.fromTo(
        textMenuRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1 },
        0.05,
      );
    }
  }, [isOpen]);

  return (
    <button
      className={styles['atom-menu-handler']}
      onClick={onToggle}
      aria-label="Toggle Menu"
    >
      <span ref={textMenuRef} className={styles['handler-text']}>Menu</span>
      <span ref={textCloseRef} className={styles['handler-text']}>Close</span>
    </button>
  );
}
