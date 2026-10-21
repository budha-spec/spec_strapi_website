import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ClientsStrip } from '@/components/sections';
import {
  CareerInquiry,
  ContactHero,
  ContactHeroSkeleton,
  fetchContactPage,
  findCareerInquiry,
  findContactGallery,
  findContactIntro,
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

  const blocks = page.content ?? [];
  const gallery = findContactGallery(blocks);
  const career = findCareerInquiry(blocks);

  return (
    <main className="sp-page sp-page-contact-us flex w-full flex-col bg-bg-light">
      <Suspense fallback={<ContactHeroSkeleton />}>
        <ContactHero
          title={page.title}
          description={page.description}
          intro={findContactIntro(blocks)}
          footer={footer}
          countries={countries}
        />
      </Suspense>

      {gallery && <ClientsStrip data={gallery} />}

      {career && <CareerInquiry data={career} />}
    </main>
  );
}
