// src/lib/constants.ts
// Site genelinde kullanılan sabit değerler

import type { NavItem, ServiceCategoryMeta, TransformationStage } from '@/types'

/** Site adresi (trailing slash YOK — url() fonksiyonu ekler) */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tardigradsoftware.com'
).replace(/\/$/, '')

export const SITE = {
  name: 'Tardigrad Software',
  legalName: 'Tardigrad Software Yazılım ve Dijital Dönüşüm Hizmetleri',
  domain: 'tardigradsoftware.com',
  url: SITE_URL,
  locale: 'tr_TR',
  language: 'tr',
  description:
    'Türkiye geneli kurumsal web sitesi, özel yazılım, SaaS, SEO ve dijital dönüşüm hizmetleri. 43 hizmet alanı, 81 il kapsama.',
  tagline: 'İşletmeniz için uçtan uca dijital çözümler',
  /** Logo SVG kodları teslim edildiğinde public/logo.svg olarak yerleştirilecek */
  logoUrl: `${SITE_URL}/logo.svg`,
  foundingYear: 2021,
} as const

export const CONTACT = {
  email: 'info@tardigradsoftware.com',
  salesEmail: 'satis@tardigradsoftware.com',
  phone: process.env.NEXT_PUBLIC_PHONE ?? '',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  whatsappLabel: 'WhatsApp',
  address: {
    street: 'Maltepe',
    locality: 'Maltepe',
    region: 'İstanbul',
    country: 'TR',
    countryCode: 'TR',
    postalCode: '34846',
    full: 'Maltepe / İstanbul, Türkiye',
  },
  geo: { lat: 40.8903, lng: 29.1417 }, // Maltepe, İstanbul
  workingHours: 'Mo-Fr 09:00-18:30',
  responseTime: 'En geç 24 saat içinde dönüş yapılıyor',
} as const

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tardigrad-software', icon: 'Linkedin' },
  { label: 'X (Twitter)', href: 'https://twitter.com/tardigradsw', icon: 'Twitter' },
  { label: 'GitHub', href: 'https://github.com/tardigradsoftware', icon: 'Github' },
  { label: 'Instagram', href: 'https://www.instagram.com/tardigradsoftware', icon: 'Instagram' },
] as const

/** WhatsApp linki (numara tanımlı değilse null döner) */
export function whatsappLink(message?: string): string | null {
  const raw = CONTACT.whatsappNumber
  if (!raw) return null
  const digits = raw.replace(/[^\d]/g, '')
  if (digits.length < 10) return null
  const text = message ?? 'Merhaba, projemiz hakkında bilgi almak istiyorum.'
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export const CTA = {
  primary: 'Projenizi Konuşalım',
  secondary: 'Ücretsiz Ön Analiz',
  services: 'Hizmetleri İncele',
  formAnchor: '#iletisim-formu',
} as const

/** Ana navigasyon */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '/hizmetler/' },
  { label: 'Şehirler', href: '/sehir/' },
  { label: 'Süreç', href: '/surec/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Hakkımızda', href: '/hakkimizda/' },
  { label: 'İletişim', href: '/iletisim/' },
]

