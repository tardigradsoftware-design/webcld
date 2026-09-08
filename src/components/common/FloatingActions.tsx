// src/components/common/FloatingActions.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Mail, MessageCircle } from 'lucide-react'

import { CONTACT, whatsappLink } from '@/lib/constants'
import { trackWhatsappClick } from '@/lib/gtag'

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const pathname = usePathname()
  const waLink = whatsappLink('Merhaba, projemiz hakkında hızlıca bilgi almak istiyorum.')

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-2.5 sm:right-6">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="scroll-top"
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Sayfanın başına dön"
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-navy-200 bg-white text-brand-navy-700 shadow-card transition hover:border-brand-cyan hover:text-brand-navy-900"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </motion.button>
        ) : null}
      </AnimatePresence>

      {waLink ? (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsappClick(pathname)}
          aria-label="WhatsApp ile yazın"
          className="pointer-events-auto relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-emerald-500 p-3.5 text-white shadow-glow transition hover:bg-emerald-400"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-pulse-ring" aria-hidden />
          <MessageCircle className="relative h-6 w-6" aria-hidden />
        </a>
      ) : (
        <a
          href={`mailto:${CONTACT.email}`}
          aria-label="E-posta gönderin"
          className="pointer-events-auto inline-flex h-13 w-13 items-center justify-center rounded-full bg-brand-navy-900 p-3.5 text-white shadow-glow-blue transition hover:bg-brand-navy-800"
        >
          <Mail className="h-6 w-6" aria-hidden />
        </a>
      )}
    </div>
  )
}

export default FloatingActions
