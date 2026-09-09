// src/components/sections/EngineeringGuarantees.tsx
'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  Gauge,
  Lock,
  ShieldCheck,
  Workflow,
  CheckCircle2,
  FileCode2,
  Server,
  Zap,
} from 'lucide-react'

import { SectionHeading } from '@/components/sections/SectionHeading'

const GUARANTEES = [
  {
    icon: FileCode2,
    title: '%100 Kod & Altyapı Sahipliği',
    tag: 'Sıfır Lock-in',
    description:
      'Kapalı kutu veya kiralık sistem yok. Alan adı, Vercel/Cloudflare hesapları ve tüm Git kaynak kodları doğrudan sizin üzerinize kurulur ve teslim edilir.',
  },
  {
    icon: Gauge,
    title: 'Core Web Vitals & Performans',
    tag: 'Lighthouse 95+',
    description:
      'LCP < 2.5s, CLS < 0.1 ve INP < 200ms hedefleriyle geliştiriyoruz. Sayfalarınız mobilde ve masaüstünde anında açılır; hız raporunu yazılı sunarız.',
  },
  {
    icon: Code2,
    title: 'Strict Type-Safe Mimari',
    tag: 'Next.js 14 + TS',
    description:
      'Tip güvenli kod yapısı (TypeScript Strict Mode), Zod şema doğrulaması ve Supabase RLS ile runtime hataları ve güvenlik açıkları minimize edilir.',
  },
  {
    icon: ShieldCheck,
    title: 'KVKK & Güvenlik Standartları',
    tag: 'Kurumsal Güvenlik',
    description:
      'HTTPS, güvenlik başlıkları (HSTS, CSP, X-Frame-Options), Upstash rate limiting ve bot koruması her projede varsayılan olarak yer alır.',
  },
  {
    icon: Workflow,
    title: '9 Adımlı Şeffaf Süreç',
    tag: 'Sözleşmeli Teslimat',
    description:
      'Analizden canlıya geçişe kadar her adım önceden belirlenir. Sürpriz bütçe artışı veya ucu açık teslimat tarihleri ile karşılaşmazsınız.',
  },
  {
    icon: Server,
    title: '30 Gün Garanti + Teknik SLA',
    tag: 'Canlı Sonrası Destek',
    description:
      'Yayına alma sonrası ilk 30 gün ücretsiz hata düzeltme garantisi. Ardından isteğe bağlı aylık yedekleme, bakım ve güvenlik izleme desteği.',
  },
]

export function EngineeringGuarantees() {
  return (
    <section className="section-light py-20 lg:py-28" aria-labelledby="taahhutler-baslik">
      <div className="container">
        <SectionHeading
          id="taahhutler-baslik"
          eyebrow="MÜHENDİSLİK STANDARTLARI"
          title={
            <>
              Sahte vaatler değil, <span className="text-gradient">yazılı teknik taahhütler</span>
            </>
          }
          description="Sıradan bir ajans değil, sisteminizi sahiplenen teknik bir ekibiz. Her projemizi bu altı mühendislik ilkesine sadık kalarak inşa ediyoruz."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.map((g, index) => {
            const Icon = g.icon
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="card-light flex flex-col justify-between p-6 transition-all duration-300 hover:border-brand-blue/60 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-900 text-white shadow-sm">
                      <Icon className="h-5 w-5 text-blue-300" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-navy-50 px-2.5 py-1 font-mono text-xs font-semibold text-brand-navy-700">
                      <CheckCircle2 className="h-3 w-3 text-brand-blue" />
                      {g.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-brand-ink">
                    {g.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-brand-ink-soft/80">
                    {g.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-brand-navy-100 pt-4 font-mono text-[11.5px] font-semibold text-brand-navy-600">
                  STANDART #0{index + 1}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EngineeringGuarantees
