// src/components/sections/CityHero.tsx
import Link from 'next/link'
import { ArrowRight, Building2, MapPin, Users } from 'lucide-react'

import type { City, Service } from '@/types'
import { CONTACT, CTA } from '@/lib/constants'
import { formatNumber } from '@/lib/utils'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CityMapArt } from '@/components/sections/CityMapArt'

interface CityHeroProps {
  city: City
  services: Service[]
  breadcrumbs: { name: string; url: string }[]
}

export function CityHero({ city, services, breadcrumbs }: CityHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -left-36 -top-24 h-[440px] w-[440px] rounded-full bg-blue-600/25 blur-[135px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-[380px] w-[380px] rounded-full bg-blue-500/18 blur-[125px]"
        aria-hidden
      />

      <div className="container relative py-10 lg:py-14">
        <Breadcrumb items={breadcrumbs} variant="dark" />

        <div className="mt-8 grid items-center gap-10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="eyebrow-light">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {city.region} Bölgesi · Öncelik {city.priorityLevel}
            </span>

            <h1 className="mt-5 text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.1] tracking-tight">
              {city.name} Web Sitesi ve Yazılım Geliştirme Hizmetleri
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
              {city.name}’daki işletmeler için kurumsal web sitesi, özel yazılım, CRM, SEO ve dijital
              dönüşüm çözümleri. Tardigrad Software olarak {city.name} ve ilçelerinde{' '}
              {services.length}+ hizmet alanında uzaktan çalışıyor, gerekli olduğunda yerinde görüşme
              planlıyoruz.
            </p>

            <dl className="mt-7 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/45">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                  Nüfus
                </dt>
                <dd className="mt-1.5 font-mono text-base font-bold text-blue-300">
                  {formatNumber(city.population)}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/45">
                  <Building2 className="h-3.5 w-3.5" aria-hidden />
                  İlçe
                </dt>
                <dd className="mt-1.5 font-mono text-base font-bold text-blue-300">
                  {city.districts.length}+
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45">Hizmet alanı</dt>
                <dd className="mt-1.5 font-mono text-base font-bold text-blue-300">43 / 81 il</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#iletisim-formu"
                className="group inline-flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                {city.name} için teklif alın
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`${city.name} — Ücretsiz Ön Analiz`)}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.09]"
              >
                {CTA.secondary}
              </a>
            </div>

            <p className="mt-6 text-xs text-white/45">
              Merkez ofis: {CONTACT.address.full} · {city.name} projeleri uzaktan yönetilir, kritik
              aşamalarda yerinde toplantı planlanır.
            </p>
          </div>

          <CityMapArt city={city} />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />
    </section>
  )
}

export default CityHero
