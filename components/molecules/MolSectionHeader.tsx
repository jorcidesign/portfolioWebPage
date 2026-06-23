import styles from './MolSectionHeader.module.scss';

interface MolSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function MolSectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: MolSectionHeaderProps) {
  return (
    <div className={`${styles['mol-section-header']} ${styles[`align-${align}`]}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
