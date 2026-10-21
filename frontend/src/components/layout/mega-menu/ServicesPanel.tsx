import type { MenuGroup, ServicesPanelData } from '@/types/header-menu.types';
import { MegaLink, MenuHeading, MenuImageCard } from './MenuParts';

const COLUMNS = 4;

/**
 * Deals the categories into columns the way Figma stacks them: each one goes
 * under the shortest column so far (Application Development lands under
 * Software Engineering, Digital Transformation under Data & Analytics).
 */
function toColumns(groups: MenuGroup[]): MenuGroup[][] {
  const columns: MenuGroup[][] = Array.from({ length: COLUMNS }, () => []);
  const heights = new Array<number>(COLUMNS).fill(0);
  groups.forEach((group, i) => {
    const column = i < COLUMNS ? i : heights.indexOf(Math.min(...heights));
    columns[column].push(group);
    // A heading plus its gap is about two link rows tall.
    heights[column] += group.links.length + 2;
  });
  return columns.filter((column) => column.length > 0);
}

/** "What we do": Service Offering categories and the featured card. */
export function ServicesPanel({ panel }: { panel: ServicesPanelData }) {
  return (
    <div className="grid gap-x-[clamp(32px,3.91vw,75px)] xl:grid-cols-[minmax(0,1221fr)_minmax(0,454fr)]">
      <div className="min-w-0">
        {panel.heading && <MenuHeading link={panel.heading} tone="white" />}
        <div className="mt-[clamp(20px,1.56vw,30px)] border-t border-stroke-dark pt-[clamp(20px,1.56vw,30px)]">
          {/*
            Figma's column starts (x 60 / 439 / 784 / 1063): unequal tracks, gap
            included. Below xl the card is hidden, so equal columns share the room.
          */}
          <div className="grid grid-cols-4 xl:grid-cols-[379fr_345fr_279fr_218fr]">
            {toColumns(panel.groups).map((column, i) => (
              <div key={i} className="flex min-w-0 flex-col gap-[clamp(28px,2.6vw,50px)] pr-4">
                {column.map((group) => (
                  <div key={group.id}>
                    {/* Wide screens: one line, running into the gap like Figma's "Digital Transformation". */}
                    <MenuHeading link={group} className="min-[1600px]:whitespace-nowrap" />
                    {group.links.length > 0 && (
                      <ul className="mt-[clamp(16px,1.46vw,28px)] flex flex-col gap-[clamp(12px,1.04vw,20px)]">
                        {group.links.map((link) => (
                          <li key={link.id}>
                            <MegaLink link={link} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {panel.feature && (
        <MenuImageCard
          card={panel.feature}
          eyebrow="Featured"
          className="hidden self-start xl:mt-[clamp(40px,2.81vw,54px)] xl:flex"
        />
      )}
    </div>
  );
}
