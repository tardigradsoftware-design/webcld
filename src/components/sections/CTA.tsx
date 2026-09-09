// src/components/sections/CTA.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'

import { CTA as CTA_COPY, CONTACT, whatsappLink } from '@/lib/constants'
import { trackCtaClick, trackWhatsappClick } from '@/lib/gtag'
import { cn } from '@/lib/utils'

interface CTAProps {
  title?: string
  description?: string
  /** İletişim formu bu bölümün içinde yer alsın mı? */
  withForm?: boolean
  formSlot?: React.ReactNode
  cityContext?: string
  className?: string
  compact?: boolean
}

export function CTA({
  title = 'Projenizi Bugün Başlatalım',
  description,
  withForm = true,
  formSlot,
  cityContext,
  className,
  compact = false,
}: CTAProps) {
  const waLink = whatsappLink(
    cityContext
      ? `Merhaba, ${cityContext} için proje talebim hakkında bilgi almak istiyorum.`
      : undefined,
  )

  return (
    <section
      id="iletisim-formu"
      className={cn('relative overflow-hidden bg-brand-navy-950 text-white', className)}
      aria-labelledby="cta-baslik"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-45" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/25 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-blue-500/20 blur-[130px]"
        aria-hidden
      />

      <div className={cn('container relative', compact ? 'py-14' : 'py-16 lg:py-24')}>
        <div className={cn('grid gap-10', withForm && formSlot ? 'lg:grid-cols-[1fr_1.05fr] lg:gap-14' : '')}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow-light">Ücretsiz ön analiz</span>
            <h2 id="cta-baslik" className="mt-4 text-3xl font-semibold leading-tight md:text-[42px]">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {description ??
                'Merhaba, ben Tardigrad Software kurucusu. Her projeye aynı soruyla başlıyoruz: "Bu çalışma işletmenizin hangi problemini çözecek?" Cevabı birlikte bulmak için 20 dakikalık bir görüşme yeterli. Mevcut durumunuzu analiz ediyor, kapsam ve bütçe önerisini yazılı olarak paylaşıyoruz.'}
            </p>

            <ul className="mt-7 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>
                Ücretsiz ön analiz ve yazılı teklif — taahhüt yok
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>
                {CONTACT.responseTime}
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>
                Türkiye’nin 81 iline uzaktan hizmet — İstanbul Maltepe merkez
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#iletisim-formu-alani"
                onClick={() => trackCtaClick(CTA_COPY.primary, cityContext ?? '/')}
                className="group inline-flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                {CTA_COPY.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              {waLink ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsappClick(cityContext ?? '/')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-sky-400/50 hover:bg-white/[0.09]"
                >
                  <MessageCircle className="h-4 w-4 text-sky-300" aria-hidden />
                  WhatsApp
                </a>
              ) : null}
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.09]"
              >
                <Mail className="h-4 w-4 text-blue-300" aria-hidden />
                {CONTACT.email}
              </a>
            </div>
          </motion.div>

          {withForm && formSlot ? (
            <motion.div
              id="iletisim-formu-alani"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="scroll-mt-28"
            >
              {formSlot}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default CTA
