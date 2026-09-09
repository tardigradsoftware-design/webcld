// src/app/robots.ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * robots.txt — Next.js Metadata API ile üretilir.
 * Not: Google'ın sitemap "ping" uç noktası kapatıldığı için sitemap burada bildirilir
 * ve Search Console üzerinden doğrulanır.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/cgi-bin/', '/tmp/'],
      },
      // Bütçe tüketen parametreli listelemeleri tara, sayfaları tarama
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
