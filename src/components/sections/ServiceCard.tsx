// src/components/sections/ServiceCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '@/types'
import { CATEGORY_MAP } from '@/lib/constants'
import { servicePhoto } from '@/lib/photos'
import { cn } from '@/lib/utils'
import { LucideIcon } from '@/components/common/LucideIcon'

interface ServiceCardProps {
  service: Service
  /** Şehir bağlamı verilirse kart hizmet+şehir sayfasına bağlanır */
  citySlug?: string
  cityName?: string
  variant?: 'light' | 'dark'
  className?: string
  priority?: boolean
}

export function ServiceCard({
  service,
  citySlug,
  cityName,
  variant = 'light',
  className,
}: ServiceCardProps) {
  const href = citySlug ? `/hizmet/${service.slug}/${citySlug}/` : `/hizmetler/${service.slug}/`
  const category = CATEGORY_MAP[service.category]
  const dark = variant === 'dark'
  const photo = servicePhoto(service)

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl border p-5 transition-all duration-300',
        dark
          ? 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-cyan-400/45 hover:bg-white/[0.07]'
          : 'border-brand-navy-100 bg-white hover:-translate-y-1 hover:border-brand-cyan/45 hover:shadow-card-hover',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl transition-opacity duration-500',
          dark ? 'bg-cyan-400/15 opacity-0 group-hover:opacity-100' : 'bg-brand-cyan/12 opacity-0 group-hover:opacity-100',
        )}
        aria-hidden
      />

      {/* Kategori fotoğrafı — kart görsel kimliği */}
      <span
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -mt-5 block h-24',
          dark ? 'border-b border-white/10' : 'border-b border-brand-navy-100/70',
        )}
        aria-hidden
      >
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span
          className={cn(
            'absolute inset-0',
            dark
              ? 'bg-gradient-to-b from-brand-navy-950/35 via-brand-navy-950/55 to-brand-navy-950/92'
              : 'bg-gradient-to-b from-white/10 via-white/55 to-white',
          )}
        />
      </span>

      <div className="relative mt-16 flex items-start justify-between gap-3">
        <span
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-lg border shadow-sm transition-colors',
            dark
              ? 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300'
              : 'border-brand-navy-100 bg-brand-navy-50 text-brand-navy-600 group-hover:border-brand-cyan/40 group-hover:text-brand-navy-800',
          )}
        >
          <LucideIcon name={service.icon} fallback="Sparkles" className="h-5 w-5" aria-hidden />
        </span>
        <ArrowUpRight
          className={cn(
            'h-4 w-4 shrink-0 transition-all duration-300',
            dark
              ? 'text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300'
              : 'text-brand-navy-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-navy-600',
          )}
          aria-hidden
        />
      </div>

      <h3
        className={cn(
          'mt-4 text-base font-semibold leading-snug',
          dark ? 'text-white' : 'text-brand-ink',
        )}
      >
        {cityName ? `${service.shortTitle} ${cityName}` : service.shortTitle}
      </h3>

      <p
        className={cn(
          'mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed',
          dark ? 'text-white/60' : 'text-brand-ink-soft/75',
        )}
      >
        {service.summary}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className={cn(
            'rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider',
            dark ? 'border-white/12 text-white/55' : 'border-brand-navy-100 text-brand-navy-500',
          )}
        >
          {category?.shortLabel ?? service.category}
        </span>
        <span
          className={cn(
            'text-xs font-semibold transition-colors',
            dark ? 'text-cyan-300/80 group-hover:text-cyan-300' : 'text-brand-navy-500 group-hover:text-brand-navy-800',
          )}
        >
          İncele
        </span>
      </div>
    </Link>
  )
}

export default ServiceCard
