'use client';

import { useState } from 'react';
import { OrgHeader } from '@/components/organisms/OrgHeader';
import { OrgMobileMenu } from '@/components/organisms/OrgMobileMenu';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <OrgHeader
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((v) => !v)}
      />
      <OrgMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main>{children}</main>
    </>
  );
}
