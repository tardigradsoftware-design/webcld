import { describe, expect, it } from 'vitest'
import { services, getServiceBySlug, localPriorityServices } from '../src/lib/services'
import { cities, featuredCities } from '../src/lib/cities'
import { SERVICE_CATEGORIES } from '../src/lib/constants'

describe('Service & City Data Integrity', () => {
  it('contains exactly 43 unique services', () => {
    expect(services.length).toBe(43)
    const slugs = services.map((s) => s.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(43)
  })

  it('contains valid service category assignments', () => {
    const validCategoryKeys = new Set(SERVICE_CATEGORIES.map((c) => c.key))
    services.forEach((s) => {
      expect(validCategoryKeys.has(s.category)).toBe(true)
      expect(s.title.length).toBeGreaterThan(0)
      expect(s.description.length).toBeGreaterThan(20)
    })
  })

  it('contains exactly 81 provinces', () => {
    expect(cities.length).toBe(81)
    const citySlugs = cities.map((c) => c.slug)
    expect(new Set(citySlugs).size).toBe(81)
  })

  it('contains featured cities and priority local services', () => {
    expect(featuredCities.length).toBeGreaterThan(0)
    expect(localPriorityServices.length).toBeGreaterThan(0)
  })

  it('finds services by slug correctly', () => {
    const kurumsal = getServiceBySlug('kurumsal-web-sitesi')
    expect(kurumsal).toBeDefined()
    expect(kurumsal?.title).toContain('Kurumsal Web Sitesi')
  })
})
