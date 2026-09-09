'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

interface ParticleFieldProps {
  className?: string
  count?: number
  /** 'dark' = lacivert zemin üzerine açık mavi, 'light' = beyaz zemin üzerine soluk mavi */
  tone?: 'dark' | 'light'
}

/**
 * Yavaşça yukarı süzülen, parıldayan partikül alanı (canvas).
 * reduced-motion tercihinde tek statik kare çizilir.
 */
export function ParticleField({ className, count = 56, tone = 'dark' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.7 + 0.5,
      s: Math.random() * 0.000045 + 0.000018,
      p: Math.random() * Math.PI * 2,
    }))

    const rgb = tone === 'dark' ? '147, 197, 253' : '37, 99, 235'
    const base = tone === 'dark' ? 0.3 : 0.14

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const pt of pts) {
        const y = (((pt.y - t * pt.s) % 1) + 1) % 1
        const x = pt.x + Math.sin(t * 0.0004 + pt.p) * 0.012
        const alpha = base + Math.sin(t * 0.001 + pt.p) * (base * 0.6)
        ctx.beginPath()
        ctx.arc(x * w, y * h, pt.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${Math.max(alpha, 0.05).toFixed(3)})`
        ctx.fill()
      }
    }

    if (reduced) {
      draw(1200)
    } else {
      const loop = (t: number) => {
        draw(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [count, reduced, tone])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      aria-hidden
    />
  )
}

export default ParticleField
