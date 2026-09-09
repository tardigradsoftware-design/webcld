// src/components/sections/CityLinks.tsx
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { City, Service } from '@/types'
import { cn } from '@/lib/utils'

interface CityLinksProps {
  cities: City[]
  /** Verilirse linkler hizmet+şehir kombinasyonuna gider */
  service?: Service
  variant?: 'light' | 'dark'
  className?: string
  title?: string
  showAllLink?: boolean
}

export function CityLinks({
  cities,
  service,
  variant = 'light',
  className,
  title = 'Hizmet verdiğimiz şehirler',
  showAllLink = true,
}: CityLinksProps) {
  if (!cities.length) return null
  const dark = variant === 'dark'

  return (
    <div className={cn(className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          className={cn(
            'flex items-center gap-2 text-lg font-semibold',
            dark ? 'text-white' : 'text-brand-ink',
          )}
        >
          <MapPin className={cn('h-5 w-5', dark ? 'text-blue-300' : 'text-brand-blue')} aria-hidden />
          {title}
        </h2>
        {showAllLink ? (
          <Link
            href="/sehir/"
            className={cn(
              'inline-flex items-center gap-1 text-sm font-semibold transition-colors',
              dark ? 'text-blue-300 hover:text-blue-200' : 'text-brand-navy-600 hover:text-brand-navy-900',
            )}
          >
            81 ilin tamamı
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        ) : null}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2.5">
        {cities.map((city) => {
          const href = service ? `/hizmet/${service.slug}/${city.slug}/` : `/sehir/${city.slug}/`
          return (
            <li key={city.slug}>
              <Link
                href={href}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  dark
                    ? 'border-white/12 bg-white/[0.04] text-white/75 hover:border-blue-400/50 hover:bg-white/[0.09] hover:text-white'
                    : 'border-brand-navy-100 bg-white text-brand-ink-soft hover:border-brand-blue/50 hover:bg-brand-navy-50 hover:text-brand-navy-900',
                )}
              >
                {service ? `${service.shortTitle} ${city.name}` : city.name}
                <ArrowUpRight
                  className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </li>
          )
        })}
      </ul>

      <p className={cn('mt-4 text-sm', dark ? 'text-white/50' : 'text-brand-ink-soft/65')}>
        Hangi şehirde olursanız olun uzaktan çalışıyoruz; gerekli olduğunda yerinde görüşme
        planlıyoruz. Merkez ofisimiz İstanbul Maltepe’dedir.
      </p>
    </div>
  )
}

export default CityLinks
