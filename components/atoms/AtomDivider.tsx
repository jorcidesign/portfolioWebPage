import styles from './AtomDivider.module.scss';

interface AtomDividerProps {
  variant?: 'light' | 'dark';
}

export function AtomDivider({ variant = 'light' }: AtomDividerProps) {
  return (
    <div
      className={`${styles['atom-divider']} ${styles[`variant-${variant}`]}`}
      aria-hidden="true"
    />
  );
}
