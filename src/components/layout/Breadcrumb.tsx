// src/components/layout/Breadcrumb.tsx
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { BreadcrumbItem } from '@/types'
import { breadcrumbSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { cn } from '@/lib/utils'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Açık tema (beyaz zemin) için 'dark', koyu zemin için 'light' */
  variant?: 'light' | 'dark'
  className?: string
  /** Şema basılsın mı? (sayfada ayrıca basılıyorsa false verin) */
  withSchema?: boolean
}

export function Breadcrumb({ items, variant = 'light', className, withSchema = true }: BreadcrumbProps) {
  const all: BreadcrumbItem[] = [{ name: 'Ana Sayfa', url: '/' }, ...items]

  return (
    <>
      {withSchema ? <JsonLd data={breadcrumbSchema(all)} id="ld-breadcrumb" /> : null}
      <nav aria-label="Breadcrumb" className={cn('w-full', className)}>
        <ol
          className={cn(
            'flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px]',
            variant === 'light' ? 'text-brand-ink-soft/70' : 'text-white/60',
          )}
        >
          {all.map((item, index) => {
            const isLast = index === all.length - 1
            return (
              <li key={`${item.url}-${index}`} className="flex items-center gap-1.5">
                {index === 0 ? (
                  <Home
                    className={cn('h-3.5 w-3.5', variant === 'light' ? 'text-brand-navy-400' : 'text-cyan-300')}
                    aria-hidden
                  />
                ) : null}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={cn(
                      'font-medium',
                      variant === 'light' ? 'text-brand-navy-800' : 'text-white',
                    )}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className={cn(
                      'transition-colors',
                      variant === 'light'
                        ? 'text-brand-ink-soft/70 hover:text-brand-navy-600'
                        : 'text-white/60 hover:text-cyan-300',
                    )}
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast ? (
                  <ChevronRight
                    className={cn(
                      'h-3.5 w-3.5',
                      variant === 'light' ? 'text-brand-navy-200' : 'text-white/25',
                    )}
                    aria-hidden
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumb
