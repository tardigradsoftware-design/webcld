// src/app/surec/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, CalendarClock, FileText, MessagesSquare, ShieldCheck } from 'lucide-react'

import { COMPANY_PROCESS, CONTACT, SITE } from '@/lib/constants'
import { staticMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { faqSchema } from '@/lib/schemas'
import type { FAQ } from '@/types'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/sections/PageHero'
import { Photo } from '@/components/common/Photo'
import { screen } from '@/lib/photos'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FAQ as FaqSection } from '@/components/sections/FAQ'
import { ContactSection } from '@/components/sections/ContactSection'
import { LucideIcon } from '@/components/common/LucideIcon'

export const metadata: Metadata = staticMetadata({
  title: 'Proje Sürecimiz — 9 Adımda Şeffaf Çalışma Modeli',
  description: `${SITE.name} proje süreci: ihtiyaç analizi, kapsam, tasarım, geliştirme, test, canlıya alma, SEO, bakım ve raporlama. 9 adımda şeffaf çalışma modeli.`,
  path: '/surec/',
  keywords: ['yazılım proje süreci', 'web sitesi yaptırma süreci', 'çevik geliştirme', 'proje yönetimi'],
})

/** Her adım için ek meta: süre, çıktı, sizden beklenen */
const STEP_META: Record<number, { duration: string; output: string; expects: string }> = {
  1: {
    duration: '1-3 gün',
    output: 'İhtiyaç ve problem tanımı dokümanı',
    expects: 'Süreçlerinizi ve hedeflerinizi anlatan 1-2 görüşme',
  },
  2: {
    duration: '2-5 gün',
    output: 'Kapsam, takvim, bütçe ve başarı kriterleri (yazılı teklif)',
    expects: 'Öncelikleriniz ve onayınız',
  },
  3: {
    duration: '3-10 gün',
    output: 'Sayfa akışı, wireframe ve onaylı tasarımlar',
    expects: 'Tasarım geri bildirimi (2 revizyon turu dahil)',
  },
  4: {
    duration: '1-12 hafta',
    output: 'Sprint başına çalışan yazılım + demo ortamı',
    expects: 'Sprint sonu değerlendirmeleri ve içerik/veri aktarımı',
  },
  5: {
    duration: '2-7 gün',
    output: 'Test raporu, hata listesi ve kapatma kayıtları',
    expects: 'Kabul testleri ve geri bildirimler',
  },
  6: {
    duration: '1-3 gün',
    output: 'Canlı yayın, SSL, DNS, yedekleme ve izleme kurulumu',
    expects: 'Alan adı erişimi ve yayın onayı',
  },
  7: {
    duration: '3-10 gün',
    output: 'Teknik SEO raporu, schema işaretlemeleri, sitemap ve Search Console',
    expects: 'Anahtar kelime öncelikleriniz',
  },
  8: {
    duration: 'Sürekli',
    output: 'Güncelleme, güvenlik yaması ve içerik desteği kayıtları',
    expects: 'Talep ve hata bildirimleri',
  },
  9: {
    duration: 'Aylık',
    output: 'Performans ve büyüme raporu + sonraki çeyrek yol haritası',
    expects: 'Hedeflerin gözden geçirilmesi',
  },
}

