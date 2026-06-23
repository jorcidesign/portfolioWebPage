import { notFound } from 'next/navigation';
import { allProjects, getProjectBySlug } from '@/data/projects';
import { OrgProjectDetail } from '@/components/organisms/OrgProjectDetail';
import { OrgFooter } from '@/components/organisms/OrgFooter';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
      <OrgProjectDetail project={project} nextProject={nextProject} />
      <OrgFooter />
    </>
  );
}
