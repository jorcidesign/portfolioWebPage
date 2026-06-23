import { useMemo } from 'react';
import styles from './AtomCreativeHeading.module.scss';

interface AtomCreativeHeadingProps {
  title?: string;
}

export function AtomCreativeHeading({ title = 'Creative Developer' }: AtomCreativeHeadingProps) {
  const charData = useMemo(() => {
    const chars = title.split('');
    const total = chars.length;
    const center = (total - 1) / 2;
    const STEP_MS = 30;

    return chars.map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char,
      delay: Math.round(Math.abs(index - center) * STEP_MS),
    }));
  }, [title]);

  return (
    <h1 className={styles['atom-creative-heading']} aria-label={title}>
      {charData.map(({ char, delay }, index) => (
        <span
          key={index}
          className={styles['heading-char']}
          style={{ '--delay': `${delay}ms` } as React.CSSProperties}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
