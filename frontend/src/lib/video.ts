/** Turns the share URLs stored in Strapi into embeddable player URLs. */

/** Accepts `90`, `1m30s`, `2h3m4s` — the forms YouTube puts in `t`. */
function toSeconds(value: string): number {
  if (/^\d+$/.test(value)) return Number.parseInt(value, 10);

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;
  const [, h, m, s] = match;
  return (
    Number.parseInt(h ?? '0', 10) * 3600 +
    Number.parseInt(m ?? '0', 10) * 60 +
    Number.parseInt(s ?? '0', 10)
  );
}

/**
 * Converts a YouTube or Vimeo link into the `/embed` form an iframe needs,
 * carrying over any start timestamp and asking the player to autoplay —
 * the viewer has already clicked Play to get here.
 *
 * Anything that is not a recognised share link is returned untouched, so a
 * URL that is already embeddable (a self-hosted file, say) still works.
 * Returns null only when there is nothing usable at all.
 */
export function toEmbedUrl(raw?: string | null): string | null {
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  const params = new URLSearchParams({ autoplay: '1' });

  const stamp = url.searchParams.get('t') ?? url.searchParams.get('start');
  if (stamp) {
    const seconds = toSeconds(stamp);
    if (seconds > 0) params.set('start', String(seconds));
  }

  let youtubeId: string | null = null;
  if (host === 'youtu.be') {
    youtubeId = url.pathname.slice(1) || null;
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    youtubeId =
      url.pathname === '/watch'
        ? url.searchParams.get('v')
        : (url.pathname.match(/^\/(?:embed|shorts|v)\/([^/?]+)/)?.[1] ?? null);
  }
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?${params}`;
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const vimeoId = url.pathname.match(/(\d+)/)?.[1];
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?${params}`;
  }

  return raw;
}
