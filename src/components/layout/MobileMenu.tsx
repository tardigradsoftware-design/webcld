// src/components/layout/MobileMenu.tsx
// Not: Mobil menü, Header.tsx içinde erişilebilirlik ve scroll kilidi ile birlikte
// tek bileşende yönetilir. Bu dosya, menü içeriğini bağımsız kullanmak isteyen
// sayfalar (ör. tam ekran açılışlar) için yeniden kullanılabilir bir sürüm sunar.

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import { CTA, CONTACT, NAV_ITEMS, SERVICE_CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  onNavigate?: () => void
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <div className="grid gap-1.5 p-4">
      {NAV_ITEMS.map((item) =>
        item.href === '/hizmetler/' ? (
          <div key={item.href} className="rounded-xl border border-white/10 bg-white/[0.03]">
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-white"
            >
              {item.label}
              <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {servicesOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="grid gap-1 p-2">
                    {SERVICE_CATEGORIES.map((category) => (
                      <Link
                        key={category.key}
                        href={`/hizmetler/?kategori=${category.key}`}
                        onClick={onNavigate}
                        className="rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        {category.emoji} {category.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="rounded-xl px-4 py-3 text-base font-semibold text-white transition hover:bg-white/[0.06]"
          >
            {item.label}
          </Link>
        ),
      )}

      <div className="mt-3 grid gap-2 border-t border-white/10 pt-4">
        <Link
          href={CTA.formAnchor}
          onClick={onNavigate}
          className="rounded-xl bg-cta-gradient px-4 py-3 text-center text-sm font-semibold text-white"
        >
          {CTA.primary}
        </Link>
        <a
          href={`mailto:${CONTACT.email}`}
          className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-white/85"
        >
          {CONTACT.email}
        </a>
      </div>
    </div>
  )
}

export default MobileMenu
