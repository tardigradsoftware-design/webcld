// src/lib/photos.ts
/**
 * Site genelinde kullanılan profesyonel hizmet görseli envanteri.
 * Her görsel, sektörümüze (yazılım / dijital ürün geliştirme) özel
 * üretilmiş kurumsal seriden oluşur: insansız, yazısız, marka paletinde.
 */
import type { BlogPost, Service, ServiceCategory } from '@/types'

export type PhotoKey =
  | 'web'
  | 'eticaret'
  | 'yazilim'
  | 'saas'
  | 'seo'
  | 'otomasyon'
  | 'altyapi'
  | 'ai'

export interface PhotoAsset {
  src: string
  alt: string
}

export const PHOTOS: Record<PhotoKey, PhotoAsset> = {
  web: {
    src: '/images/photos/web.jpg',
    alt: 'Web tasarımı ve arayüz geliştirme: izometrik tarayıcı pencereleri ve wireframe yerleşimler',
  },
  eticaret: {
    src: '/images/photos/eticaret.jpg',
    alt: 'E-ticaret çözümleri: ürün kartları, sepet ve ödeme akışları, kargo bandı',
  },
  yazilim: {
    src: '/images/photos/yazilim.jpg',
    alt: 'Özel yazılım geliştirme: kod editörü, sürüm dalları ve modül katmanları',
  },
  saas: {
    src: '/images/photos/saas.jpg',
    alt: 'SaaS platformları: abonelik katmanları, gösterge panelleri ve kullanım grafikleri',
  },
  seo: {
    src: '/images/photos/seo.jpg',
    alt: 'SEO ve büyüme: yükselen grafik, analiz merceği ve arama sonucu katmanları',
  },
  otomasyon: {
    src: '/images/photos/otomasyon.jpg',
    alt: 'Dijital otomasyon: iş akışı düğümleri, dişliler ve robotik kol ile üretim bandı',
  },
  altyapi: {
    src: '/images/photos/altyapi.jpg',
    alt: 'Bulut altyapı ve güvenlik: sunucu kabinleri, bulut bağlantısı ve güvenlik kalkanı',
  },
  ai: {
    src: '/images/photos/ai.jpg',
    alt: 'Yapay zekâ çözümleri: sinir ağı çekirdeği ve veri akışı halkaları',
  },
}

/** Hizmet kategorisi → görsel */
export const CATEGORY_PHOTO: Record<ServiceCategory, PhotoKey> = {
  web: 'web',
  yazilim: 'yazilim',
  saas: 'saas',
  seo: 'seo',
  otomasyon: 'otomasyon',
  altyapi: 'altyapi',
  ai: 'ai',
}

/** Slug bazında özel görsel eşlemeleri */
export const SERVICE_PHOTO_OVERRIDE: Partial<Record<string, PhotoKey>> = {
  'e-ticaret-sitesi': 'eticaret',
  'urun-tanitim-sitesi': 'eticaret',
  'stok-yonetimi': 'eticaret',
  'urun-tedarikci-yonetimi': 'eticaret',
  'odeme-whatsapp-crm-entegrasyonu': 'eticaret',
  'api-entegrasyonu': 'yazilim',
}

/** Blog kategorisi → görsel */
export const BLOG_CATEGORY_PHOTO: Record<string, PhotoKey> = {
  'Web Siteleri': 'web',
  'E-Ticaret': 'eticaret',
  SEO: 'seo',
  'Yazılım': 'yazilim',
  SaaS: 'saas',
  'Altyapı': 'altyapi',
  'Yapay Zekâ': 'ai',
  'Dijital Dönüşüm': 'otomasyon',
}

export function servicePhoto(service: Service): PhotoAsset {
  const key = SERVICE_PHOTO_OVERRIDE[service.slug] ?? CATEGORY_PHOTO[service.category]
  return PHOTOS[key]
}

export function blogPhoto(post: BlogPost): PhotoAsset {
  const key = BLOG_CATEGORY_PHOTO[post.category] ?? 'yazilim'
  return PHOTOS[key]
}
