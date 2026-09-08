// src/components/sections/ServiceHero.tsx
import Link from 'next/link'
import { ArrowRight, Check, Clock, ShieldCheck } from 'lucide-react'

import type { Service } from '@/types'
import { CATEGORY_MAP, CTA } from '@/lib/constants'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ServiceVisual } from '@/components/sections/ServiceVisual'
import { LucideIcon } from '@/components/common/LucideIcon'

interface ServiceHeroProps {
  service: Service
  cityName?: string
  breadcrumbs: { name: string; url: string }[]
  /** Sayfa içi bölüm bağlantıları (kullanıcı + SEO için) */
  anchors?: { label: string; href: string }[]
}

export function ServiceHero({ service, cityName, breadcrumbs, anchors = [] }: ServiceHeroProps) {
  const category = CATEGORY_MAP[service.category]
  const h1 = cityName
    ? `${cityName} için ${service.title} Hizmeti`
    : `${service.h1}`

  return (
    <section className="relative overflow-hidden bg-brand-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 -top-28 h-[460px] w-[460px] rounded-full bg-blue-600/25 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-24 h-[400px] w-[400px] rounded-full bg-cyan-500/18 blur-[130px]"
        aria-hidden
      />

      <div className="container relative py-10 lg:py-14">
        <Breadcrumb items={breadcrumbs} variant="dark" />

        <div className="mt-8 grid items-center gap-10 pb-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="eyebrow-light">
                <LucideIcon name={service.icon} fallback="Sparkles" className="h-3.5 w-3.5" aria-hidden />
                {category?.label ?? service.category}
              </span>
              {cityName ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                  {cityName} · Lokal Hizmet
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/55">
                Hizmet #{String(service.id).padStart(2, '0')} / 43
              </span>
            </div>

            <h1 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.08] tracking-tight">
              {h1}
            </h1>

            <p className="mt-4 text-lg font-medium text-cyan-200/90 md:text-xl">{service.heroTagline}</p>

            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70 md:text-base">
              {service.summary} {cityName ? `${cityName} ve çevresindeki işletmeler için` : 'Türkiye genelinde'}{' '}
              ücretsiz ön analiz ile başlıyor, kapsamı ve takvimi yazılı olarak netleştiriyoruz.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-300" aria-hidden />
                {CONTACT_RESPONSE}
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden />
                KVKK uyumlu süreç
              </li>
              <li className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" aria-hidden />
                30 gün hata düzeltme garantisi
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#iletisim-formu"
                className="group inline-flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                {CTA.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/surec/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/[0.09]"
              >
                9 adımlı sürecimiz
              </Link>
            </div>

            {anchors.length ? (
              <nav aria-label="Sayfa içi bağlantılar" className="mt-8 border-t border-white/10 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  Bu sayfada
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                  {anchors.map((anchor) => (
                    <li key={anchor.href}>
                      <a
                        href={anchor.href}
                        className="text-white/65 underline-offset-4 transition hover:text-cyan-300 hover:underline"
                      >
                        {anchor.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <ServiceVisual service={service} cityName={cityName} priority />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />
    </section>
  )
}

const CONTACT_RESPONSE = 'En geç 24 saatte dönüş'

export default ServiceHero
