// src/components/sections/ServiceGrid.tsx
'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import type { Service, ServiceCategory } from '@/types'
import { SERVICE_CATEGORIES } from '@/lib/constants'
import { getCategoryCounts } from '@/lib/services'
import { cn } from '@/lib/utils'
import { ServiceCard } from '@/components/sections/ServiceCard'

interface ServiceGridProps {
  services: Service[]
  citySlug?: string
  cityName?: string
  /** Kategori filtresi gösterilsin mi? */
  withFilter?: boolean
  variant?: 'light' | 'dark'
  columns?: 2 | 3 | 4
}

const counts = getCategoryCounts()

/**
 * useSearchParams() statik prerender'da Suspense sınırı gerektirdiği için
 * iç bileşen ayrı tutulur ve dışa Suspense ile sarılmış olarak açılır.
 */
export function ServiceGrid(props: ServiceGridProps) {
  return (
    <Suspense fallback={<ServiceGridSkeleton columns={props.columns ?? 4} />}>
      <ServiceGridInner {...props} />
    </Suspense>
  )
}

function ServiceGridSkeleton({ columns }: { columns: 2 | 3 | 4 }) {
  return (
    <div aria-hidden className="mt-8 grid gap-4">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="h-9 w-28 animate-pulse rounded-full bg-brand-navy-100/70"
          />
        ))}
      </div>
      <div
        className={cn(
          'mt-4 grid gap-4',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
          columns === 4 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        )}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="h-40 animate-pulse rounded-xl bg-brand-navy-100/60" />
        ))}
      </div>
    </div>
  )
}

function ServiceGridInner({
  services,
  citySlug,
  cityName,
  withFilter = true,
  variant = 'light',
  columns = 4,
}: ServiceGridProps) {
  const searchParams = useSearchParams()
  const initial = (searchParams?.get('kategori') as ServiceCategory) ?? 'all'
  const [active, setActive] = useState<ServiceCategory | 'all'>(initial)

  useEffect(() => {
    const next = (searchParams?.get('kategori') as ServiceCategory) ?? 'all'
    setActive(next)
  }, [searchParams])

  const filtered = useMemo(
    () => (active === 'all' ? services : services.filter((service) => service.category === active)),
    [active, services],
  )

  const dark = variant === 'dark'

  return (
    <div>
      {withFilter ? (
        <div className="flex flex-wrap items-center gap-2">
          <FilterButton
            label={`Tümü (${services.length})`}
            active={active === 'all'}
            onClick={() => setActive('all')}
            dark={dark}
          />
          {SERVICE_CATEGORIES.filter((category) => counts[category.key]).map((category) => (
            <FilterButton
              key={category.key}
              label={`${category.emoji} ${category.shortLabel} (${counts[category.key]})`}
              active={active === category.key}
              onClick={() => setActive(category.key)}
              dark={dark}
            />
          ))}
        </div>
      ) : null}

      <motion.div
        layout
        className={cn(
          'mt-8 grid gap-4',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
          columns === 4 && 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        )}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((service) => (
            <motion.div
              key={service.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard
                service={service}
                citySlug={citySlug}
                cityName={cityName}
                variant={variant}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className={cn('mt-6 text-sm', dark ? 'text-white/50' : 'text-brand-ink-soft/65')}>
        {filtered.length} hizmet listeleniyor
        {active !== 'all' ? ` · ${SERVICE_CATEGORIES.find((c) => c.key === active)?.label}` : ''}
      </p>
    </div>
  )
}

function FilterButton({
  label,
  active,
  onClick,
  dark,
}: {
  label: string
  active: boolean
  onClick: () => void
  dark: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-[13px] font-semibold transition-all',
        active
          ? dark
            ? 'border-blue-400/60 bg-blue-400/15 text-blue-200'
            : 'border-brand-navy-900 bg-brand-navy-900 text-white shadow-card'
          : dark
            ? 'border-white/12 bg-white/[0.03] text-white/65 hover:border-blue-400/40 hover:text-white'
            : 'border-brand-navy-200 bg-white text-brand-ink-soft hover:border-brand-navy-400 hover:text-brand-navy-900',
      )}
    >
      {label}
    </button>
  )
}

export default ServiceGrid
