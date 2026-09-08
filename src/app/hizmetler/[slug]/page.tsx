// src/app/hizmetler/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Check, MapPin } from 'lucide-react'

import type { Metadata } from 'next'
import { CATEGORY_MAP, CONTACT, SITE } from '@/lib/constants'
import {
  getRelatedServices,
  getServiceBySlug,
  getServicesByCategory,
  serviceSlugs,
} from '@/lib/services'
import { citiesBySlug, featuredCities } from '@/lib/cities'
import { getPostsForService } from '@/lib/blog-posts'
import { serviceMetadata } from '@/lib/seo'
import { faqSchema, serviceSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

import { ServiceHero } from '@/components/sections/ServiceHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Benefits } from '@/components/sections/Benefits'
import { WhoIsItFor } from '@/components/sections/WhoIsItFor'
import { WhyTardigrad } from '@/components/sections/WhyTardigrad'
import { FAQ } from '@/components/sections/FAQ'
import { RelatedServices } from '@/components/sections/RelatedServices'
import { CityLinks } from '@/components/sections/CityLinks'
import { BlogCard } from '@/components/sections/BlogCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { ServiceVisual } from '@/components/sections/ServiceVisual'
import { Photo } from '@/components/common/Photo'
import { servicePhoto } from '@/lib/photos'
import { LucideIcon } from '@/components/common/LucideIcon'
import { PHOTOS } from '@/lib/photos'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return { title: 'Hizmet bulunamadı' }
  return serviceMetadata({
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    slug: service.slug,
    primaryKeyword: service.primaryKeyword,
    secondaryKeywords: service.secondaryKeywords,
    imageAlt: service.image.alt,
  })
}

const ANCHORS = [
  { label: 'Nedir?', href: '#nedir' },
  { label: 'Neden gerekli?', href: '#neden-gerekli' },
  { label: 'Kapsam', href: '#kapsam' },
  { label: 'Süreç', href: '#surec' },
  { label: 'Faydalar', href: '#faydalar' },
  { label: 'Kimler için?', href: '#kimler-icin' },
  { label: 'SSS', href: '#sss' },
  { label: 'İletişim', href: '#iletisim-formu' },
]

