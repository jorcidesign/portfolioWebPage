import styles from './MolTagList.module.scss';

interface MolTagListProps {
  tags: string[];
  size?: 'sm' | 'md';
  theme?: 'light' | 'dark';
}

export function MolTagList({ tags, size = 'sm', theme = 'light' }: MolTagListProps) {
  return (
    <ul className={[styles['mol-tag-list'], styles[`size-${size}`], styles[`theme-${theme}`]].join(' ')}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
