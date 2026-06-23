import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './AtomNavLink.module.scss';

interface AtomNavLinkProps {
  to: string;
  variant?: 'header' | 'menu';
  active?: boolean;
  withComma?: boolean;
  subtext?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function AtomNavLink({
  to,
  variant = 'header',
  active = false,
  withComma = false,
  subtext,
  children,
  onClick,
}: AtomNavLinkProps) {
  const className = [
    styles['atom-nav-link'],
    styles[`variant-${variant}`],
    active ? styles['is-active'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link href={to} className={className} onClick={onClick}>
      <span className={`${styles['nav-text']} webgl-hover-effect`}>
        <span className={styles['nav-label']}>{children}</span>
        {subtext && <span className={styles['nav-subtext']}>/{subtext}</span>}
        {withComma && <span className={styles['nav-comma']}>,</span>}
      </span>
    </Link>
  );
}
