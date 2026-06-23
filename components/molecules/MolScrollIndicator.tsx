import styles from './MolScrollIndicator.module.scss';

interface MolScrollIndicatorProps {
  direction?: 'down' | 'right';
  label?: string;
}

export function MolScrollIndicator({
  direction = 'down',
  label,
}: MolScrollIndicatorProps) {
  return (
    <div
      className={`${styles['mol-scroll-indicator']} ${styles[`dir-${direction}`]}`}
      aria-hidden="true"
    >
      <span className={styles.line} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
