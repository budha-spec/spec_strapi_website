import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      href,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex shrink-0 whitespace-nowrap items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue disabled:opacity-50 disabled:pointer-events-none ring-offset-bg-white';

    const variants = {
      primary:
        'bg-brand-blue text-white hover:brightness-110 shadow-sm',
      outline:
        'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
      ghost:
        'text-brand-blue underline-offset-4 hover:underline',
      glass:
        'glass text-white border-glass-border hover:bg-white/10',
    };

    const sizes = {
      default: 'h-11 px-6 py-2',
      sm: 'h-9 px-4 text-xs',
      lg: 'h-14 px-8 text-base',
      icon: 'h-10 w-10',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';
