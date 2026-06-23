import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './AtomLink.module.scss';

interface AtomLinkProps {
  to?: string;
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: ReactNode;
}

export function AtomLink({
  to = '',
  href = '',
  isExternal = false,
  className: extraClassName,
  children,
}: AtomLinkProps) {
  const destination = href || to;
  const cn = [styles['atom-link'], extraClassName].filter(Boolean).join(' ');

  if (isExternal) {
    return (
      <a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        className={cn}
      >
        <span className={styles['link-text']}>{children}</span>
      </a>
    );
  }

  return (
    <Link href={destination} className={cn}>
      <span className={styles['link-text']}>{children}</span>
    </Link>
  );
}
