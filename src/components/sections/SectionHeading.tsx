// src/components/sections/SectionHeading.tsx
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** 'light' = beyaz zemin, 'dark' = lacivert zemin */
  variant?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
  as?: 'h2' | 'h3'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  variant = 'light',
  align = 'left',
  className,
  as: Tag = 'h2',
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn(variant === 'light' ? 'eyebrow' : 'eyebrow-light')}>{eyebrow}</span>
      ) : null}
      <Tag
        id={id}
        className={cn(
          'mt-4 text-3xl font-semibold leading-tight md:text-4xl',
          variant === 'light' ? 'text-brand-ink' : 'text-white',
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed md:text-lg',
            variant === 'light' ? 'text-brand-ink-soft/80' : 'text-white/70',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
