// src/components/sections/ProcessSteps.tsx
'use client'

import { motion } from 'framer-motion'
import type { ProcessStep } from '@/types'
import { cn } from '@/lib/utils'
import { LucideIcon } from '@/components/common/LucideIcon'

interface ProcessStepsProps {
  steps: ProcessStep[]
  variant?: 'light' | 'dark'
  /** Dikey zaman çizelgesi mi, kart ızgarası mı? */
  layout?: 'timeline' | 'grid'
  className?: string
}

export function ProcessSteps({ steps, variant = 'light', layout = 'timeline', className }: ProcessStepsProps) {
  const dark = variant === 'dark'

  if (layout === 'grid') {
    return (
      <ol className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className={cn(
              'rounded-xl border p-5',
              dark ? 'card-navy' : 'card-light',
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-bold',
                  dark ? 'bg-cyan-400/12 text-cyan-300' : 'bg-brand-navy-900 text-white',
                )}
              >
                {String(step.step).padStart(2, '0')}
              </span>
              <LucideIcon
                name={step.icon}
                fallback="Sparkles"
                className={cn('h-5 w-5', dark ? 'text-white/45' : 'text-brand-navy-400')}
                aria-hidden
              />
            </div>
            <h3 className={cn('mt-4 text-base font-semibold', dark ? 'text-white' : 'text-brand-ink')}>
              {step.title}
            </h3>
            <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-white/60' : 'text-brand-ink-soft/75')}>
              {step.description}
            </p>
          </motion.li>
        ))}
      </ol>
    )
  }

  return (
    <ol className={cn('relative', className)}>
      <span
        className={cn(
          'absolute left-[23px] top-2 hidden h-[calc(100%-16px)] w-px sm:block',
          dark ? 'bg-white/12' : 'bg-brand-navy-100',
        )}
        aria-hidden
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="relative flex gap-5 pb-7 last:pb-0 sm:gap-6"
        >
          <span
            className={cn(
              'relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold shadow-card',
              dark
                ? 'border border-cyan-400/30 bg-brand-navy-900 text-cyan-300'
                : 'border border-brand-navy-100 bg-white text-brand-navy-700',
            )}
          >
            {String(step.step).padStart(2, '0')}
          </span>
          <div className="flex-1 pt-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className={cn('text-lg font-semibold', dark ? 'text-white' : 'text-brand-ink')}>
                {step.title}
              </h3>
              <LucideIcon
                name={step.icon}
                fallback="Sparkles"
                className={cn('h-4 w-4', dark ? 'text-cyan-300/70' : 'text-brand-cyan')}
                aria-hidden
              />
            </div>
            <p className={cn('mt-1.5 max-w-2xl text-[15px] leading-relaxed', dark ? 'text-white/65' : 'text-brand-ink-soft/80')}>
              {step.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

export default ProcessSteps
