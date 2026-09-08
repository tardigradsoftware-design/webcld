// src/app/page.tsx
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Layers,
  MapPin,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

import { buildMetadata } from '@/lib/seo'
import {
  COMPANY_PROCESS,
  CONTACT,
  HOME_FAQ,
  SERVICE_CATEGORIES,
  SITE,
  TECH_STACK,
} from '@/lib/constants'
import {
  getCategoryCounts,
  getServicesForGroup,
  HOMEPAGE_CATEGORY_GROUPS,
  localPriorityServices,
  services,
} from '@/lib/services'
import { featuredCities } from '@/lib/cities'
import { blogPosts, getRecentPosts } from '@/lib/blog-posts'
import { breadcrumbSchema, faqSchema, itemListSchema, localBusinessSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { ServiceGrid } from '@/components/sections/ServiceGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { TransformationExamples } from '@/components/sections/TransformationExamples'
import { TransformationStory } from '@/components/sections/TransformationStory'
import { TechStack } from '@/components/sections/TechStack'
import { FAQ } from '@/components/sections/FAQ'
import { BlogCard } from '@/components/sections/BlogCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { LucideIcon } from '@/components/common/LucideIcon'
import { Photo } from '@/components/common/Photo'
import { CATEGORY_PHOTO, PHOTOS, type PhotoKey } from '@/lib/photos'

export const metadata = buildMetadata({
  title: `${SITE.name} — Kurumsal Web Sitesi, Yazılım, SEO ve Dijital Dönüşüm`,
  description:
    'Türkiye geneli kurumsal web sitesi, özel yazılım, SaaS, SEO ve dijital dönüşüm hizmetleri. 43 hizmet alanı, 81 il kapsama, ücretsiz ön analiz.',
  path: '/',
  keywords: [
    'kurumsal web sitesi',
    'yazılım geliştirme',
    'web sitesi yaptırma',
    'CRM sistemi',
    'SaaS geliştirme',
    'SEO hizmeti',
    'dijital dönüşüm',
    'yönetim paneli',
    'e-ticaret sitesi',
    'AI chatbot',
  ],
  image: '/images/og/default-og.webp',
  imageAlt: `${SITE.name} — uçtan uca dijital çözümler`,
})

const counts = getCategoryCounts()

/** Vaka çalışması kartlarının fotoğrafları */
const REFERENCE_PHOTOS: PhotoKey[] = ['crm', 'stok', 'api']

export default function HomePage() {
  const recentPosts = getRecentPosts(3)
  const localServices = localPriorityServices.slice(0, 6)

  return (
    <>
      <JsonLd
        id="ld-home"
        data={[
          breadcrumbSchema([{ name: 'Ana Sayfa', url: '/' }]),
          faqSchema(HOME_FAQ),
          localBusinessSchema(),
          itemListSchema(
            services.map((service) => ({
              name: service.title,
              path: `/hizmetler/${service.slug}/`,
            })),
            'Tardigrad Software hizmetleri',
            '/',
          ),
        ]}
      />

      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Güven / rakamlar */}
      <Stats />

      {/* Fotoğraf mozaigi — sahadan kareler */}
      <section aria-label="Tardigrad Software hizmet alanları" className="section-light py-10 lg:py-12">
        <div className="container">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy-500">
            Hizmet alanlarımız
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Photo
            src={PHOTOS['crm'].src}
            alt={PHOTOS['crm'].alt}
            caption="Müşteri ilişkileri ve satış hunisi yönetimi"
            className="aspect-[4/3] rounded-xl border border-brand-navy-100 shadow-card"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <Photo
            src={PHOTOS['stok'].src}
            alt={PHOTOS['stok'].alt}
            caption="Depo, stok ve tedarikçi otomasyonu"
            className="aspect-[4/3] rounded-xl border border-brand-navy-100 shadow-card"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <Photo
            src={PHOTOS['chatbot'].src}
            alt={PHOTOS['chatbot'].alt}
            caption="Yapay zekâ destekli sohbet ve içerik araçları"
            className="aspect-[4/3] rounded-xl border border-brand-navy-100 shadow-card"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <Photo
            src={PHOTOS['api'].src}
            alt={PHOTOS['api'].alt}
            caption="Ödeme, kargo, e-posta ve CRM entegrasyonları"
            className="aspect-[4/3] rounded-xl border border-brand-navy-100 shadow-card"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          </div>
        </div>
      </section>

      {/* 3 — Hizmet kategorileri */}
      <section className="section-soft py-16 lg:py-24" aria-labelledby="kategoriler-baslik">
        <div className="container">
          <SectionHeading
            eyebrow="Hizmet kategorileri"
            id="kategoriler-baslik"
            title={
              <>
                Bir işletmenin dijitalde ihtiyacı olan{' '}
                <span className="text-gradient">her şey tek ekipte</span>
              </>
            }
            description="Web sitesinden özel yazılıma, SEO’dan yapay zekâya kadar 43 hizmet alanı. Tek bir ihtiyaca odaklanabilir ya da uçtan uca dijital dönüşüm alabilirsiniz."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((category, index) => (
              <Link
                key={category.key}
                href={`/hizmetler/?kategori=${category.key}`}
                className="card-light group flex flex-col p-6"
              >
                <Photo
                  src={PHOTOS[CATEGORY_PHOTO[category.key]].src}
                  alt={PHOTOS[CATEGORY_PHOTO[category.key]].alt}
                  className="-m-6 mb-5 h-32 rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy-900 text-white transition-transform duration-300 group-hover:scale-105">
                    <LucideIcon name={category.icon} fallback="Sparkles" className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="rounded-full bg-brand-navy-50 px-2.5 py-1 font-mono text-xs font-semibold text-brand-navy-700">
                    {counts[category.key] ?? 0} hizmet
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-brand-ink">
                  <span aria-hidden className="mr-2">
                    {category.emoji}
                  </span>
                  {category.label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-ink-soft/75">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-600 transition-colors group-hover:text-brand-navy-900">
                  Tümünü gör
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
                <span className="sr-only">Kategori sırası: {index + 1}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — 43 hizmet grid + filtre */}
      <section className="section-light py-16 lg:py-24" aria-labelledby="tum-hizmetler-baslik">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="43 hizmet alanı"
              id="tum-hizmetler-baslik"
              title="İhtiyacınız olan hizmeti seçin"
              description="Her hizmet sayfası; kapsamı, süreci, faydaları ve sık sorulan soruları ile birlikte ayrıntılı olarak hazırlandı."
            />
            <Link
              href="/hizmetler/"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-navy-200 px-5 py-3 text-sm font-semibold text-brand-navy-800 transition hover:border-brand-cyan hover:bg-brand-navy-50"
            >
              Hizmetler sayfası
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-10">
            <ServiceGrid services={services} columns={4} />
          </div>

          {/* Kategori kırılımları — iç link ağı */}
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {HOMEPAGE_CATEGORY_GROUPS.map((group) => {
              const groupServices = getServicesForGroup(group.categories)
              return (
                <div key={group.key} className="rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-brand-ink">
                      <Layers className="h-4 w-4 text-brand-cyan" aria-hidden />
                      {group.label}
                    </h3>
                    <span className="font-mono text-xs text-brand-navy-500">
                      {groupServices.length} hizmet
                    </span>
                  </div>
                  <ul className="mt-3.5 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
                    {groupServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/hizmetler/${service.slug}/`}
                          className="group inline-flex items-center gap-1.5 text-[13.5px] text-brand-ink-soft/85 transition-colors hover:text-brand-navy-800"
                        >
                          <span className="h-1 w-1 rounded-full bg-brand-cyan transition-transform group-hover:scale-150" aria-hidden />
                          {service.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5 — Dijital dönüşüm örnekleri */}
      <section className="section-navy py-16 lg:py-24" aria-labelledby="donusum-ornekleri-baslik">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Dijital dönüşüm örnekleri"
            id="donusum-ornekleri-baslik"
            title={
              <>
                Gerçek dönüşümler: <span className="text-gradient-light">öncesi ve sonrası</span>
              </>
            }
            description="İşletmelerin en sık yaşadığı dört dijital tıkanma ve Tardigrad Software ile geldikleri nokta."
          />
          <div className="mt-10">
            <TransformationExamples />
          </div>
        </div>
      </section>

      {/* 6 — 9 adımlı proje süreci */}
      <section className="section-light py-16 lg:py-24" aria-labelledby="surec-baslik">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Nasıl çalışıyoruz?"
                id="surec-baslik"
                title="9 adımlı şeffaf proje süreci"
                description="Analizden raporlamaya kadar her adımı önceden bilir, her sprint sonunda çalışan bir çıktı görürsünüz. Süreç sürpriz içermez."
              />
              <div className="mt-7 rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-ink-soft/85">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden />
                  Ortalama proje süresi: landing page 5-10 gün, kurumsal site 2-4 hafta, e-ticaret 4-8
                  hafta, özel yazılım 6-16 hafta.
                </p>
                <Link
                  href="/surec/"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
                >
                  Sürecin detayını inceleyin
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <Photo
                src={PHOTOS['saas'].src}
                alt={PHOTOS['saas'].alt}
                caption="Ön analiz çıktısı: kapsam, takvim ve başarı metrikleri panosu"
                className="mt-4 aspect-[4/3] rounded-xl border border-brand-navy-100 shadow-card"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <ProcessSteps steps={COMPANY_PROCESS.map((step) => ({ ...step }))} variant="light" />
          </div>
        </div>
      </section>

      {/* 6b — Kaydırmalı dijital dönüşüm filmi */}
      <TransformationStory />

      {/* 7 — SEO & lokal kapsama */}
      <section className="section-soft py-16 lg:py-24" aria-labelledby="lokal-baslik">
        <div className="container">
          <SectionHeading
            eyebrow="Lokal SEO kapsaması"
            id="lokal-baslik"
            title={
              <>
                Türkiye’nin <span className="text-gradient">81 ilinde</span> dijital çözümler
              </>
            }
            description="Hangi şehirde olursanız olun uzaktan çalışıyoruz. Şehir ve hizmet kombinasyonları için hazırladığımız lokal sayfalarla bölgesel aramalarda görünürlük sağlıyoruz."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/sehir/${city.slug}/`}
                className="card-light group flex items-center justify-between gap-3 p-4"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy-50 text-brand-navy-600 transition-colors group-hover:bg-brand-navy-900 group-hover:text-white">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">{city.name}</span>
                    <span className="block text-[11.5px] text-brand-ink-soft/60">{city.region}</span>
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-brand-navy-200 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-navy-600"
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-ink">
                <Workflow className="h-5 w-5 text-brand-cyan" aria-hidden />
                Hizmet + şehir sayfaları
              </h3>
              <Link
                href="/sehir/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-600 transition hover:text-brand-navy-900"
              >
                Tüm şehirler
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-ink-soft/75">
              Öncelikli hizmetlerimiz için şehir bazlı ayrı sayfalar hazırladık. Örneğin İstanbul’da
              kurumsal web sitesi, Ankara’da CRM, İzmir’de e-ticaret arayan bir işletme doğrudan kendi
              şehrine özel kapsam, senaryo ve teklif akışını görür.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {localServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/hizmet/${service.slug}/istanbul/`}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-navy-100 bg-brand-paper-soft px-4 py-2 text-[13px] font-medium text-brand-ink-soft transition hover:border-brand-cyan/50 hover:bg-brand-navy-50 hover:text-brand-navy-900"
                  >
                    <LucideIcon name={service.icon} fallback="Sparkles" className="h-3.5 w-3.5 text-brand-cyan" aria-hidden />
                    {service.shortTitle} İstanbul
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8 — Teknoloji yığını */}
      <section className="section-light py-16 lg:py-20" aria-labelledby="teknoloji-baslik">
        <div className="container">
          <SectionHeading
            eyebrow="Teknoloji yığını"
            id="teknoloji-baslik"
            title="Modern ve ölçeklenebilir teknolojiler"
            description={`Tip güvenli kod, sunucusuz altyapı ve global CDN ile ${TECH_STACK.length}+ teknolojiyi bir arada kullanıyoruz. Kapalı kutu çözüm yok; kod ve altyapı size teslim edilir.`}
          />
          <div className="mt-9">
            <TechStack variant="light" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <ShieldCheck className="h-5 w-5 text-brand-green" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-brand-ink">Güvenlik varsayılan</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/75">
                HTTPS, güvenlik başlıkları, rol bazlı erişim (RLS), rate limiting ve spam koruması her
                projede standarttır.
              </p>
            </div>
            <div className="rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <ServerCog className="h-5 w-5 text-brand-navy-600" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-brand-ink">Core Web Vitals odaklı</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/75">
                LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms hedefleriyle geliştiriyor; yayın sonrası
                hız raporunu paylaşıyoruz.
              </p>
            </div>
            <div className="rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <Sparkles className="h-5 w-5 text-brand-purple" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-brand-ink">Sahiplik sizde</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/75">
                Kod deposu, alan adı ve altyapı hesapları sizin adınıza kurulur; proje sonunda kaynak
                kodlar teslim edilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — Referanslar / vaka çalışmaları */}
      <section className="section-soft py-16 lg:py-20" aria-labelledby="referanslar-baslik">
        <div className="container">
          <SectionHeading
            eyebrow="Referanslar ve vaka çalışmaları"
            id="referanslar-baslik"
            title="Yakında: ölçülebilir sonuçlarıyla vaka çalışmaları"
            description="Müşteri onayları alındıkça vaka çalışmalarını burada yayımlıyoruz. Bu süreçte, en sık çalıştığımız senaryoları ve ürettikleri sonuçları paylaşıyoruz."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Üretim firması — Excel’den sisteme',
                text: 'Stok, sipariş ve teklif süreçleri tek panelde toplandı; manuel veri girişi büyük ölçüde ortadan kalktı.',
                tag: 'Stok + Sipariş + Teklif',
              },
              {
                title: 'Hizmet işletmesi — lead kaybını durdurma',
                text: 'Web formu ve WhatsApp talepleri CRM’e otomatik düşüyor, takip hatırlatmaları ile kayıp lead oranı azaldı.',
                tag: 'CRM + Otomasyon',
              },
              {
                title: 'Kurumsal site — görünürlük artışı',
                text: 'Teknik SEO, yapısal veri ve hizmet sayfası mimarisi ile organik trafik ve form talepleri yükseldi.',
                tag: 'Web + Teknik SEO',
              },
            ].map((item, itemIndex) => (
              <div key={item.title} className="card-light p-6">
                <Photo
                  src={PHOTOS[REFERENCE_PHOTOS[itemIndex] ?? 'yazilim'].src}
                  alt={PHOTOS[REFERENCE_PHOTOS[itemIndex] ?? 'yazilim'].alt}
                  className="-m-6 mb-5 h-32 rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-navy-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-brand-navy-700">
                  <Clock className="h-3 w-3" aria-hidden />
                  {item.tag}
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/75">{item.text}</p>
                <p className="mt-4 text-[12.5px] font-medium text-brand-navy-400">
                  Detaylı vaka çalışması yakında yayımlanacak.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Genel SSS */}
      <section className="section-light py-16 lg:py-24" aria-labelledby="sss-baslik">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Sık sorulan sorular"
            id="sss-baslik"
            title="Merak edilenler"
            description="Hizmet kapsamı, süre, fiyatlandırma, destek ve veri güvenliği hakkında en çok sorulan sorular."
          />
          <FAQ items={HOME_FAQ} />
        </div>
      </section>

      {/* 11 — Blog önerileri */}
      {recentPosts.length ? (
        <section className="section-soft py-16 lg:py-20" aria-labelledby="blog-baslik">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <SectionHeading
                eyebrow="Blog"
                id="blog-baslik"
                title="Rehber içerikler"
                description="Web, yazılım, SEO ve dijital dönüşüm üzerine pratik rehberler."
              />
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                Tüm yazılar ({blogPosts.length})
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 12 — CTA + iletişim formu */}
      <ContactSection
        title="Projenizi Bugün Başlatalım"
        description={`Merhaba, ben Tardigrad Software kurucusu. Her projeye aynı soruyla başlıyoruz: "Bu çalışma işletmenizin hangi problemini çözecek?" 20 dakikalık bir görüşme ile mevcut durumunuzu analiz ediyor, kapsam ve bütçe önerisini yazılı olarak paylaşıyoruz. ${CONTACT.responseTime}.`}
      />
    </>
  )
}
