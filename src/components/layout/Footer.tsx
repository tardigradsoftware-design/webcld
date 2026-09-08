// src/components/layout/Footer.tsx
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { CONTACT, SITE, SOCIAL_LINKS, whatsappLink } from '@/lib/constants'
import {
  categoriesWithCounts,
  FOOTER_CITY_LINKS,
  FOOTER_CORPORATE_LINKS,
  FOOTER_FEATURED_SERVICES,
} from '@/lib/navigation'
import { Logo } from '@/components/layout/Logo'
import { LucideIcon } from '@/components/common/LucideIcon'

const year = new Date().getFullYear()

export function Footer() {
  const waLink = whatsappLink('Merhaba, footer üzerinden ulaşıyorum. Bilgi alabilir miyim?')

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-[0.35]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[130px]"
        aria-hidden
      />

      <div className="container relative py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marka + iletişim */}
          <div>
            {/* LOGO SVG BURAYA */}
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {SITE.description} Kurumsal web sitesi, özel yazılım, SaaS, SEO ve dijital dönüşüm
              projelerinde analizden raporlamaya kadar tek ekip olarak çalışıyoruz.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                <span>{CONTACT.address.full}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-white/75 transition hover:text-cyan-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phone ? (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="text-white/75 transition hover:text-cyan-300"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              ) : null}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-white/70 transition hover:border-cyan-400/50 hover:bg-white/[0.09] hover:text-cyan-300"
                >
                  <LucideIcon name={social.icon} fallback="Globe" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Hizmet kategorileri */}
          <nav aria-label="Hizmet kategorileri">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Hizmetler</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {categoriesWithCounts.map((category) => (
                <li key={category.key}>
                  <Link
                    href={`/hizmetler/?kategori=${category.key}`}
                    className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white"
                  >
                    {category.label}
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/50 transition group-hover:border-cyan-400/40 group-hover:text-cyan-200">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm">
              {FOOTER_FEATURED_SERVICES.slice(0, 5).map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-white/65 transition hover:text-cyan-300"
                  >
                    {service.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hizmetler/"
                  className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Tüm 43 hizmet
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Şehirler */}
          <nav aria-label="Hizmet verdiğimiz şehirler">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Şehirler</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {FOOTER_CITY_LINKS.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/sehir/"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              81 ilin tamamı
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>

            <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Kurumsal</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {FOOTER_CORPORATE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
              Projenizi başlatın
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              Ücretsiz ön analiz ile başlayın: mevcut durumunuzu değerlendiriyor, kapsam ve bütçe
              önerisini yazılı olarak paylaşıyoruz. {CONTACT.responseTime}.
            </p>
            <div className="mt-6 grid gap-2.5">
              <Link
                href="/iletisim/#iletisim-formu"
                className="rounded-lg bg-cta-gradient px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
              >
                Ücretsiz Ön Analiz
              </Link>
              {waLink ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:border-emerald-400/50 hover:bg-white/[0.06]"
                >
                  WhatsApp ile yazın
                </a>
              ) : (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:border-cyan-400/50 hover:bg-white/[0.06]"
                >
                  {CONTACT.email}
                </a>
              )}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/55">
              Çalışma saatleri: Hafta içi 09:00 – 18:30. Uzaktan çalışma modeliyle Türkiye’nin 81
              iline hizmet veriyoruz.
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {year} {SITE.legalName}. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/kvkk/" className="transition hover:text-white">
              KVKK Aydınlatma Metni
            </Link>
            <Link href="/iletisim/" className="transition hover:text-white">
              İletişim
            </Link>
            <span className="font-mono">tardigradsoftware.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
