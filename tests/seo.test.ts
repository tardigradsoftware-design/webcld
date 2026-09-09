import { describe, expect, it } from 'vitest'
import { buildMetadata } from '../src/lib/seo'
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '../src/lib/schemas'

describe('SEO & Schema Generators', () => {
  it('generates valid OpenGraph and canonical metadata', () => {
    const meta = buildMetadata({
      title: 'Kurumsal Web Sitesi | Tardigrad Software',
      description: 'Hızlı, mobil uyumlu ve SEO odaklı kurumsal web sitesi geliştirme hizmetleri.',
      path: '/hizmetler/kurumsal-web-sitesi/',
    })

    expect(meta.title).toBe('Kurumsal Web Sitesi | Tardigrad Software')
    expect(meta.description?.toLowerCase()).toContain('kurumsal web sitesi')
    expect(meta.alternates?.canonical).toBe('https://tardigradsoftware.com/hizmetler/kurumsal-web-sitesi/')
  })

  it('generates valid JSON-LD schemas', () => {
    const breadcrumb = breadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hizmetler', url: '/hizmetler/' },
    ]) as Record<string, unknown>
    expect(breadcrumb['@type']).toBe('BreadcrumbList')
    expect(Array.isArray(breadcrumb.itemListElement) ? breadcrumb.itemListElement.length : 0).toBe(2)

    const faq = faqSchema([
      { question: 'Süre ne kadar?', answer: 'Ortalama 2-4 hafta sürer.' },
    ]) as Record<string, unknown> | null
    expect(faq?.['@type']).toBe('FAQPage')
    expect(Array.isArray(faq?.mainEntity) ? (faq.mainEntity as unknown[]).length : 0).toBe(1)

    const localBiz = localBusinessSchema()
    expect(localBiz['@type']).toBe('LocalBusiness')
    expect(localBiz.name).toBe('Tardigrad Software')
  })
})
