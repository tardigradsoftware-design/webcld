// src/components/layout/Logo.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

/*
  LOGO SVG BURAYA
  ------------------------------------------------------------------
  Marka logosunun SVG kodları teslim edildiğinde:
    1) public/logo.svg dosyasına kaydedin (Organization şeması bunu referans alır)
    2) Aşağıdaki <LogoMark /> bileşeninin içindeki geçici işareti gerçek
       <svg> kodunuzla değiştirin (viewBox, genişlik/yükseklik korunmalı)
    3) Footer ve Header bu bileşeni kullandığı için tek değişiklik yeterlidir.
*/

interface LogoProps {
  /** Koyu arka plan için 'light', beyaz arka plan için 'dark' */
  variant?: 'light' | 'dark'
  className?: string
  /** Yalnızca işaret (wordmark olmadan) */
  markOnly?: boolean
  href?: string
}

function LogoMark({ variant = 'light', className }: { variant?: 'light' | 'dark'; className?: string }) {
  const stroke = variant === 'light' ? '#60A5FA' : '#1D4ED8'
  const strokeAlt = variant === 'light' ? '#3B82F6' : '#1E40AF'
  return (
    <span
      className={cn('relative inline-flex h-9 w-9 items-center justify-center', className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
        <rect x="1.25" y="1.25" width="37.5" height="37.5" rx="10" stroke={stroke} strokeWidth="1.6" opacity="0.55" />
        <path d="M8 26.5c3.4-8.5 8.2-12.8 12.6-12.8 4.6 0 6.6 3.2 6.6 6.1 0 3.4-2.4 5.6-5.1 5.6-2 0-3.4-1.1-3.4-2.8 0-1.6 1.2-2.7 2.7-2.7" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="28.4" cy="14.4" r="2.4" fill={strokeAlt} />
        <path d="M11 31.5h18" stroke={strokeAlt} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      </svg>
    </span>
  )
}

export function Logo({ variant = 'light', className, markOnly = false, href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="Tardigrad Software — ana sayfa"
    >
      {/* LOGO SVG BURAYA */}
      <LogoMark variant={variant} />
      {!markOnly ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-mono text-[17px] font-bold tracking-tight transition-colors',
              variant === 'light' ? 'text-white group-hover:text-blue-300' : 'text-brand-navy-900 group-hover:text-brand-navy-600',
            )}
          >
            Tardigrad
          </span>
          <span
            className={cn(
              'mt-1 text-[10px] font-semibold uppercase tracking-[0.28em]',
              variant === 'light' ? 'text-white/55' : 'text-brand-navy-500',
            )}
          >
            Software
          </span>
        </span>
      ) : null}
    </Link>
  )
}

export default Logo
