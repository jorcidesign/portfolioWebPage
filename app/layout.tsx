import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ClientLayout } from './ClientLayout';
import './globals.scss';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Jorge Del Aguila — Full Stack Developer',
  description:
    "I'm a passionate software engineer building scalable web applications.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <ClientLayout>{children}</ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
