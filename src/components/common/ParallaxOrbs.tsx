'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

interface ParallaxOrbsProps {
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * Scroll ile farklı hızlarda kayan arka plan katmanları:
 * blur ışık küreleri + geometrik halka/kare çizgileri.
 * Bölümlere derinlik ve "akan arka plan" hissi verir.
 */
export function ParallaxOrbs({ variant = 'light', className }: ParallaxOrbsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const y2 = useTransform(scrollYProgress, [0, 1], [70, -90])
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 100])
  const rot = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 45])

  const dark = variant === 'dark'
  return (
    <div
      ref={ref}
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <motion.div
        style={{ y: y1 }}
        className={cn('absolute -left-24 top-6 h-72 w-72 rounded-full blur-3xl', dark ? 'bg-blue-500/20' : 'bg-brand-blue/10')}
      />
      <motion.div
        style={{ y: y2 }}
        className={cn('absolute -right-24 top-1/3 h-80 w-80 rounded-full blur-3xl', dark ? 'bg-sky-400/15' : 'bg-sky-400/10')}
      />
      <motion.div
        style={{ y: y3 }}
        className={cn('absolute -bottom-10 left-1/3 h-64 w-64 rounded-full blur-3xl', dark ? 'bg-brand-navy-500/30' : 'bg-brand-navy-300/15')}
      />
      <motion.div
        style={{ rotate: rot, y: y2 }}
        className={cn('absolute right-[10%] top-10 h-40 w-40 rounded-full border', dark ? 'border-white/10' : 'border-brand-navy-200/70')}
      />
      <motion.div
        style={{ rotate: rot, y: y1 }}
        className={cn('absolute bottom-12 left-[7%] h-24 w-24 rotate-12 rounded-2xl border', dark ? 'border-white/10' : 'border-brand-navy-200/70')}
      />
    </div>
  )
}

export default ParallaxOrbs
