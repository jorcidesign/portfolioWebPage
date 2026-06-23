'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '@/data/about';
import { MolTagList } from '@/components/molecules/MolTagList';
import styles from './OrgServicesSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, '0');

export function OrgServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.svc-header-item', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });

      gsap.from('.svc-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.svc-list',
          start: 'top 78%',
        },
      });

      gsap.from('.svc-row', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.svc-list',
          start: 'top 78%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles['org-services-section']}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={`${styles.eyebrow} svc-header-item`}>Capabilities</span>
          <h2 className={`${styles.title} svc-header-item`}>What I bring</h2>
        </div>

        <ul className={`${styles.list} svc-list`} role="list">
          {about.services.map((service, i) => (
            <li key={service.id}>
              <div className={`${styles.divider} svc-divider`} />
              <div className={`${styles.row} svc-row`}>
                <span className={styles.number}>{pad(i + 1)}</span>
                <div className={styles.content}>
                  <h3 className={styles['service-title']}>{service.title}</h3>
                  <p className={styles.description}>{service.description}</p>
                </div>
                <div className={styles.tags}>
                  <MolTagList tags={service.tags} />
                </div>
              </div>
            </li>
          ))}
          <div className={`${styles.divider} svc-divider`} />
        </ul>
      </div>
    </section>
  );
}
