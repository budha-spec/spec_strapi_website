'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface VideoModalProps {
  /** Embeddable player URL — run share links through `toEmbedUrl` first. */
  src: string;
  /** Names the dialog for screen readers, e.g. the speaker's name. */
  title: string;
  onClose: () => void;
}

/**
 * Lightbox that plays a video in an iframe.
 *
 * Rendered into `document.body` rather than in place: the carousels that open
 * it clip their overflow and sit inside a transformed track, both of which
 * would trap a fixed-position overlay.
 */
export function VideoModal({ src, title, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // document.body is not available while rendering on the server.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const lastFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    // Stop the page scrolling behind the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocused?.focus();
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-[6px]"
    >
      <div
        // The backdrop closes on click; the player itself must not.
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[min(1100px,92vw)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-11 right-0 flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="aspect-video w-full overflow-hidden rounded-[14px] bg-black">
          <iframe
            src={src}
            title={title}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
