'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Saniye cinsinden gecikme (grid stagger için) */
  delay?: number
  /** Başlangıç dikey kayması (px) */
  y?: number
  className?: string
}

/**
 * Görünüm alanına girince yumuşakça yükselerek beliren sarmalayıcı.
 * `once: true` ile yalnızca ilk girişte oynar; reduced-motion tercihine saygı duyar.
 */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
