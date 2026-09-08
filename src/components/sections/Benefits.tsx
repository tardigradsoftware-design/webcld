// src/components/sections/Benefits.tsx
'use client'

import { motion } from 'framer-motion'
import type { Benefit } from '@/types'
import { cn } from '@/lib/utils'
import { LucideIcon } from '@/components/common/LucideIcon'

interface BenefitsProps {
  benefits: Benefit[]
  variant?: 'light' | 'dark'
  className?: string
}

export function Benefits({ benefits, variant = 'light', className }: BenefitsProps) {
  const dark = variant === 'dark'
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className={cn('relative overflow-hidden rounded-xl border p-5', dark ? 'card-navy' : 'card-light')}
        >
          <div className="flex items-start justify-between gap-3">
            <span
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-lg',
                dark ? 'bg-emerald-400/12 text-emerald-300' : 'bg-brand-green/10 text-emerald-600',
              )}
            >
              <LucideIcon name={benefit.icon} fallback="Sparkles" className="h-5 w-5" aria-hidden />
            </span>
            {benefit.metric ? (
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold',
                  dark ? 'bg-white/[0.07] text-cyan-300' : 'bg-brand-navy-50 text-brand-navy-700',
                )}
              >
                {benefit.metric}
              </span>
            ) : null}
          </div>
          <h3 className={cn('mt-4 text-base font-semibold', dark ? 'text-white' : 'text-brand-ink')}>
            {benefit.title}
          </h3>
          <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-white/60' : 'text-brand-ink-soft/75')}>
            {benefit.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default Benefits
