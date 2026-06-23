'use client';

import { useState } from 'react';
import { AtomCursor } from '@/components/atoms/AtomCursor';
import { OrgHeader } from '@/components/organisms/OrgHeader';
import { OrgMobileMenu } from '@/components/organisms/OrgMobileMenu';
import { OrgPreloader } from '@/components/organisms/OrgPreloader';
import { OrgPageTransition } from '@/components/organisms/OrgPageTransition';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Skip preloader on repeat visits within the same session
  const [preloaderDone, setPreloaderDone] = useState<boolean>(() => {
    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem('preloader_seen') === '1';
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader_seen', '1');
    setPreloaderDone(true);
  };

  return (
    <>
      {/* Always-on global overlays */}
      <AtomCursor />
      <OrgPageTransition />

      {/* Entrance animation — unmounts after first play */}
      {!preloaderDone && (
        <OrgPreloader onComplete={handlePreloaderComplete} />
      )}

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
