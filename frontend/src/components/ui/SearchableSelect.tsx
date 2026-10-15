'use client';

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/lib/utils';

export interface SearchableSelectOption {
  value: string;
  label: string;
  /** Muted text on the right, also searchable (e.g. a dial code). */
  hint?: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name of the trigger, e.g. "Country*". */
  label: string;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Classes for the trigger — size, border colour. */
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={cn('shrink-0 motion-safe:transition-transform', open && 'rotate-180')}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * A select with a search box inside its dropdown. Follows the ARIA
 * "select-only combobox with listbox popup" pattern: the trigger is a button,
 * the search box owns `aria-activedescendant`, arrows move, Enter picks,
 * Escape closes and returns focus to the trigger.
 */
export function SearchableSelect({
  options,
  value,
  onChange,
  label,
  searchPlaceholder = 'Search…',
  emptyText = 'No results',
  className,
  ...aria
}: SearchableSelectProps) {
  const uid = useId();
  const listId = `${uid}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    const digits = q.replace(/\D/g, '');

    // 0 = label starts with the query, 1 = a word in it does, 2 = anywhere
    // in the label, 3 = hint match (e.g. dial code). Lower ranks list first.
    const rank = (o: SearchableSelectOption): number => {
      const label = o.label.toLowerCase();
      if (label.startsWith(q)) return 0;
      if (label.split(/[\s,()-]+/).some((word) => word.startsWith(q))) return 1;
      if (label.includes(q)) return 2;
      const hint = o.hint?.toLowerCase() ?? '';
      if (hint && (hint.includes(q) || (digits && hint.replace(/\D/g, '').startsWith(digits)))) return 3;
      return -1;
    };

    return options
      .map((option) => ({ option, rank: rank(option) }))
      .filter((entry) => entry.rank >= 0)
      .sort((a, b) => a.rank - b.rank)
      .map((entry) => entry.option);
  }, [options, query]);

  const openList = () => {
    setQuery('');
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const close = (refocus: boolean) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const pick = (option: SearchableSelectOption | undefined) => {
    if (!option) return;
    onChange(option.value);
    close(true);
  };

  // Focus the search box when the list opens.
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Close on a click or tap outside.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const onTriggerKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  };

  const onSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(filtered.length - 1);
        break;
      case 'Enter':
        event.preventDefault();
        pick(filtered[active]);
        break;
      case 'Escape':
        event.preventDefault();
        close(true);
        break;
      case 'Tab':
        close(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${label}: ${selected?.label ?? 'not selected'}`}
        onClick={() => (open ? close(true) : openList())}
        onKeyDown={onTriggerKey}
        className={cn(
          'searchable-select flex w-full cursor-pointer items-center justify-between gap-2 text-left',
          className
        )}
        {...aria}
      >
        <span className="truncate">{selected?.label ?? label}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-[10px] border border-stroke-outline bg-bg-white shadow-lg">
          <div className="border-b border-stroke-outline p-2">
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-label={`Search ${label.replace(/\*$/, '')}`}
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={filtered[active] ? `${uid}-opt-${active}` : undefined}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKey}
              className="h-9 w-full rounded-lg border border-stroke-outline bg-transparent px-3 text-d14 text-text-primary outline-none placeholder:text-text-secondary focus:border-brand-cta-blue"
            />
          </div>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label.replace(/\*$/, '')}
            className="max-h-60 overflow-y-auto overscroll-contain py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-d14 text-text-secondary">{emptyText}</li>
            )}
            {filtered.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${uid}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  data-index={index}
                  onPointerMove={() => setActive(index)}
                  onClick={() => pick(option)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-d14',
                    index === active && 'bg-bg-light',
                    isSelected ? 'font-medium text-brand-cta-blue' : 'text-text-primary'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {option.hint && (
                    <span className="shrink-0 text-text-secondary">{option.hint}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
