// src/app/sehir/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowUpRight, Building2, Check, MapPin, Users } from 'lucide-react'

import { CONTACT, SITE } from '@/lib/constants'
import {
  buildCityMetaDescription,
  buildCityMetaTitle,
  citySlugs,
  featuredCities,
  getCitiesByRegion,
  getCityBySlug,
  getCityServices,
} from '@/lib/cities'
import { getServiceBySlug, localPriorityServices, services } from '@/lib/services'
import { getPostsForCity } from '@/lib/blog-posts'
import { cityMetadata } from '@/lib/seo'
import {
  faqSchema,
  itemListSchema,
  localBusinessSchema,
  webPageSchema,
} from '@/lib/schemas'
import type { FAQ } from '@/types'
import { JsonLd } from '@/components/seo/JsonLd'

import { CityHero } from '@/components/sections/CityHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { WhyTardigrad } from '@/components/sections/WhyTardigrad'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ServiceGrid } from '@/components/sections/ServiceGrid'
import { FAQ as FaqSection } from '@/components/sections/FAQ'
import { BlogCard } from '@/components/sections/BlogCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { LucideIcon } from '@/components/common/LucideIcon'
import { COMPANY_PROCESS } from '@/lib/constants'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return citySlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getCityBySlug(params.slug)
  if (!city) return { title: 'Şehir bulunamadı' }
  return cityMetadata({
    cityName: city.name,
    region: city.region,
    slug: city.slug,
    description: buildCityMetaDescription(city),
  })
}

/** Şehre özgü SSS — her şehirde sorular şehir adı ve sektörleriyle üretilir */
function buildCityFaq(city: NonNullable<ReturnType<typeof getCityBySlug>>): FAQ[] {
  if (!city) return []
  const industries = city.industries.slice(0, 3).join(', ')
  const districts = city.districts.slice(0, 6).join(', ')
  return [
    {
      question: `${city.name}'de web sitesi yaptırma fiyatları ne kadar?`,
      answer: `${city.name} için fiyat; sayfa sayısı, içerik yönetimi ihtiyacı, entegrasyonlar ve SEO kapsamına göre belirlenir. Tek sayfa tanıtım siteleri ile çok modüllü kurumsal projeler arasında belirgin fark vardır. ${city.name}’deki işletmeler için ücretsiz ön analiz yapıyor, kapsamı netleştirdikten sonra sabit fiyat teklifi paylaşıyoruz.`,
    },
    {
      question: `${city.name}'de yüz yüze görüşme yapıyor musunuz?`,
      answer: `Merkezimiz İstanbul Maltepe’de. ${city.name} dahil tüm illerde öncelikli olarak online görüşme ile ilerliyoruz; ihtiyaç halinde ${districts || city.name} bölgesinde yerinde toplantı planlayabiliyoruz. Proje süreçlerimiz uzaktan çalışmaya uygun kurgulandığı için konum, teslim kalitesini etkilemez.`,
    },
    {
      question: `${city.name}'deki hangi sektörlere hizmet veriyorsunuz?`,
      answer: `${city.name}’de öne çıkan ${industries} sektörleri başta olmak üzere tüm sektörlere hizmet veriyoruz. Sektörünüze göre sayfa mimarisi, anahtar kelime stratejisi ve entegrasyon önerilerini ön analiz aşamasında birlikte belirliyoruz.`,
    },
    {
      question: `${city.name}'de SEO hizmeti alıyor muyum, sonuç ne zaman görünür?`,
      answer: `Evet. ${city.name} için lokal SEO, teknik SEO ve içerik optimizasyonunu bir arada yürütüyoruz. Teknik iyileştirmeler ve yapısal veri çalışması yayınla birlikte etki eder; organik görünürlükte anlamlı artış tipik olarak 3-6 ay içinde ölçülür. ${city.name} rekabet seviyesine göre hedefleri baştan birlikte belirliyoruz.`,
    },
    {
      question: 'Proje sonrası destek ve bakım sağlıyor musunuz?',
      answer: `Evet. ${city.name}’deki müşterilerimize yayın sonrası bakım, güvenlik güncellemeleri, içerik desteği ve performans izleme paketleri sunuyoruz. Standart paketlerimizde ${CONTACT.responseTime}; kritik durumlarda aynı gün müdahale ediyoruz.`,
    },
    {
      question: `${city.name}'de e-ticaret sitesi kuruyor musunuz?`,
      answer: `Evet. ${city.name}’de faaliyet gösteren işletmeler için özel e-ticaret, ürün entegrasyonu, ödeme altyapısı (iyzico, PayTR, havale/EFT) ve kargo entegrasyonları kuruyoruz. Mevcut mağazanızdan veri taşıma ve hız optimizasyonu da kapsamımıza dahildir.`,
    },
    {
      question: 'Sözleşme, fatura ve KVKK süreçleri nasıl işliyor?',
      answer: `Tüm projelerde yazılı sözleşme ve e-fatura ile çalışıyoruz. Form üzerinden ilettiğiniz bilgiler yalnızca teklif ve iletişim amacıyla işlenir; detaylar için KVKK aydınlatma metnimizi inceleyebilirsiniz. Verileriniz üçüncü taraflarla paylaşılmaz.`,
    },
  ]
}

