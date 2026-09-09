// src/components/forms/FormSuccess.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, MessageCircle, RotateCcw } from 'lucide-react'

import { CONTACT, whatsappLink } from '@/lib/constants'

interface FormSuccessProps {
  reference?: string
  onReset?: () => void
}

export function FormSuccess({ reference, onReset }: FormSuccessProps) {
  const waLink = whatsappLink('Merhaba, formu doldurdum. Görüşmeyi WhatsApp üzerinden sürdürmek isterim.')

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-sky-400/25 bg-white/[0.05] p-6 text-white backdrop-blur md:p-8"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
        <CheckCircle2 className="h-7 w-7" aria-hidden />
      </span>

      <h2 className="mt-5 text-2xl font-semibold">Teşekkürler, talebiniz bize ulaştı!</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-white/70">
        {CONTACT.responseTime}. Talebinizi inceleyip kapsam, takvim ve bütçe önerimizi içeren bir ön
        değerlendirme ile dönüş yapacağız. Daha hızlı ilerlemek isterseniz WhatsApp üzerinden de
        yazabilirsiniz.
      </p>

      {reference ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-blue-300">
          Talep referansı: {reference}
        </p>
      ) : null}

      <ul className="mt-6 space-y-2.5 text-sm text-white/70">
        <li className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
          E-posta adresinize otomatik bir onay mesajı gönderildi (gelen kutusunda göremezseniz spam
          klasörünü kontrol edin).
        </li>
        <li className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
          Görüşmeye hazırlıklı gelmemiz için mevcut sitenizin adresini ve hedefinizi yazmanız yeterli.
        </li>
      </ul>

      <div className="mt-7 flex flex-wrap gap-3">
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp ile devam et
          </a>
        ) : null}
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.09]"
        >
          <Mail className="h-4 w-4 text-blue-300" aria-hidden />
          {CONTACT.email}
        </a>
        <Link
          href="/hizmetler/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/18 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-400/50 hover:bg-white/[0.09]"
        >
          Hizmetleri inceleyin
        </Link>
      </div>

      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/45 transition hover:text-white/80"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Yeni bir talep gönder
        </button>
      ) : null}
    </motion.div>
  )
}

export default FormSuccess
