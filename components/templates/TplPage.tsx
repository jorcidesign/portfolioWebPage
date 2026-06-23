import type { ReactNode } from 'react';
import styles from './TplPage.module.scss';

interface TplPageProps {
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
}

export function TplPage({ children, className, fullBleed = false }: TplPageProps) {
  const cn = [
    styles['tpl-page'],
    fullBleed ? styles['full-bleed'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cn}>{children}</div>;
}
