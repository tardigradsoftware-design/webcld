// src/components/sections/WhoIsItFor.tsx
'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhoIsItForProps {
  items: string[]
  variant?: 'light' | 'dark'
  className?: string
}

export function WhoIsItFor({ items, variant = 'light', className }: WhoIsItForProps) {
  const dark = variant === 'dark'
  return (
    <ul className={cn('flex flex-wrap gap-2.5', className)}>
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.3, delay: index * 0.04 }}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
            dark
              ? 'border-white/12 bg-white/[0.04] text-white/80'
              : 'border-brand-navy-100 bg-brand-paper-soft text-brand-ink-soft',
          )}
        >
          <Check
            className={cn('h-4 w-4', dark ? 'text-sky-300' : 'text-brand-blue')}
            aria-hidden
          />
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

export default WhoIsItFor
