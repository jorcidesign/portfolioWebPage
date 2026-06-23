import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { LenisProvider } from '@/providers/LenisProvider';
import { CursorProvider } from '@/providers/CursorProvider';
import { TransitionProvider } from '@/providers/TransitionProvider';
import { ClientLayout } from './ClientLayout';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Jorge Del Aguila — Full Stack Developer',
  description:
    'Full Stack Developer from Lima, Peru. Building scalable web and mobile applications with React, Next.js, and Node.js.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <TransitionProvider>
            <CursorProvider>
              <ClientLayout>{children}</ClientLayout>
            </CursorProvider>
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