/** Hizmet kategorileri — ana sayfadaki 5+2 blok */
export const SERVICE_CATEGORIES: ServiceCategoryMeta[] = [
  {
    key: 'web',
    label: 'Web Siteleri',
    shortLabel: 'Web',
    emoji: '🌐',
    icon: 'Globe',
    order: 1,
    description:
      'Kurumsal web sitesi, e-ticaret, landing page ve tanıtım siteleri. Hızlı, SEO uyumlu ve mobil öncelikli.',
  },
  {
    key: 'yazilim',
    label: 'Özel Yazılım & Paneller',
    shortLabel: 'Yazılım',
    emoji: '⚙️',
    icon: 'CodeXml',
    order: 2,
    description:
      'CRM, stok, teklif, iş takip ve yönetim panelleri. Excel ve WhatsApp üzerindeki işlerinizi sisteme taşıyoruz.',
  },
  {
    key: 'saas',
    label: 'SaaS & Abonelik',
    shortLabel: 'SaaS',
    emoji: '🚀',
    icon: 'Rocket',
    order: 3,
    description:
      'Multi-tenant SaaS platformları, abonelik altyapıları ve MVP ürün geliştirme. Fikrinizden ölçeklenebilir ürüne.',
  },
  {
    key: 'seo',
    label: 'SEO Hizmetleri',
    shortLabel: 'SEO',
    emoji: '🔍',
    icon: 'Search',
    order: 4,
    description:
      'Teknik SEO, lokal SEO, schema.org yapısal veri ve sayfa mimarisi. Google’da görünür olun.',
  },
  {
    key: 'otomasyon',
    label: 'Otomasyon & Entegrasyon',
    shortLabel: 'Otomasyon',
    emoji: '🔁',
    icon: 'Workflow',
    order: 5,
    description:
      'Dijital otomasyon, API entegrasyonları, ödeme / WhatsApp / CRM bağlantıları ve dijital dönüşüm süreçleri.',
  },
  {
    key: 'altyapi',
    label: 'Altyapı & DevOps',
    shortLabel: 'Altyapı',
    emoji: '☁️',
    icon: 'Server',
    order: 6,
    description:
      'Hosting, DNS, Cloudflare CDN, Vercel, Supabase / PostgreSQL ve kurumsal e-posta yönetimi.',
  },
  {
    key: 'ai',
    label: 'Yapay Zekâ',
    shortLabel: 'AI',
    emoji: '🤖',
    icon: 'Bot',
    order: 7,
    description:
      'AI chatbot, yapay zekâ destekli içerik ve iş araçları. Müşteri iletişiminde 7/24 kapasite.',
  },
]

export const CATEGORY_MAP: Record<string, ServiceCategoryMeta> = Object.fromEntries(
  SERVICE_CATEGORIES.map((c) => [c.key, c]),
)

/** 9 adımlı proje süreci — hem /surec hem ana sayfa hem hizmet sayfaları */
export const COMPANY_PROCESS = [
  {
    step: 1,
    title: 'İhtiyaç Analizi',
    description:
      'İşletmenizin mevcut süreçlerini, hedef kitlenizi ve rakiplerinizi dinliyoruz. Sorunu değil, kök nedeni belirliyoruz.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Strateji ve Kapsam',
    description:
      'Hedefleri ölçülebilir metriklere çeviriyoruz: kapsam, takvim, bütçe ve başarı kriterleri tek dokümanda netleşiyor.',
    icon: 'Target',
  },
  {
    step: 3,
    title: 'UI/UX Tasarım',
    description:
      'Kullanıcı yolculuğunu çıkarıp wireframe ve yüksek çözünürlüklü tasarımları üretiyoruz. Onayınız olmadan kod yazmıyoruz.',
    icon: 'PenTool',
  },
  {
    step: 4,
    title: 'Geliştirme',
    description:
      'Next.js, TypeScript ve Supabase ile tip güvenli, test edilebilir ve ölçeklenebilir bir mimari kuruyoruz.',
    icon: 'CodeXml',
  },
  {
    step: 5,
    title: 'Test ve Kalite',
    description:
      'Fonksiyonel, tarayıcı, mobil ve performans testleri. Hata kayıtları kapatılmadan yayına çıkmıyoruz.',
    icon: 'ShieldCheck',
  },
  {
    step: 6,
    title: 'Canlıya Alma',
    description:
      'Vercel + Cloudflare üzerinden kesintisiz dağıtım, SSL, DNS yönlendirmeleri ve yedekleme politikası.',
    icon: 'Rocket',
  },
  {
    step: 7,
    title: 'SEO ve Yapısal Veri',
    description:
      'Teknik SEO denetimi, schema.org işaretlemeleri, sitemap ve Search Console kurulumu ile görünürlüğü artırıyoruz.',
    icon: 'TrendingUp',
  },
  {
    step: 8,
    title: 'Bakım ve Destek',
    description:
      'Güncelleme, güvenlik yamaları, içerik değişiklikleri ve izleme. Sisteminiz sürekli gözetim altında.',
    icon: 'LifeBuoy',
  },
  {
    step: 9,
    title: 'Raporlama ve Büyüme',
    description:
      'GA4 ve Search Console verileriyle aylık rapor: trafik, dönüşüm, hız skorları ve bir sonraki çeyreğin yol haritası.',
    icon: 'ChartColumn',
  },
] as const

