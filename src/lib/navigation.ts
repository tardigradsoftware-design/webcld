// src/lib/navigation.ts
// Header / footer için sayısal verilerle zenginleştirilmiş navigasyon yardımcıları.

import { SERVICE_CATEGORIES } from '@/lib/constants'
import { getCategoryCounts } from '@/lib/services'
import { featuredCities } from '@/lib/cities'
import type { ServiceCategoryMeta } from '@/types'

export interface CategoryWithCount extends ServiceCategoryMeta {
  count: number
}

const counts = getCategoryCounts()

/** Her kategori ve içindeki hizmet sayısı */
export const categoriesWithCounts: CategoryWithCount[] = SERVICE_CATEGORIES.map((category) => ({
  ...category,
  count: counts[category.key] ?? 0,
}))

/** Footer'da gösterilecek kurumsal linkler */
export const FOOTER_CORPORATE_LINKS = [
  { label: 'Hakkımızda', href: '/hakkimizda/' },
  { label: 'Proje Sürecimiz', href: '/surec/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'İletişim', href: '/iletisim/' },
  { label: 'KVKK Aydınlatma Metni', href: '/kvkk/' },
]

/** Footer'da gösterilecek öne çıkan hizmetler */
export const FOOTER_FEATURED_SERVICES = [
  { label: 'Kurumsal Web Sitesi', href: '/hizmetler/kurumsal-web-sitesi/' },
  { label: 'E-Ticaret Sitesi', href: '/hizmetler/e-ticaret-sitesi/' },
  { label: 'CRM Sistemi', href: '/hizmetler/crm/' },
  { label: 'Yönetim Paneli', href: '/hizmetler/yonetim-paneli/' },
  { label: 'Teknik SEO', href: '/hizmetler/teknik-seo/' },
  { label: 'Lokal SEO', href: '/hizmetler/lokal-seo/' },
  { label: 'SaaS Platformu', href: '/hizmetler/saas-platformu/' },
  { label: 'AI Chatbot', href: '/hizmetler/ai-chatbot/' },
  { label: 'Dijital Dönüşüm', href: '/hizmetler/dijital-donusum/' },
]

/** Footer şehir linkleri */
export const FOOTER_CITY_LINKS = featuredCities.map((city) => ({
  label: city.name,
  href: `/sehir/${city.slug}/`,
}))
