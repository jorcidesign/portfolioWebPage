import { OrgHeroSection } from '@/components/organisms/OrgHeroSection';
import { OrgWorksCarousel } from '@/components/organisms/OrgWorksCarousel';
import { OrgAboutTeaser } from '@/components/organisms/OrgAboutTeaser';
import { OrgServicesSection } from '@/components/organisms/OrgServicesSection';
import { OrgContactCTA } from '@/components/organisms/OrgContactCTA';
import { OrgFooter } from '@/components/organisms/OrgFooter';

export default function HomePage() {
  return (
    <>
      <OrgHeroSection />
      <OrgWorksCarousel />
      <OrgAboutTeaser />
      <OrgServicesSection />
      <OrgContactCTA />
      <OrgFooter />
    </>
  );
}