/** Ana sayfa — güven / rakamlar */
export const SITE_STATS = [
  { value: 43, suffix: '', label: 'Hizmet Alanı', description: 'Web’den yapay zekâya uçtan uca kapsama' },
  { value: 81, suffix: '', label: 'İl Kapsaması', description: 'Türkiye geneline uzaktan hizmet' },
  { value: 9, suffix: ' Adım', label: 'Proje Süreci', description: 'Analizden raporlamaya şeffaf akış' },
  { value: 60, suffix: '+', label: 'Lokal Sayfa', description: 'Hizmet + şehir kombinasyonları' },
] as const

/** Ana sayfa — dijital dönüşüm örnekleri (öncesi / sonrası) */
export const TRANSFORMATION_EXAMPLES = [
  {
    before: 'Excel dosyaları',
    after: 'Web uygulaması',
    title: 'Excel → Web Uygulaması',
    description:
      'Paylaşılan klasörlerde versiyonu kaybolan Excel tablolarını, çok kullanıcılı ve yetkilendirilmiş bir web uygulamasına dönüştürüyoruz.',
    gain: '%70 daha az veri hatası',
    icon: 'Table2',
  },
  {
    before: 'WhatsApp konuşmaları',
    after: 'CRM sistemi',
    title: 'WhatsApp → CRM Sistemi',
    description:
      'Müşteri talepleri sohbetlerde kaybolmasın. Görüşmeleri kayıt altına alan, hatırlatma kuran ve satış hunisini gösteren bir CRM kuruyoruz.',
    gain: '2x daha hızlı takip',
    icon: 'MessageSquare',
  },
  {
    before: 'Manuel rapor',
    after: 'Otomatik dashboard',
    title: 'Manuel Rapor → Otomatik Dashboard',
    description:
      'Haftalarca süren rapor toplama işini otomatikleştirip, yönetimin her an güncel veriye baktığı canlı panellere çeviriyoruz.',
    gain: 'Ayda 40 saat tasarruf',
    icon: 'ChartColumn',
  },
  {
    before: 'Eski web sitesi',
    after: 'Modern platform',
    title: 'Eski Site → Modern Platform',
    description:
      'Mobilde açılmayan, güncellenemeyen siteleri; hızlı, SEO uyumlu ve içerik yönetimi kolay modern platformlara taşıyoruz.',
    gain: '%55 daha hızlı açılış',
    icon: 'Sparkles',
  },
] as const

/** Teknoloji yığını */
export const TECH_STACK = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'UI' },
  { name: 'TypeScript', category: 'Dil' },
  { name: 'Tailwind CSS', category: 'Stil' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Veritabanı' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'Cloudflare', category: 'CDN & Güvenlik' },
  { name: 'Framer Motion', category: 'Animasyon' },
  { name: 'Resend', category: 'E-posta' },
  { name: 'Upstash Redis', category: 'Rate Limiting' },
  { name: 'GA4', category: 'Analytics' },
] as const

