// src/app/hizmet/[slug]/[sehir]/page.tsx
/**
 * Hizmet + şehir kombine sayfaları (lokal SEO).
 * 5 öncelikli hizmet × 12 öncelikli şehir = 60 statik sayfa.
 * Her sayfa; kendi meta başlığı/açıklaması, H1’i, Service + FAQPage +
 * BreadcrumbList şeması ve şehre özgü içeriği ile benzersizdir.
 */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowUpRight, Building2, Check, Clock, MapPin, Users } from 'lucide-react'

import type { FAQ } from '@/types'
import { CONTACT, SITE } from '@/lib/constants'
import {
  getLocalCitiesForService,
  getLocalServiceCombos,
  getServiceBySlug,
  localComboServices,
} from '@/lib/services'
import { featuredCitySlugs, getCitiesByRegion, getCityBySlug } from '@/lib/cities'
import { getPostsForCity, getPostsForService } from '@/lib/blog-posts'
import { localServiceMetadata } from '@/lib/seo'
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  localBusinessSchema,
  serviceSchema,
} from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

import { CityComboHero } from '@/components/sections/CityComboHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Benefits } from '@/components/sections/Benefits'
import { WhoIsItFor } from '@/components/sections/WhoIsItFor'
import { WhyTardigrad } from '@/components/sections/WhyTardigrad'
import { FAQ as FaqSection } from '@/components/sections/FAQ'
import { RelatedServices } from '@/components/sections/RelatedServices'
import { CityLinks } from '@/components/sections/CityLinks'
import { BlogCard } from '@/components/sections/BlogCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { TransformationExamples } from '@/components/sections/TransformationExamples'
import { LucideIcon } from '@/components/common/LucideIcon'

interface PageProps {
  params: { slug: string; sehir: string }
}

/** 60 statik kombinasyon */
export function generateStaticParams() {
  return getLocalServiceCombos(featuredCitySlugs).map(({ service, citySlug }) => ({
    slug: service.slug,
    sehir: citySlug,
  }))
}

export const dynamicParams = false

/** Kombinasyon geçerli mi? (yanlış slug → 404) */
function resolveCombo(params: PageProps['params']) {
  const service = getServiceBySlug(params.slug)
  const city = getCityBySlug(params.sehir)
  if (!service || !city) return null
  const allowed = getLocalCitiesForService(service, featuredCitySlugs)
  if (!allowed.includes(city.slug)) return null
  return { service, city }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const combo = resolveCombo(params)
  if (!combo) return { title: 'Sayfa bulunamadı' }
  const { service, city } = combo
  return localServiceMetadata({
    serviceTitle: service.title,
    cityName: city.name,
    serviceSlug: service.slug,
    citySlug: city.slug,
    description: buildComboMetaDescription(service.title, city.name, service.primaryKeyword),
  })
}

function buildComboMetaDescription(serviceTitle: string, cityName: string, keyword: string): string {
  const full = `${cityName} ${serviceTitle.toLocaleLowerCase('tr-TR')} hizmeti: ${keyword}, şehre özel kapsam, sabit fiyat teklifi ve ${CONTACT.responseTime}. Ücretsiz ön analiz için formu doldurun.`
  return full.length <= 155 ? full : full.slice(0, 152).replace(/[,;]\s*$/, '') + '...'
}

/** Şehre + hizmete özgü SSS (5 soru: 3 şehir bazlı, 2 hizmet bazlı) */
function buildComboFaq(serviceTitle: string, cityName: string, districts: string[], industries: string[], serviceFaq: FAQ[]): FAQ[] {
  const lowerService = serviceTitle.toLocaleLowerCase('tr-TR')
  return [
    {
      question: `${cityName} ${lowerService} fiyatları ne kadar?`,
      answer: `${cityName} için ${lowerService} fiyatı; kapsam, sayfa/modül sayısı, içerik hazırlığı ve entegrasyon ihtiyacına göre belirlenir. Ücretsiz ön analizde ihtiyaçlarınızı dinliyor, sabit fiyatlı yazılı teklif paylaşıyoruz. ${cityName}’deki benzer ölçekli projelerde bütçe aralığını ilk görüşmede şeffaf biçimde aktarıyoruz.`,
    },
    {
      question: `${cityName}'de ${lowerService} projesi ne kadar sürer?`,
      answer: `Standart takvim; küçük kapsamlı işlerde 1-3 hafta, orta ölçekli projelerde 3-8 hafta, kapsamlı sistemlerde 8-16 haftadır. ${cityName} projelerinde de sprint bazlı ilerliyor, her sprint sonunda çalışan bir çıktı paylaşıyoruz. Onay süreçleriniz hızlıysa takvim belirgin şekilde kısalır.`,
    },
    {
      question: `${cityName} için yüz yüze görüşme yapılıyor mu?`,
      answer: `Merkezimiz İstanbul Maltepe’de; ${cityName} dahil tüm illerde öncelikli olarak online görüşme ile çalışıyoruz. İhtiyaç halinde ${districts[0] ? `${districts[0]} ve çevresinde` : `${cityName} merkezde`} yerinde keşif ve toplantı planlayabiliyoruz. Süreçlerimiz uzaktan çalışmaya uygun kurgulandığı için konum kaliteyi etkilemez.`,
    },
    {
      question: `${cityName}'deki hangi sektörlere ${lowerService} hizmeti veriyorsunuz?`,
      answer: `${cityName}’de öne çıkan ${industries.slice(0, 3).join(', ')} sektörleri başta olmak üzere tüm sektörlere hizmet veriyoruz. Sektörünüze göre kapsamı, anahtar kelime stratejisini ve entegrasyon önerilerini ön analizde birlikte netleştiriyoruz.`,
    },
    ...serviceFaq.slice(0, 2),
  ]
}

