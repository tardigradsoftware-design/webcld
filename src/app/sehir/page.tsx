// src/app/sehir/page.tsx
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'

import { services, localPriorityServices } from '@/lib/services'
import { cities, cityRegions, featuredCities } from '@/lib/cities'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { CityMapArt } from '@/components/sections/CityMapArt'

const REGION_ORDER: string[] = [
  'Marmara',
  'Ege',
  'Akdeniz',
  'İç Anadolu',
  'Karadeniz',
  'Doğu Anadolu',
  'Güneydoğu Anadolu',
]

const slugifyRegion = (value: string) =>
  value
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Öncelikli sıralama + listede olmayan bölgeler sonda
const orderedRegions = [
  ...REGION_ORDER.filter((region) => cityRegions.includes(region)),
  ...cityRegions.filter((region) => !REGION_ORDER.includes(region)),
]

const citiesByRegion = orderedRegions.map((region) => ({
  key: slugifyRegion(region),
  label: region,
  items: cities.filter((city) => city.region === region),
})).filter((group) => group.items.length > 0)

export default function SehirIndexPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: 'Şehirler', url: '/sehir/' }]}
        eyebrow={`${cities.length} il · Türkiye geneli`}
        h1="Hizmet Verdiğimiz Şehirler"
        lead="İstanbul Maltepe’deki ofisimizden Türkiye’nin 81 iline uzaktan hizmet veriyoruz. Öncelikli şehirler için ayrı lokal sayfalar hazırladık; her sayfada şehre özel sektör senaryoları, hizmet kombinasyonları ve teklif akışı bulunuyor."
        meta={[
          { label: 'Kapsama', value: `${cities.length} il` },
          { label: 'Öncelikli şehir', value: `${featuredCities.length}` },
          { label: 'Hizmet alanı', value: `${services.length}` },
          { label: 'Çalışma modeli', value: 'Uzaktan + yerinde' },
        ]}
        aside={<CityMapArt city={featuredCities[0]} />}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {citiesByRegion.map((group) => (
            <li key={group.key}>
              <a
                href={`#${group.key}`}
                className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
              >
                {group.label} ({group.items.length})
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Öncelikli şehirler */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="oncelikli-sehirler">
        <div className="container">
          <SectionHeading
            eyebrow="Öncelikli şehirler"
            id="oncelikli-sehirler"
            title="Detaylı lokal sayfası olan şehirler"
            description="Bu şehirler için sektör dağılımı, hizmet kombinasyonları ve şehre özel senaryolar içeren ayrı sayfalar hazırladık."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredCities.map((city) => (
              <Link key={city.slug} href={`/sehir/${city.slug}/`} className="card-light group p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-900 text-white transition-transform duration-300 group-hover:scale-105">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-brand-navy-200 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-navy-700"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-ink">{city.name}</h3>
                <p className="mt-1 text-[12.5px] text-brand-ink-soft/60">
                  {city.region} · Nüfus {city.population.toLocaleString('tr-TR')}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-brand-ink-soft/75">
                  {city.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {city.industries.slice(0, 3).map((industry: string) => (
                    <li
                      key={industry}
                      className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-[11px] font-medium text-brand-navy-600"
                    >
                      {industry}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet + şehir kombinasyonları */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="kombinasyonlar">
        <div className="container">
          <SectionHeading
            eyebrow="Hizmet + şehir sayfaları"
            id="kombinasyonlar"
            title="Şehrinize özel hizmet sayfaları"
            description="Öncelikli hizmetlerimiz için şehir bazlı sayfalar hazırladık. Kendi şehriniz ve ihtiyacınızın kesişimini doğrudan görüntüleyin."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {localPriorityServices.map((service) => {
              const targets =
                service.relatedCities.length > 0 ? service.relatedCities : featuredCities.map((c) => c.slug)
              return (
                <div key={service.slug} className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
                  <h3 className="text-base font-semibold text-brand-ink">{service.title}</h3>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {targets.slice(0, 12).map((citySlug) => {
                      const city = cities.find((c) => c.slug === citySlug)
                      if (!city) return null
                      return (
                        <li key={city.slug}>
                          <Link
                            href={`/hizmet/${service.slug}/${city.slug}/`}
                            className="inline-flex items-center gap-1 rounded-full border border-brand-navy-100 bg-brand-paper-soft px-3 py-1.5 text-[12.5px] font-medium text-brand-ink-soft transition hover:border-brand-blue/50 hover:bg-brand-navy-50 hover:text-brand-navy-900"
                          >
                            {city.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <Link
                    href={`/hizmetler/${service.slug}/`}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-navy-600 transition hover:text-brand-navy-900"
                  >
                    Hizmet detayı
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bölgesel listeler — 81 il */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="tum-iller">
        <div className="container">
          <SectionHeading
            eyebrow="Bölgelere göre"
            id="tum-iller"
            title="81 ilin tamamına hizmet veriyoruz"
            description="Aşağıdaki listede kendi şehrinizi bulun. Uzaktan çalıştığımız için konum fark etmeksizin aynı süreç ve kalite standartlarıyla ilerliyoruz."
          />
          <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {citiesByRegion.map((group) => (
              <div key={group.key} id={group.key} className="scroll-mt-24 rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-6">
                <h3 className="flex items-center justify-between gap-3 text-base font-semibold text-brand-ink">
                  {group.label}
                  <span className="font-mono text-xs font-medium text-brand-navy-400">
                    {group.items.length} il
                  </span>
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                  {group.items.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/sehir/${city.slug}/`}
                        className="text-[13.5px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-brand-ink-soft/70">
            Listede olmayan bir ilçede misiniz? {cityRegions.length} bölgenin tamamında, ilçe bazında
            da çalışıyoruz — formu doldurun, kapsamı birlikte belirleyelim.
          </p>
        </div>
      </section>

      <ContactSection
        title="Şehrinizdeki projenizi konuşalım"
        description="Bulunduğunuz şehrin sektör dinamiklerini ve rekabet seviyesini dikkate alarak kapsam önerisi hazırlıyoruz."
      />
    </>
  )
}
