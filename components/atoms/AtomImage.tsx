import Image from 'next/image';
import styles from './AtomImage.module.scss';

interface AtomImageProps {
  src: string;
  alt?: string;
  aspect?: 'square' | 'video' | 'portrait' | 'cinema' | 'auto';
}

export function AtomImage({
  src,
  alt = 'Image',
  aspect = 'auto',
}: AtomImageProps) {
  return (
    <div className={`${styles['atom-image-wrapper']} ${styles[`aspect-${aspect}`]}`}>
      <Image
        src={src}
        alt={alt}
        className={styles['atom-image']}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
