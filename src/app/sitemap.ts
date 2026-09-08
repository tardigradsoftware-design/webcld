// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/constants'
import { getLocalServiceCombos, serviceSlugs, services } from '@/lib/services'
import { citySlugs, featuredCitySlugs } from '@/lib/cities'
import { blogPosts } from '@/lib/blog-posts'

type SitemapEntry = MetadataRoute.Sitemap[number]

const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/** Öncelik ve tarama sıklığı profilleri */
const PROFILE = {
  home: { changeFrequency: 'weekly', priority: 1 },
  core: { changeFrequency: 'monthly', priority: 0.9 },
  service: { changeFrequency: 'monthly', priority: 0.9 },
  city: { changeFrequency: 'monthly', priority: 0.8 },
  localCombo: { changeFrequency: 'monthly', priority: 0.7 },
  otherCity: { changeFrequency: 'yearly', priority: 0.5 },
  blog: { changeFrequency: 'monthly', priority: 0.7 },
  legal: { changeFrequency: 'yearly', priority: 0.3 },
} as const

const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = []

  // 1) Ana sayfa
  entries.push({ url: abs('/'), lastModified: NOW, ...PROFILE.home })

  // 2) Kurumsal çekirdek sayfalar
  const corePages = [
    { path: '/hizmetler/', ...PROFILE.core },
    { path: '/sehir/', ...PROFILE.core },
    { path: '/surec/', ...PROFILE.core },
    { path: '/hakkimizda/', ...PROFILE.core },
    { path: '/iletisim/', ...PROFILE.core },
    { path: '/blog/', ...PROFILE.core },
  ]
  for (const page of corePages) {
    entries.push({ url: abs(page.path), lastModified: NOW, ...page })
  }

  // 3) 43 hizmet sayfası
  for (const service of services) {
    entries.push({
      url: abs(`/hizmetler/${service.slug}/`),
      lastModified: NOW,
      ...PROFILE.service,
    })
  }

  // 4) 60 hizmet + şehir kombinasyonu (en yüksek lokal değer)
  for (const { service, citySlug } of getLocalServiceCombos(featuredCitySlugs)) {
    entries.push({
      url: abs(`/hizmet/${service.slug}/${citySlug}/`),
      lastModified: NOW,
      ...PROFILE.localCombo,
    })
  }

  // 5) 81 şehir sayfası
  for (const citySlug of citySlugs) {
    const featured = featuredCitySlugs.includes(citySlug)
    entries.push({
      url: abs(`/sehir/${citySlug}/`),
      lastModified: NOW,
      ...(featured ? PROFILE.city : PROFILE.otherCity),
    })
  }

  // 6) Blog yazıları
  for (const post of blogPosts) {
    entries.push({
      url: abs(`/blog/${post.slug}/`),
      lastModified: new Date(post.updatedAt || post.publishedAt),
      ...PROFILE.blog,
    })
  }

  // 7) Yasal sayfa
  entries.push({ url: abs('/kvkk/'), lastModified: NOW, ...PROFILE.legal })

  // Benzersizlik kontrolü (aynı URL iki kez girerse Google uyarı verir)
  const seen = new Set<string>()
  const unique = entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })

  return unique
}

/** Sitemap boyutunu build sırasında raporlamak için yardımcı */
export const sitemapStats = () => ({
  services: serviceSlugs.length,
  cities: citySlugs.length,
  posts: blogPosts.length,
})
