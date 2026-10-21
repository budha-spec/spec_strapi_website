import { CmsImage } from '@/components/ui/CmsImage';
import { NETWORK_LABELS, socialNetwork } from '@/components/sections/LetsTalk';
import type { AboutPanelData } from '@/types/header-menu.types';
import { MegaLinkList, MenuHeading, MenuImageCard, MenuIntroBlock } from './MenuParts';

/**
 * The footer helper knows the social networks only; this bar also links the
 * portfolio sites, which get their own brand fill (`.social-btn` in globals.css).
 */
const PORTFOLIO_NETWORKS = ['behance', 'dribbble'] as const;
const PORTFOLIO_LABELS: Record<(typeof PORTFOLIO_NETWORKS)[number], string> = {
  behance: 'Behance',
  dribbble: 'Dribbble',
};

/** "Who we are": intro, About SPEC INDIA links, the 40+ Years card and socials. */
export function AboutPanel({ panel }: { panel: AboutPanelData }) {
  const hasAside = panel.card || panel.social;

  return (
    // Figma at 1920: intro x=60 (306 wide), links x=457 (242 wide), card flush right.
    <div className="grid gap-x-[clamp(32px,4.74vw,91px)] lg:grid-cols-[clamp(220px,15.94vw,306px)_clamp(180px,12.6vw,242px)_minmax(0,1fr)]">
      <MenuIntroBlock intro={panel.intro} />

      <div className="min-w-0">
        {panel.heading && <MenuHeading link={panel.heading} />}
        <MegaLinkList links={panel.links} className="mt-[20px]" />
      </div>

      {hasAside && (
        <div className="hidden w-full max-w-[532px] flex-col gap-[10px] justify-self-end xl:flex">
          {/* Figma shows no hover state on this card. */}
          {panel.card && <MenuImageCard card={panel.card} size="md" />}

          {panel.social && panel.social.links.length > 0 && (
            <div className="gradient-btn flex h-[clamp(72px,4.69vw,90px)] items-center justify-between gap-4 rounded-[14px] pr-[clamp(20px,2.45vw,47px)] pl-[clamp(20px,1.72vw,33px)]">
              <p className="text-[16px] leading-[24px] font-medium tracking-[0.48px] text-white">
                {panel.social.title}
              </p>
              {/* Same buttons and brand-colour hover as the footer's "Follow us on". */}
              <ul className="flex items-center gap-[clamp(10px,0.94vw,18px)]">
                {panel.social.links.map((link) => {
                  const network = socialNetwork({ id: link.id, url: link.href, icon: link.icon });
                  const portfolio = PORTFOLIO_NETWORKS.find((name) => link.href.includes(name));
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          network
                            ? NETWORK_LABELS[network]
                            : portfolio
                              ? PORTFOLIO_LABELS[portfolio]
                              : 'Social profile'
                        }
                        data-network={network ?? portfolio}
                        className="mega-social social-btn flex size-[clamp(30px,1.98vw,38px)] items-center justify-center overflow-hidden rounded-[8px] transition-colors"
                      >
                        {/* The Strapi icon is the whole button, border included. */}
                        <CmsImage
                          media={link.icon}
                          fallback="logo"
                          alt=""
                          width={38}
                          height={38}
                          className="size-full object-contain"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
