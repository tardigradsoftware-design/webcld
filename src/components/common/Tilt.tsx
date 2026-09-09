'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface TiltProps {
  children: ReactNode
  className?: string
  /** Maksimum eğim açısı (derece) */
  max?: number
}

/**
 * İmleci takip eden 3D eğim + cam parlama (glare) efekti.
 * Kartlara dokunulabilir, "canlı" bir his kazandırır.
 */
export function Tilt({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 190, damping: 22 })
  const ry = useSpring(useMotionValue(0), { stiffness: 190, damping: 22 })
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 2 * max)
    rx.set((0.5 - py) * 2 * max)
    setGlare({ x: px * 100, y: py * 100, o: 1 })
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    setGlare((g) => ({ ...g, o: 0 }))
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 950 }}
      className={cn('relative [transform-style:preserve-3d]', className)}
    >
      {children}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity: glare.o,
          background: `radial-gradient(440px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.16), transparent 65%)`,
        }}
        aria-hidden
      />
    </motion.div>
  )
}

export default Tilt
