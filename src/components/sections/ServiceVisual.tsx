// src/components/sections/ServiceVisual.tsx
/**
 * Hizmet görseli — marka tutarlı, kodla üretilen SVG sanat.
 * Gerçek WebP fotoğraflar hazır olduğunda bu bileşen next/image ile değiştirilebilir;
 * dosya adı kuralı aynı kalır: /public/images/services/{slug}-tardigrad-software.webp
 * (Bkz. scripts/fetch-service-images.mjs — Unsplash terimleri lib/services.ts içinde.)
 */

import type { Service, ServiceCategory } from '@/types'
import { hashString, seededRandom } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ServiceVisualProps {
  service: Service
  cityName?: string
  className?: string
  /** LCP için öncelikli yükleme ipucu */
  priority?: boolean
  compact?: boolean
}

const GRADIENTS: Record<ServiceCategory, [string, string]> = {
  web: ['#1D4ED8', '#2563EB'],
  yazilim: ['#0F1B3D', '#3B82F6'],
  saas: ['#7C3AED', '#2563EB'],
  seo: ['#0891B2', '#1E40AF'],
  otomasyon: ['#1E40AF', '#3B82F6'],
  altyapi: ['#0B1736', '#6090FA'],
  ai: ['#8B5CF6', '#60A5FA'],
}

export function ServiceVisual({ service, cityName, className, priority = false, compact = false }: ServiceVisualProps) {
  const rand = seededRandom(hashString(`${service.slug}-${cityName ?? 'tr'}`))
  const [from, to] = GRADIENTS[service.category] ?? GRADIENTS.web
  const gradientId = `sv-grad-${service.slug}${cityName ? `-${cityName}` : ''}`
  const particles = Array.from({ length: compact ? 14 : 26 }, (_, index) => ({
    id: index,
    x: 40 + rand() * 720,
    y: 30 + rand() * 340,
    r: 1.6 + rand() * 3.4,
    o: 0.15 + rand() * 0.5,
  }))

  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-950 shadow-navy',
        className,
      )}
    >
      <svg
        viewBox="0 0 800 420"
        width={800}
        height={420}
        className="h-auto w-full"
        role="img"
        aria-label={service.image.alt}
        // LCP optimizasyonu: ilk görsel olarak render edilir
        style={{ contentVisibility: priority ? 'visible' : undefined }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} stopOpacity="0.55" />
            <stop offset="100%" stopColor={to} stopOpacity="0.32" />
          </linearGradient>
          <pattern id={`${gradientId}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="rgba(96,144,250,0.14)" strokeWidth="1" />
          </pattern>
          <filter id={`${gradientId}-blur`}>
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        <rect width="800" height="420" fill="#08112B" />
        <rect width="800" height="420" fill={`url(#${gradientId})`} />
        <rect width="800" height="420" fill={`url(#${gradientId}-grid)`} />

        <circle cx="640" cy="90" r="120" fill={to} opacity="0.18" filter={`url(#${gradientId}-blur)`} />
        <circle cx="150" cy="340" r="130" fill={from} opacity="0.2" filter={`url(#${gradientId}-blur)`} />

        {particles.map((particle) => (
          <circle key={particle.id} cx={particle.x} cy={particle.y} r={particle.r} fill="#DBEAFE" opacity={particle.o} />
        ))}

        <Motif category={service.category} />

        <text x="46" y={compact ? 384 : 366} fill="#F9FAFB" fontSize="23" fontWeight="700" fontFamily="Inter, sans-serif">
          {cityName ? `${service.shortTitle} · ${cityName}` : service.title}
        </text>
        <text x="46" y={compact ? 404 : 392} fill="#60A5FA" fontSize="12.5" fontFamily="monospace" letterSpacing="2.4">
          TARDIGRAD SOFTWARE
        </text>
      </svg>
      <figcaption className="sr-only">{service.image.alt}</figcaption>
    </figure>
  )
}

