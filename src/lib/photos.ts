// src/lib/photos.ts
/**
 * Site genelindeki görsel envanteri: hizmet başına render edilmiş gerçekçi ürün ekranları.
 * 43 hizmetin her biri için kendi ekranı üretilir: /images/screens/{slug}.jpg
 * Ekranlar scripts/render-ui.mjs hattıyla deterministik olarak çizilir (AI görseli değildir).
 */
import type { BlogPost, Service, ServiceCategory } from '@/types'

export interface PhotoAsset {
  src: string
  alt: string
}

/** İlgili hizmet slug'ı için üretilmiş ürün ekranını döndürür. */
export function screen(slug: string, alt: string): PhotoAsset {
  return { src: `/images/screens/${slug}.jpg`, alt }
}

/** Kategori kartlarını temsil eden ekranlar */
export const CATEGORY_SCREEN: Record<ServiceCategory, string> = {
  web: 'kurumsal-web-sitesi',
  yazilim: 'crm',
  saas: 'abonelik-tabanli-yazilim',
  seo: 'teknik-seo',
  otomasyon: 'dijital-otomasyon',
  altyapi: 'hosting-yedekleme',
  ai: 'ai-chatbot',
}

/** Blog kategorisini temsil eden ekranlar */
export const BLOG_SCREEN: Record<string, PhotoAsset> = {
  'Web Siteleri': screen('kurumsal-web-sitesi', 'Kurumsal web sitesi ön yüz ve sayfa yönetimi ekranı'),
  'E-Ticaret': screen('e-ticaret-sitesi', 'E-ticaret mağaza ön yüzü ve ürün kataloğu ekranı'),
  SEO: screen('teknik-seo', 'Teknik SEO denetimi ve performans rapor ekranı'),
  'Yazılım': screen('api-entegrasyonu', 'API entegrasyonu ve senkronizasyon log ekranı'),
  SaaS: screen('abonelik-tabanli-yazilim', 'Abonelik planları ve faturalandırma yönetim ekranı'),
  'Altyapı': screen('hosting-yedekleme', 'Hosting, yedekleme ve altyapı durum ekranı'),
  'Yapay Zekâ': screen('ai-chatbot', 'Yapay zekâ asistanı konuşma ve metrik ekranı'),
  'Dijital Dönüşüm': screen('dijital-otomasyon', 'İş süreci otomasyonu akış ekranı'),
}

export function servicePhoto(service: Service): PhotoAsset {
  return screen(service.slug, `${service.title} hizmeti: örnek ürün ekran görüntüsü`)
}

export function blogPhoto(post: BlogPost): PhotoAsset {
  return BLOG_SCREEN[post.category] ?? BLOG_SCREEN['Yazılım']
}
