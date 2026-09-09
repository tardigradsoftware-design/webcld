// src/app/iletisim/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'

import { CONTACT, SITE, SOCIAL_LINKS, whatsappLink } from '@/lib/constants'
import { staticMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { featuredCities } from '@/lib/cities'
import { faqSchema, localBusinessSchema, organizationSchema } from '@/lib/schemas'
import { telLink } from '@/lib/utils'
import type { FAQ } from '@/types'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/sections/PageHero'
import { Photo } from '@/components/common/Photo'
import { screen } from '@/lib/photos'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ContactForm } from '@/components/forms/ContactForm'
import { FAQ as FaqSection } from '@/components/sections/FAQ'
import { LucideIcon } from '@/components/common/LucideIcon'

export const metadata: Metadata = staticMetadata({
  title: 'İletişim — Projenizi Konuşalım',
  description: `${SITE.name} iletişim: ${CONTACT.email}, ${CONTACT.address.full}. Ücretsiz ön analiz formunu doldurun, ${CONTACT.responseTime.toLocaleLowerCase('tr-TR')}.`,
  path: '/iletisim/',
  keywords: ['Tardigrad Software iletişim', 'yazılım firması iletişim', 'web sitesi teklif al', 'ücretsiz ön analiz'],
})

const CONTACT_FAQ: FAQ[] = [
  {
    question: 'Formu doldurduktan sonra ne oluyor?',
    answer: `Talebiniz veritabanına kaydedilir ve ekibimize anında bildirim gider. ${CONTACT.responseTime}. İlk yanıtımızda genellikle 20 dakikalık bir ön analiz görüşmesi öneriyoruz; bu görüşmenin ardından kapsam, takvim ve bütçe önerisini yazılı olarak paylaşıyoruz.`,
  },
  {
    question: 'Görüşme ücretli mi?',
    answer: 'Hayır. Ön analiz görüşmesi ve yazılı teklif tamamen ücretsizdir. Görüşme sonunda çalışmasak bile mevcut durumunuza dair somut önerileri almış olursunuz.',
  },
  {
    question: 'Sadece tek bir hizmet için de başvurabilir miyim?',
    answer: `Evet. ${services.length} hizmet alanının her biri için ayrı ayrı çalışabilirsiniz: yalnızca web sitesi, yalnızca SEO, yalnızca bir otomasyon veya mevcut sitenizin hızlanması gibi. Kapsamı ihtiyacınıza göre daraltıyoruz.`,
  },
  {
    question: 'Hangi şehirlerden başvuru alıyorsunuz?',
    answer: `Türkiye’nin ${featuredCities.length > 0 ? '81' : '81'} ilinden başvuru alıyoruz. Merkezimiz ${CONTACT.address.full}; projeleri uzaktan yürütüyoruz. Öncelikli şehirler için hazırladığımız lokal sayfaları da inceleyebilirsiniz.`,
  },
  {
    question: 'Mevcut sitemi veya sistemimi devralabilir misiniz?',
    answer: 'Evet. Mevcut web sitesinin devri, hızlandırılması, güvenlik açıklarının kapatılması, başka bir ajansın yarım bıraktığı projenin tamamlanması ve veri taşıma işlemlerini yapıyoruz. İlk adımda ücretsiz teknik denetim çıkarıyoruz.',
  },
  {
    question: 'Verilerim nasıl saklanıyor?',
    answer: `Form üzerinden ilettiğiniz bilgiler yalnızca teklif hazırlama ve iletişim amacıyla işlenir; üçüncü taraflarla paylaşılmaz. Detaylar için KVKK aydınlatma metnimizi inceleyebilirsiniz.`,
  },
]

