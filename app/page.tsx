'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrgHeroSection } from '@/components/organisms/OrgHeroSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-test', {
        scrollTrigger: {
          trigger: '.gsap-test',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero Section */}
      <OrgHeroSection />

      {/* Test spacer for smooth scroll + GSAP */}
      <section
        className="gsap-test"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-8)',
          padding: 'var(--px)',
          background: 'var(--color-surface)',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-3xl)', textAlign: 'center' }}>
          Scroll suave activo
        </h2>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-ink-60)',
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          Si ves este texto animarse al hacer scroll, Lenis + GSAP funcionan
          correctamente.
        </p>
      </section>

      {/* Extra spacer to ensure scroll */}
      <div style={{ height: '100vh' }} />
    </div>
  );
}
