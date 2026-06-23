import type { MetaData } from './types';

const AUTHOR = 'Jorge Del Aguila';
const BASE_DESC =
  'Full Stack Developer from Lima, Peru. Building scalable web and mobile applications with React, Next.js, and Node.js.';

export const meta: Record<string, MetaData> = {
  home: {
    title: `${AUTHOR} — Full Stack Developer`,
    description: BASE_DESC,
  },
  works: {
    title: `Works — ${AUTHOR}`,
    description: 'Selected projects and case studies by Jorge Del Aguila.',
  },
  about: {
    title: `About — ${AUTHOR}`,
    description:
      'Full Stack Developer from Lima, Peru. Frontend, backend, mobile, and everything in between.',
  },
  contact: {
    title: `Contact — ${AUTHOR}`,
    description:
      'Get in touch with Jorge Del Aguila for freelance projects, collaborations, or full-time opportunities.',
  },
};
