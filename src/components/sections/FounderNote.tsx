'use client'

import { Reveal } from '@/components/common/Reveal'

const FACTS = [
  ['Atölye', 'İstanbul, Maltepe'],
  ['Aynı anda', 'en fazla 3 proje'],
  ['Her teslimde', 'kaynak kodu sizde'],
  ['Destekte', 'insan yanıtlar, bot değil'],
]

/**
 * Kurucunun notu — birinci ağızdan, asimetrik editoryal blok.
 * El yazısı imza SVG'si elle çizilmiş bir path'tir.
 */
export function FounderNote() {
  return (
    <section className="section-light relative overflow-hidden py-20 lg:py-28" aria-labelledby="kurucu-notu">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-[0.26em] text-brand-navy-400">KURUCUNUN NOTU</span>
            <span className="h-px w-16 bg-brand-navy-200" aria-hidden />
          </div>
          <p className="mt-8 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium italic leading-[1.3] text-brand-ink">
            “Bir yazılımın değeri teslim edildiği gün değil,{" "}
            <span className="text-brand-blue">altıncı ayında</span> belli olur.”
          </p>
          <div className="mt-8 max-w-2xl space-y-5 text-[15.5px] leading-[1.85] text-brand-ink-soft/85">
            <p>
              Merhaba, ben Tardigrad Software&apos;in kurucusuyum. Bu atölyeyi tek bir inançla kurdum:
              küçük ve orta ölçekli işletmeler de büyük şirketlerin kullandığı disiplinle yazılmış
              sistemleri hak ediyor.
            </p>
            <p>
              Her projeye aynı üç belgeyle başlarız: kapsam, takvim ve başarı metrikleri. Amacı
              basit — üçüncü ayda kimsenin &ldquo;biz bunu konuşmamıştık&rdquo; cümlesini kurmadığı bir
              çalışma düzeni.
            </p>
            <p>
              Kod yazmaya hâlâ her sabah kendim başlıyorum. Ekibimiz bilerek küçük tutulmuş bir
              atölyedir: aynı anda en fazla üç proje alırız. Çünkü dördüncü proje, ilk üçünün
              kalitesinden çalar.
            </p>
          </div>

          {/* El yazısı imza */}
          <svg viewBox="0 0 260 90" className="mt-8 h-20 w-64 text-brand-navy-800" fill="none" aria-label="Kurucu imzası">
            <path
              d="M12 58C28 24 42 18 50 34c7 14-8 30-15 21-7-10 16-27 44-24 27 3 20 24 42 17 22-7 20-24 42-20 22 4 16 25 38 19 15-4 21-13 33-10"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M24 74c62-7 142 3 212-5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
          <p className="mt-2 text-sm font-semibold text-brand-ink">Kurucu &amp; Baş Geliştirici</p>
          <p className="text-[13px] text-brand-ink-soft/60">Tardigrad Software · İstanbul</p>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-7">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy-500">
              Çalışma ilkeleri
            </p>
            <dl className="mt-6 space-y-5">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-brand-navy-100 pb-4 last:border-0 last:pb-0">
                  <dt className="text-[13px] font-semibold uppercase tracking-wide text-brand-navy-500">{k}</dt>
                  <dd className="text-right font-display text-[15px] font-medium italic text-brand-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[12.5px] leading-relaxed text-brand-ink-soft/60">
              Bu ilkeler teklif belgemizin ilk sayfasında da aynen yer alır; değişmezler.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}

export default FounderNote
