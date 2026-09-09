// scripts/check-data.ts
/**
 * Veri bütünlüğü denetimi — build öncesi çalıştırılır.
 *   npx tsx scripts/check-data.ts
 * Kontrol edilenler:
 *   - hizmet slug/title/meta uzunlukları, ikon adları, ilişkili hizmet ve şehir slug'ları
 *   - şehir slug'ları, featuredServices geçerliliği, ilçe/koordinat verisi
 *   - blog yazılarının ilişkili hizmet/şehir slug'ları
 *   - hizmet + şehir kombinasyonlarının çakışmasız üretilebilmesi
 */
import { services, getServiceBySlug, localComboServices, getLocalCitiesForService, getLocalServiceCombos } from '../src/lib/services'
import { cities, citiesBySlug, featuredCities, featuredCitySlugs } from '../src/lib/cities'
// eslint-disable-next-line
import { blogPosts } from '../src/lib/blog-posts'
import { isValidIconName } from '../src/components/common/LucideIcon'
import { serviceMetadata, cityMetadata, localServiceMetadata, blogMetadata } from '../src/lib/seo'
import { buildCityMetaDescription, buildCityMetaTitle } from '../src/lib/cities'
import {
  COMPANY_PROCESS,
  TRANSFORMATION_STAGES,
  TRANSFORMATION_EXAMPLES,
  TECH_STACK,
  HOME_FAQ,
  SERVICE_CATEGORIES,
} from '../src/lib/constants'

const problems: string[] = []
const warn = (message: string) => problems.push(message)

// --- Hizmetler ---
if (services.length !== 43) warn(`Hizmet sayısı ${services.length}, beklenen 43`)
const seenSlugs = new Set<string>()
for (const service of services) {
  if (seenSlugs.has(service.slug)) warn(`Tekrar eden hizmet slug: ${service.slug}`)
  seenSlugs.add(service.slug)
  if (service.metaTitle.length > 60) warn(`metaTitle > 60 (${service.metaTitle.length}): ${service.slug}`)
  if (service.metaDescription.length > 155) warn(`metaDescription > 155 (${service.metaDescription.length}): ${service.slug}`)
  if (!service.h1) warn(`h1 boş: ${service.slug}`)
  if (service.relatedServices.length < 4) warn(`relatedServices < 4 (${service.relatedServices.length}): ${service.slug}`)
  for (const rel of service.relatedServices) {
    if (!getServiceBySlug(rel)) warn(`İlgili hizmet bulunamadı: ${service.slug} -> ${rel}`)
  }
  for (const citySlug of service.relatedCities) {
    if (!citiesBySlug[citySlug]) warn(`İlgili şehir bulunamadı: ${service.slug} -> ${citySlug}`)
  }
  for (const iconName of [service.icon, ...service.process.map((step) => step.icon), ...service.benefits.map((item) => item.icon), ...service.whyNeeded.map((item) => item.icon)]) {
    if (!isValidIconName(iconName)) warn(`Geçersiz ikon: ${service.slug} -> ${iconName}`)
  }
  if (service.scope.length < 5) warn(`Kapsam maddesi az (${service.scope.length}): ${service.slug}`)
  if (service.process.length < 5) warn(`Süreç adımı az (${service.process.length}): ${service.slug}`)
  if (service.faq.length < 5) warn(`SSS az (${service.faq.length}): ${service.slug}`)
  const words = `${service.description} ${service.scope.join(' ')} ${service.benefits.map((b) => b.description).join(' ')} ${service.whyNeeded.map((w) => w.description).join(' ')} ${service.faq.map((f) => f.question + ' ' + f.answer).join(' ')}`.split(/\s+/).length
  if (words < 400) warn(`İçerik kelime sayısı düşük (${words}): ${service.slug}`)
}

// --- Şehirler ---
if (cities.length !== 81) warn(`Şehir sayısı ${cities.length}, beklenen 81`)
if (featuredCities.length !== 12) warn(`Öncelikli şehir sayısı ${featuredCities.length}, beklenen 12`)
const seenCitySlugs = new Set<string>()
for (const city of cities) {
  if (seenCitySlugs.has(city.slug)) warn(`Tekrar eden şehir slug: ${city.slug}`)
  seenCitySlugs.add(city.slug)
  if (!city.region) warn(`Bölge boş: ${city.slug}`)
  if (!city.population) warn(`Nüfus 0: ${city.slug}`)
  if (city.priorityLevel !== 1 && city.priorityLevel !== 2 && city.priorityLevel !== 3) warn(`priorityLevel geçersiz: ${city.slug}`)
  if (city.priorityLevel <= 2 && !city.geo) warn(`Öncelikli şehirde geo yok: ${city.slug}`)
  if (!city.districts.length) warn(`İlçe listesi boş: ${city.slug}`)
  if (!city.industries.length) warn(`Sektör listesi boş: ${city.slug}`)
  for (const serviceSlug of city.featuredServices ?? []) {
    if (!getServiceBySlug(serviceSlug)) warn(`featuredServices geçersiz: ${city.slug} -> ${serviceSlug}`)
  }
}

// --- Hizmet + şehir kombinasyonları ---
const combos = new Set<string>()
for (const service of localComboServices) {
  const cityList = getLocalCitiesForService(service, featuredCitySlugs)
  if (cityList.length !== 12) warn(`Kombinasyon sayısı ${cityList.length}, beklenen 12: ${service.slug}`)
  for (const citySlug of cityList) {
    const key = `${service.slug}/${citySlug}`
    if (combos.has(key)) warn(`Çakışan kombinasyon: ${key}`)
    combos.add(key)
  }
}

