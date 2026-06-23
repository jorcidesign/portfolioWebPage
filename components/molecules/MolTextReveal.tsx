import type { ReactNode, ElementType } from 'react';
import styles from './MolTextReveal.module.scss';

interface MolTextRevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}

// Clip-path wrapper for GSAP slide-up text reveals (Phase 2+).
// data-reveal is the hook point for the ScrollTrigger animation.
export function MolTextReveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
}: MolTextRevealProps) {
  return (
    <div
      className={`${styles['mol-text-reveal']} ${className ?? ''}`}
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      <Tag className={styles.inner}>{children}</Tag>
    </div>
  );
}
