interface AccentHeadingProps {
  text: string;
  className?: string;
  accentClassName?: string;
}

/** Keeps the section heading style: the final word sits on the brand gradient. */
export function AccentHeading({
  text,
  className,
  accentClassName = 'gradient-text font-semibold',
}: AccentHeadingProps) {
  const trimmed = text.trim();
  const splitAt = trimmed.lastIndexOf(' ');

  if (splitAt === -1) {
    return <span className={accentClassName}>{trimmed}</span>;
  }

  return (
    <span className={className}>
      {trimmed.slice(0, splitAt)}{' '}
      <span className={accentClassName}>{trimmed.slice(splitAt + 1)}</span>
    </span>
  );
}
