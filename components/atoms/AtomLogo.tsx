'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './AtomLogo.module.scss';

const TEXT = 'Del Aguila';
const chars = TEXT.split('').map((c) => (c === ' ' ? '\u00A0' : c));

export function AtomLogo() {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const measuredWidthRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.set(wrapper, { width: 'auto', paddingLeft: '0.25em' });
    measuredWidthRef.current = wrapper.scrollWidth;
    gsap.set(wrapper, { width: 0, paddingLeft: 0, overflow: 'visible' });
    gsap.set(charRefs.current.filter(Boolean), { yPercent: 120, opacity: 0 });
  }, []);

  const onEnter = () => {
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;
    tl.to(wrapperRef.current, {
      width: measuredWidthRef.current,
      paddingLeft: '0.25em',
      duration: 0.05,
      ease: 'none',
    }, 0);
    tl.to(charRefs.current.filter(Boolean), {
      yPercent: 0,
      opacity: 1,
      duration: 0.55,
      ease: 'power3.out',
      stagger: { each: 0.04, from: 'start' },
    }, 0);
  };

  const onLeave = () => {
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;
    tl.to(charRefs.current.filter(Boolean), {
      yPercent: -120,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      stagger: { each: 0.03, from: 'end' },
    }, 0);
    tl.to(wrapperRef.current, {
      width: 0,
      paddingLeft: 0,
      duration: 0.25,
      ease: 'power2.in',
    }, 0.15);
  };

  return (
    <Link href="/" className={styles['atom-logo']} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <span className={styles['logo-first']}>Jorge</span>
      <span className={styles['logo-last-wrapper']} ref={wrapperRef}>
        {chars.map((char, index) => (
          <span
            key={index}
            className={styles['logo-char']}
            ref={(el) => { charRefs.current[index] = el; }}
          >
            {char}
          </span>
        ))}
      </span>
    </Link>
  );
}
