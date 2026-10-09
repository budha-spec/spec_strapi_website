import type { ReactNode } from 'react';
import Link from 'next/link';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';

/** Strapi v5 "Rich text (Blocks)" field — the node types its editor emits. */
export interface RichTextLeaf {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface RichTextLink {
  type: 'link';
  url: string;
  children: RichTextLeaf[];
}

export type RichTextInline = RichTextLeaf | RichTextLink;

export type RichTextNode =
  | { type: 'paragraph'; children: RichTextInline[] }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; children: RichTextInline[] }
  | { type: 'quote'; children: RichTextInline[] }
  | { type: 'code'; children: RichTextLeaf[] }
  | {
      type: 'list';
      format: 'ordered' | 'unordered';
      children: Array<{ type: 'list-item'; children: RichTextInline[] }>;
    };

function renderLeaf(leaf: RichTextLeaf, key: number): ReactNode {
  let node: ReactNode = cmsText(leaf.text);
  if (leaf.code) node = <code>{node}</code>;
  if (leaf.bold) node = <strong>{node}</strong>;
  if (leaf.italic) node = <em>{node}</em>;
  if (leaf.underline) node = <u>{node}</u>;
  if (leaf.strikethrough) node = <s>{node}</s>;
  return <span key={key}>{node}</span>;
}

function renderInline(nodes: RichTextInline[]): ReactNode[] {
  return nodes.map((node, i) =>
    node.type === 'link' ? (
      <Link key={i} href={hrefPath(node.url)} className="underline underline-offset-2">
        {node.children.map(renderLeaf)}
      </Link>
    ) : (
      renderLeaf(node, i)
    )
  );
}

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

interface RichTextProps {
  content?: RichTextNode[] | null;
  className?: string;
}

/**
 * Renders a Strapi Blocks field. Typography comes from the parent via
 * `className`; blocks are spaced evenly so the copy reads as one column.
 */
export function RichText({ content, className }: RichTextProps) {
  if (!content?.length) return null;

  return (
    <div className={cn('flex flex-col gap-[1em]', className)}>
      {content.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i}>{renderInline(block.children)}</p>;
          case 'heading': {
            const Tag = HEADINGS[block.level - 1] ?? 'h3';
            return (
              <Tag key={i} className="font-semibold text-text-primary">
                {renderInline(block.children)}
              </Tag>
            );
          }
          case 'quote':
            return (
              <blockquote key={i} className="border-l-2 border-stroke-main pl-4 italic">
                {renderInline(block.children)}
              </blockquote>
            );
          case 'code':
            return (
              <pre key={i} className="overflow-x-auto rounded-lg bg-bg-white p-4 text-d14">
                <code>{block.children.map((leaf) => leaf.text).join('')}</code>
              </pre>
            );
          case 'list': {
            const List = block.format === 'ordered' ? 'ol' : 'ul';
            return (
              <List
                key={i}
                className={cn(
                  'flex flex-col gap-[0.4em] pl-5',
                  block.format === 'ordered' ? 'list-decimal' : 'list-disc'
                )}
              >
                {block.children.map((item, j) => (
                  <li key={j}>{renderInline(item.children)}</li>
                ))}
              </List>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