/** Kategoriye özgü orta motif */
function Motif({ category }: { category: ServiceCategory }) {
  const stroke = '#7DD3FC'
  const accent = '#3B82F6'

  switch (category) {
    case 'web':
      return (
        <g transform="translate(470,110)" opacity="0.92">
          <rect x="0" y="0" width="260" height="180" rx="12" fill="rgba(8,17,43,0.72)" stroke={stroke} strokeWidth="1.6" />
          <path d="M0 34h260" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
          <circle cx="20" cy="17" r="4" fill="#F87171" />
          <circle cx="36" cy="17" r="4" fill="#FBBF24" />
          <circle cx="52" cy="17" r="4" fill={accent} />
          <rect x="18" y="52" width="110" height="12" rx="6" fill={stroke} opacity="0.75" />
          <rect x="18" y="76" width="180" height="7" rx="3.5" fill="#DBEAFE" opacity="0.35" />
          <rect x="18" y="92" width="150" height="7" rx="3.5" fill="#DBEAFE" opacity="0.28" />
          <rect x="18" y="116" width="86" height="26" rx="8" fill={accent} opacity="0.85" />
          <rect x="116" y="116" width="86" height="26" rx="8" fill="none" stroke={stroke} strokeWidth="1.3" opacity="0.7" />
        </g>
      )
    case 'yazilim':
      return (
        <g transform="translate(470,110)" opacity="0.92">
          <rect x="0" y="0" width="260" height="180" rx="12" fill="rgba(8,17,43,0.72)" stroke={stroke} strokeWidth="1.6" />
          <path d="M0 30h260" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
          <rect x="0" y="30" width="62" height="150" fill="rgba(59,130,246,0.12)" />
          {[0, 1, 2, 3, 4].map((row) => (
            <rect key={row} x="14" y={48 + row * 26} width="34" height="7" rx="3.5" fill={stroke} opacity={0.35 + row * 0.08} />
          ))}
          {[
            { y: 50, w: 120 },
            { y: 70, w: 168 },
            { y: 90, w: 96 },
            { y: 110, w: 150 },
            { y: 130, w: 118 },
            { y: 150, w: 160 },
          ].map((line, index) => (
            <rect key={index} x="78" y={line.y} width={line.w} height="7" rx="3.5" fill="#DBEAFE" opacity={index % 2 ? 0.3 : 0.55} />
          ))}
          <path d="M196 44l14 14-14 14" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
    case 'saas':
      return (
        <g transform="translate(480,100)" opacity="0.95">
          <path
            d="M60 120a44 44 0 014-87 62 62 0 01118-12 46 46 0 0130 84 34 34 0 01-14 15z"
            fill="rgba(8,17,43,0.75)"
            stroke={stroke}
            strokeWidth="1.8"
          />
          <rect x="78" y="70" width="120" height="8" rx="4" fill={accent} opacity="0.8" />
          <rect x="78" y="90" width="84" height="8" rx="4" fill="#DBEAFE" opacity="0.4" />
          <circle cx="138" cy="146" r="6" fill={stroke} />
          <path d="M138 152v26M110 178h56" stroke={stroke} strokeWidth="1.6" opacity="0.7" />
        </g>
      )
    case 'seo':
      return (
        <g transform="translate(480,96)" opacity="0.95">
          <circle cx="100" cy="100" r="66" fill="rgba(8,17,43,0.7)" stroke={stroke} strokeWidth="2" />
          <path d="M148 148l54 54" stroke={stroke} strokeWidth="9" strokeLinecap="round" />
          <path d="M62 130l26-34 24 18 30-46" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="62" cy="130" r="4.5" fill={accent} />
          <circle cx="88" cy="96" r="4.5" fill={accent} />
          <circle cx="112" cy="114" r="4.5" fill={accent} />
          <circle cx="142" cy="68" r="4.5" fill={accent} />
        </g>
      )
    case 'otomasyon':
      return (
        <g transform="translate(470,110)" opacity="0.95">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={col * 88}
                y={row * 62}
                width="70"
                height="44"
                rx="10"
                fill="rgba(8,17,43,0.7)"
                stroke={stroke}
                strokeWidth="1.4"
                opacity={0.95 - (row + col) * 0.07}
              />
            )),
          )}
          <path
            d="M70 22h18M158 22h18M70 84h18M158 84h18M35 44v18M123 44v18M211 44v18M35 106v18M123 106v18"
            stroke={accent}
            strokeWidth="1.8"
            opacity="0.85"
          />
        </g>
      )
    case 'altyapi':
      return (
        <g transform="translate(480,104)" opacity="0.95">
          {[0, 1, 2].map((row) => (
            <g key={row} transform={`translate(0,${row * 62})`}>
              <rect x="0" y="0" width="230" height="48" rx="10" fill="rgba(8,17,43,0.78)" stroke={stroke} strokeWidth="1.5" />
              <circle cx="24" cy="24" r="6" fill={accent} opacity={0.6 + row * 0.15} />
              <rect x="44" y="19" width="80" height="6" rx="3" fill="#DBEAFE" opacity="0.35" />
              <rect x="44" y="29" width="52" height="5" rx="2.5" fill="#DBEAFE" opacity="0.2" />
              {[0, 1, 2, 3, 4].map((dot) => (
                <circle key={dot} cx={158 + dot * 16} cy="24" r="3.4" fill={stroke} opacity={0.3 + dot * 0.14} />
              ))}
            </g>
          ))}
        </g>
      )
    case 'ai':
    default:
      return (
        <g transform="translate(470,96)" opacity="0.95">
          <rect x="52" y="42" width="180" height="140" rx="26" fill="rgba(8,17,43,0.75)" stroke={stroke} strokeWidth="1.8" />
          <circle cx="112" cy="102" r="11" fill={accent} />
          <circle cx="172" cy="102" r="11" fill={accent} />
          <path d="M112 146c14 12 46 12 60 0" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M142 42V18M52 100H22M232 100h30" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <circle cx="142" cy="14" r="7" fill={stroke} />
          <circle cx="18" cy="100" r="6" fill={stroke} opacity="0.75" />
          <circle cx="266" cy="100" r="6" fill={stroke} opacity="0.75" />
        </g>
      )
  }
}

export default ServiceVisual
