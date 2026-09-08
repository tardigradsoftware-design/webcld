// src/app/blog/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, MapPin, PenLine, Tag } from 'lucide-react'

import { CONTACT, SITE } from '@/lib/constants'
import { blogSlugs, getPostBySlug, getRecentPosts } from '@/lib/blog-posts'
import { getServiceBySlug } from '@/lib/services'
import { getCityBySlug } from '@/lib/cities'
import { blogMetadata } from '@/lib/seo'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schemas'
import { formatDate } from '@/lib/utils'
import { JsonLd } from '@/components/seo/JsonLd'
import { MarkdownContent, type AutoLink } from '@/components/blog/MarkdownContent'
import { BlogCard } from '@/components/sections/BlogCard'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { ContactSection } from '@/components/sections/ContactSection'
import { LucideIcon } from '@/components/common/LucideIcon'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Yazı bulunamadı' }
  return blogMetadata({
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    slug: post.slug,
    tags: post.tags,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    imageAlt: post.image.alt,
  })
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedServices = post.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
  const relatedCities = post.relatedCities
    .map((slug) => getCityBySlug(slug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city))
  const otherPosts = getRecentPosts(blogSlugs.length + 3)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)

  const pageUrl = `/blog/${post.slug}/`
  const breadcrumbs = [
    { name: 'Blog', url: '/blog/' },
    { name: post.category, url: `/blog/?kategori=${encodeURIComponent(post.category)}` },
    { name: post.title, url: pageUrl },
  ]

  // İçerikte otomatik linklenecek hizmet/şehir adları (SEO iç link ağı)
  const autoLinks: AutoLink[] = [
    ...relatedServices.map((service) => ({
      text: service.title,
      href: `/hizmetler/${service.slug}/`,
    })),
    ...relatedServices.map((service) => ({
      text: service.shortTitle,
      href: `/hizmetler/${service.slug}/`,
    })),
    ...relatedCities.map((city) => ({ text: city.name, href: `/sehir/${city.slug}/` })),
  ]

  const wordCount = post.content.split(/\s+/).length

  return (
    <>
      <JsonLd
        id="ld-post"
        data={[
          articleSchema(post),
          breadcrumbSchema([{ name: 'Ana Sayfa', url: '/' }, ...breadcrumbs]),
        ]}
      />

      {/* Yazı başlığı */}
      <header className="relative isolate overflow-hidden bg-brand-navy-950 pt-28 pb-12 text-white lg:pt-32 lg:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#08112B_0%,#0F1B3D_55%,#0B1730_100%)]" />
          <div className="absolute inset-0 bg-grid-navy opacity-40" />
          <div className="absolute -top-28 left-1/4 h-80 w-80 rounded-full bg-blue-600/22 blur-[120px]" />
          <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-cyan-500/16 blur-[110px]" />
        </div>

        <div className="container relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/55">
            <Link href="/" className="transition hover:text-white">
              Ana Sayfa
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog/" className="transition hover:text-white">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/blog/?kategori=${encodeURIComponent(post.category)}`} className="transition hover:text-white">
              {post.category}
            </Link>
          </nav>

          <h1 className="mt-6 max-w-4xl text-[clamp(1.75rem,3.8vw,2.75rem)] font-extrabold leading-[1.18] tracking-tight">
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-[16.5px] leading-relaxed text-white/70">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <PenLine className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
              {post.readingTime} dk okuma · {wordCount.toLocaleString('tr-TR')} kelime
            </span>
            {post.updatedAt !== post.publishedAt ? (
              <span className="inline-flex items-center gap-1.5">
                Güncellendi: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
            ) : null}
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[12px] font-medium text-white/75"
              >
                <Tag className="h-3 w-3 text-cyan-300" aria-hidden />
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Yazı gövdesi */}
      <div className="section-light py-12 lg:py-16">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <article className="min-w-0">
            <MarkdownContent content={post.content} autoLinks={autoLinks} idPrefix={post.slug.slice(0, 12)} />

            {/* Yazı sonu etiketleri */}
            <footer className="mt-12 border-t border-brand-navy-100 pt-7">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                Etiketler
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-brand-navy-50 px-3 py-1.5 text-[12.5px] font-medium text-brand-navy-600"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13.5px] leading-relaxed text-brand-ink-soft/70">
                Bu yazı {SITE.name} editör ekibi tarafından hazırlanmış, son güncelleme{' '}
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time> tarihinde
                yapılmıştır. İçerik genel bilgilendirme amaçlıdır; projenize özel kapsam için
                ücretsiz ön analiz talep edebilirsiniz.
              </p>
            </footer>
          </article>

          {/* Yan sütun */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                İlgili hizmetler
              </h2>
              <ul className="mt-3.5 space-y-2.5">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/hizmetler/${service.slug}/`}
                      className="group flex items-center gap-3 text-[14px] text-brand-ink-soft transition-colors hover:text-brand-navy-900"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-navy-600 shadow-sm transition-colors group-hover:bg-brand-navy-900 group-hover:text-white">
                        <LucideIcon name={service.icon} fallback="Sparkles" className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="flex-1">{service.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-brand-navy-300" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {relatedCities.length ? (
              <div className="rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                  İlgili şehirler
                </h2>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {relatedCities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/sehir/${city.slug}/`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy-200 bg-white px-3 py-1.5 text-[12.5px] text-brand-ink-soft transition hover:border-brand-cyan hover:text-brand-navy-900"
                      >
                        <MapPin className="h-3 w-3 text-brand-cyan" aria-hidden />
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl bg-brand-navy-900 p-6 text-white shadow-card">
              <h2 className="text-base font-semibold">Projenizi konuşalım</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Yazıda anlatılanları kendi işletmenize nasıl uyarlayacağınızı 20 dakikada birlikte
                netleştirelim. {CONTACT.responseTime}.
              </p>
              <Link
                href="#iletisim-formu"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-brand-navy-950 transition hover:brightness-110"
              >
                Ücretsiz Ön Analiz
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Diğer yazılar */}
      {otherPosts.length ? (
        <section className="section-soft py-14 lg:py-20" aria-labelledby="diger-yazilar">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Okumaya devam edin" id="diger-yazilar" title="İlgili yazılar" />
              <Link
                href="/blog/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                Tüm yazılar
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {otherPosts.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Yazıya özel SSS (FAQPage şeması ile desteklenir) */}
      <section className="section-light py-14 lg:py-16" aria-labelledby="yazi-sss">
        <div className="container max-w-3xl">
          <SectionHeading
            eyebrow="Özet"
            id="yazi-sss"
            title="Kısa yanıtlar"
            description="Bu yazının kapsamıyla ilgili en sık sorulan üç soru."
            align="center"
          />
          <JsonLd id="ld-post-faq" data={faqSchema(postFaq(post.title, post.category, post.readingTime))} />
          <dl className="mt-8 space-y-4">
            {postFaq(post.title, post.category, post.readingTime).map((item) => (
              <div key={item.question} className="rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
                <dt className="text-[15px] font-semibold text-brand-ink">{item.question}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-brand-ink-soft/80">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactSection
        title="Bu konuda desteğe mi ihtiyacınız var?"
        description={`${post.category} alanında somut bir adım atmak istiyorsanız ücretsiz ön analizle başlayalım.`}
      />
    </>
  )
}

/** Yazıya özgü kısa SSS */
function postFaq(title: string, category: string, readingTime: number) {
  return [
    {
      question: 'Bu yazı kimler için hazırlandı?',
      answer: `${category} konusunda karar aşamasındaki işletme sahipleri, yöneticiler ve dijital dönüşüm sorumluları için hazırlandı. "${title}" yazısı teknik jargon yerine karar kriterlerine odaklanır ve yaklaşık ${readingTime} dakikada okunur.`,
    },
    {
      question: 'Yazıdaki önerileri kendimiz uygulayabilir miyiz?',
      answer: 'Kısmen evet. Kontrol listeleri ve kriterler kendi ekibinizle uygulayabileceğiniz şekilde yazıldı. Ancak teknik kurulum, entegrasyon, güvenlik ve ölçümleme tarafı uzmanlık gerektirir; bu noktada ücretsiz ön analizle mevcut durumunuzu birlikte değerlendirebiliriz.',
    },
    {
      question: 'İçerikler ne sıklıkla güncelleniyor?',
      answer: 'Blog içeriklerini ayda en az bir kez gözden geçiriyor; teknoloji, algoritma veya mevzuat değişikliği olduğunda ilgili yazıyı güncelleyip "güncellendi" tarihini belirtiyoruz.',
    },
  ]
}
