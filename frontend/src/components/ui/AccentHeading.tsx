interface AccentHeadingProps {
  text: string;
  className?: string;
  accentClassName?: string;
  /** How many trailing words get the accent, e.g. 2 for "Partnering Us". */
  accentWords?: number;
}

/** Keeps the section heading style: the final word(s) sit on the brand gradient. */
export function AccentHeading({
  text,
  className,
  accentClassName = 'gradient-text font-semibold',
  accentWords = 1,
}: AccentHeadingProps) {
  const words = text.trim().split(/\s+/);
  const splitAt = Math.max(words.length - Math.max(accentWords, 1), 0);

  if (splitAt === 0) {
    return <span className={accentClassName}>{words.join(' ')}</span>;
  }

  return (
    <span className={className}>
      {words.slice(0, splitAt).join(' ')}{' '}
      <span className={accentClassName}>{words.slice(splitAt).join(' ')}</span>
    </span>
  );
}
