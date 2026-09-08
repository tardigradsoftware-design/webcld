// src/app/hakkimizda/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Compass, Gauge, Handshake, Lock, MapPin, Rocket, Target } from 'lucide-react'

import { CONTACT, SERVICE_CATEGORIES, SITE, SOCIAL_LINKS, TECH_STACK } from '@/lib/constants'
import { staticMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { cities } from '@/lib/cities'
import { blogPosts } from '@/lib/blog-posts'
import { organizationSchema, websiteSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/sections/PageHero'
import { Stats } from '@/components/sections/Stats'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { WhyTardigrad } from '@/components/sections/WhyTardigrad'
import { TechStack } from '@/components/sections/TechStack'
import { TransformationStory } from '@/components/sections/TransformationStory'
import { ContactSection } from '@/components/sections/ContactSection'
import { LucideIcon } from '@/components/common/LucideIcon'
import { Photo } from '@/components/common/Photo'
import { PHOTOS } from '@/lib/photos'

export const metadata: Metadata = staticMetadata({
  title: 'Hakkımızda',
  description: `${SITE.name}; ${CONTACT.address.locality}/${CONTACT.address.region} merkezli, Türkiye geneline kurumsal web sitesi, özel yazılım, SaaS, SEO ve dijital dönüşüm hizmeti veren yazılım ekibidir.`,
  path: '/hakkimizda/',
  keywords: ['Tardigrad Software', 'yazılım firması', 'İstanbul yazılım şirketi', 'dijital dönüşüm ajansı'],
})

const VALUES = [
  {
    icon: Target,
    title: 'Önce problem, sonra teknoloji',
    text: 'Her projeye "Bu çalışma hangi iş problemini çözecek?" sorusuyla başlıyoruz. Cevap netleşmeden kapsam yazmıyor, fiyat vermiyoruz.',
  },
  {
    icon: Gauge,
    title: 'Ölçülebilir hedefler',
    text: 'Hız skoru, form dönüşüm oranı, organik trafik, manuel iş süresi… Başarı kriterini baştan tanımlıyor, raporlarla takip ediyoruz.',
  },
  {
    icon: Handshake,
    title: 'Şeffaf iletişim',
    text: 'Paylaşılan proje panosu, haftalık rapor ve doğrudan ulaşılabilir ekip. Durumu siz sormadan biz aktarıyoruz.',
  },
  {
    icon: Lock,
    title: 'Güvenlik ve sahiplik',
    text: 'Kod deposu, alan adı ve altyapı hesapları sizin adınıza kurulur. Rol bazlı erişim, HTTPS ve güvenlik başlıkları varsayılandır.',
  },
  {
    icon: Compass,
    title: 'Uzun vadeli mimari',
    text: 'Bugünün ihtiyacını çözerken yarının modülünü ekleyebilecek bir mimari kuruyoruz; yeniden yazmak zorunda kalmayın.',
  },
  {
    icon: Rocket,
    title: 'Teslim sonrası da yanınızdayız',
    text: 'Yayın bir son değil başlangıç. Bakım, izleme, içerik ve iyileştirme döngüsüyle projenin değerini koruyoruz.',
  },
]

const CAPABILITIES = [
  {
    title: 'Web ve e-ticaret',
    text: 'Kurumsal siteler, ürün tanıtım sayfaları, portföy siteleri, rezervasyon/başvuru akışları ve özel e-ticaret çözümleri.',
    services: ['kurumsal-web-sitesi', 'e-ticaret-sitesi', 'landing-page', 'rezervasyon-basvuru-sistemi'],
  },
  {
    title: 'Yazılım ve paneller',
    text: 'CRM, stok ve sipariş yönetimi, teklif/proforma süreçleri, iş takip sistemleri ve rol bazlı yönetim panelleri.',
    services: ['crm', 'stok-yonetimi', 'yonetim-paneli', 'is-takip-sistemi'],
  },
  {
    title: 'SaaS ve ürün geliştirme',
    text: 'Abonelik tabanlı ürünler, çok kiracılı (multi-tenant) mimariler, dashboard’lar ve startup MVP’leri.',
    services: ['saas-platformu', 'multi-tenant-uygulama', 'dashboard-sistemi', 'mvp-startup-urunu'],
  },
  {
    title: 'SEO ve görünürlük',
    text: 'Teknik SEO, lokal SEO, sayfa mimarisi, yapısal veri, Search Console kurulumu ve danışmanlık.',
    services: ['teknik-seo', 'lokal-seo', 'seo-uyumlu-sayfa-mimarisi', 'seo-danismanligi'],
  },
  {
    title: 'Otomasyon ve entegrasyon',
    text: 'Süreç otomasyonu, API entegrasyonları, form/başvuru akışları ve ödeme-WhatsApp-CRM bağlantıları.',
    services: ['dijital-otomasyon', 'api-entegrasyonu', 'form-basvuru-sistemi', 'odeme-whatsapp-crm-entegrasyonu'],
  },
  {
    title: 'Altyapı ve yapay zekâ',
    text: 'Domain/DNS, hosting ve yedekleme, Cloudflare CDN, Vercel dağıtımı, Supabase/PostgreSQL ve AI chatbot/araçları.',
    services: ['cloudflare-cdn', 'vercel-deployment', 'supabase-postgresql', 'ai-chatbot'],
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd id="ld-hakkimizda" data={[organizationSchema(), websiteSchema()]} />

      <PageHero
        breadcrumbs={[{ name: 'Hakkımızda', url: '/hakkimizda/' }]}
        eyebrow={`${SITE.foundingYear}’den bu yana`}
        h1="Hakkımızda"
        lead={`${SITE.name}; ${CONTACT.address.locality}/${CONTACT.address.region} merkezli, Türkiye’nin ${cities.length} iline hizmet veren bir yazılım ve dijital dönüşüm ekibidir. Kurumsal web sitesinden özel yazılıma, SEO’dan yapay zekâ araçlarına kadar ${services.length} hizmet alanında uçtan uca çalışıyoruz.`}
        meta={[
          { label: 'Hizmet alanı', value: `${services.length}` },
          { label: 'Kapsama', value: `${cities.length} il` },
          { label: 'Rehber içerik', value: `${blogPosts.length} yazı` },
          { label: 'Merkez', value: CONTACT.address.locality },
        ]}
        showCta
      />

      <Stats variant="light" />

      {/* Hikâye */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="hikaye">
        <div className="container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow="Biz kimiz?" id="hikaye" title="Yazılımı iş problemini çözen bir araç olarak görüyoruz" />
            <div className="mt-5 space-y-4 text-[16.5px] leading-[1.85] text-brand-ink-soft/90">
              <p>
                {SITE.name}, işletmelerin dijitalleşme sürecinde en sık yaşadığı problemi çözmek için
                kuruldu: birbirinden kopuk çalışan ajanslar, yarım kalan projeler ve devredilemeyen
                sistemler. Biz tasarım, yazılım, SEO ve altyapı disiplinlerini tek ekipte topluyor;
                sorumluluğu tek noktada birleştiriyoruz.
              </p>
              <p>
                Bugüne kadar üretim, lojistik, sağlık, turizm, perakende, eğitim ve hizmet
                sektörlerinde; tek sayfalık tanıtım sitelerinden çok modüllü iş sistemlerine kadar
                farklı ölçeklerde projeler yürüttük. Her projede aynı prensiple ilerledik: kapsam baştan
                netleşsin, süreç şeffaf olsun, teslim edilen sistem işletmenin kendi ekibi tarafından
                da yönetilebilsin.
              </p>
              <p>
                {CONTACT.address.locality}/{CONTACT.address.region}’deki merkezimizden Türkiye geneline
                uzaktan çalışıyoruz. Uzaktan çalışma modelimiz; paylaşılan proje panosu, haftalık
                raporlama, sprint bazlı teslim ve doğrudan ulaşılabilir bir ekip ile destekleniyor.
                Gerektiğinde yerinde keşif ve toplantı da planlıyoruz.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <Photo
              src={PHOTOS['saas'].src}
              alt={PHOTOS['saas'].alt}
              caption="Ölçülebilir ürün yönetimi: panolar ve metrikler"
              className="aspect-[16/10] rounded-2xl border border-brand-navy-100 shadow-card"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
            <div className="rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                <MapPin className="h-4 w-4" aria-hidden />
                Künye
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ['Unvan', SITE.legalName],
                  ['Merkez', CONTACT.address.full],
                  ['E-posta', CONTACT.email],
                  ['Çalışma saatleri', 'Pazartesi–Cuma 09:00–18:30'],
                  ['Hizmet alanı', 'Türkiye geneli (81 il)'],
                  ['Kuruluş', String(SITE.foundingYear)],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <dt className="text-brand-ink-soft/65">{label}</dt>
                    <dd className="text-right font-medium text-brand-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                Bize ulaşın
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/75">
                Projenizi 20 dakikada birlikte değerlendirelim. {CONTACT.responseTime}.
              </p>
              <Link
                href="/iletisim/"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-800"
              >
                İletişim sayfası
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy-100 px-3 py-1.5 text-[12.5px] text-brand-ink-soft transition hover:border-brand-cyan hover:text-brand-navy-900"
                    >
                      <LucideIcon name={social.icon} fallback="Link" className="h-3.5 w-3.5" aria-hidden />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Değerler */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="degerler">
        <div className="container">
          <SectionHeading
            eyebrow="Çalışma prensiplerimiz"
            id="degerler"
            title="Bizi tanımlayan altı prensip"
            description="Bu prensipler pazarlama metni değil; tekliften teslime kadar her aşamada uyguladığımız çalışma kurallarıdır."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => (
              <div key={value.title} className="card-light p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-900 text-white">
                  <value.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-ink">
                  <span className="mr-2 font-mono text-xs text-brand-navy-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/78">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yetkinlikler */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="yetkinlikler">
        <div className="container">
          <SectionHeading
            eyebrow="Yetkinlik alanları"
            id="yetkinlikler"
            title={`${SERVICE_CATEGORIES.length} kategori, ${services.length} hizmet alanı`}
            description="Bir ihtiyaca odaklanabilir ya da uçtan uca dijital dönüşüm alabilirsiniz. Aşağıdaki alanların tamamı aynı ekip tarafından yürütülür."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <div key={capability.title} className="rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-6">
                <h3 className="text-base font-semibold text-brand-ink">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/78">{capability.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {capability.services.map((slug) => {
                    const service = services.find((item) => item.slug === slug)
                    if (!service) return null
                    return (
                      <li key={slug}>
                        <Link
                          href={`/hizmetler/${slug}/`}
                          className="group inline-flex items-center gap-2 text-[13.5px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                        >
                          <span className="h-1 w-1 rounded-full bg-brand-cyan" aria-hidden />
                          {service.shortTitle}
                          <ArrowUpRight className="h-3 w-3 text-brand-navy-300 opacity-0 transition group-hover:opacity-100" aria-hidden />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-7 text-center">
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

      {/* Neden biz */}
      <section className="section-navy py-14 lg:py-20" aria-labelledby="neden-biz">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Farkımız"
            id="neden-biz"
            title={`Neden ${SITE.name}?`}
            description="Tek noktadan sorumluluk, ölçülebilir hedefler ve devredilebilir altyapı."
          />
          <div className="mt-10">
            <WhyTardigrad variant="dark" />
          </div>
        </div>
      </section>

      {/* Teknoloji */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="teknoloji">
        <div className="container">
          <SectionHeading
            eyebrow="Teknoloji"
            id="teknoloji"
            title={`${TECH_STACK.length}+ teknoloji, tek ekip`}
            description="Tip güvenli kod, sunucusuz altyapı ve global CDN. Kapalı kutu çözüm yok; kaynak kodlar size teslim edilir."
          />
          <div className="mt-9">
            <TechStack variant="light" />
          </div>
        </div>
      </section>

      {/* Dönüşüm filmi */}
      <TransformationStory />

      <ContactSection
        title="Birlikte çalışalım"
        description="Projenizi 20 dakikalık bir görüşmede dinliyor; kapsam, takvim ve bütçe önerisini yazılı olarak paylaşıyoruz."
      />
    </>
  )
}
