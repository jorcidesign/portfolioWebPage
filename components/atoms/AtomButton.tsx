import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './AtomButton.module.scss';

interface AtomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  count?: string;
  children: ReactNode;
}

export function AtomButton({
  variant = 'primary',
  href,
  count = '',
  children,
}: AtomButtonProps) {
  const className = `${styles['atom-button']} ${styles[`variant-${variant}`]}`;

  const content = (
    <>
      <div className={styles.filler} />
      <span className={styles.content}>
        {children}
        {count && <span className={styles.count}>{count}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} type="button">
      {content}
    </button>
  );
}
