// src/lib/schemas.ts
// Schema.org JSON-LD üretici fonksiyonlar — doğrulanabilir, manuel üretilmiş yapılar.

import type { BreadcrumbItem, BlogPost, City, FAQ, Service } from '@/types'
import { CONTACT, SITE, SITE_URL, url } from '@/lib/constants'

export interface JsonLd {
  [key: string]: unknown
}

const CONTEXT = 'https://schema.org'

/** undefined alanları temizler (JSON-LD geçerliliği için) */
function clean<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(clean).filter((item) => item !== undefined && item !== null) as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      const cleaned = clean(val)
      if (cleaned !== undefined && cleaned !== null && cleaned !== '') out[key] = cleaned
    }
    return out as T
  }
  return value
}

/** Organizasyon şeması — ana sayfada ve tüm Service şemalarında provider olarak kullanılır */
export function organizationSchema(): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE.logoUrl,
      width: 512,
      height: 512,
    },
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    slogan: SITE.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.locality,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      telephone: CONTACT.phone || undefined,
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: ['Turkish', 'English'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    knowsAbout: [
      'kurumsal web sitesi',
      'özel yazılım geliştirme',
      'SaaS platformu',
      'teknik SEO',
      'lokal SEO',
      'dijital dönüşüm',
      'CRM sistemleri',
      'yapay zekâ çözümleri',
    ],
    sameAs: [
      'https://www.linkedin.com/company/tardigrad-software',
      'https://twitter.com/tardigradsw',
      'https://github.com/tardigradsoftware',
    ],
  })
}

/** WebSite şeması — site geneli (SearchAction dahil) */
export function websiteSchema(): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'tr-TR',
    publisher: { '@id': `${SITE_URL}/#organization` },
  })
}

/** Hizmet sayfası şeması (Service / ProfessionalService) */
export function serviceSchema(
  service: Service,
  pageUrl: string,
  options?: { city?: City; name?: string; description?: string },
): JsonLd {
  const title = options?.name ?? service.title
  return clean({
    '@context': CONTEXT,
    '@type': service.schemaType,
    '@id': `${SITE_URL}${pageUrl}#service`,
    name: title,
    description: options?.description ?? service.description,
    serviceType: service.primaryKeyword,
    url: `${SITE_URL}${pageUrl}`,
    image: `${SITE_URL}/images/services/${service.image.filename}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: options?.city
      ? {
          '@type': 'City',
          name: options.city.name,
          containedInPlace: { '@type': 'Country', name: 'Turkey' },
        }
      : { '@type': 'Country', name: 'Turkey' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: service.targetAudience.slice(0, 5).join(', '),
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}${pageUrl}`,
      servicePhone: CONTACT.phone || undefined,
      availableLanguage: ['Turkish'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${title} kapsamı`,
      itemListElement: service.scope.slice(0, 8).map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  })
}

/** FAQPage şeması */
export function faqSchema(items: FAQ[]): JsonLd | null {
  if (!items.length) return null
  return clean({
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  })
}

/** BreadcrumbList şeması */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: url(item.url),
    })),
  })
}

/** LocalBusiness şeması — iletişim ve şehir sayfaları */
export function localBusinessSchema(city?: City): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'LocalBusiness',
    '@id': city ? `${SITE_URL}/sehir/${city.slug}/#localbusiness` : `${SITE_URL}/iletisim/#localbusiness`,
    name: city ? `${SITE.name} ${city.name}` : SITE.name,
    image: SITE.logoUrl,
    url: SITE_URL,
    telephone: CONTACT.phone || undefined,
    email: CONTACT.email,
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: city ? city.name : CONTACT.address.locality,
      addressRegion: city ? city.region : CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city?.geo?.lat ?? CONTACT.geo.lat,
      longitude: city?.geo?.lng ?? CONTACT.geo.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:30',
    },
    areaServed: city
      ? [{ '@type': 'City', name: city.name }, ...(city.districts.slice(0, 6).map((d) => ({ '@type': 'AdministrativeArea', name: d })))]
      : { '@type': 'Country', name: 'Turkey' },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    sameAs: ['https://www.linkedin.com/company/tardigrad-software', 'https://twitter.com/tardigradsw'],
  })
}

/** Article şeması — blog yazıları */
export function articleSchema(post: BlogPost): JsonLd {
  const pageUrl = `/blog/${post.slug}/`
  return clean({
    '@context': CONTEXT,
    '@type': 'Article',
    '@id': `${SITE_URL}${pageUrl}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}/images/blog/${post.image.filename}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: 'tr-TR',
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${pageUrl}` },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    mentions: post.relatedServices.map((slug) => ({
      '@type': 'Service',
      name: slug,
      url: url(`/hizmetler/${slug}/`),
    })),
  })
}

/** Blog sayfası listesi (Blog + BlogPosting) */
export function blogSchema(posts: BlogPost[]): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog/#blog`,
    name: `${SITE.name} Blog`,
    description: 'Web, yazılım, SEO ve dijital dönüşüm üzerine rehber içerikler.',
    url: url('/blog/'),
    inLanguage: 'tr-TR',
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: url(`/blog/${post.slug}/`),
      datePublished: post.publishedAt,
    })),
  })
}

/** ItemList — hizmet listesi sayfaları */
export function itemListSchema(
  items: { name: string; path: string }[],
  listName: string,
  pageUrl: string,
): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'ItemList',
    '@id': `${SITE_URL}${pageUrl}#itemlist`,
    name: listName,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: url(item.path),
    })),
  })
}

/** WebPage şeması — her sayfada temel olarak kullanılır */
export function webPageSchema(options: {
  name: string
  description: string
  pageUrl: string
  breadcrumb?: BreadcrumbItem[]
}): JsonLd {
  return clean({
    '@context': CONTEXT,
    '@type': 'WebPage',
    '@id': `${SITE_URL}${options.pageUrl}#webpage`,
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.pageUrl}`,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    breadcrumb: options.breadcrumb
      ? {
          '@type': 'BreadcrumbList',
          itemListElement: options.breadcrumb.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: url(item.url),
          })),
        }
      : undefined,
  })
}
