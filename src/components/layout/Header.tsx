// src/components/layout/Header.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'

import { CTA, CONTACT, NAV_ITEMS, SERVICE_CATEGORIES } from '@/lib/constants'
import { categoriesWithCounts } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { trackCtaClick } from '@/lib/gtag'
import { Logo } from '@/components/layout/Logo'

const DESKTOP_NAV = NAV_ITEMS.filter((item) => item.href !== '/')

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    href === pathname || (href !== '/' && pathname.startsWith(href.replace(/\/$/, '')))

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled || open
          ? 'border-b border-white/10 bg-brand-navy-950/92 shadow-navy backdrop-blur-xl'
          : 'border-b border-transparent bg-brand-navy-950/70 backdrop-blur-md',
      )}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Logo variant="light" />

        {/* Masaüstü menü */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {DESKTOP_NAV.map((item) => {
            if (item.href === '/hizmetler/') {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href) ? 'text-cyan-300' : 'text-white/75 hover:text-white',
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn('h-3.5 w-3.5 transition-transform', servicesOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </Link>
                  <AnimatePresence>
                    {servicesOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-950/97 p-2 shadow-navy backdrop-blur-xl">
                          {categoriesWithCounts.map((category) => (
                            <Link
                              key={category.key}
                              href={`/hizmetler/?kategori=${category.key}`}
                              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                            >
                              <span>
                                <span className="block text-sm font-semibold text-white">
                                  {category.emoji} {category.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-white/55">
                                  {category.description}
                                </span>
                              </span>
                              <span className="shrink-0 rounded-full border border-white/12 bg-white/5 px-2.5 py-1 font-mono text-xs text-cyan-300">
                                {category.count}
                              </span>
                            </Link>
                          ))}
                          <div className="mt-1 border-t border-white/10 p-2">
                            <Link
                              href="/hizmetler/"
                              className="inline-flex w-full items-center justify-center rounded-lg bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
                            >
                              Tüm 43 hizmeti gör
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive(item.href) ? 'text-cyan-300' : 'text-white/75 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {CONTACT.phone ? (
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/75 transition hover:text-white"
            >
              <Phone className="h-4 w-4 text-cyan-300" aria-hidden />
              {CONTACT.phone}
            </a>
          ) : null}
          <Link
            href={CTA.formAnchor}
            onClick={() => trackCtaClick(CTA.primary, pathname)}
            className="rounded-lg bg-cta-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow-blue transition hover:brightness-110"
          >
            {CTA.primary}
          </Link>
        </div>

        {/* Mobil menü butonu */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {/* Mobil menü */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-brand-navy-950 lg:hidden"
          >
            <nav className="container max-h-[calc(100vh-72px)] overflow-y-auto py-4" aria-label="Mobil menü">
              <Link
                href="/"
                className="block rounded-xl px-4 py-3 text-base font-semibold text-white transition hover:bg-white/[0.06]"
              >
                Ana Sayfa
              </Link>

              <div className="mt-1 rounded-xl border border-white/10 bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-white"
                >
                  Hizmetler
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')}
                    aria-hidden
                  />
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
                            className="rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                          >
                            {category.emoji} {category.label}
                          </Link>
                        ))}
                        <Link
                          href="/hizmetler/"
                          className="rounded-lg bg-white/[0.08] px-3 py-2 text-center text-sm font-semibold text-white"
                        >
                          Tüm hizmetler
                        </Link>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {DESKTOP_NAV.filter((item) => item.href !== '/hizmetler/').map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'mt-1 block rounded-xl px-4 py-3 text-base font-semibold transition hover:bg-white/[0.06]',
                    isActive(item.href) ? 'text-cyan-300' : 'text-white',
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
                <Link
                  href={CTA.formAnchor}
                  onClick={() => trackCtaClick(CTA.primary, pathname)}
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
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header