// --- Blog ---
for (const post of blogPosts) {
  if (post.metaTitle.length > 60) warn(`Blog metaTitle > 60 (${post.metaTitle.length}): ${post.slug}`)
  if (post.metaDescription.length > 160) warn(`Blog metaDescription > 160 (${post.metaDescription.length}): ${post.slug}`)
  for (const serviceSlug of post.relatedServices) {
    if (!getServiceBySlug(serviceSlug)) warn(`Blog ilgili hizmet geçersiz: ${post.slug} -> ${serviceSlug}`)
  }
  for (const citySlug of post.relatedCities) {
    if (!citiesBySlug[citySlug]) warn(`Blog ilgili şehir geçersiz: ${post.slug} -> ${citySlug}`)
  }
  const words = post.content.split(/\s+/).length
  if (words < 500) warn(`Blog içeriği kısa (${words} kelime): ${post.slug}`)
  if (!post.content.includes('## ')) warn(`Blog içeriğinde bölüm başlığı yok: ${post.slug}`)
}

// --- Sabitler ---
if (COMPANY_PROCESS.length !== 9) warn(`COMPANY_PROCESS ${COMPANY_PROCESS.length} adım, beklenen 9`)
if (SERVICE_CATEGORIES.length !== 7) warn(`SERVICE_CATEGORIES ${SERVICE_CATEGORIES.length}, beklenen 7`)
if (!TRANSFORMATION_STAGES.length) warn('TRANSFORMATION_STAGES boş')
if (!TECH_STACK.length) warn('TECH_STACK boş')
for (const item of HOME_FAQ) {
  if (!item.question || !item.answer) warn('HOME_FAQ içinde boş kayıt')
}
for (const step of COMPANY_PROCESS) {
  if (!isValidIconName(step.icon)) warn(`COMPANY_PROCESS geçersiz ikon: ${step.title} -> ${step.icon}`)
}
for (const stage of TRANSFORMATION_STAGES) {
  if (!isValidIconName(stage.icon)) warn(`TRANSFORMATION_STAGES geçersiz ikon: ${stage.id} -> ${stage.icon}`)
}
for (const example of TRANSFORMATION_EXAMPLES) {
  if (!isValidIconName(example.icon)) warn(`TRANSFORMATION_EXAMPLES geçersiz ikon: ${example.title} -> ${example.icon}`)
}
if (TECH_STACK.some((item) => !item.name)) warn('TECH_STACK içinde boş kayıt')

if (combos.size !== 60) warn(`Toplam kombinasyon ${combos.size}, beklenen 60`)
if (getLocalServiceCombos(featuredCitySlugs).length !== combos.size) warn('getLocalServiceCombos tutarsız')

// --- Metadata uzunlukları (SERP güvenliği) ---
for (const service of services) {
  const title = String(serviceMetadata({
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    slug: service.slug,
    primaryKeyword: service.primaryKeyword,
    secondaryKeywords: service.secondaryKeywords,
    imageAlt: service.image.alt,
  }).title)
  if (title.length > 60) warn(`Hizmet title > 60 (${title.length}): ${service.slug}`)
  const desc = String(serviceMetadata({
    metaTitle: service.metaTitle,
    metaDescription: service.metaDescription,
    slug: service.slug,
    primaryKeyword: service.primaryKeyword,
    secondaryKeywords: service.secondaryKeywords,
    imageAlt: service.image.alt,
  }).description)
  if (desc.length > 155) warn(`Hizmet description > 155 (${desc.length}): ${service.slug}`)
}
for (const city of cities) {
  const title = String(cityMetadata({
    cityName: city.name,
    region: city.region,
    slug: city.slug,
    description: buildCityMetaDescription(city),
  }).title)
  if (title.length > 60) warn(`Şehir title > 60 (${title.length}): ${city.slug}`)
  const desc = buildCityMetaDescription(city)
  if (desc.length > 155) warn(`Şehir description > 155 (${desc.length}): ${city.slug}`)
}
for (const { service, citySlug } of getLocalServiceCombos(featuredCitySlugs)) {
  const city = citiesBySlug[citySlug]
  const title = String(localServiceMetadata({
    serviceTitle: service.title,
    cityName: city.name,
    serviceSlug: service.slug,
    citySlug,
    description: `${city.name} ${service.title} hizmeti`,
  }).title)
  if (title.length > 60) warn(`Kombinasyon title > 60 (${title.length}): ${service.slug}/${citySlug}`)
}
for (const post of blogPosts) {
  const title = String(blogMetadata({
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    slug: post.slug,
    tags: post.tags,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    imageAlt: post.image.alt,
  }).title)
  if (title.length > 60) warn(`Blog title > 60 (${title.length}): ${post.slug}`)
}
void buildCityMetaTitle

console.log(`Hizmet: ${services.length} | Şehir: ${cities.length} | Öncelikli şehir: ${featuredCities.length} | Kombinasyon: ${combos.size} | Blog: ${blogPosts.length}`)
if (problems.length) {
  console.error(`\n${problems.length} sorun bulundu:`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log('Veri bütünlüğü kontrolü başarılı.')
