// src/components/sections/Hero.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, PlayCircle, ShieldCheck } from 'lucide-react'

import { CTA, CONTACT, SITE_STATS } from '@/lib/constants'
import { trackCtaClick } from '@/lib/gtag'
import { cn } from '@/lib/utils'

const HIGHLIGHTS = [
  '43 hizmet alanı — web, yazılım, SEO, AI',
  'Türkiye’nin 81 iline uzaktan hizmet',
  'Ücretsiz ön analiz, yazılı teklif',
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-950 text-white">
      {/* Arka plan: grid + ışık lekeleri + ağ deseni */}
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-blue-600/25 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[130px]"
        aria-hidden
      />
      <NetworkBackdrop />

      <div className="container relative py-20 lg:py-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.div variants={item}>
            <span className="eyebrow-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
              </span>
              İstanbul Maltepe · Türkiye geneli
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.04] tracking-tight"
          >
            Türkiye’nin işletmeleri için{' '}
            <span className="text-gradient-light">uçtan uca dijital çözümler</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            Kurumsal web sitesi, özel yazılım ve yönetim panelleri, SaaS ürünleri, SEO ve dijital
            dönüşüm. Dağınık Excel dosyalarından canlı platformlara — işinizi büyüten sistemleri
            tek ekip olarak tasarlıyor, geliştiriyor ve yaşatıyoruz.
          </motion.p>

          <motion.ul variants={item} className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
            {HIGHLIGHTS.map((text) => (
              <li key={text} className="flex items-center gap-2 text-sm text-white/75">
                <Check className="h-4 w-4 text-sky-400" aria-hidden />
                {text}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={CTA.formAnchor}
              onClick={() => trackCtaClick(CTA.primary, '/')}
              className="group inline-flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              {CTA.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/hizmetler/"
              onClick={() => trackCtaClick(CTA.services, '/')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-blue-400/60 hover:bg-white/[0.09]"
            >
              {CTA.services}
            </Link>
            <a
              href="#donusum-filmi"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              <PlayCircle className="h-5 w-5" aria-hidden />
              Dönüşüm filmini izle
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
          >
            {SITE_STATS.map((stat) => (
              <div key={stat.label} className="bg-brand-navy-950/85 px-4 py-5 backdrop-blur">
                <div className="font-mono text-2xl font-bold text-blue-300 md:text-3xl">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sky-400/80" aria-hidden />
              KVKK uyumlu süreçler
            </span>
            <span>{CONTACT.responseTime}</span>
            <span className="font-mono">{CONTACT.email}</span>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent"
        aria-hidden
      />
    </section>
  )
}

/** Dekoratif ağ (network) deseni — statik SVG, JS maliyeti yok */
function NetworkBackdrop() {
  const nodes = [
    [120, 140], [260, 96], [410, 168], [560, 108], [700, 190], [860, 130], [1010, 200], [1140, 140],
    [190, 300], [350, 356], [520, 300], [690, 372], [880, 320], [1060, 380],
    [110, 470], [300, 520], [480, 468], [660, 528], [840, 470], [1020, 520], [1160, 470],
  ] as const

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [0, 8], [1, 9], [2, 10], [3, 11], [4, 12], [5, 13],
    [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
    [8, 14], [9, 15], [10, 16], [11, 17], [12, 18], [13, 19],
    [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20],
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28]"
      viewBox="0 0 1280 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.5">
        {edges.map(([from, to], index) => (
          <line key={index} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />
        ))}
      </g>
      <g>
        {nodes.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={index % 4 === 0 ? 4 : 2.4}
            fill={index % 3 === 0 ? '#60A5FA' : index % 3 === 1 ? '#6090FA' : '#3B82F6'}
            opacity={index % 4 === 0 ? 0.95 : 0.6}
            className={cn(index % 5 === 0 && 'animate-pulse')}
          />
        ))}
      </g>
    </svg>
  )
}

export default Hero
