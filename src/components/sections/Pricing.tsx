'use client'

import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { CTA } from '@/lib/constants'
import { trackCtaClick } from '@/lib/gtag'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    name: 'Kurumsal Başlangıç',
    tagline: 'Profesyonel ilk izlenim için',
    price: '₺48.000',
    priceNote: "'den itibaren",
    features: [
      '10 sayfaya kadar kurumsal web sitesi',
      'Teknik SEO kurulumu + yapısal veri',
      'İletişim / teklif formu + KVKK metinleri',
      'Tek dil, mobil uyumlu tasarım',
      '3 ay destek ve hata düzeltme',
    ],
    popular: false,
  },
  {
    name: 'Büyüme',
    tagline: 'Süreçlerini sisteme bağlayan işletmeler için',
    price: '₺120.000',
    priceNote: "'den itibaren",
    features: [
      'Özel yazılım: CRM, stok veya teklif modülü',
      'Yönetim paneli + yetki rolleri',
      'Ödeme, kargo, e-fatura entegrasyonları',
      'Raporlama panosu ve metrik takibi',
      '6 ay destek + ekip eğitimleri',
    ],
    popular: true,
  },
  {
    name: 'Ölçek & SaaS',
    tagline: 'Ürünleşmek ve abonelik geliri için',
    price: 'Teklife bağlı',
    priceNote: 'kapsam bazlı',
    features: [
      'Multi-tenant SaaS platform mimarisi',
      'Abonelik, paket ve faturalandırma',
      'AI asistan ve içerik araçları',
      'SLA hedefi + izleme ve alarm kurulumu',
      '12 ay destek + özel ürün ekibi',
    ],
    popular: false,
  },
]

/**
 * Paketler — kapsam bazlı başlangıç fiyatlarıyla şeffaf çerçeve.
 * Net teklif her zaman ücretsiz ön analiz sonrası yazılı paylaşılır.
 */
export function Pricing() {
  return (
    <section className="section-soft relative overflow-hidden py-20 lg:py-28" aria-labelledby="paketler-baslik">
      <div className="container">
        <SectionHeading
          id="paketler-baslik"
          align="center"
          eyebrow="Paketler"
          title="Hangi aşamadaysanız, ona uygun çerçeve"
          description="Başlangıç kapsamları ve fiyat aralıkları aşağıdadır. Net teklif; ücretsiz ön analiz sonrası iş kalemleri, takvim ve başarı metrikleriyle yazılı olarak paylaşılır."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.09} className="h-full">
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1',
                  plan.popular
                    ? 'border-brand-blue/50 bg-white shadow-glow-blue ring-2 ring-brand-blue/30'
                    : 'border-brand-navy-100 bg-white shadow-card hover:shadow-card-hover',
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-cta-gradient px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-glow-blue">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    En çok tercih edilen
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold text-brand-ink">{plan.name}</h3>
                <p className="mt-1 text-[13px] text-brand-ink-soft/65">{plan.tagline}</p>
                <p className="mt-5 font-mono text-3xl font-bold text-brand-navy-900">
                  {plan.price}
                  <span className="ml-1 text-sm font-medium text-brand-ink-soft/60">{plan.priceNote}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-brand-ink-soft/85">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                        <Check className="h-3 w-3" aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/iletisim/"
                  onClick={() => trackCtaClick(`${CTA.primary} — ${plan.name}`, '/')}
                  className={cn(
                    'mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition',
                    plan.popular
                      ? 'bg-cta-gradient text-white shadow-glow hover:brightness-110'
                      : 'border border-brand-navy-200 text-brand-navy-800 hover:border-brand-blue/50 hover:bg-brand-navy-50',
                  )}
                >
                  Bu paket için teklif al
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-[12.5px] text-brand-ink-soft/60">
          Fiyatlar temsilidir ve kapsam bazlıdır; bağlayıcı teklif ücretsiz ön analiz sonrası yazılı olarak iletilir.
        </p>
      </div>
    </section>
  )
}

export default Pricing
