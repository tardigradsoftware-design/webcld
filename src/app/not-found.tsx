// src/app/not-found.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, Compass, MapPin, Newspaper, Search, Sparkles } from 'lucide-react'

import { CTA, SITE } from '@/lib/constants'
import { buildMetadata } from '@/lib/seo'
import { services } from '@/lib/services'
import { featuredCities } from '@/lib/cities'
import { getRecentPosts } from '@/lib/blog-posts'

export const metadata: Metadata = buildMetadata({
  title: 'Sayfa Bulunamadı (404)',
  description: `Aradığınız sayfa taşınmış veya kaldırılmış olabilir. ${SITE.name} hizmetlerini, şehir sayfalarını ve blog içeriklerini buradan keşfedebilirsiniz.`,
  path: '/404',
  noIndex: true,
})

const POPULAR_SERVICES = [
  'kurumsal-web-sitesi',
  'e-ticaret-sitesi',
  'crm',
  'ozel-yazilim-gelistirme',
  'lokal-seo',
  'teknik-seo',
  'yonetim-paneli',
  'ai-chatbot',
  'dijital-donusum',
  'web-sitesi-yenileme',
]
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is NonNullable<typeof service> => Boolean(service))

export default function NotFound() {
  const posts = getRecentPosts(3)

  return (
    <div className="relative isolate overflow-hidden bg-brand-navy-950 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#08112B_0%,#0F1B3D_50%,#0B1730_100%)]" />
        <div className="absolute inset-0 bg-grid-navy opacity-40" />
        <div className="absolute -top-28 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-blue-500/15 blur-[120px]" />
      </div>

      <div className="container relative py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="font-mono text-sm font-semibold tracking-[0.22em] text-blue-300">
              HATA 404
            </p>
            <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
              Aradığınız sayfa
              <br />
              <span className="text-gradient-light">burada değil</span>
            </h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/70">
              Sayfa taşınmış, adı değişmiş veya hiç var olmamış olabilir. Aşağıdaki bağlantılarla
              aradığınızı büyük olasılıkla bulacaksınız; bulamazsanız bize yazın, doğru sayfayı
              birlikte bulalım.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3.5 text-[15px] font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                Ana sayfaya dön
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/hizmetler/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.09]"
              >
                {CTA.services}
              </Link>
              <Link
                href="/iletisim/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-[15px] font-semibold text-white/75 transition hover:border-white/30 hover:text-white"
              >
                Bize ulaşın
              </Link>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/50">
                <Compass className="h-4 w-4 text-blue-300" aria-hidden />
                En çok aranan hizmetler
              </h2>
              <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {POPULAR_SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/hizmetler/${service.slug}/`}
                      className="group inline-flex items-center gap-2 text-[14px] text-white/70 transition hover:text-white"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-300 transition-transform group-hover:scale-150" aria-hidden />
                      {service.title}
                      <ArrowUpRight className="h-3 w-3 text-white/25 transition group-hover:text-blue-200" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/hizmetler/"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-200 transition hover:text-blue-100"
              >
                {services.length} hizmetin tamamı
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/50">
                <Search className="h-4 w-4 text-blue-300" aria-hidden />
                Ne arıyordunuz?
              </h2>
              <ul className="mt-4 space-y-2 text-[14px] text-white/70">
                {[
                  { label: '“web sitesi fiyatı”', href: '/hizmetler/kurumsal-web-sitesi/' },
                  { label: '“e-ticaret sitesi kurdurmak”', href: '/hizmetler/e-ticaret-sitesi/' },
                  { label: '“CRM sistemi”', href: '/hizmetler/crm/' },
                  { label: '“SEO nasıl yapılır?”', href: '/hizmetler/teknik-seo/' },
                  { label: '“proje ne kadar sürer?”', href: '/surec/' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 transition hover:border-blue-400/40 hover:bg-white/[0.07] hover:text-white"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-white/30" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/50">
                <MapPin className="h-4 w-4 text-blue-300" aria-hidden />
                Şehir sayfaları
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {featuredCities.slice(0, 8).map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/sehir/${city.slug}/`}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/70 transition hover:border-blue-400/50 hover:text-white"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/sehir/"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-200 transition hover:text-blue-100"
              >
                81 ilin tamamı
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            {posts.length ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/50">
                  <Newspaper className="h-4 w-4 text-blue-300" aria-hidden />
                  Son blog yazıları
                </h2>
                <ul className="mt-4 space-y-3">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="group block rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-blue-400/40 hover:bg-white/[0.07]"
                      >
                        <span className="block text-[13.5px] font-medium leading-snug text-white/85 group-hover:text-white">
                          {post.title}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] text-white/40">
                          {post.category} · {post.readingTime} dk
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.08] p-6">
              <Sparkles className="h-5 w-5 text-blue-200" aria-hidden />
              <h2 className="mt-3 text-base font-semibold text-white">
                Aradığınızı bulamadınız mı?
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
                Ne aradığınızı yazın; doğru hizmeti veya sayfayı birlikte bulalım.
              </p>
              <Link
                href="/iletisim/#iletisim-formu"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {CTA.secondary}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
