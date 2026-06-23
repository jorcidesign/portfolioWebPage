import type { Service, ExperienceItem, Skill } from './types';

export const about = {
  hero: {
    title: 'Full Stack Developer',
    location: 'BASED IN PERU',
    skills: '/FRONTEND DEVELOPER /BACKEND DEVELOPER /QA TESTING',
    paragraph: [
      "I'M A PASSIONATE SOFTWARE ENGINEER BUILDING",
      'SCALABLE WEB APPLICATIONS FOR ALL SIZES.',
    ],
    image:
      'https://res.cloudinary.com/dhlkqt62w/image/upload/v1782185954/acc48b81-dcbf-4d93-9913-57e8c0226082.png',
    scanImage:
      'https://res.cloudinary.com/dhlkqt62w/image/upload/v1782185988/scanJorge_krhl1v.png',
  },

  bio: {
    short:
      "I'm a full stack developer from Lima, Peru, crafting digital products that blend engineering rigour with thoughtful design.",
    full: [
      'Based in Lima, I build end-to-end digital products — from backend APIs to pixel-perfect interfaces. I care deeply about code quality, performance, and the details that make a product feel exceptional.',
      "I've worked across startups, agencies, and independent projects, always bringing the same curiosity and attention to detail regardless of scale.",
    ],
  },

  services: [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description:
        'Building performant, accessible interfaces with React, Next.js, and modern CSS. From design systems to complex interactions.',
      tags: ['React', 'Next.js', 'TypeScript', 'SCSS', 'GSAP'],
    },
    {
      id: 'backend',
      title: 'Backend Engineering',
      description:
        'REST and GraphQL APIs, database design, authentication systems, and cloud deployments that scale.',
      tags: ['Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description:
        'Cross-platform mobile applications with React Native and Expo, focused on native-feeling experiences.',
      tags: ['React Native', 'Expo', 'iOS', 'Android'],
    },
    {
      id: 'qa',
      title: 'QA & Testing',
      description:
        'Automated testing strategies, CI/CD pipelines, and quality assurance for production-grade applications.',
      tags: ['Jest', 'Cypress', 'Playwright', 'GitHub Actions'],
    },
  ] satisfies Service[],

  skills: [
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'GSAP', category: 'frontend' },
    { name: 'Three.js', category: 'frontend' },
    { name: 'SCSS', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'GraphQL', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'MongoDB', category: 'backend' },
    { name: 'Docker', category: 'tools' },
    { name: 'AWS', category: 'tools' },
    { name: 'Git', category: 'tools' },
    { name: 'Figma', category: 'design' },
  ] satisfies Skill[],

  experience: [
    {
      company: 'Agency Name',
      role: 'Senior Full Stack Developer',
      period: '2023 — Present',
      description:
        'Leading frontend architecture and development of client projects. Building design systems and improving CI/CD workflows.',
      tags: ['Next.js', 'Node.js', 'AWS'],
    },
    {
      company: 'Startup Name',
      role: 'Full Stack Developer',
      period: '2021 — 2023',
      description:
        'Developed core product features, REST APIs, and mobile applications for an early-stage startup.',
      tags: ['React Native', 'GraphQL', 'PostgreSQL'],
    },
    {
      company: 'Freelance',
      role: 'Frontend Developer',
      period: '2019 — 2021',
      description:
        'Designed and built websites and web applications for small businesses across Latin America.',
      tags: ['React', 'WordPress', 'SCSS'],
    },
  ] satisfies ExperienceItem[],
};
