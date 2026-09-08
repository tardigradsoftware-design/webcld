// src/components/sections/RelatedServices.tsx
import type { Service } from '@/types'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { cn } from '@/lib/utils'

interface RelatedServicesProps {
  services: Service[]
  citySlug?: string
  cityName?: string
  variant?: 'light' | 'dark'
  className?: string
}

export function RelatedServices({
  services,
  citySlug,
  cityName,
  variant = 'light',
  className,
}: RelatedServicesProps) {
  if (!services.length) return null
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {services.map((service) => (
        <ServiceCard
          key={`${service.slug}-${citySlug ?? 'tr'}`}
          service={service}
          citySlug={citySlug}
          cityName={cityName}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default RelatedServices
