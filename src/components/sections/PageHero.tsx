// src/components/sections/PageHero.tsx
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

import { CTA, CONTACT } from '@/lib/constants'
import type { BreadcrumbItem } from '@/types'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: ReactNode
  h1: string
  lead?: ReactNode
  breadcrumbs: BreadcrumbItem[]
  children?: ReactNode
  /** Sağ sütun (görsel / kart) */
  aside?: ReactNode
  showCta?: boolean
  className?: string
  meta?: { label: string; value: string }[]
}

export function PageHero({
  eyebrow,
  h1,
  lead,
  breadcrumbs,
  children,
  aside,
  showCta = true,
  className,
  meta,
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-brand-navy-950 text-white', className)}>
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-blue-600/25 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-16 h-[360px] w-[360px] rounded-full bg-blue-500/18 blur-[120px]"
        aria-hidden
      />

      <div className="container relative py-10 lg:py-14">
        <Breadcrumb items={breadcrumbs} variant="dark" />

        <div
          className={cn(
            'mt-8 grid gap-10 pb-6 lg:items-center lg:gap-14',
            aside ? 'lg:grid-cols-[1.05fr_0.95fr]' : '',
          )}
        >
          <div className="max-w-3xl">
            {eyebrow ? <span className="eyebrow-light">{eyebrow}</span> : null}
            <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
              {h1}
            </h1>
            {lead ? <p className="mt-5 text-lg leading-relaxed text-white/72 md:text-xl">{lead}</p> : null}

            {meta?.length ? (
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-white/45">{item.label}</dt>
                    <dd className="mt-1 font-mono text-sm font-semibold text-blue-300">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {showCta ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/iletisim/#iletisim-formu"
                  className="group inline-flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:brightness-110"
                >
                  {CTA.primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Ücretsiz Ön Analiz Talebi')}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.09]"
                >
                  <Mail className="h-4 w-4 text-blue-300" aria-hidden />
                  {CTA.secondary}
                </a>
              </div>
            ) : null}

            {children}
          </div>

          {aside ? <div className="lg:justify-self-end lg:w-full lg:max-w-xl">{aside}</div> : null}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />
    </section>
  )
}

export default PageHero