const PROCESS_FAQ: FAQ[] = [
  {
    question: 'Bir projeye başlamak için ilk adım nedir?',
    answer: 'İlk adım ücretsiz ön analizdir. Formu doldurduğunuzda veya WhatsApp’tan yazdığınızda 20 dakikalık bir görüşme planlıyoruz. Bu görüşmede mevcut durumunuzu, hedefinizi ve kısıtlarınızı dinliyor; sonrasında kapsam, takvim ve bütçe önerisini yazılı olarak paylaşıyoruz.',
  },
  {
    question: 'Teklif ve sözleşme süreci nasıl işliyor?',
    answer: 'Kapsam netleştikten sonra sabit fiyatlı, kalem kalem belirtilmiş bir teklif ve sözleşme hazırlıyoruz. Sözleşmede kapsam, teslim tarihleri, ödeme planı, revizyon hakkı, fikri mülkiyet ve destek koşulları açıkça yer alır. Onayınızın ardından proje panosu kurulur ve takvim başlar.',
  },
  {
    question: 'Proje sırasında ne sıklıkta bilgi alıyorum?',
    answer: 'Haftalık yazılı durum raporu ve sprint sonu canlı demo standarttır. Ayrıca paylaşılan proje panosunda tüm görevlerin durumunu her an görebilirsiniz. Kritik bir risk oluşursa raporu beklemeden aynı gün bildiririz.',
  },
  {
    question: 'Revizyon hakkım var mı?',
    answer: 'Evet. Tasarım aşamasında 2 revizyon turu standart kapsama dahildir. Geliştirme aşamasında kapsam değişikliği talepleri ayrı bir iş kalemi olarak değerlendirilir; onayınız olmadan ek maliyet üretecek bir çalışma yapılmaz.',
  },
  {
    question: 'Ödeme planı nasıl?',
    answer: 'Standart plan; başlangıçta %40, ara teslimde %30, canlıya alımda %30 şeklindedir. Küçük kapsamlı işlerde tek ödeme, uzun soluklu projelerde aylık dilimler uygulanabilir. Tüm ödemeler e-fatura karşılığındadır.',
  },
  {
    question: 'Proje bittikten sonra destek alıyor muyum?',
    answer: 'Evet. Yayın sonrası 30 gün garanti desteği standarttır. Sonrasında bakım paketi ile güncelleme, güvenlik yamaları, içerik değişiklikleri ve performans izlemesi devam eder. ' + CONTACT.responseTime + '.',
  },
  {
    question: 'Kodlar ve hesaplar kime ait?',
    answer: 'Tüm fikri mülkiyet size aittir. Kod deposu, alan adı, hosting, veritabanı ve üçüncü parti hesaplar sizin adınıza kurulur; proje sonunda kaynak kodlar ve erişimler teslim edilir. Kapalı kutu veya lisans kilidi uygulamıyoruz.',
  },
  {
    question: 'Uzaktan çalışma modeli kaliteyi etkiler mi?',
    answer: 'Hayır. Süreçlerimiz uzaktan çalışmaya göre kurgulandı: paylaşılan proje panosu, versiyon kontrolü, otomatik testler, demo ortamı ve haftalık raporlama. Türkiye’nin 81 ilinde aynı standartla çalışıyoruz; gerektiğinde yerinde keşif ve toplantı da yapıyoruz.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        id="ld-surec"
        data={[
          faqSchema(PROCESS_FAQ),
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `${SITE.name} proje süreci`,
            description:
              'İhtiyaç analizinden raporlamaya kadar 9 adımlı şeffaf yazılım ve dijital dönüşüm proje süreci.',
            totalTime: 'P30D',
            step: COMPANY_PROCESS.map((step) => ({
              '@type': 'HowToStep',
              position: step.step,
              name: step.title,
              text: step.description,
            })),
          },
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: 'Süreç', url: '/surec/' }]}
        eyebrow="9 adımlı çalışma modeli"
        h1="Proje Sürecimiz"
        lead={`Bir projenin başarısı, sürprizlerin ne kadar az olduğuna bağlıdır. Bu yüzden ${SITE.name}’da süreç baştan sona tanımlıdır: her adımın çıktısı, süresi ve sorumlusu bellidir. Siz her aşamada ne olacağını önceden bilirsiniz.`}
        meta={[
          { label: 'Adım', value: `${COMPANY_PROCESS.length}` },
          { label: 'Raporlama', value: 'Haftalık' },
          { label: 'Demo', value: 'Her sprint' },
          { label: 'Garanti', value: '30 gün' },
        ]}
        aside={
          <Photo
            src={screen('is-takip-sistemi', 'Süreç takibi: aşama panosu ve görev akışı ekranı').src}
            alt={screen('is-takip-sistemi', 'Süreç takibi: aşama panosu ve görev akışı ekranı').alt}
            caption="Sürüm gecelerinden: kod incelemesi"
            className="aspect-[16/10] rounded-2xl border border-white/10"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      {/* Süreç zaman çizelgesi */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="adimlar">
        <div className="container">
          <SectionHeading
            eyebrow="Adım adım"
            id="adimlar"
            title="Analizden büyümeye 9 adım"
            description="Her adım bir öncekinin çıktısına dayanır. Bu sıralama, projenin yarım kalma veya yeniden yazılma riskini azaltır."
          />
          <div className="mt-10">
            <ProcessSteps steps={COMPANY_PROCESS.map((step) => ({ ...step }))} variant="light" />
          </div>
        </div>
      </section>

      {/* Adım detayları: süre / çıktı / beklenen */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="detay">
        <div className="container">
          <SectionHeading
            eyebrow="Adım detayları"
            id="detay"
            title="Her adımda ne üretiyoruz, sizden ne bekliyoruz?"
            description="Süreler kapsam büyüklüğüne göre değişir; aşağıdaki aralıklar tipik projeler içindir."
          />
          <div className="mt-9 overflow-hidden rounded-2xl border border-brand-navy-100 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <caption className="sr-only">
                  {SITE.name} proje süreci adımları, süreleri, çıktıları ve müşteri sorumlulukları
                </caption>
                <thead className="bg-brand-navy-900 text-white">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Adım</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Tipik süre</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Çıktı</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Sizden beklenen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-navy-100">
                  {COMPANY_PROCESS.map((step) => {
                    const meta = STEP_META[step.step]
                    return (
                      <tr key={step.step} className="transition-colors hover:bg-brand-paper-soft">
                        <th scope="row" className="px-5 py-4 align-top font-semibold text-brand-ink">
                          <span className="flex items-center gap-2.5">
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-navy-50 font-mono text-[12px] font-bold text-brand-navy-700">
                              {String(step.step).padStart(2, '0')}
                            </span>
                            {step.title}
                          </span>
                        </th>
                        <td className="px-5 py-4 align-top whitespace-nowrap font-mono text-[12.5px] text-brand-navy-600">
                          {meta?.duration ?? '—'}
                        </td>
                        <td className="px-5 py-4 align-top text-[13.5px] leading-relaxed text-brand-ink-soft/85">
                          {meta?.output ?? step.description}
                        </td>
                        <td className="px-5 py-4 align-top text-[13.5px] leading-relaxed text-brand-ink-soft/75">
                          {meta?.expects ?? '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[13px] text-brand-ink-soft/65">
            Toplam süre; kapsam büyüklüğü, onay hızınız ve veri/içerik hazırlığına göre değişir. Ön
            analiz sonunda takvimi gün bazında yazılı olarak paylaşıyoruz.
          </p>
        </div>
      </section>

      {/* Çalışma ilkeleri */}
      <section className="section-light py-14 lg:py-20" aria-labelledby="ilkeler">
        <div className="container">
          <SectionHeading
            eyebrow="Çalışma ilkeleri"
            id="ilkeler"
            title="Süreci güvenilir kılan dört uygulama"
            description="Bu uygulamalar her projede, kapsam ne olursa olsun standarttır."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {[
              {
                icon: FileText,
                title: 'Yazılı kapsam ve sabit fiyat',
                text: 'Sözlü mutabakatla işe başlamıyoruz. Kapsam maddeleri, teslim tarihleri ve fiyat yazılı olarak netleşir; kapsam dışı talepler ayrı iş kalemi olarak değerlendirilir.',
              },
              {
                icon: CalendarClock,
                title: 'Sprint bazlı teslim',
                text: 'Proje 1-2 haftalık sprintlere bölünür. Her sprint sonunda çalışan bir çıktı görür, yön değişikliğini erken yapabilirsiniz. Böylece risk sona birikmez.',
              },
              {
                icon: MessagesSquare,
                title: 'Tek iletişim kanalı, tek sorumlu',
                text: 'Projenizin tek bir sorumlusu vardır; tüm talepler paylaşılan proje panosunda takip edilir. WhatsApp, e-posta ve toplantı notları aynı yerde birikir.',
              },
              {
                icon: ShieldCheck,
                title: 'Kalite kapıları',
                text: 'Fonksiyonel testler, tarayıcı/mobil uyumluluk, performans ve güvenlik kontrolleri tamamlanmadan yayına çıkmıyoruz. Test raporunu sizinle paylaşıyoruz.',
              },
            ].map((item) => (
              <div key={item.title} className="card-light flex gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy-900 text-white">
                  <item.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/78">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hangi hizmetlerde geçerli */}
      <section className="section-navy py-14 lg:py-20" aria-labelledby="hizmet-surec">
        <div className="container">
          <SectionHeading
            variant="dark"
            eyebrow="Hizmet bazlı süreç"
            id="hizmet-surec"
            title="Her hizmetin süreci kendi sayfasında detaylı"
            description={`${services.length} hizmet alanının her biri için 9 adımlı sürecin o hizmete uyarlanmış halini, kapsam maddelerini ve sık sorulan soruları hizmet sayfasında bulabilirsiniz.`}
          />
          <ul className="mt-9 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 16).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/hizmetler/${service.slug}/`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-blue-400/40 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-200">
                    <LucideIcon name={service.icon} fallback="Sparkles" className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex-1 text-[13.5px] font-medium text-white/80 group-hover:text-white">
                    {service.shortTitle}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/35 transition group-hover:text-blue-200" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href="/hizmetler/"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {services.length} hizmetin tamamı
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="section-light scroll-mt-24 py-14 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="Sık sorulan sorular"
            title="Süreç hakkında merak edilenler"
            description="Teklif, ödeme, revizyon, destek ve sahiplik konularında en çok sorulan sorular."
          />
          <FaqSection items={PROCESS_FAQ} />
        </div>
      </section>

      <ContactSection
        title="Süreci kendi projeniz için planlayalım"
        description="Ücretsiz ön analizde kapsamı dinliyor, adım adım takvimi ve bütçeyi yazılı olarak paylaşıyoruz."
      />
    </>
  )
}
