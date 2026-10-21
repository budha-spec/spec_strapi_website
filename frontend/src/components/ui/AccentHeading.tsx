import { Fragment } from 'react';

interface AccentHeadingProps {
  /** CMS heading; the accented part is wrapped in a `<span>`, e.g. `Enterprise <span>Growth</span>`. */
  text: string;
  className?: string;
  accentClassName?: string;
}

const ACCENT_SPAN = /<span\b[^>]*>([\s\S]*?)<\/span>/gi;
const ANY_TAG = /<\/?[a-z][^>]*>/gi;

/**
 * Keeps the section heading style: whatever the CMS wraps in `<span>` sits on
 * the brand gradient. The span's own class is ignored — `accentClassName`
 * picks the gradient that suits the section (light or dark band). Any other
 * markup is stripped, so the heading never renders raw HTML.
 */
export function AccentHeading({
  text,
  className,
  accentClassName = 'gradient-text font-semibold',
}: AccentHeadingProps) {
  const parts: { text: string; accent: boolean }[] = [];
  let last = 0;

  for (const match of text.matchAll(ACCENT_SPAN)) {
    parts.push({ text: text.slice(last, match.index), accent: false });
    parts.push({ text: match[1], accent: true });
    last = match.index + match[0].length;
  }
  parts.push({ text: text.slice(last), accent: false });

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const value = part.text.replace(ANY_TAG, '');
        if (!value) return null;
        return part.accent ? (
          <span key={i} className={accentClassName}>
            {value}
          </span>
        ) : (
          <Fragment key={i}>{value}</Fragment>
        );
      })}
    </span>
  );
}