export default function CityPage({ params }: PageProps) {
  const city = getCityBySlug(params.slug)
  if (!city) notFound()

  const cityServices = getCityServices(city, services)
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .slice(0, 12)
  const comboServices = localPriorityServices.slice(0, 6)
  const sameRegionCities = getCitiesByRegion(city.region)
    .filter((item) => item.slug !== city.slug)
    .slice(0, 8)
  const posts = getPostsForCity(city.slug, 3)
  const cityFaq = buildCityFaq(city)
  const industries = city.industries.slice(0, 6)

  const breadcrumbs = [
    { name: 'Şehirler', url: '/sehir/' },
    { name: city.name, url: `/sehir/${city.slug}/` },
  ]

  const pageUrl = `/sehir/${city.slug}/`

  return (
    <>
      <JsonLd
        id="ld-city"
        data={[
          faqSchema(cityFaq),
          localBusinessSchema(city),
          webPageSchema({
            name: buildCityMetaTitle(city),
            description: buildCityMetaDescription(city),
            pageUrl,
            breadcrumb: breadcrumbs,
          }),
          itemListSchema(
            cityServices.map((service) => ({
              name: `${service.title} – ${city.name}`,
              path: city.featuredServices?.includes(service.slug)
                ? `/hizmet/${service.slug}/${city.slug}/`
                : `/hizmetler/${service.slug}/`,
            })),
            `${city.name} hizmetleri`,
            pageUrl,
          ),
        ]}
      />

      {/* 1 — Şehir hero */}
      <CityHero city={city} services={cityServices} breadcrumbs={breadcrumbs} />

      {/* 2 — Şehir tanıtımı (SEO metni) */}
      <section id="hakkinda" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={`${city.region} Bölgesi`}
              title={`${city.name}'de Dijital Çözümler`}
            />
            <div className="mt-5 space-y-4 text-[16.5px] leading-[1.85] text-brand-ink-soft/90">
              <p>{city.description}</p>
              <p>
                {SITE.name}; {city.name}’deki işletmelere{' '}
                <Link href="/hizmetler/kurumsal-web-sitesi/" className="text-brand-navy-700 underline-offset-4 hover:underline">
                  kurumsal web sitesi
                </Link>
                ,{' '}
                <Link href="/hizmetler/e-ticaret-sitesi/" className="text-brand-navy-700 underline-offset-4 hover:underline">
                  e-ticaret
                </Link>
                ,{' '}
                <Link href="/hizmetler/ozel-yazilim-gelistirme/" className="text-brand-navy-700 underline-offset-4 hover:underline">
                  özel yazılım
                </Link>{' '}
                ve{' '}
                <Link href="/hizmetler/lokal-seo/" className="text-brand-navy-700 underline-offset-4 hover:underline">
                  lokal SEO
                </Link>{' '}
                alanlarında uçtan uca destek veriyor. {city.population.toLocaleString('tr-TR')} nüfusu
                ve {industries.length ? `${industries.slice(0, 3).join(', ')} gibi güçlü sektörleriyle` : 'üretim ve hizmet sektörleriyle'}{' '}
                {city.name}, dijital yatırımların geri dönüşünü en hızlı veren illerimizden biri.
              </p>
              <p>
                Projelerimizi {CONTACT.address.locality} / {CONTACT.address.region}’deki merkezimizden
                uzaktan yürütüyor; {city.name}’deki ekiplerle görüntülü toplantılar, paylaşılan proje
                panosu ve haftalık raporlama üzerinden aynı şeffaflıkta çalışıyoruz. Gerektiğinde{' '}
                {city.districts[0] ? `${city.districts[0]} ve çevresinde` : `${city.name} merkezde`}{' '}
                yerinde toplantı da planlıyoruz.
              </p>
            </div>

            {/* İç link ağı: şehir + hizmet kombinasyonları */}
            <div className="mt-8 rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <h3 className="flex items-center gap-2 text-base font-semibold text-brand-ink">
                <MapPin className="h-4 w-4 text-brand-blue" aria-hidden />
                {city.name} için öne çıkan hizmetler
              </h3>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {comboServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/hizmet/${service.slug}/${city.slug}/`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy-200 bg-white px-3.5 py-2 text-[13px] font-medium text-brand-ink-soft transition hover:border-brand-blue hover:text-brand-navy-900"
                    >
                      {service.shortTitle} {city.name}
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Şehir künyesi */}
          <aside className="space-y-4">
            <div className="card-light p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                Şehir künyesi
              </h3>
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
                    İlçe sayısı
                  </dt>
                  <dd className="font-mono font-semibold text-brand-ink">{city.districts.length}</dd>
                </div>
              </dl>
            </div>

            <div className="card-light p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                Öne çıkan sektörler
              </h3>
              <ul className="mt-3.5 space-y-2">
                {industries.map((industry) => (
                  <li key={industry} className="flex items-start gap-2.5 text-sm text-brand-ink-soft/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden />
                    {industry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-light p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                {city.name} ilçeleri
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-brand-ink-soft/70">
                {city.districts.join(', ')} ve diğer tüm ilçelere hizmet veriyoruz.
              </p>
            </div>

            <div className="rounded-2xl bg-brand-navy-900 p-6 text-white shadow-card">
              <h3 className="text-base font-semibold">{city.name} için ücretsiz ön analiz</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Sektörünüzdeki rekabeti, mevcut web varlığınızı ve hızlı kazanımları 20 dakikada
                değerlendiriyoruz.
              </p>
              <Link
                href="#iletisim-formu"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Formu doldurun
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* 3 — Şehre özel hizmetler */}
      <section id="hizmetler" className="section-soft scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Hizmetler"
            id="hizmetler"
            title={`${city.name}'de En Çok Talep Edilen Hizmetler`}
            description={`${city.name}’deki işletmelerin ölçeği ve sektör yapısına göre önceliklendirdiğimiz hizmetler. Toplam ${services.length} hizmet alanının tamamı ${city.name} için de geçerlidir.`}
          />
          <div className="mt-9">
            <ServiceGrid services={cityServices} columns={4} />
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/hizmetler/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
            >
              {services.length} hizmetin tamamını inceleyin
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* 4 — Sektörel çözümler */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="sektorler">
        <div className="container">
          <SectionHeading
            eyebrow="Sektörel yaklaşım"
            id="sektorler"
            title={`${city.name} ekonomisine özel dijital senaryolar`}
            description="Her sektörün dijital ihtiyacı farklıdır. Aşağıda şehrin güçlü sektörleri için önerdiğimiz başlangıç kombinasyonlarını görebilirsiniz."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => {
              const suggestion = suggestForIndustry(industry)
              return (
                <article key={industry} className="card-light p-6">
                  <h3 className="text-base font-semibold text-brand-ink">{industry}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/80">
                    {suggestion.text}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {suggestion.services.map((slug) => {
                      const service = getServiceBySlug(slug)
                      if (!service) return null
                      return (
                        <li key={slug}>
                          <Link
                            href={`/hizmet/${slug}/${city.slug}/`}
                            className="group inline-flex items-center gap-2 text-[13.5px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                          >
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand-navy-50 text-brand-navy-600 transition-colors group-hover:bg-brand-navy-900 group-hover:text-white">
                              <LucideIcon name={service.icon} fallback="Sparkles" className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            {service.shortTitle}
                            <ArrowUpRight className="h-3 w-3 text-brand-navy-300" aria-hidden />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5 — Süreç */}
      <section className="section-navy py-14 lg:py-20" aria-labelledby="surec-sehir">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Çalışma modeli"
            id="surec-sehir"
            title={`${city.name}'den nasıl çalışıyoruz?`}
            description="İlk görüşmeden raporlamaya kadar aynı 9 adımlı süreci uyguluyoruz. Uzaktan çalışmamız, iletişim sıklığını veya kaliteyi değiştirmez."
          />
          <div className="mt-10">
            <ProcessSteps steps={COMPANY_PROCESS.map((step) => ({ ...step }))} variant="dark" />
          </div>
        </div>
      </section>

      {/* 6 — Neden Tardigrad */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="neden-tardigrad">
        <div className="container">
          <SectionHeading
            eyebrow="Farkımız"
            id="neden-tardigrad"
            title={`${city.name}'deki işletmeler neden ${SITE.name} ile çalışıyor?`}
            description="Tek noktadan sorumluluk, ölçülebilir hedefler ve devredilebilir bir altyapı."
          />
          <div className="mt-9">
            <WhyTardigrad variant="light" />
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              `${city.name} için lokal anahtar kelime ve rakip analizi`,
              `${city.districts[0] ? `${city.districts[0]} başta olmak üzere` : 'Şehir genelinde'} ilçe bazlı görünürlük çalışması`,
              `${city.region} bölgesindeki benzer ölçekli projelerden edinilmiş deneyim`,
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-xl border border-brand-navy-100 bg-white p-4">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-brand-ink-soft/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — Şehir SSS */}
      <section id="sss" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="Sık sorulan sorular"
            title={`${city.name} hakkında merak edilenler`}
            description={`Fiyat, görüşme modeli, sektörler, SEO ve destek süreçleri hakkında ${city.name}’e özel yanıtlar.`}
          />
          <FaqSection items={cityFaq} />
        </div>
      </section>

      {/* 8 — Çevre iller */}
      <section className="section-soft py-14 lg:py-16" aria-labelledby="cevre-iller">
        <div className="container">
          <SectionHeading
            eyebrow={`${city.region} Bölgesi`}
            id="cevre-iller"
            title="Yakın bölgelerdeki şehirler"
            description={`${city.name} ile aynı bölgede hizmet verdiğimiz diğer iller.`}
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {sameRegionCities.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/sehir/${item.slug}/`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy-100 bg-white px-4 py-2 text-sm text-brand-ink-soft transition hover:border-brand-blue/50 hover:text-brand-navy-900"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-blue" aria-hidden />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/sehir/"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy-800"
              >
                81 ilin tamamı
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCities
              .filter((item) => item.slug !== city.slug)
              .slice(0, 4)
              .map((item) => (
                <Link key={item.slug} href={`/sehir/${item.slug}/`} className="card-light p-4">
                  <span className="text-sm font-semibold text-brand-ink">{item.name}</span>
                  <span className="mt-1 block text-[12.5px] text-brand-ink-soft/60">{item.region}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 9 — Blog */}
      {posts.length ? (
        <section className="section-light py-14 lg:py-16" aria-labelledby="blog-sehir">
          <div className="container">
            <SectionHeading eyebrow="Blog" id="blog-sehir" title="İlgili rehber içerikler" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 10 — CTA */}
      <ContactSection
        title={`${city.name} için Projenizi Konuşalım`}
        description={`${city.name}’deki işletmenizin mevcut dijital durumunu 20 dakikada değerlendiriyor; kapsam, takvim ve bütçe önerisini yazılı olarak paylaşıyoruz. ${CONTACT.responseTime}.`}
        defaultCity={city.name}
      />
    </>
  )
}

/** Sektöre göre önerilen başlangıç kombinasyonu */
function suggestForIndustry(industry: string): { text: string; services: string[] } {
  const value = industry.toLocaleLowerCase('tr-TR')

  if (/(turizm|otel|seyahat|konaklama)/.test(value)) {
    return {
      text: 'Rezervasyon odaklı bir site, Google Business görünürlüğü ve sezonluk kampanya altyapısı ile doğrudan rezervasyon oranını artırmayı hedefliyoruz.',
      services: ['kurumsal-web-sitesi', 'lokal-seo', 'rezervasyon-basvuru-sistemi'],
    }
  }
  if (/(tarım|gıda|hayvancılık|sera)/.test(value)) {
    return {
      text: 'Ürün kataloğu, bayi/dağıtım yönetimi ve izlenebilirlik ihtiyaçları için hafif bir ERP ve e-ticaret kombinasyonu öneriyoruz.',
      services: ['e-ticaret-sitesi', 'stok-yonetimi', 'kurumsal-web-sitesi'],
    }
  }
  if (/(otomotiv|makine|üretim|sanayi|imalat|döküm|tekstil|mobilya|kimya|metal)/.test(value)) {
    return {
      text: 'Teklif ve sipariş süreçlerini dijitalleştiren, üretim/stok verisini tek panelde toplayan bir kurumsal site + özel yazılım kombinasyonu kuruyoruz.',
      services: ['kurumsal-web-sitesi', 'stok-yonetimi', 'is-takip-sistemi'],
    }
  }
  if (/(sağlık|klinik|hastane|diş|estetik|eczane|medikal)/.test(value)) {
    return {
      text: 'Randevu akışı, hasta bilgilendirme içerikleri ve lokal aramalarda görünürlük; KVKK uyumlu veri saklama ile birlikte kurgulanır.',
      services: ['rezervasyon-basvuru-sistemi', 'lokal-seo', 'kurumsal-web-sitesi'],
    }
  }
  if (/(lojistik|nakliye|kargo|depo|taşıma)/.test(value)) {
    return {
      text: 'Araç ve sevkiyat takibi, müşteri portalı ve otomatik durum bildirimleri ile operasyon görünürlüğünü artırıyoruz.',
      services: ['is-takip-sistemi', 'api-entegrasyonu', 'kurumsal-web-sitesi'],
    }
  }
  if (/(inşaat|gayrimenkul|emlak|müteahhit|yapı)/.test(value)) {
    return {
      text: 'Proje ve portföy vitrini, lead takip CRM’i ve ilan entegrasyonları ile satış hunisini ölçülebilir hale getiriyoruz.',
      services: ['kurumsal-web-sitesi', 'crm', 'lokal-seo'],
    }
  }
  if (/(eğitim|okul|kurs|üniversite|dershane|akademi)/.test(value)) {
    return {
      text: 'Öğrenci kayıt akışı, veli bilgilendirme ve online ödeme; içerik tarafında eğitim odaklı SEO ile birlikte kurulur.',
      services: ['form-basvuru-sistemi', 'odeme-whatsapp-crm-entegrasyonu', 'ai-icerik-araclar'],
    }
  }
  if (/(perakende|mağaza|ticaret|toptan|e-ticaret|pazar)/.test(value)) {
    return {
      text: 'Ürün verisini merkezîleştiren, pazaryeri ve kargo entegrasyonlarıyla çalışan bir satış altyapısı kuruyoruz.',
      services: ['e-ticaret-sitesi', 'urun-tedarikci-yonetimi', 'stok-yonetimi'],
    }
  }
  if (/(enerji|elektrik|güneş|yenilenebilir|maden)/.test(value)) {
    return {
      text: 'Teknik dokümantasyon, proje referansları ve saha verisi takibi için kurumsal site + veri toplama altyapısı öneriyoruz.',
      services: ['kurumsal-web-sitesi', 'api-entegrasyonu', 'raporlama-sistemi'],
    }
  }
  return {
    text: 'Sektörünüze özel ihtiyaç analizi ile web sitesi, otomasyon ve görünürlük çalışmasını tek bir yol haritasında birleştiriyoruz.',
    services: ['kurumsal-web-sitesi', 'lokal-seo', 'dijital-donusum'],
  }
}