/** Ana sayfa genel SSS */
export const HOME_FAQ = [
  {
    question: 'Tardigrad Software hangi hizmetleri veriyor?',
    answer:
      'Kurumsal web sitesi, e-ticaret, özel yazılım ve yönetim panelleri, SaaS platformları, SEO (teknik, lokal, yapısal veri), dijital otomasyon, API entegrasyonları, altyapı (hosting, DNS, Cloudflare, Vercel, Supabase) ve yapay zekâ çözümleri olmak üzere 43 ayrı hizmet alanında çalışıyoruz. Tek bir ihtiyaca odaklanabileceğiniz gibi uçtan uca dijital dönüşüm de alabilirsiniz.',
  },
  {
    question: 'Türkiye’nin her iline hizmet veriyor musunuz?',
    answer:
      'Evet. Merkezimiz İstanbul Maltepe’de; projelerin büyük bölümünü uzaktan yönetiyoruz. Görüşmeleri çevrim içi yapıyor, gerekli olduğunda sahada da bulunuyoruz. 81 ilin tamamına hizmet veriyoruz ve 12 öncelikli şehir için ayrı lokal sayfalarımız mevcut.',
  },
  {
    question: 'Bir web sitesi veya yazılım projesi ne kadar sürede tamamlanır?',
    answer:
      'Kurumsal web siteleri ortalama 2-4 hafta, landing page 5-10 iş günü, e-ticaret projeleri 4-8 hafta, özel yazılım ve panel projeleri kapsamına göre 6-16 hafta sürer. MVP ürünler için 4-8 haftalık hızlandırılmış bir program uyguluyoruz. Kesin takvim, ücretsiz ön analiz sonrasında netleşir.',
  },
  {
    question: 'Fiyatlandırma nasıl yapılıyor?',
    answer:
      'Kapsam, ekran sayısı, entegrasyonlar ve bakım ihtiyacına göre proje bazlı teklif veriyoruz. Küçük işletmeler için paket fiyatlar, uzun soluklu işler için aylık bakım ve geliştirme planları sunuyoruz. Ön analiz ücretsizdir; teklif yazılı olarak ve kalem kalem paylaşılır.',
  },
  {
    question: 'Mevcut web sitemi yenileyebilir misiniz?',
    answer:
      'Evet. Önce mevcut sitenizin teknik SEO denetimini, hız testini ve içerik envanterini çıkarıyoruz. Sonra aynı alan adında, mevcut Google görünürlüğünü kaybetmeden (301 yönlendirmeleri ve sitemap taşıması ile) modern bir platforma geçiriyoruz.',
  },
  {
    question: 'Proje bittikten sonra destek sağlıyor musunuz?',
    answer:
      'Tüm projelerde yayına alma sonrası 30 gün hata düzeltme garantisi veriyoruz. Devamında aylık bakım paketi ile güncelleme, yedekleme, güvenlik izleme, içerik değişiklikleri ve performans raporlamasını biz üstleniyoruz.',
  },
  {
    question: 'SEO hizmeti web sitesi projesine dahil mi?',
    answer:
      'Teknik SEO temeli (hız, mobil uyum, schema.org yapısal veri, sitemap, canonical, meta yönetimi) her web projesine standart olarak dahil. İçerik üretimi, lokal SEO ve sürekli optimasyon ise ayrı bir danışmanlık paketi olarak sunuluyor.',
  },
  {
    question: 'Verilerimiz nerede saklanıyor ve KVKK uyumu nasıl sağlanıyor?',
    answer:
      'Veriler, Avrupa bölgesinde barındırılan Supabase / PostgreSQL altyapısında tutulur; erişimler rol bazlı yetkilendirme (RLS) ile sınırlandırılır. İletişim formlarında KVKK açık rıza metni zorunludur, kayıtlar şifreli bağlantı üzerinden iletilir ve aydınlatma metni sitemizde yayımlanır.',
  },
]

