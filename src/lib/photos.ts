// src/lib/photos.ts
/**
 * Site genelinde kullanılan fotoğraf envanteri ve eşlemeleri.
 * Kural: görseller insan yüzü/insan figürü ve şehir dış mekânı içermez;
 * ekranlardaki tüm yazılar okunaksızdır (bulanıklaştırılmıştır).
 */
import type { BlogPost, Service, ServiceCategory } from '@/types'

export type PhotoKey =
  | 'tasarim-masa'
  | 'kod-editor'
  | 'eticaret-ui'
  | 'seo-analiz'
  | 'robot-kol'
  | 'ai-soyut'
  | 'saas-pano'
  | 'sunucu-odasi'

export interface PhotoAsset {
  src: string
  alt: string
}

export const PHOTOS: Record<PhotoKey, PhotoAsset> = {
  'tasarim-masa': {
    src: '/images/photos/tasarim-masa.jpg',
    alt: 'Wireframe çizimleri, renk paleti kartları ve arayüz tasarımı çalışma masası',
  },
  'kod-editor': {
    src: '/images/photos/kod-editor.jpg',
    alt: 'Karanlık temalı kod editörü açık geniş monitör ve mekanik klavye',
  },
  'eticaret-ui': {
    src: '/images/photos/eticaret-ui.jpg',
    alt: 'Laptop ve telefonda çevrim içi mağaza arayüzü, yanında kargo kolisi',
  },
  'seo-analiz': {
    src: '/images/photos/seo-analiz.jpg',
    alt: 'Yükselen grafikler ve halka chartlar içeren analiz panosu ekranı',
  },
  'robot-kol': {
    src: '/images/photos/robot-kol.jpg',
    alt: 'Otomasyon hattında kaynak yapan endüstriyel robot kol',
  },
  'ai-soyut': {
    src: '/images/photos/ai-soyut.jpg',
    alt: 'Mavi ışıklı GPU hızlandırıcı kartları ve sinir ağı ışık izleri',
  },
  'saas-pano': {
    src: '/images/photos/saas-pano.jpg',
    alt: 'Kanban sütunları ve dünya haritası widgetı olan SaaS yönetim panosu',
  },
  'sunucu-odasi': {
    src: '/images/photos/sunucu-odasi.jpg',
    alt: 'Mavi durum ışıklarıyla dolu, insansız veri merkezi koridoru',
  },
}

/** Hizmet kategorisi → fotoğraf */
export const CATEGORY_PHOTO: Record<ServiceCategory, PhotoKey> = {
  web: 'tasarim-masa',
  yazilim: 'kod-editor',
  saas: 'saas-pano',
  seo: 'seo-analiz',
  otomasyon: 'robot-kol',
  altyapi: 'sunucu-odasi',
  ai: 'ai-soyut',
}

/** Slug bazında özel fotoğraf eşlemeleri */
export const SERVICE_PHOTO_OVERRIDE: Partial<Record<string, PhotoKey>> = {
  'e-ticaret-sitesi': 'eticaret-ui',
  'urun-tanitim-sitesi': 'eticaret-ui',
  'stok-yonetimi': 'eticaret-ui',
  'urun-tedarikci-yonetimi': 'eticaret-ui',
  'odeme-whatsapp-crm-entegrasyonu': 'eticaret-ui',
  'api-entegrasyonu': 'kod-editor',
}

/** Blog kategorisi → fotoğraf */
export const BLOG_CATEGORY_PHOTO: Record<string, PhotoKey> = {
  'Web Siteleri': 'tasarim-masa',
  'E-Ticaret': 'eticaret-ui',
  SEO: 'seo-analiz',
  'Yazılım': 'kod-editor',
  SaaS: 'saas-pano',
  'Altyapı': 'sunucu-odasi',
  'Yapay Zekâ': 'ai-soyut',
  'Dijital Dönüşüm': 'robot-kol',
}

export function servicePhoto(service: Service): PhotoAsset {
  const key = SERVICE_PHOTO_OVERRIDE[service.slug] ?? CATEGORY_PHOTO[service.category]
  return PHOTOS[key]
}

export function blogPhoto(post: BlogPost): PhotoAsset {
  const key = BLOG_CATEGORY_PHOTO[post.category] ?? 'kod-editor'
  return PHOTOS[key]
}
