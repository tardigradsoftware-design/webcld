// src/components/sections/CityComboHero.tsx
// Hizmet + şehir kombine sayfalarının hero bölümü.
import Link from 'next/link'
import { ArrowRight, Building2, MapPin, Sparkles } from 'lucide-react'

import type { City, Service } from '@/types'
import { CONTACT, whatsappLink } from '@/lib/constants'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ServiceVisual } from '@/components/sections/ServiceVisual'
import { LucideIcon } from '@/components/common/LucideIcon'

interface Props {
  service: Service
  city: City
  breadcrumbs: { name: string; url: string }[]
  anchors?: { label: string; href: string }[]
  comboCount?: number
}

export function CityComboHero({ service, city, breadcrumbs, anchors, comboCount }: Props) {
  const waHref = whatsappLink(
    `Merhaba, ${city.name} için ${service.title} hakkında bilgi almak istiyorum.`,
  )

  return (
    <header className="relative isolate overflow-hidden bg-brand-navy-950 pt-28 pb-14 text-white lg:pt-32 lg:pb-20">
      {/* Zemin katmanları */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#08112B_0%,#0F1B3D_52%,#0B1730_100%)]" />
        <div className="absolute inset-0 bg-grid-navy opacity-[0.18]" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-brand-navy-950/80" />
      </div>

      <div className="container relative">
        <Breadcrumb variant="dark" items={breadcrumbs} withSchema={false} />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-semibold text-white/85 backdrop-blur">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-blue/20 text-blue-200">
                  <LucideIcon name={service.icon} fallback="Sparkles" className="h-3 w-3" aria-hidden />
                </span>
                {service.title}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-blue-100">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {city.name}
              </span>
              {typeof comboCount === 'number' ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11.5px] text-white/60">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  {comboCount} şehirde aktif
                </span>
              ) : null}
            </div>

            <h1 className="mt-6 text-[clamp(1.9rem,4.4vw,3.15rem)] font-extrabold leading-[1.12] tracking-tight">
              {city.name} {service.title}
            </h1>

            <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-white/70">
              {city.name}’deki işletmeler için {service.title.toLocaleLowerCase('tr-TR')}: şehrin{' '}
              {city.industries.slice(0, 2).join(' ve ')} dinamiklerine uygun kapsam,{' '}
              {city.districts.slice(0, 3).join(', ')} başta olmak üzere tüm ilçelere hizmet ve{' '}
              {CONTACT.responseTime}.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#iletisim-formu"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3.5 text-[15px] font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                {city.name} için Ücretsiz Ön Analiz
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.09]"
                >
                  WhatsApp ile yazın
                </a>
              ) : (
                <Link
                  href={`/sehir/${city.slug}/`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.09]"
                >
                  {city.name} sayfası
                </Link>
              )}
            </div>

            {anchors?.length ? (
              <nav aria-label="Sayfa içi bağlantılar" className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                {anchors.map((anchor) => (
                  <a
                    key={anchor.href}
                    href={anchor.href}
                    className="text-[13px] font-medium text-white/55 underline-offset-4 transition hover:text-blue-200 hover:underline"
                  >
                    {anchor.label}
                  </a>
                ))}
              </nav>
            ) : null}

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <dt className="text-[11px] uppercase tracking-wide text-white/45">Şehir</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{city.name}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <dt className="text-[11px] uppercase tracking-wide text-white/45">Bölge</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{city.region}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <dt className="text-[11px] uppercase tracking-wide text-white/45">Nüfus</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white">
                  {(city.population / 1000).toLocaleString('tr-TR', { maximumFractionDigits: 0 })}B
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <dt className="text-[11px] uppercase tracking-wide text-white/45">İlçe</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white">
                  {city.districts.length}
                </dd>
              </div>
            </dl>
          </div>

          <aside className="relative">
            <ServiceVisual service={service} cityName={city.name} priority />
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden />
              <p className="text-[13px] leading-relaxed text-white/65">
                {city.name} öne çıkan sektörler: {city.industries.slice(0, 5).join(', ')}. Bu
                sektörlerdeki projelerde kapsamı sektör dinamiklerine göre özelleştiriyoruz.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </header>
  )
}
