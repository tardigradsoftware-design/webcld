// src/types/index.ts
// Tüm proje genelinde kullanılan tip tanımlamaları

/** Hizmet kategorileri */
export type ServiceCategory =
  | 'web' // Web siteleri
  | 'yazilim' // Özel yazılım / paneller
  | 'saas' // SaaS / abonelik
  | 'seo' // SEO hizmetleri
  | 'otomasyon' // Dijital otomasyon
  | 'altyapi' // Hosting / DNS / DevOps
  | 'ai' // AI / chatbot / içerik

export interface FAQ {
  question: string
  answer: string
}

export interface ServiceImage {
  /** Örn: kurumsal-web-sitesi-tardigrad-software.webp */
  filename: string
  /** Örn: Kurumsal Web Sitesi Hizmeti – Tardigrad Software */
  alt: string
  width: number
  height: number
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  /** Lucide icon adı */
  icon: string
}

export interface Benefit {
  title: string
  description: string
  /** Örn: "%40 daha hızlı" */
  metric?: string
  icon: string
}

export interface Service {
  id: number
  slug: string
  title: string
  shortTitle: string
  category: ServiceCategory
  primaryKeyword: string
  secondaryKeywords: string[]
  /** Max 60 karakter */
  metaTitle: string
  /** Max 155 karakter */
  metaDescription: string
  h1: string
  /** 1-2 cümlelik özet (kart, hero ve arama sonuçları için) */
  summary: string
  heroTagline: string
  /** 100-160 kelime tanım */
  description: string
  /** 3-5 madde */
  whyNeeded: WhyNeededItem[]
  /** 6-10 madde hizmet kapsamı */
  scope: string[]
  /** 5-9 adım */
  process: ProcessStep[]
  benefits: Benefit[]
  /** Sektörler */
  targetAudience: string[]
  /** 5-8 soru */
  faq: FAQ[]
  image: ServiceImage
  /** Slug listesi, 4-8 adet */
  relatedServices: string[]
  /** Şehir slug listesi, 2-4 adet */
  relatedCities: string[]
  schemaType: 'Service' | 'ProfessionalService'
  /** Lucide icon adı — kartlarda ve filmde kullanılır */
  icon: string
  /** Hizmet + şehir kombinasyonu üretilecek mi? (lokal SEO önceliği) */
  localPriority?: boolean
  /** Unsplash / görsel üretim arama terimi */
  imageQuery: string
}

export interface WhyNeededItem {
  title: string
  description: string
  icon: string
}

export interface City {
  /** istanbul, ankara */
  slug: string
  name: string
  /** Marmara, İç Anadolu */
  region: string
  population: number
  /** 1=metropol, 2=büyükşehir, 3=diğer */
  priorityLevel: 1 | 2 | 3
  /** SEO metni için */
  description: string
  /** İlçeler (SEO için) */
  districts: string[]
  /** Şehre özgü güçlü sektörler */
  industries: string[]
  /** Şehir merkezi koordinatları (LocalBusiness / Geo şeması) */
  geo?: { lat: number; lng: number }
  /** Şehir sayfasında öne çıkan hizmet slug'ları */
  featuredServices?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  /** MDX veya düz string (bölüm başlıkları "## " ile) */
  content: string
  /** ISO 8601 */
  publishedAt: string
  updatedAt: string
  author: string
  category: string
  tags: string[]
  image: {
    filename: string
    alt: string
  }
  relatedServices: string[]
  relatedCities: string[]
  readingTime: number
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  city?: string
  message: string
  kvkkAccepted: boolean
  /** Spam tuzağı — boş kalmalı */
  honeypot?: string
  /** reCAPTCHA v3 token */
  recaptchaToken?: string
}

export interface ContactSubmission extends ContactFormData {
  id: string
  sourceUrl: string
  ipAddress: string
  createdAt: string
}

// ---------- Schema tipleri ----------
export interface ServiceSchemaProps {
  service: Service
  url: string
  cityName?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQSchemaProps {
  items: FAQ[]
}

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

// ---------- Navigasyon ----------
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface ServiceCategoryMeta {
  key: ServiceCategory
  label: string
  shortLabel: string
  emoji: string
  icon: string
  description: string
  /** Ana sayfadaki büyük blok sırası */
  order: number
}

export interface TransformationStage {
  id: string
  index: number
  title: string
  subtitle: string
  description: string
  icon: string
  /** Bölüm arka planı (lacivert tonları) */
  tone: string
}
