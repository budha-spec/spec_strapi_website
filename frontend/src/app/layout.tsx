import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'SPEC India – Enterprise Software Development Company',
  description:
    'SPEC India delivers enterprise software solutions including custom development, BI, mobility, and digital transformation services.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
