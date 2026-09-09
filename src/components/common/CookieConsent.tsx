// src/components/common/CookieConsent.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'
import { GA_MEASUREMENT_ID } from '@/lib/gtag'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'tardigrad-cookie-consent'
const SCRIPT_ID = 'ga4-gtag'

type ConsentValue = 'granted' | 'denied'

/** GA4 script'ini yalnızca onay sonrası yükler */
function loadGa4(measurementId: string) {
  if (!measurementId || typeof document === 'undefined') return
  if (document.getElementById(SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true, page_path: window.location.pathname })
}

function unloadGa4() {
  if (typeof document === 'undefined') return
  document.getElementById(SCRIPT_ID)?.remove()
  window.gtag = undefined
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      stored = null
    }

    if (stored === 'granted') {
      loadGa4(GA_MEASUREMENT_ID)
      return
    }
    if (stored === 'denied') return

    const timer = window.setTimeout(() => setVisible(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  function decide(value: ConsentValue) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // depolama kapalıysa yalnızca oturum boyunca geçerli
    }
    if (value === 'granted') loadGa4(GA_MEASUREMENT_ID)
    else unloadGa4()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
          role="region"
          aria-label="Çerez tercihleri"
        >
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-brand-navy-950/95 text-white shadow-navy backdrop-blur-xl">
            <div className="flex items-start gap-3 p-5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15 text-blue-300">
                <Cookie className="h-5 w-5" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Çerez tercihleri</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
                  Siteyi ölçmek ve iyileştirmek için anonim analiz çerezleri kullanıyoruz. Zorunlu
                  çerezler sitenin çalışması için gereklidir. Detaylar{' '}
                  <Link href="/kvkk/" className="font-medium text-blue-300 underline-offset-2 hover:underline">
                    KVKK Aydınlatma Metni
                  </Link>
                  ’nde.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => decide('granted')}
                    className="rounded-lg bg-cta-gradient px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-110"
                  >
                    Kabul et
                  </button>
                  <button
                    type="button"
                    onClick={() => decide('denied')}
                    className="rounded-lg border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/5"
                  >
                    Reddet
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => decide('denied')}
                aria-label="Kapat"
                className={cn(
                  'rounded-md p-1 text-white/50 transition hover:bg-white/10 hover:text-white',
                )}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CookieConsent
