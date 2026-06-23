import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/types';
import { MolTagList } from './MolTagList';
import styles from './MolProjectCard.module.scss';

interface MolProjectCardProps {
  project: Project;
  variant?: 'hero' | 'grid';
  index?: number;
  priority?: boolean;
}

export function MolProjectCard({
  project,
  variant = 'grid',
  index = 0,
  priority = false,
}: MolProjectCardProps) {
  const { slug, title, year, category, tags, shortDescription, coverImage, accentColor } = project;

  return (
    <Link
      href={`/works/${slug}`}
      className={`${styles['mol-project-card']} ${styles[`variant-${variant}`]}`}
      style={{ '--card-accent': accentColor } as React.CSSProperties}
      data-cursor="view"
    >
      <div className={styles.image}>
        <div className={styles['image-inner']}>
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            sizes={
              variant === 'hero'
                ? '(max-width: 768px) 100vw, 55vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
            priority={priority || index < 2}
            className={styles['image-el']}
          />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        {variant === 'grid' && (
          <p className={styles.description}>{shortDescription}</p>
        )}
        <MolTagList tags={tags.slice(0, 3)} theme={variant === 'hero' ? 'dark' : 'light'} />
      </div>
    </Link>
  );
}
