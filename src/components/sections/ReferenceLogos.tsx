'use client'

import { Reveal } from '@/components/common/Reveal'

/**
 * Örnek proje portföyündeki markalar — kayan wordmark şeridi.
 * (Gerçek müşteri logosu yerine proje portföyü marka adları kullanılır.)
 */
const BRANDS = [
  'Demirtaş Lojistik',
  'Lida Kozmetik',
  'Baltacı Turizm',
  'Vadi Yazılım',
  'Kuzey Gıda',
  'Nortel Medya',
  'Soylu Mobilya',
  'Lodos Gıda',
  'Vera Tekstil',
  'Ege Seramik',
  'Pera Ajans',
  'Mercan Tekstil',
  'Arda Yapı',
  'Mira Enerji',
  'Anka Savunma',
]

const STYLES = [
  'font-mono font-bold uppercase tracking-[0.28em]',
  'font-black uppercase italic tracking-tight',
  'font-semibold tracking-[-0.02em]',
  'font-mono font-semibold uppercase tracking-[0.14em]',
]

export function ReferenceLogos() {
  return (
    <section
      aria-label="Örnek proje portföyü markaları"
      className="relative overflow-hidden border-y border-brand-navy-100 bg-white py-7"
    >
      <Reveal y={14}>
        <p className="mb-5 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy-400">
          Örnek proje portföyü · farklı sektörlerden markalar
        </p>
      </Reveal>
      <div className="marquee relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />
        <div className="marquee-track flex w-max items-center gap-14 pr-14">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className={`${STYLES[i % STYLES.length]} whitespace-nowrap text-lg text-brand-navy-300 transition-colors duration-300 hover:text-brand-navy-700`}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReferenceLogos
