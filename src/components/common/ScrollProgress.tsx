'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Sayfanın en üstünde okuma ilerlemesini gösteren ince lacivert-mavi çubuk.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-brand-navy-700 via-brand-blue to-brand-blue-light"
      aria-hidden
    />
  )
}

export default ScrollProgress
