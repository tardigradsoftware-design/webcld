// src/lib/seo.ts
// Metadata üreticileri — her sayfa tipine özgü, tekrar eden boilerplate'i ortadan kaldırır.

import type { Metadata } from 'next'
import { SITE, SITE_URL, url } from '@/lib/constants'
import { truncate } from '@/lib/utils'

interface BaseMeta {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

/** Sayfa tipi ne olursa olsun tutarlı metadata üretir */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image,
  imageAlt,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: BaseMeta): Metadata {
  const canonical = url(path)
  const safeTitle = truncate(title, 60)
  const safeDescription = truncate(description, 155)
  const ogImage = image ?? `/images/og/default-og.webp`

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: keywords?.length ? keywords.join(', ') : undefined,
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    applicationName: SITE.name,
    category: 'technology',
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${SITE.name} — ${safeTitle}`,
        },
      ],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDescription,
      images: [ogImage],
    },
    formatDetection: { telephone: true, address: true, email: true },
  }
}

/** Marka eki tek kez ve toplam uzunluk ≤60 olacak şekilde başlık üretir. */
const BRAND_SUFFIX = ` | ${SITE.name}`

function brandedTitle(title: string): string {
  const base = title
    .replace(/\s*[|–—-]\s*Tardigrad Software\s*$/i, '')
    .trim()
  const maxBase = 60 - BRAND_SUFFIX.length
  const safe = base.length > maxBase ? truncate(base, maxBase) : base
  return `${safe}${BRAND_SUFFIX}`
}

/** Hizmet sayfası metadata'sı */
export function serviceMetadata(options: {
  metaTitle: string
  metaDescription: string
  slug: string
  primaryKeyword: string
  secondaryKeywords: string[]
  imageAlt: string
}): Metadata {
  const path = `/hizmetler/${options.slug}/`
  return buildMetadata({
    title: brandedTitle(options.metaTitle),
    description: options.metaDescription,
    path,
    keywords: [options.primaryKeyword, ...options.secondaryKeywords],
    image: `/images/og/${options.slug}-og.webp`,
    imageAlt: options.imageAlt,
  })
}

/** Şehir sayfası metadata'sı */
export function cityMetadata(options: {
  cityName: string
  region: string
  slug: string
  description: string
}): Metadata {
  const title = `${options.cityName} Web Sitesi ve Yazılım Hizmetleri`
  return buildMetadata({
    title: brandedTitle(title),
    description: options.description,
    path: `/sehir/${options.slug}/`,
    keywords: [
      `${options.cityName.toLocaleLowerCase('tr-TR')} web sitesi`,
      `${options.cityName.toLocaleLowerCase('tr-TR')} yazılım`,
      `${options.cityName.toLocaleLowerCase('tr-TR')} web tasarım`,
      `${options.cityName.toLocaleLowerCase('tr-TR')} seo`,
    ],
    image: `/images/og/sehir-${options.slug}-og.webp`,
    imageAlt: `${options.cityName} web sitesi ve yazılım hizmetleri – ${SITE.name}`,
  })
}

/** Hizmet + şehir kombine sayfa metadata'sı */
export function localServiceMetadata(options: {
  serviceTitle: string
  cityName: string
  serviceSlug: string
  citySlug: string
  description: string
}): Metadata {
  const title = `${options.serviceTitle} ${options.cityName}`
  return buildMetadata({
    title: brandedTitle(title),
    description: options.description,
    path: `/hizmet/${options.serviceSlug}/${options.citySlug}/`,
    keywords: [
      `${options.cityName.toLocaleLowerCase('tr-TR')} ${options.serviceTitle.toLocaleLowerCase('tr-TR')}`,
      `${options.serviceTitle.toLocaleLowerCase('tr-TR')} hizmeti`,
      `${options.cityName.toLocaleLowerCase('tr-TR')} yazılım`,
    ],
    image: `/images/og/${options.serviceSlug}-${options.citySlug}-og.webp`,
    imageAlt: `${options.cityName} ${options.serviceTitle} hizmeti – ${SITE.name}`,
  })
}

/** Blog yazısı metadata'sı */
export function blogMetadata(options: {
  metaTitle: string
  metaDescription: string
  slug: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  imageAlt: string
}): Metadata {
  return buildMetadata({
    title: brandedTitle(options.metaTitle),
    description: options.metaDescription,
    path: `/blog/${options.slug}/`,
    keywords: options.tags,
    image: `/images/og/blog-${options.slug}-og.webp`,
    imageAlt: options.imageAlt,
    type: 'article',
    publishedTime: options.publishedAt,
    modifiedTime: options.updatedAt,
  })
}

/** Statik sayfalar için metadata */
export function staticMetadata(options: {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}): Metadata {
  return buildMetadata({
    title: brandedTitle(options.title),
    description: options.description,
    path: options.path,
    keywords: options.keywords,
    image: `/images/og/${options.path.replace(/\//g, '-') || 'ana-sayfa'}-og.webp`,
    noIndex: options.noIndex,
  })
}

export { SITE_URL }
