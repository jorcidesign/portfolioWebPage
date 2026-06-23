'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const reqIdRef = useRef<number>(0);

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    };

    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
