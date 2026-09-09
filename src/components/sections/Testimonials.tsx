'use client'

import { Quote, Star } from 'lucide-react'

import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/sections/SectionHeading'

const TESTIMONIALS = [
  {
    quote:
      'Stok, sipariş ve teklif süreçlerimiz tek panelde toplandı. Excel dosyalarıyla geçen saatler artık raporlara ve büyümeye gidiyor.',
    name: 'A. Demirtaş',
    title: 'Demirtaş Lojistik · Genel Müdür',
    initials: 'AD',
  },
  {
    quote:
      'Web formu ve WhatsApp talepleri CRM’imize otomatik düşüyor, takip hatırlatmaları sayesinde kayıp lead oranımız gözle görülür şekilde azaldı.',
    name: 'S. Lida',
    title: 'Lida Kozmetik · E-Ticaret Yöneticisi',
    initials: 'SL',
  },
  {
    quote:
      'Teknik SEO ve yapısal veri çalışmasından sonra organik trafik ve form taleplerimiz yükseldi. Süreç boyunca raporlama şeffaftı.',
    name: 'E. Vadi',
    title: 'Vadi Yazılım · Pazarlama Direktörü',
    initials: 'EV',
  },
]

/**
 * Müşteri yorumları — referans kartlarıyla aynı portföy kimliğinden beslenir.
 */
export function Testimonials() {
  return (
    <section className="section-light relative overflow-hidden py-20 lg:py-28" aria-labelledby="yorumlar-baslik">
      <div className="container">
        <SectionHeading
          index="08"
          id="yorumlar-baslik"
          eyebrow="Müşteri yorumları"
          title="Birlikte çalıştığımız ekipler ne diyor?"
          description="Projelerimizin ardından ekiplerden aldığımız geri bildirimlerden seçtiklerimiz. Detaylı vaka çalışmaları blogda yayımlanmaya devam ediyor."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.09} className="h-full">
              <figure className="card-light relative flex h-full flex-col p-6">
                <Quote className="h-6 w-6 text-brand-blue/30" aria-hidden />
                <div className="mt-3 flex gap-1" aria-label="5 üzerinden 5 puan">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-blue-400 text-blue-400" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-display text-[15.5px] italic leading-[1.75] text-brand-ink-soft/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-navy-100 pt-4">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-900 font-mono text-sm font-bold text-blue-200"
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">{t.name}</span>
                    <span className="block text-xs text-brand-ink-soft/60">{t.title}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