export default function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const category = CATEGORY_MAP[service.category]
  const relatedServices = getRelatedServices(service, 6)
  const categoryServices = getServicesByCategory(service.category).filter(
    (item) => item.slug !== service.slug,
  )
  const relatedCities = service.relatedCities
    .map((slug) => citiesBySlug[slug])
    .filter(Boolean)
    .concat([citiesBySlug.istanbul])
    .filter((city, index, self) => self.findIndex((c) => c.slug === city.slug) === index)
    .slice(0, 5)
  const posts = getPostsForService(service.slug, 3)

  const breadcrumbs = [
    { name: 'Hizmetler', url: '/hizmetler/' },
    ...(category ? [{ name: category.label, url: `/hizmetler/?kategori=${service.category}` }] : []),
    { name: service.title, url: `/hizmetler/${service.slug}/` },
  ]

  const pageUrl = `/hizmetler/${service.slug}/`

  return (
    <>
      <JsonLd
        id="ld-service-page"
        data={[serviceSchema(service, pageUrl), faqSchema(service.faq)]}
      />

      {/* 4 — Hero */}
      <ServiceHero service={service} breadcrumbs={breadcrumbs} anchors={ANCHORS} />

      {/* 5 — {Hizmet} Nedir? */}
      <section id="nedir" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={`${category?.label ?? 'Hizmet'} · Türkiye geneli`}
              title={`${service.title} Nedir?`}
            />
            <div className="mt-5 space-y-4 text-[16.5px] leading-[1.85] text-brand-ink-soft/90">
              <p>
                <strong className="font-semibold text-brand-ink">{service.primaryKeyword}</strong>,{' '}
                {service.summary.toLocaleLowerCase('tr-TR')}
              </p>
              <p>{service.description}</p>
              <p>
                {SITE.name} olarak {service.title.toLocaleLowerCase('tr-TR')} projelerinde{' '}
                {CONTACT.address.full} merkezli ekibimizle Türkiye’nin 81 iline hizmet veriyoruz.{' '}
                {service.heroTagline}
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {[service.primaryKeyword, ...service.secondaryKeywords.slice(0, 3)].map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full border border-brand-navy-100 bg-brand-paper-soft px-3 py-1.5 font-mono text-[11.5px] text-brand-navy-600"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Photo
              src={servicePhoto(service).src}
              alt={servicePhoto(service).alt}
              caption={`${service.title} — proje yaklaşımımızdan bir kare`}
              className="aspect-[4/3] rounded-2xl border border-brand-navy-100 shadow-card"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <ServiceVisual service={service} compact />
          </div>
        </div>
      </section>

      {/* 6 — Neden gerekli? */}
      <section id="neden-gerekli" className="section-soft scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Problem tanımı"
            title={`Neden ${service.title} Gerekli?`}
            description="Bu hizmete ihtiyaç duyan işletmelerin en sık karşılaştığı sorunlar ve bu sorunların görünmeyen maliyetleri."
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
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/78">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Kapsam: Ne alırsınız? */}
      <section id="kapsam" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Hizmet kapsamı"
              title={`${SITE.name} ile Ne Alırsınız?`}
              description="Teslim kapsamı baştan netleşir; proje sonunda sürpriz maliyet veya eksik modül olmaz."
            />
            <div className="mt-6 rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <p className="text-sm leading-relaxed text-brand-ink-soft/80">
                Aşağıdaki maddeler standart kapsamımızdır. İhtiyacınıza göre daraltılabilir veya ek
                modüllerle genişletilebilir — ücretsiz ön analizde birlikte belirliyoruz.
              </p>
              <Link
                href="#iletisim-formu"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                Kapsamı birlikte netleştirelim
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {service.scope.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-brand-navy-100 bg-white p-4 transition-colors hover:border-brand-cyan/40"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/12 text-brand-green">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[14.5px] leading-relaxed text-brand-ink-soft/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Nasıl çalışıyoruz? */}
      <section id="surec" className="section-navy scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Proje süreci"
            title="Nasıl Çalışıyoruz?"
            description={`${service.title} projelerinde uyguladığımız 9 adımlı süreç. Her adımın çıktısı, süresi ve sorumlusu baştan bellidir.`}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <ProcessSteps steps={service.process} variant="dark" />
            <div className="space-y-4">
              <div className="card-navy p-6">
                <h3 className="text-lg font-semibold text-white">Teslim süresi</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Kapsam netleştikten sonra takvim yazılı olarak paylaşılır. Ortalama süreler: küçük
                  kapsamlı işler 1-3 hafta, orta ölçekli projeler 3-8 hafta, kapsamlı sistemler 8-16
                  hafta.
                </p>
              </div>
              <div className="card-navy p-6">
                <h3 className="text-lg font-semibold text-white">Sizden ne bekliyoruz?</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/65">
                  <li>• İhtiyaç ve hedeflerinizi anlatan 1-2 görüşme</li>
                  <li>• Mevcut içerik, logo ve varsa örnek sistemler</li>
                  <li>• Tasarım ve kapsam onaylarının zamanında verilmesi</li>
                  <li>• Yayın öncesi test ve geri bildirim</li>
                </ul>
              </div>
              <Photo
                src={PHOTOS['saas-pano'].src}
                alt={PHOTOS['saas-pano'].alt}
                caption="Sprint panosu: görevler, metrikler ve canlı izleme"
                className="aspect-[16/10] rounded-xl border border-white/10"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
              <Link
                href="/surec/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                9 adımlı sürecin tamamı
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — Faydalar */}
      <section id="faydalar" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Ölçülebilir faydalar"
            title="Ne Kazanırsınız?"
            description="Hizmetin işletmenize sağladığı somut kazanımlar ve tipik metrik etkileri."
          />
          <div className="mt-9">
            <Benefits benefits={service.benefits} />
          </div>
        </div>
      </section>

      {/* 10 — Kimler için uygun? */}
      <section id="kimler-icin" className="section-soft scroll-mt-24 py-14 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Hedef kitle"
            title="Kimler İçin Uygun?"
            description={`${service.title} hizmetinden en çok fayda sağlayan sektörler ve işletme tipleri.`}
          />
          <div className="mt-8">
            <WhoIsItFor items={service.targetAudience} />
          </div>
        </div>
      </section>

      {/* 11 — Neden Tardigrad Software? */}
      <section className="section-navy py-14 lg:py-20" aria-labelledby="neden-biz">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Farkımız"
            id="neden-biz"
            title={`Neden ${SITE.name}?`}
            description="Tek bir hizmet alırken bile SEO, tasarım, yazılım ve altyapı disiplinlerini birlikte düşünüyoruz. Bu yüzden ürettiğimiz iş uzun vadede değerini koruyor."
          />
          <div className="mt-10">
            <WhyTardigrad variant="dark" />
          </div>
        </div>
      </section>

      {/* 12 — SSS */}
      <section id="sss" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="Sık sorulan sorular"
            title={`${service.title} Hakkında SSS`}
            description={`${service.primaryKeyword} ile ilgili en çok merak edilen sorular ve yanıtları.`}
          />
          <FAQ items={service.faq} />
        </div>
      </section>

      {/* 13 — İlgili hizmetler */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="ilgili-hizmetler">
        <div className="container">
          <SectionHeading
            eyebrow="İlgili hizmetler"
            id="ilgili-hizmetler"
            title="Bu hizmetle birlikte sıkça alınanlar"
            description="İhtiyacınıza göre aşağıdaki hizmetlerle birlikte kurgulandığında sonuç belirgin şekilde güçlenir."
          />
          <div className="mt-9">
            <RelatedServices services={relatedServices} />
          </div>

          {categoryServices.length ? (
            <div className="mt-8 rounded-xl border border-brand-navy-100 bg-white p-5">
              <h3 className="text-sm font-semibold text-brand-ink">
                {category?.label} kategorisindeki diğer hizmetler
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {categoryServices.slice(0, 10).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/hizmetler/${item.slug}/`}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                    >
                      <span className="h-1 w-1 rounded-full bg-brand-cyan" aria-hidden />
                      {item.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* 14 — Hizmet verdiğimiz şehirler */}
      <section className="section-light py-14 lg:py-16" aria-labelledby="sehirler">
        <div className="container">
          <CityLinks
            cities={relatedCities}
            service={service}
            title={`${service.title} hizmeti verdiğimiz şehirler`}
          />
          <div className="mt-6 flex flex-wrap gap-2.5">
            {featuredCities
              .filter((city) => !relatedCities.some((c) => c.slug === city.slug))
              .slice(0, 8)
              .map((city) => (
                <Link
                  key={city.slug}
                  href={`/sehir/${city.slug}/`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy-100 px-3.5 py-1.5 text-[13px] text-brand-ink-soft/80 transition hover:border-brand-cyan/40 hover:text-brand-navy-900"
                >
                  <MapPin className="h-3 w-3 text-brand-cyan" aria-hidden />
                  {city.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 16 — Blog önerileri */}
      {posts.length ? (
        <section className="section-soft py-14 lg:py-16" aria-labelledby="blog-oneri">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="İlgili içerikler" id="blog-oneri" title="Blog’dan öneriler" />
              <Link
                href="/blog/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                Tüm yazılar
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 15 — CTA + iletişim formu */}
      <ContactSection
        title={`${service.title} için ücretsiz ön analiz`}
        description={`${service.title.toLocaleLowerCase('tr-TR')} ihtiyacınızı 20 dakikalık bir görüşmede dinliyor; kapsam, takvim ve bütçe önerisini yazılı olarak paylaşıyoruz. ${CONTACT.responseTime}.`}
        defaultService={service.title}
      />
    </>
  )
}
