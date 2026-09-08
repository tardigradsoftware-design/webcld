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
  | 'kurumsal-web'
  | 'crm'
  | 'panel'
  | 'stok'
  | 'belge'
  | 'is-takip'
  | 'chatbot'
  | 'abonelik'
  | 'api'
  | 'mvp'

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
  'kurumsal-web': {
    src: '/images/photos/kurumsal-web.jpg',
    alt: 'Kurumsal web sitesi: tarayıcı içinde soyut ana sayfa yerleşimi ve güven rozetleri',
  },
  crm: {
    src: '/images/photos/crm.jpg',
    alt: 'CRM ve satış hunisi: müşteri kartları, iletişim kanalları ve dönüşüm akışı',
  },
  panel: {
    src: '/images/photos/panel.jpg',
    alt: 'Yönetim paneli: rol ve yetki kartları, ayar dişlileri, anahtar ve kalkan ikonları',
  },
  stok: {
    src: '/images/photos/stok.jpg',
    alt: 'Stok yönetimi: depo rafları, barkod tarama ışını ve koli bandı',
  },
  belge: {
    src: '/images/photos/belge.jpg',
    alt: 'Form, teklif ve rezervasyon sistemleri: belge yığını, onay damgası, takvim ve fiyat etiketi',
  },
  'is-takip': {
    src: '/images/photos/is-takip.jpg',
    alt: 'İş takip sistemi: kanban panosu, ilerleme halkası ve süre ölçer',
  },
  chatbot: {
    src: '/images/photos/chatbot.jpg',
    alt: 'Yapay zekâ sohbet botu: konuşma balonları, bot çekirdeği ve içerik sayfası',
  },
  abonelik: {
    src: '/images/photos/abonelik.jpg',
    alt: 'Abonelik tabanlı yazılım: plan katmanları, tekrarlayan ödeme halkası ve kart',
  },
  api: {
    src: '/images/photos/api.jpg',
    alt: 'API entegrasyonları: merkez hub ve ödeme, sohbet, kargo, rapor, e-posta modülleri',
  },
  mvp: {
    src: '/images/photos/mvp.jpg',
    alt: 'MVP ve startup ürünü: modül bloklarından kalkan roket ve büyüme grafiği',
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
/** 43 hizmetin her biri için birebir görsel eşlemesi */
export const SERVICE_PHOTO_OVERRIDE: Partial<Record<string, PhotoKey>> = {
  'kurumsal-web-sitesi': 'kurumsal-web',
  'firma-web-sitesi': 'kurumsal-web',
  'landing-page': 'web',
  'portfoy-sitesi': 'web',
  'web-sitesi-yenileme': 'web',
  'e-ticaret-sitesi': 'eticaret',
  'urun-tanitim-sitesi': 'eticaret',
  'rezervasyon-basvuru-sistemi': 'belge',
  'crm': 'crm',
  'musteri-yonetim-sistemi': 'crm',
  'teklif-hazirlama-sistemi': 'belge',
  'proforma-siparis-yonetimi': 'belge',
  'form-basvuru-sistemi': 'belge',
  'stok-yonetimi': 'stok',
  'urun-tedarikci-yonetimi': 'stok',
  'personel-kullanici-yonetimi': 'panel',
  'yonetim-paneli': 'panel',
  'musteri-paneli': 'panel',
  'raporlama-sistemi': 'panel',
  'dashboard-sistemi': 'panel',
  'is-takip-sistemi': 'is-takip',
  'saas-platformu': 'saas',
  'abonelik-tabanli-yazilim': 'abonelik',
  'multi-tenant-uygulama': 'abonelik',
  'mvp-startup-urunu': 'mvp',
  'teknik-seo': 'seo',
  'lokal-seo': 'seo',
  'seo-uyumlu-sayfa-mimarisi': 'seo',
  'schema-org-structured-data': 'seo',
  'google-search-console-kurulumu': 'seo',
  'seo-danismanligi': 'seo',
  'dijital-otomasyon': 'otomasyon',
  'dijital-donusum': 'otomasyon',
  'domain-dns-yonetimi': 'altyapi',
  'hosting-yedekleme': 'altyapi',
  'cloudflare-cdn': 'altyapi',
  'vercel-deployment': 'altyapi',
  'supabase-postgresql': 'altyapi',
  'kurumsal-email': 'altyapi',
  'api-entegrasyonu': 'api',
  'odeme-whatsapp-crm-entegrasyonu': 'api',
  'ai-chatbot': 'chatbot',
  'ai-icerik-araclar': 'chatbot',
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
