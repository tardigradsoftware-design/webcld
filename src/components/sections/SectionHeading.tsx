// src/components/sections/SectionHeading.tsx
'use client'

import { motion } from 'framer-motion'
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
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(variant === 'light' ? 'eyebrow' : 'eyebrow-light')}
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <Tag
            id={id}
            className={cn(
              'mt-4 text-3xl font-semibold leading-tight md:text-4xl',
              variant === 'light' ? 'text-brand-ink' : 'text-white',
            )}
          >
            {title}
          </Tag>
        </motion.div>
      </div>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mt-4 text-base leading-relaxed md:text-lg',
            variant === 'light' ? 'text-brand-ink-soft/80' : 'text-white/70',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}

export default SectionHeading
