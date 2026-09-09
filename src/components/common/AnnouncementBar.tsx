'use client'

import { Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'tardigrad-duyuru-kapatildi'

/**
 * Üst kampanya/duyuru çubuğu — kapatılabilir (tercih localStorage'da saklanır).
 */
export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      setHidden(window.localStorage.getItem(STORAGE_KEY) === '1')
    } catch {
      setHidden(false)
    }
  }, [])

  if (hidden) return null

  const close = () => {
    setHidden(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* yoksay */
    }
  }

  return (
    <div className="relative z-40 bg-gradient-to-r from-brand-navy-900 via-brand-navy-800 to-brand-navy-900 text-white">
      <div className="container flex items-center justify-center gap-3 py-2 pr-10 text-center text-[12.5px] font-medium sm:text-[13px]">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-300" aria-hidden />
        <span className="truncate">
          <span className="font-semibold text-blue-200">Yeni projelere özel:</span> ücretsiz ön analiz
          + yazılı teklif + yol haritası
        </span>
        <Link
          href="/iletisim/"
          className="hidden shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-semibold transition hover:border-blue-300/60 hover:bg-white/15 sm:inline-flex"
        >
          Hemen başvurun
        </Link>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Duyuruyu kapat"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  )
}

export default AnnouncementBar