export default function ContactPage() {
  const tel = telLink(CONTACT.phone)
  const waHref = whatsappLink('Merhaba, projemiz hakkında bilgi almak istiyorum.')

  return (
    <>
      <JsonLd
        id="ld-iletisim"
        data={[
          organizationSchema(),
          localBusinessSchema(),
          faqSchema(CONTACT_FAQ),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: 'İletişim', url: '/iletisim/' }]}
        eyebrow="Ücretsiz ön analiz"
        h1="Projenizi Konuşalım"
        lead={`Her projeye aynı soruyla başlıyoruz: “Bu çalışma işletmenizin hangi problemini çözecek?” Formu doldurun ya da doğrudan yazın; ${CONTACT.responseTime.toLocaleLowerCase('tr-TR')}.`}
        meta={[
          { label: 'E-posta', value: CONTACT.email },
          { label: 'Merkez', value: CONTACT.address.full },
          { label: 'Çalışma saatleri', value: 'Pzt–Cum 09:00–18:30' },
          { label: 'Kapsama', value: '81 il' },
        ]}
        aside={
          <Photo
            src={screen('teknik-seo', 'Ücretsiz ön analiz: görünürlük ve hız rapor ekranı').src}
            alt={screen('teknik-seo', 'Ücretsiz ön analiz: görünürlük ve hız rapor ekranı').alt}
            caption="Ücretsiz ön analiz: mevcut durum raporunuz"
            className="aspect-[16/10] rounded-2xl border border-white/10"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
        showCta={false}
      />

      {/* İletişim kanalları */}
      <section className="section-light py-12 lg:py-16" aria-labelledby="kanallar">
        <div className="container">
          <h2 id="kanallar" className="sr-only">
            İletişim kanalları
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="card-light p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-900 text-white">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-ink">E-posta</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/75">
                Teklif, teknik sorular ve iş birliği talepleri için.
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-3 inline-flex items-center gap-1.5 break-all text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                {CONTACT.email}
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </a>
            </div>

            <div className="card-light p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-ink">WhatsApp</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/75">
                Hızlı sorular ve acil durumlar için en pratik kanal.
              </p>
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
                >
                  WhatsApp’tan yazın
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : (
                <p className="mt-3 text-sm text-brand-ink-soft/60">
                  WhatsApp hattımız kısa süre içinde aktif olacak. Bu sırada e-posta veya form
                  üzerinden ulaşabilirsiniz.
                </p>
              )}
            </div>

            <div className="card-light p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-50 text-brand-navy-700">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-ink">Telefon</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-ink-soft/75">
                Mesai saatlerinde doğrudan görüşme.
              </p>
              {tel ? (
                <a
                  href={tel}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
                >
                  {CONTACT.phone}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : (
                <p className="mt-3 text-sm text-brand-ink-soft/60">
                  Telefon numaramız yayın hazırlığında. Lütfen form veya e-posta ile ulaşın.
                </p>
              )}
            </div>

            <div className="card-light p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-50 text-brand-navy-700">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-ink">Merkez ofis</h3>
              <address className="mt-1.5 text-sm not-italic leading-relaxed text-brand-ink-soft/75">
                {CONTACT.address.locality}, {CONTACT.address.postalCode}
                <br />
                {CONTACT.address.region} / Türkiye
              </address>
              <p className="mt-3 inline-flex items-start gap-1.5 text-[13px] text-brand-ink-soft/65">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" aria-hidden />
                Pazartesi–Cuma 09:00–18:30
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + süreç bilgisi */}
      <section id="iletisim-formu" className="section-soft scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Ücretsiz ön analiz"
              title="Formu doldurun, 24 saat içinde dönüş yapalım"
              description="Ne kadar ayrıntı verirseniz ilk yanıtımız o kadar somut olur. Yine de kısa bir mesaj yeterli; detayları görüşmede netleştiriyoruz."
            />

            <ul className="mt-7 space-y-3">
              {[
                {
                  title: '1. Talebiniz kaydedilir',
                  text: 'Form verisi güvenli şekilde veritabanına yazılır ve ekibimize bildirim gider.',
                },
                {
                  title: '2. Ön analiz görüşmesi',
                  text: '20 dakikalık görüşmede mevcut durumunuzu, hedefinizi ve kısıtlarınızı dinleriz.',
                },
                {
                  title: '3. Yazılı kapsam ve teklif',
                  text: 'Kapsam maddeleri, takvim, bütçe ve başarı kriterleri tek dokümanda netleşir.',
                },
                {
                  title: '4. Karar sizde',
                  text: 'Onaylarsanız proje panosu kurulur ve takvim başlar; onaylamazsanız öneriler sizde kalır.',
                },
              ].map((item) => (
                <li key={item.title} className="rounded-xl border border-brand-navy-100 bg-white p-4">
                  <h3 className="text-sm font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-brand-ink-soft/75">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-navy-100 bg-white p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
              <p className="text-[13px] leading-relaxed text-brand-ink-soft/75">
                Bilgileriniz yalnızca teklif ve iletişim amacıyla işlenir, üçüncü taraflarla
                paylaşılmaz. Form; spam koruması, hız sınırı ve KVKK onayı ile çalışır.{' '}
                <Link href="/kvkk/" className="font-semibold text-brand-navy-700 underline-offset-4 hover:underline">
                  KVKK aydınlatma metni
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <ContactForm variant="light" />
          </div>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="Sık sorulan sorular"
            title="İletişim ve başvuru süreci"
            description="Başvuru, görüşme, kapsam ve veri güvenliği hakkında merak edilenler."
          />
          <FaqSection items={CONTACT_FAQ} />
        </div>
      </section>

      {/* Sosyal medya + hızlı linkler */}
      <section className="section-soft py-14 lg:py-16" aria-labelledby="hizli-linkler">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-brand-ink" id="hizli-linkler">
              Sosyal medya
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/75">
              Projelerimizden notlar, teknik içerikler ve duyurular.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-navy-100 bg-brand-paper-soft px-4 py-2 text-[13px] font-medium text-brand-ink-soft transition hover:border-brand-blue hover:text-brand-navy-900"
                  >
                    <LucideIcon name={social.icon} fallback="Link" className="h-3.5 w-3.5" aria-hidden />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-brand-ink">Hızlı ulaşım</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/75">
              İhtiyacınıza en yakın sayfadan doğrudan başlayabilirsiniz.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { label: 'Tüm hizmetler', href: '/hizmetler/' },
                { label: 'Proje sürecimiz', href: '/surec/' },
                { label: 'Hakkımızda', href: '/hakkimizda/' },
                { label: 'Blog', href: '/blog/' },
                { label: 'Şehirler', href: '/sehir/' },
                { label: 'KVKK aydınlatma metni', href: '/kvkk/' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-2 rounded-lg border border-brand-navy-100 px-4 py-2.5 text-[13.5px] text-brand-ink-soft transition hover:border-brand-blue/50 hover:text-brand-navy-900"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-brand-navy-300 transition group-hover:text-brand-blue" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {featuredCities.slice(0, 6).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/sehir/${city.slug}/`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-navy-50 px-3 py-1.5 text-[12.5px] text-brand-navy-700 transition hover:bg-brand-navy-100"
                  >
                    <MapPin className="h-3 w-3" aria-hidden />
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
