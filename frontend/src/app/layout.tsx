import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Nunito } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { ParticlesProviderRoot } from '@/components/ui/ParticlesProviderRoot';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'SPEC India – Enterprise Software Development Company',
  description:
    'SPEC India delivers enterprise software solutions including custom development, BI, mobility, and digital transformation services.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.specindia.com'
  ),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body className="antialiased font-sans bg-bg-white text-text-primary">
        <ParticlesProviderRoot>
          <Header />
          {children}
          <Footer />
        </ParticlesProviderRoot>
      </body>
    </html>
  );
}
