// src/components/sections/TechStack.tsx
'use client'

import { TECH_STACK } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface TechStackProps {
  variant?: 'light' | 'dark'
  className?: string
  /** Yatay kayan şerit (marquee) mi, statik ızgara mı? */
  animated?: boolean
}

function Chip({ name, category, dark }: { name: string; category: string; dark: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm',
        dark
          ? 'border-white/10 bg-white/[0.04] text-white/80'
          : 'border-brand-navy-100 bg-white text-brand-ink-soft',
      )}
    >
      <span
        className={cn(
          'inline-flex h-7 w-7 items-center justify-center rounded-lg font-mono text-[11px] font-bold',
          dark ? 'bg-blue-400/10 text-blue-300' : 'bg-brand-navy-900 text-white',
        )}
        aria-hidden
      >
        {name.slice(0, 2).toLocaleUpperCase('tr-TR')}
      </span>
      <span className="flex flex-col leading-tight">
        <span className={cn('font-semibold', dark ? 'text-white' : 'text-brand-ink')}>{name}</span>
        <span className={cn('text-[11px]', dark ? 'text-white/45' : 'text-brand-ink-soft/60')}>
          {category}
        </span>
      </span>
    </span>
  )
}

export function TechStack({ variant = 'light', className, animated = true }: TechStackProps) {
  const dark = variant === 'dark'
  const items = [...TECH_STACK, ...TECH_STACK]

  return (
    <div className={cn('w-full', className)}>
      {animated ? (
        <div
          className="group relative overflow-hidden"
          role="list"
          aria-label="Kullandığımız teknolojiler"
        >
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 left-0 z-10 w-24',
              dark
                ? 'bg-gradient-to-r from-brand-navy-950 to-transparent'
                : 'bg-gradient-to-r from-white to-transparent',
            )}
            aria-hidden
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 right-0 z-10 w-24',
              dark
                ? 'bg-gradient-to-l from-brand-navy-950 to-transparent'
                : 'bg-gradient-to-l from-white to-transparent',
            )}
            aria-hidden
          />
          <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
            {items.map((tech, index) => (
              <span key={`${tech.name}-${index}`} role="listitem">
                <Chip name={tech.name} category={tech.category} dark={dark} />
              </span>
            ))}
          </div>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {TECH_STACK.map((tech) => (
            <li key={tech.name}>
              <Chip name={tech.name} category={tech.category} dark={dark} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TechStack
