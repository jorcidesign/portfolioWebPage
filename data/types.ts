export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  shortDescription: string;
  description: string;
  coverImage: ProjectImage;
  heroImage?: ProjectImage;
  gallery?: ProjectImage[];
  video?: string;
  accentColor: string;
  featured: boolean;
  order: number;
  url?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  tags?: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
}

export type CursorType = 'default' | 'hover' | 'drag' | 'view' | 'hidden';

export interface MetaData {
  title: string;
  description: string;
  ogImage?: string;
}