/** Ana sayfa — kaydırmalı "dijital dönüşüm filmi" sahneleri */
export const TRANSFORMATION_STAGES: TransformationStage[] = [
  {
    id: 'ham-veri',
    index: 0,
    title: 'Ham Veri',
    subtitle: 'Dağınık başlangıç',
    description:
      'Her şey Excel dosyaları, notlar, WhatsApp mesajları ve dağınık kayıtlarla başlar. Veri vardır ama yön yoktur.',
    icon: 'Table2',
    tone: '#08112B',
  },
  {
    id: 'analiz',
    index: 1,
    title: 'Analiz',
    subtitle: 'İhtiyaçları topluyoruz',
    description:
      'Dağınık parçaları bir araya getirip süreçlerinizi, hedef kitlenizi ve darboğazları tek tabloda görünür kılıyoruz.',
    icon: 'Search',
    tone: '#0B1736',
  },
  {
    id: 'mimari',
    index: 2,
    title: 'Mimari',
    subtitle: 'Strateji ve plan',
    description:
      'Sayfa mimarisi, veri modeli ve entegrasyon haritası çizilir. Ne yapılacak, hangi sırayla yapılacak netleşir.',
    icon: 'Network',
    tone: '#0E1E45',
  },
  {
    id: 'gelistirme',
    index: 3,
    title: 'Geliştirme',
    subtitle: 'Kod satır satır kuruluyor',
    description:
      'Next.js ve TypeScript ile ekranlar, formlar ve paneller inşa edilir. Her sprint sonunda çalışan bir çıktı görürsünüz.',
    icon: 'CodeXml',
    tone: '#12265A',
  },
  {
    id: 'test',
    index: 4,
    title: 'Test',
    subtitle: 'Kalite kontrol',
    description:
      'Fonksiyonel testler, tarayıcı ve mobil uyumluluk, hız ve güvenlik kontrolleri. Hata kaydı kapanmadan yayına çıkılmaz.',
    icon: 'ShieldCheck',
    tone: '#0F2350',
  },
  {
    id: 'yayin',
    index: 5,
    title: 'Canlıya Alma',
    subtitle: 'Yayın anı',
    description:
      'Vercel ve Cloudflare üzerinden kesintisiz dağıtım; SSL, DNS, yedekleme ve izleme aynı gün devreye girer.',
    icon: 'Rocket',
    tone: '#0D2E63',
  },
  {
    id: 'seo',
    index: 6,
    title: 'SEO',
    subtitle: 'Google’da görünür olmak',
    description:
      'Teknik denetim, schema.org yapısal veri, sitemap ve Search Console kurulumu ile arama görünürlüğü büyümeye başlar.',
    icon: 'TrendingUp',
    tone: '#0A2C58',
  },
  {
    id: 'lokal',
    index: 7,
    title: 'Lokal Kapsama',
    subtitle: '81 ilde varlık',
    description:
      'Şehir ve ilçe bazlı lokal sayfalar ile “yakınımdaki” aramalarında işletmeniz öne çıkar.',
    icon: 'MapPin',
    tone: '#0B2447',
  },
  {
    id: 'buyume',
    index: 8,
    title: 'Büyüme',
    subtitle: 'Ölç, optimize et, ölçekle',
    description:
      'GA4 verileriyle dönüşüm takibi, aylık raporlama ve sürekli iyileştirme. Sistem artık kendi kendine büyür.',
    icon: 'ChartColumn',
    tone: '#08243F',
  },
]

/** Form seçenekleri — hizmet dropdown’ı */
export const FORM_SERVICE_OPTIONS = [
  'Kurumsal Web Sitesi',
  'E-Ticaret Sitesi',
  'Landing Page',
  'Özel Yazılım / Yönetim Paneli',
  'CRM / Müşteri Yönetim Sistemi',
  'SaaS Platformu / MVP',
  'SEO (Teknik / Lokal / Danışmanlık)',
  'Dijital Otomasyon / API Entegrasyonu',
  'AI Chatbot / Yapay Zekâ Araçları',
  'Hosting / Altyapı / Taşıma',
  'Web Sitesi Yenileme',
  'Diğer / Emin Değilim',
]

/** Rate limit ayarları */
export const RATE_LIMIT = {
  contactPerHour: 3,
  contactPerDay: 8,
} as const

/** Görsel ölçüleri */
export const IMAGE_SIZES = {
  hero: { width: 1200, height: 630 },
  inline: { width: 800, height: 450 },
  card: { width: 400, height: 300 },
} as const

/** URL üretici — trailing slash her zaman eklenir */
export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (clean === '/') return `${SITE_URL}/`
  return `${SITE_URL}${clean.endsWith('/') ? clean : `${clean}/`}`
}

/** Tam görsel adresi */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean}`
}

export const serviceUrl = (slug: string) => `/hizmetler/${slug}/`
export const cityUrl = (slug: string) => `/sehir/${slug}/`
export const localServiceUrl = (slug: string, city: string) => `/hizmet/${slug}/${city}/`
export const blogUrl = (slug: string) => `/blog/${slug}/`
