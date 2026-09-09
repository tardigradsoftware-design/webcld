'use client'

import { Activity, FileText, Headphones, MapPin, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/common/Reveal'

const ITEMS = [
  { icon: Headphones, label: '7/24 destek hattı', sub: 'SLA hedefli yanıt süresi' },
  { icon: Activity, label: '%99,9 çalışma süresi', sub: 'İzleme + alarm kurulumu' },
  { icon: ShieldCheck, label: 'KVKK uyumlu süreç', sub: 'Veri işleme & gizlilik' },
  { icon: FileText, label: 'Yazılı teklif & sözleşme', sub: 'Kapsam, takvim, metrik' },
  { icon: MapPin, label: '81 ile uzaktan hizmet', sub: 'İstanbul Maltepe merkez' },
]

/**
 * Güven şeridi — karar aşamasındaki ziyaretçiye operasyonel garantiler.
 */
export function TrustStrip() {
  return (
    <section aria-label="Operasyonel garantiler" className="border-y border-brand-navy-100 bg-brand-paper-soft py-9">
      <div className="container grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} y={16}>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-navy-100 bg-white text-brand-navy-600 shadow-sm">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-brand-ink">{item.label}</span>
                <span className="block text-xs text-brand-ink-soft/60">{item.sub}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default TrustStrip
