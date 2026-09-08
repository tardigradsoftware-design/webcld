// src/components/sections/Stats.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

import { SITE_STATS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 })
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    motionValue.set(value)
  }, [inView, motionValue, reduced, value])

  useEffect(() => {
    if (reduced) return
    const unsubscribe = spring.on('change', (latest) => setDisplay(Math.round(latest)))
    return unsubscribe
  }, [reduced, spring])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

interface StatsProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function Stats({ variant = 'light', className }: StatsProps) {
  const dark = variant === 'dark'
  return (
    <section
      className={cn('py-14 lg:py-16', dark ? 'bg-brand-navy-900 text-white' : 'bg-white', className)}
      aria-label="Rakamlarla Tardigrad Software"
    >
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(
                'rounded-2xl border p-6 transition-colors',
                dark
                  ? 'border-white/10 bg-white/[0.04] hover:border-cyan-400/40'
                  : 'border-brand-navy-100 bg-brand-paper-soft hover:border-brand-cyan/40 hover:bg-white',
              )}
            >
              <div
                className={cn(
                  'font-mono text-4xl font-bold lg:text-5xl',
                  dark ? 'text-cyan-300' : 'text-brand-navy-700',
                )}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className={cn(
                  'mt-2 text-sm font-semibold uppercase tracking-wide',
                  dark ? 'text-white/80' : 'text-brand-ink',
                )}
              >
                {stat.label}
              </div>
              <p className={cn('mt-1.5 text-sm', dark ? 'text-white/55' : 'text-brand-ink-soft/70')}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
