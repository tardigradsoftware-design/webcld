// src/app/hizmetler/page.tsx
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { ServiceCategory } from '@/types'
import { SERVICE_CATEGORIES, SITE } from '@/lib/constants'
import { getCategoryCounts, getServicesByCategory, services } from '@/lib/services'
import { featuredCities } from '@/lib/cities'
import { itemListSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/sections/PageHero'
import { ServiceGrid } from '@/components/sections/ServiceGrid'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ContactSection } from '@/components/sections/ContactSection'
import { LucideIcon } from '@/components/common/LucideIcon'
import { cn } from '@/lib/utils'

const counts = getCategoryCounts()

interface PageProps {
  searchParams?: { kategori?: string }
}

export function generateStaticParams() {
  return []
}

export default function HizmetlerPage({ searchParams }: PageProps) {
  const categoryParam = searchParams?.kategori as ServiceCategory | undefined
  const isValidCategory = Boolean(categoryParam && counts[categoryParam as ServiceCategory])

  return (
    <>
      <JsonLd
        id="ld-hizmetler-liste"
        data={itemListSchema(
          services.map((service) => ({ name: service.title, path: `/hizmetler/${service.slug}/` })),
          'Tardigrad Software hizmet listesi',
          '/hizmetler/',
        )}
      />

      <PageHero
        breadcrumbs={[{ name: 'Hizmetler', url: '/hizmetler/' }]}
        eyebrow={`${services.length} hizmet alanı`}
        h1="Hizmetlerimiz"
        lead="Kurumsal web sitesi, e-ticaret, özel yazılım ve yönetim panelleri, SaaS ürünleri, SEO, dijital otomasyon, altyapı ve yapay zekâ. Her hizmet kendi sayfasında kapsamı, süreci, faydaları ve sık sorulan sorularıyla anlatılıyor."
        meta={[
          { label: 'Hizmet alanı', value: String(services.length) },
          { label: 'Kategori', value: String(SERVICE_CATEGORIES.length) },
          { label: 'Kapsama', value: '81 il' },
          { label: 'Ön analiz', value: 'Ücretsiz' },
        ]}
      >
        <nav aria-label="Hizmet kategorileri" className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/hizmetler/"
            className={cn(
              'rounded-full border px-4 py-2 text-[13px] font-semibold transition',
              !isValidCategory
                ? 'border-cyan-400/60 bg-cyan-400/15 text-white'
                : 'border-white/12 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white',
            )}
          >
            Tümü ({services.length})
          </Link>
          {SERVICE_CATEGORIES.map((category) => (
            <Link
              key={category.key}
              href={`/hizmetler/?kategori=${category.key}`}
              className={cn(
                'rounded-full border px-4 py-2 text-[13px] font-semibold transition',
                categoryParam === category.key
                  ? 'border-cyan-400/60 bg-cyan-400/15 text-white'
                  : 'border-white/12 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white',
              )}
            >
              {category.emoji} {category.label} ({counts[category.key] ?? 0})
            </Link>
          ))}
        </nav>
      </PageHero>

      <section className="section-light py-14 lg:py-20" aria-labelledby="liste-baslik">
        <div className="container">
          <h2 id="liste-baslik" className="sr-only">
            Hizmet listesi
          </h2>
          <Suspense fallback={<div className="text-sm text-brand-ink-soft/60">Yükleniyor…</div>}>
            <ServiceGrid services={services} columns={4} />
          </Suspense>
        </div>
      </section>

      {/* Kategori kırılımları — SEO iç link ağı */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="kategoriler-detay">
        <div className="container">
          <SectionHeading
            eyebrow="Kategorilere göre hizmetler"
            id="kategoriler-detay"
            title="Hangi alanda desteğe ihtiyacınız var?"
            description={`${SITE.name} olarak ${SERVICE_CATEGORIES.length} ana kategoride çalışıyoruz. Kategori seçerek ilgili hizmetlerin tamamını görebilirsiniz.`}
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {SERVICE_CATEGORIES.map((category) => {
              const categoryServices = getServicesByCategory(category.key)
              if (!categoryServices.length) return null
              return (
                <article key={category.key} className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-900 text-white">
                        <LucideIcon name={category.icon} fallback="Sparkles" className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink">
                          {category.emoji} {category.label}
                        </h3>
                        <p className="text-[12.5px] text-brand-ink-soft/60">
                          {categoryServices.length} hizmet · {category.key}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/hizmetler/?kategori=${category.key}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-brand-navy-200 px-3 py-1.5 text-xs font-semibold text-brand-navy-700 transition hover:border-brand-cyan hover:bg-brand-navy-50"
                    >
                      Filtrele
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-brand-ink-soft/80">
                    {category.description}
                  </p>
                  <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                    {categoryServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/hizmetler/${service.slug}/`}
                          className="group inline-flex items-start gap-2 text-[13.5px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Şehir bağlantıları */}
      <section className="section-light py-14 lg:py-16" aria-labelledby="sehir-baglanti">
        <div className="container">
          <SectionHeading
            eyebrow="Lokal kapsama"
            id="sehir-baglanti"
            title="Şehrinize özel hizmet sayfaları"
            description="12 öncelikli şehir için ayrı lokal sayfalar hazırladık; 81 ilin tamamına hizmet veriyoruz."
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {featuredCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/sehir/${city.slug}/`}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-navy-100 bg-brand-paper-soft px-4 py-2 text-sm font-medium text-brand-ink-soft transition hover:border-brand-cyan/50 hover:bg-brand-navy-50 hover:text-brand-navy-900"
                >
                  {city.name}
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/sehir/"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy-800"
              >
                81 ilin tamamı
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <ContactSection
        title="Hangi hizmetin size uygun olduğundan emin değil misiniz?"
        description="Ücretsiz ön analizde mevcut durumunuzu dinliyor, ihtiyacınıza en uygun hizmet kombinasyonunu ve tahmini bütçeyi yazılı olarak paylaşıyoruz."
      />
    </>
  )
}
