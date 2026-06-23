import type { ReactNode } from 'react';
import styles from './AtomText.module.scss';

interface AtomTextProps {
  variant?: 'body' | 'label' | 'meta' | 'dim';
  children: ReactNode;
}

export function AtomText({ variant = 'body', children }: AtomTextProps) {
  return (
    <p className={`${styles['atom-text']} ${styles[`variant-${variant}`]}`}>
      {children}
    </p>
  );
}
