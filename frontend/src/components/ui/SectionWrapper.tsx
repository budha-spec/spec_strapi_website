import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  as?: React.ElementType;
}

export function SectionWrapper({
  className,
  containerClassName,
  children,
  as: Component = 'section',
  ...props
}: SectionWrapperProps) {
  return (
    <Component
      className={cn('py-20 md:py-28 w-full relative', className)}
      {...props}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10',
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}
