// src/app/blog/page.tsx
import Link from 'next/link'
import { ArrowUpRight, Layers } from 'lucide-react'

import { SITE } from '@/lib/constants'
import { blogCategories, blogPosts, getRecentPosts } from '@/lib/blog-posts'
import { services } from '@/lib/services'
import { featuredCities } from '@/lib/cities'
import { JsonLd } from '@/components/seo/JsonLd'
import { blogSchema, itemListSchema } from '@/lib/schemas'
import { PageHero } from '@/components/sections/PageHero'
import { BlogCard } from '@/components/sections/BlogCard'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ContactSection } from '@/components/sections/ContactSection'
import { cn } from '@/lib/utils'

interface PageProps {
  searchParams?: { kategori?: string }
}

export default function BlogIndexPage({ searchParams }: PageProps) {
  const categoryParam = searchParams?.kategori
  const activeCategory = blogCategories.includes(categoryParam ?? '') ? categoryParam : undefined
  const posts = activeCategory
    ? blogPosts.filter((post) => post.category === activeCategory)
    : blogPosts
  const [featured, ...rest] = getRecentPosts(blogPosts.length)
  const featuredPost = activeCategory ? posts[0] : featured
  const listPosts = activeCategory ? posts.slice(1) : rest.filter((post) => post.slug !== featuredPost?.slug)

  return (
    <>
      <JsonLd
        id="ld-blog-liste"
        data={[
          blogSchema(blogPosts),
          itemListSchema(
            blogPosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}/` })),
            'Tardigrad Software blog yazıları',
            '/blog/',
          ),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: 'Blog', url: '/blog/' }]}
        eyebrow={`${blogPosts.length} rehber içerik`}
        h1="Blog: Web, Yazılım, SEO ve Dijital Dönüşüm Rehberleri"
        lead={`${SITE.name} ekibinin sahadan edindiği deneyimlerle hazırladığı pratik rehberler. Karar vermeden önce bilmeniz gerekenleri, maliyet kalemlerini ve ölçülebilir hedefleri anlatıyoruz.`}
        meta={[
          { label: 'Yazı sayısı', value: String(blogPosts.length) },
          { label: 'Kategori', value: String(blogCategories.length) },
          { label: 'Güncelleme', value: 'Aylık' },
        ]}
      >
        <nav aria-label="Blog kategorileri" className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/blog/"
            className={cn(
              'rounded-full border px-4 py-2 text-[13px] font-semibold transition',
              !activeCategory
                ? 'border-cyan-400/60 bg-cyan-400/15 text-white'
                : 'border-white/12 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white',
            )}
          >
            Tümü ({blogPosts.length})
          </Link>
          {blogCategories.map((category) => {
            const count = blogPosts.filter((post) => post.category === category).length
            return (
              <Link
                key={category}
                href={`/blog/?kategori=${encodeURIComponent(category)}`}
                className={cn(
                  'rounded-full border px-4 py-2 text-[13px] font-semibold transition',
                  activeCategory === category
                    ? 'border-cyan-400/60 bg-cyan-400/15 text-white'
                    : 'border-white/12 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white',
                )}
              >
                {category} ({count})
              </Link>
            )
          })}
        </nav>
      </PageHero>

      <section className="section-light py-14 lg:py-20" aria-labelledby="yazilar">
        <div className="container">
          <SectionHeading
            eyebrow={activeCategory ? activeCategory : 'Son yazılar'}
            id="yazilar"
            title={activeCategory ? `${activeCategory} yazıları` : 'Öne çıkan rehberler'}
            description="Her yazı; karar vermenizi kolaylaştıracak somut kriterler, maliyet kalemleri ve uygulama adımları içerir."
          />

          {featuredPost ? (
            <article className="mt-9 overflow-hidden rounded-2xl border border-brand-navy-100 bg-white shadow-card">
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="relative min-h-[220px] overflow-hidden bg-brand-navy-950">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(6,182,212,0.28),transparent_60%),radial-gradient(500px_260px_at_85%_70%,rgba(37,99,235,0.32),transparent_62%)]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-grid-navy opacity-40" />
                  <div className="relative flex h-full flex-col justify-end p-7 text-white">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-cyan-100">
                      <Layers className="h-3 w-3" aria-hidden />
                      Öne çıkan
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-white/65">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-7 lg:p-9">
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11.5px] text-brand-navy-400">
                    <span>{featuredPost.category}</span>
                    <span aria-hidden>·</span>
                    <span>{featuredPost.readingTime} dk okuma</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold leading-snug text-brand-ink lg:text-[28px]">
                    <Link href={`/blog/${featuredPost.slug}/`} className="transition hover:text-brand-navy-700">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {featuredPost.tags.slice(0, 4).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-brand-navy-50 px-2.5 py-1 text-[11.5px] font-medium text-brand-navy-600"
                      >
                        #{tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/blog/${featuredPost.slug}/`}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-navy-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-800"
                  >
                    Yazıyı okuyun
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {listPosts.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {listPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-brand-ink-soft/70">
              Bu kategoride henüz başka yazı yok. Diğer kategorilere göz atabilirsiniz.
            </p>
          )}
        </div>
      </section>

      {/* İç link ağı: hizmetler + şehirler */}
      <section className="section-soft py-14 lg:py-20" aria-labelledby="kesfet">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-brand-ink">Hizmet rehberleri</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/75">
              Okuduğunuz konularla ilişkili hizmet sayfalarımızda kapsam, süreç ve sık sorulan
              sorular yer alır.
            </p>
            <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
              {services.slice(0, 12).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/hizmetler/${service.slug}/`}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand-cyan" aria-hidden />
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/hizmetler/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
            >
              {services.length} hizmetin tamamı
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-brand-ink">Şehir rehberleri</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-ink-soft/75">
              Kendi şehrinizdeki sektör dinamikleri, hizmet kombinasyonları ve teklif akışı için
              lokal sayfalarımızı inceleyin.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {featuredCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/sehir/${city.slug}/`}
                    className="inline-flex items-center rounded-full border border-brand-navy-100 bg-brand-paper-soft px-3.5 py-1.5 text-[13px] text-brand-ink-soft transition hover:border-brand-cyan/50 hover:text-brand-navy-900"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/sehir/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
            >
              81 ilin tamamı
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <ContactSection
        title="Okuduklarınızı projenize uyarlayalım"
        description="Blog’daki konular hakkında spesifik sorularınız varsa ücretsiz ön analizde birlikte üzerinden geçelim."
      />
    </>
  )
}