const ANCHORS = [
  { label: 'Şehirde durum', href: '#sehirde-durum' },
  { label: 'Kapsam', href: '#kapsam' },
  { label: 'Süreç', href: '#surec' },
  { label: 'Faydalar', href: '#faydalar' },
  { label: 'SSS', href: '#sss' },
  { label: 'İletişim', href: '#iletisim-formu' },
]

export default function LocalServicePage({ params }: PageProps) {
  const combo = resolveCombo(params)
  if (!combo) notFound()
  const { service, city } = combo

  const pageUrl = `/hizmet/${service.slug}/${city.slug}/`
  const breadcrumbs = [
    { name: 'Hizmetler', url: '/hizmetler/' },
    { name: service.title, url: `/hizmetler/${service.slug}/` },
    { name: city.name, url: pageUrl },
  ]

  const comboCities = getLocalCitiesForService(service, featuredCitySlugs)
    .map((slug) => getCityBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item) && item?.slug !== city.slug)
    .slice(0, 5)
  const cityCombos = localComboServices.filter((item) => item.slug !== service.slug)
  const relatedCities = getCitiesByRegion(city.region)
    .filter((item) => item.slug !== city.slug)
    .slice(0, 4)
    .map((item) => item.slug)
  const comboFaq = buildComboFaq(
    service.title,
    city.name,
    city.districts,
    city.industries,
    service.faq,
  )
  const posts = [
    ...getPostsForService(service.slug, 2),
    ...getPostsForCity(city.slug, 2),
  ].filter((post, index, self) => self.findIndex((p) => p.slug === post.slug) === index).slice(0, 3)

  return (
    <>
      <JsonLd
        id="ld-local-service"
        data={[
          serviceSchema(service, pageUrl, {
            city,
            name: `${city.name} ${service.title}`,
            description: `${city.name}’deki işletmeler için ${service.title.toLocaleLowerCase('tr-TR')} hizmeti. ${service.summary}`,
          }),
          faqSchema(comboFaq),
          breadcrumbSchema([{ name: 'Ana Sayfa', url: '/' }, ...breadcrumbs]),
          localBusinessSchema(city),
          itemListSchema(
            comboCities.map((item) => ({
              name: `${item.name} ${service.title}`,
              path: `/hizmet/${service.slug}/${item.slug}/`,
            })),
            `${service.title} hizmeti verdiğimiz şehirler`,
            pageUrl,
          ),
        ]}
      />

      {/* 1 — Hero */}
      <CityComboHero
        service={service}
        city={city}
        breadcrumbs={breadcrumbs}
        anchors={ANCHORS}
        comboCount={comboCities.length + 1}
      />

      {/* 2 — Şehirde dijital durum */}
      <section id="sehirde-durum" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={`${city.region} · ${city.name}`}
              title={`${city.name}'de ${service.title}`}
            />
            <div className="mt-5 space-y-4 text-[16.5px] leading-[1.85] text-brand-ink-soft/90">
              <p>
                {city.name}, {city.population.toLocaleString('tr-TR')} nüfusu ve{' '}
                {city.industries.slice(0, 3).join(', ')} gibi güçlü sektörleriyle dijital yatırımların
                geri dönüşünü hızlı veren illerimizden biri. {city.description}
              </p>
              <p>
                {SITE.name} olarak {city.name}’deki işletmelere{' '}
                <strong className="font-semibold text-brand-ink">
                  {service.title.toLocaleLowerCase('tr-TR')}
                </strong>{' '}
                alanında uçtan uca destek veriyoruz: {service.summary.toLocaleLowerCase('tr-TR')} Proje
                sürecini {CONTACT.address.locality} / {CONTACT.address.region}’deki merkezimizden uzaktan
                yürütüyor, {city.districts.slice(0, 4).join(', ')} ve diğer tüm ilçelerdeki ekiplerle
                aynı şeffaflıkta çalışıyoruz.
              </p>
              <p>
                {city.name}’deki rekabet seviyesi, sektör yoğunluğu ve hedef kitlenizin arama
                davranışını ön analizde değerlendiriyor; kapsamı ve takvimi bu verilere göre
                belirliyoruz. {service.heroTagline}
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="card-light p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                {city.name} künyesi
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-brand-ink-soft/70">
                    <Users className="h-4 w-4 text-brand-blue" aria-hidden />
                    Nüfus
                  </dt>
                  <dd className="font-mono font-semibold text-brand-ink">
                    {city.population.toLocaleString('tr-TR')}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-brand-ink-soft/70">
                    <Building2 className="h-4 w-4 text-brand-blue" aria-hidden />
                    Bölge
                  </dt>
                  <dd className="font-medium text-brand-ink">{city.region}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-brand-ink-soft/70">
                    <MapPin className="h-4 w-4 text-brand-blue" aria-hidden />
                    Hizmet alanı
                  </dt>
                  <dd className="text-right font-medium text-brand-ink">
                    {city.districts.length} ilçe + çevre iller
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-brand-ink-soft/70">
                    <Clock className="h-4 w-4 text-brand-blue" aria-hidden />
                    Geri dönüş
                  </dt>
                  <dd className="font-medium text-brand-ink">{CONTACT.responseTime}</dd>
                </div>
              </dl>
            </div>

            <div className="card-light p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                {city.name}’de hizmet verdiğimiz ilçeler
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-brand-ink-soft/80">
                {city.districts.join(', ')} ve diğer tüm ilçeler.
              </p>
            </div>

            <Link
              href={`/sehir/${city.slug}/`}
              className="card-light flex items-center justify-between gap-3 p-5"
            >
              <span>
                <span className="block text-sm font-semibold text-brand-ink">
                  {city.name} şehir sayfası
                </span>
                <span className="block text-[12.5px] text-brand-ink-soft/60">
                  Tüm hizmetler ve sektörel senaryolar
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-brand-navy-400" aria-hidden />
            </Link>
          </aside>
        </div>
      </section>

      {/* 3 — Neden gerekli (şehre uyarlanmış) */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="neden-gerekli">
        <div className="container">
          <SectionHeading
            eyebrow="Problem tanımı"
            id="neden-gerekli"
            title={`${city.name}'deki işletmeler neden bu hizmete ihtiyaç duyuyor?`}
            description="Bu hizmete ihtiyaç duyan işletmelerin en sık karşılaştığı sorunlar ve görünmeyen maliyetleri."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {service.whyNeeded.map((item, index) => (
              <div key={item.title} className="card-light flex gap-4 p-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <LucideIcon name={item.icon} fallback="TriangleAlert" className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-brand-ink">
                    <span className="mr-2 font-mono text-xs text-brand-navy-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-brand-navy-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-brand-ink">
              {city.name}’de öne çıkan sektörler için yaklaşımımız
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {city.industries.slice(0, 6).map((industry) => (
                <li key={industry} className="flex items-start gap-2 text-[13.5px] text-brand-ink-soft/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden />
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 — Kapsam */}
      <section id="kapsam" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Hizmet kapsamı"
              title={`${city.name} için Ne Alırsınız?`}
              description="Teslim kapsamı baştan netleşir; proje sonunda sürpriz maliyet veya eksik modül olmaz."
            />
            <div className="mt-6 rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <p className="text-sm leading-relaxed text-brand-ink-soft/80">
                Aşağıdaki maddeler standart kapsamımızdır. {city.name}’deki işletmenizin ihtiyacına
                göre daraltılabilir veya ek modüllerle genişletilebilir.
              </p>
              <Link
                href="#iletisim-formu"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                Kapsamı birlikte netleştirelim
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.scope.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-brand-navy-100 bg-white p-4 transition-colors hover:border-brand-blue/40"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[14.5px] leading-relaxed text-brand-ink-soft/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Süreç */}
      <section id="surec" className="section-navy scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Proje süreci"
            title={`${city.name}'de nasıl ilerliyoruz?`}
            description="İlk görüşmeden yayın sonrası raporlamaya kadar 9 adımlı şeffaf süreç. Uzaktan çalışmamız iletişim sıklığını değiştirmez."
          />
          <div className="mt-10">
            <ProcessSteps steps={service.process} variant="dark" />
          </div>
        </div>
      </section>

      {/* 6 — Dönüşüm örnekleri */}
      <section className="section-light py-14 lg:py-16" aria-labelledby="ornekler">
        <div className="container">
          <SectionHeading
            eyebrow="Öncesi ve sonrası"
            id="ornekler"
            title={`${city.name}'deki işletmeler için tipik dönüşümler`}
            description="En sık karşılaştığımız dijital tıkanmalar ve çözümden sonraki durum."
          />
          <div className="mt-9">
            <TransformationExamples />
          </div>
        </div>
      </section>

      {/* 7 — Faydalar */}
      <section id="faydalar" className="section-soft scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Ölçülebilir faydalar"
            title="Ne Kazanırsınız?"
            description={`${service.title} yatırımının ${city.name}’deki işletmenize sağlayacağı somut kazanımlar.`}
          />
          <div className="mt-9">
            <Benefits benefits={service.benefits} />
          </div>
        </div>
      </section>

      {/* 8 — Kimler için */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="kimler-icin">
        <div className="container">
          <SectionHeading
            eyebrow="Hedef kitle"
            id="kimler-icin"
            title={`${city.name}'de kimler için uygun?`}
            description="Bu hizmetten en çok fayda sağlayan işletme tipleri ve sektörler."
          />
          <div className="mt-8">
            <WhoIsItFor items={service.targetAudience} />
          </div>
          <div className="mt-6">
            <WhyTardigrad variant="light" />
          </div>
        </div>
      </section>

      {/* 9 — SSS */}
      <section id="sss" className="section-soft scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="Sık sorulan sorular"
            title={`${city.name} ${service.title} SSS`}
            description="Fiyat, süre, görüşme modeli ve sektör bazlı soruların yanıtları."
          />
          <FaqSection items={comboFaq} />
        </div>
      </section>

      {/* 10 — Aynı hizmetin diğer şehirleri */}
      <section className="section-light py-14 lg:py-16" aria-labelledby="diger-sehirler">
        <div className="container">
          <CityLinks
            cities={comboCities}
            service={service}
            title={`${service.title} hizmeti verdiğimiz diğer şehirler`}
          />
          <div className="mt-6 flex flex-wrap gap-2.5">
            {relatedCities.map((citySlug) => {
              const item = getCityBySlug(citySlug)
              if (!item) return null
              return (
                <Link
                  key={citySlug}
                  href={`/sehir/${citySlug}/`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy-100 px-3.5 py-1.5 text-[13px] text-brand-ink-soft/80 transition hover:border-brand-blue/40 hover:text-brand-navy-900"
                >
                  <MapPin className="h-3 w-3 text-brand-blue" aria-hidden />
                  {item.name} dijital hizmetler
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 11 — Aynı şehirdeki diğer hizmetler */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="ayni-sehir">
        <div className="container">
          <SectionHeading
            eyebrow={`${city.name} için diğer hizmetler`}
            id="ayni-sehir"
            title={`${city.name}'de birlikte çalıştığımız diğer alanlar`}
            description="Bu hizmetle birlikte en sık kurguladığımız kombinasyonlar."
          />
          <div className="mt-9">
            <RelatedServices services={cityCombos} citySlug={city.slug} cityName={city.name} />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: `${service.title} — genel hizmet sayfası`, href: `/hizmetler/${service.slug}/` },
              { label: `${city.name} — şehir sayfası`, href: `/sehir/${city.slug}/` },
              { label: 'Tüm hizmetler', href: '/hizmetler/' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="card-light flex items-center justify-between gap-3 p-4"
              >
                <span className="text-sm font-medium text-brand-ink-soft">{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-brand-navy-300" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Blog */}
      {posts.length ? (
        <section className="section-light py-14 lg:py-16" aria-labelledby="blog-kombo">
          <div className="container">
            <SectionHeading eyebrow="İlgili içerikler" id="blog-kombo" title="Blog’dan öneriler" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 13 — CTA */}
      <ContactSection
        title={`${city.name} ${service.title} için Ücretsiz Ön Analiz`}
        description={`${city.name}’deki işletmeniz için ${service.title.toLocaleLowerCase('tr-TR')} kapsamını, takvimi ve bütçeyi 20 dakikalık bir görüşmede netleştiriyoruz. ${CONTACT.responseTime}.`}
        defaultService={service.title}
        defaultCity={city.name}
        cityContext={city.name}
      />
    </>
  )
}
