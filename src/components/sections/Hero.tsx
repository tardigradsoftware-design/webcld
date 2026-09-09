// src/components/sections/Hero.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck, Terminal, Layers } from 'lucide-react'

import { SystemArchitectureVisual } from '@/components/sections/SystemArchitectureVisual'
import { CTA, CONTACT, SITE_STATS } from '@/lib/constants'
import { trackCtaClick } from '@/lib/gtag'

const HIGHLIGHTS = [
  '43 hizmet alanı — web, yazılım, SEO, AI',
  'Türkiye’nin 81 iline uzaktan hizmet',
  'Ücretsiz ön analiz, yazılı teklif',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-950 text-white">
      {/* Arka plan: Temiz Grid + Yumuşak Ambient Işık (Scroll dinleyicisi içermez) */}
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-20 h-[450px] w-[450px] rounded-full bg-blue-500/15 blur-[120px]"
        aria-hidden
      />

      <div className="container relative py-16 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:py-24 xl:gap-16">
        {/* Sol Kolon: Başlık ve Değer Vaadi */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item}>
            <span className="eyebrow-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              İstanbul Maltepe · Türkiye Geneli Dijital Altyapı
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[clamp(2.3rem,5vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.018em]"
          >
            Dağınık süreçleri{' '}
            <span className="relative inline-block text-gradient-light">
              canlı sistemlere
            </span>{' '}
            dönüştüren dijital mimari
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-base leading-relaxed text-white/80 md:text-lg"
          >
            Kurumsal web siteleri, CRM ve stok otomasyonları, SaaS platformları ve teknik SEO.
            Kod sahipliği sizde, performans garantili, 9 adımlı şeffaf teslimat süreciyle.
          </motion.p>

          <motion.ul variants={item} className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
            {HIGHLIGHTS.map((text) => (
              <li key={text} className="flex items-center gap-2 text-sm text-white/80 font-medium">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden />
                {text}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={CTA.formAnchor}
              onClick={() => trackCtaClick(CTA.primary, '/')}
              className="group inline-flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition duration-200 hover:brightness-110"
            >
              {CTA.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>

            <Link
              href="/hizmetler/"
              onClick={() => trackCtaClick(CTA.services, '/')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-blue-400/60 hover:bg-white/10"
            >
              <Layers className="h-4 w-4 text-blue-300" />
              {CTA.services}
            </Link>
          </motion.div>

          {/* İstatistik Çubuğu */}
          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
          >
            {SITE_STATS.map((stat) => (
              <div key={stat.label} className="bg-brand-navy-950/90 px-4 py-4 backdrop-blur">
                <div className="font-mono text-2xl font-bold text-blue-300 md:text-3xl">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400/90" aria-hidden />
              KVKK Uyumlu Güvenli İletişim
            </span>
            <span>{CONTACT.responseTime}</span>
            <span className="font-mono">{CONTACT.email}</span>
          </motion.div>
        </motion.div>

        {/* Sağ Kolon: İnteraktif Canlı Sistem Mimarisi Paneli */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-0"
        >
          <SystemArchitectureVisual />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
