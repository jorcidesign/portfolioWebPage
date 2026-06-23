import { createElement, type ReactNode } from 'react';
import styles from './AtomHeading.module.scss';

interface AtomHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'huge' | '4xl' | '3xl' | '2xl' | 'xl';
  children: ReactNode;
}

export function AtomHeading({
  as = 'h2',
  size = '3xl',
  children,
}: AtomHeadingProps) {
  return createElement(
    as,
    {
      className: `${styles['atom-heading']} ${styles[`size-${size}`]}`,
    },
    children,
  );
}
