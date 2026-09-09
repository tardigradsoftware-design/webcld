'use client'

import { cn } from '@/lib/utils'

interface OutlineMarqueeProps {
  className?: string
  variant?: 'light' | 'dark'
}

const TEXT = 'TARDİGRAD SOFTWARE • WEB • YAZILIM • SAAS • SEO • YAPAY ZEKÂ • DİJİTAL DÖNÜŞÜM • '

/**
 * Arka planda yavaşça kayan dev outline (kontur) yazı şeridi.
 * Bölümler arasına derinlik ve marka ritmi katar.
 */
export function OutlineMarquee({ className, variant = 'light' }: OutlineMarqueeProps) {
  return (
    <div
      className={cn('relative select-none overflow-hidden py-4', className)}
      aria-hidden
    >
      <div className="-rotate-1">
        <div className="marquee-track-slow flex w-max items-center whitespace-nowrap">
          <span className={cn('text-outline font-black tracking-tight', variant === 'dark' && 'text-outline-dark')}>
            {TEXT.repeat(3)}
          </span>
          <span className={cn('text-outline font-black tracking-tight', variant === 'dark' && 'text-outline-dark')}>
            {TEXT.repeat(3)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OutlineMarquee
