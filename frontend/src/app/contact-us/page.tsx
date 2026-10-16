import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ClientsStrip } from '@/components/sections';
import {
  CareerInquiry,
  ContactHero,
  ContactHeroSkeleton,
  fetchContactPage,
  findContactGallery,
} from '@/features/contact-us';
import { fetchCountries } from '@/lib/api/countries.api';
import { fetchFooter } from '@/lib/api/footer.api';
import { cmsText } from '@/lib/media';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchContactPage();
  return {
    title: cmsText(page?.title) || 'Contact Us',
    description: cmsText(page?.description) || undefined,
  };
}

export default async function ContactUsPage() {
  // The Footer fetches the same `footer` entry and countries; both are cached.
  const [page, footer, countries] = await Promise.all([
    fetchContactPage(),
    fetchFooter(),
    fetchCountries(),
  ]);
  if (!page) notFound();

  const gallery = findContactGallery(page.content ?? []);

  return (
    <main className="sp-page sp-page-contact-us flex w-full flex-col bg-bg-light">
      <Suspense fallback={<ContactHeroSkeleton />}>
        <ContactHero
          title={page.title}
          description={page.description}
          footer={footer}
          countries={countries}
        />
      </Suspense>

      {gallery && <ClientsStrip data={gallery} />}

      <CareerInquiry />
    </main>
  );
}
