// scripts/generate-assets.mjs
/**
 * Statik varlık üretici — logo, favicon, Open Graph görselleri, manifest.
 *
 *   npm run assets
 *
 * Üretilen dosyalar `public/` altına yazılır ve Git’e girer (deploy’da ekstra
 * adım gerekmez). Marka logosu SVG’si teslim edildiğinde:
 *   1) public/logo.svg dosyasını değiştirin,
 *   2) `npm run assets` komutunu yeniden çalıştırın (favicon + OG görselleri güncellenir).
 *
 * Görseller kodla üretilir; harici API veya lisanslı kaynak gerektirmez.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const FONTS = "Inter, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif"

const NAVY = '#0A0F1E'
const NAVY_DEEP = '#08112B'
const NAVY_MID = '#0F1B3D'
const CYAN = '#06B6D4'
const BLUE = '#2563EB'
const GREEN = '#10B981'
const WHITE = '#FFFFFF'
const MUTED = 'rgba(255,255,255,0.62)'

/** XML için metin kaçışı */
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

/**
 * Metni satırlara böler (kaba ölçüm: karakter genişliği ~0.52em).
 * Türkçe karakterler için yeterli bir yaklaşım; görsellerde taşma olmaz.
 */
function wrap(text, maxCharsPerLine, maxLines = 2) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxCharsPerLine && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
    if (lines.length === maxLines - 1 && words.indexOf(word) === words.length - 1) break
  }
  if (line) lines.push(line)
  while (lines.length > maxLines) {
    const overflow = lines.splice(maxLines - 1)
    lines[maxLines - 1] = `${lines[maxLines - 1]} ${overflow.join(' ')}`.trim()
  }
  return lines
}

/** 512x512 marka işareti (logo placeholder — kullanıcı SVG verince değiştirilir) */
function logoMark(size = 512, { rounded = true } = {}) {
  const s = size
  const r = rounded ? s * 0.22 : 0
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY_MID}"/>
      <stop offset="55%" stop-color="#0B1730"/>
      <stop offset="100%" stop-color="${NAVY_DEEP}"/>
    </linearGradient>
    <linearGradient id="ts" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="55%" stop-color="${CYAN}"/>
      <stop offset="100%" stop-color="${BLUE}"/>
    </linearGradient>
    <linearGradient id="tail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${GREEN}"/>
      <stop offset="100%" stop-color="${CYAN}"/>
    </linearGradient>
  </defs>
  <rect width="${s}" height="${s}" rx="${r}" fill="url(#bg)"/>
  <rect x="${s * 0.055}" y="${s * 0.055}" width="${s * 0.89}" height="${s * 0.89}" rx="${r * 0.82}" fill="none" stroke="rgba(103,232,249,0.22)" stroke-width="${Math.max(1, s * 0.006)}"/>
  <!-- Tardigrad (su ayısı) soyut siluet: gövde + 4 bacak + anten -->
  <g transform="translate(${s * 0.19} ${s * 0.30})">
    <path d="M ${s * 0.30} 0
             C ${s * 0.47} 0 ${s * 0.58} ${s * 0.10} ${s * 0.58} ${s * 0.20}
             C ${s * 0.58} ${s * 0.30} ${s * 0.47} ${s * 0.40} ${s * 0.30} ${s * 0.40}
             C ${s * 0.13} ${s * 0.40} 0 ${s * 0.30} 0 ${s * 0.20}
             C 0 ${s * 0.10} ${s * 0.13} 0 ${s * 0.30} 0 Z"
          fill="url(#ts)"/>
    <g stroke="url(#tail)" stroke-width="${Math.max(2, s * 0.022)}" stroke-linecap="round" fill="none">
      <path d="M ${s * 0.11} ${s * 0.38} L ${s * 0.09} ${s * 0.52}"/>
      <path d="M ${s * 0.24} ${s * 0.40} L ${s * 0.23} ${s * 0.55}"/>
      <path d="M ${s * 0.38} ${s * 0.40} L ${s * 0.40} ${s * 0.55}"/>
      <path d="M ${s * 0.50} ${s * 0.37} L ${s * 0.54} ${s * 0.51}"/>
    </g>
    <circle cx="${s * 0.47}" cy="${s * 0.15}" r="${s * 0.028}" fill="${NAVY_DEEP}"/>
  </g>
  <!-- Kod parantezi: yazılım vurgusu -->
  <g stroke="rgba(255,255,255,0.85)" stroke-width="${Math.max(2, s * 0.028)}" stroke-linecap="round" fill="none">
    <path d="M ${s * 0.20} ${s * 0.78} L ${s * 0.155} ${s * 0.825} L ${s * 0.20} ${s * 0.87}"/>
    <path d="M ${s * 0.80} ${s * 0.78} L ${s * 0.845} ${s * 0.825} L ${s * 0.80} ${s * 0.87}"/>
  </g>
  <text x="${s / 2}" y="${s * 0.855}" text-anchor="middle" font-family="${FONTS}" font-size="${s * 0.10}" font-weight="800" fill="${WHITE}" letter-spacing="${s * 0.012}">TS</text>
</svg>`
}

/** 1200x630 OG görseli */
function ogImage({ eyebrow = 'Tardigrad Software', title, subtitle = 'tardigradsoftware.com', badge }) {
  const W = 1200
  const H = 630
  const titleLines = wrap(title, 26, 3)
  const titleSize = titleLines.length >= 3 ? 56 : titleLines.length === 2 ? 66 : 76
  const startY = titleLines.length >= 3 ? 306 : titleLines.length === 2 ? 322 : 344
  const lineHeight = Math.round(titleSize * 1.14)
  const badgeY = 186

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY_DEEP}"/>
      <stop offset="52%" stop-color="${NAVY_MID}"/>
      <stop offset="100%" stop-color="#0B1730"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="50%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${GREEN}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.18" cy="0.1" r="0.65">
      <stop offset="0%" stop-color="rgba(37,99,235,0.45)"/>
      <stop offset="100%" stop-color="rgba(37,99,235,0)"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.86" cy="0.82" r="0.6">
      <stop offset="0%" stop-color="rgba(6,182,212,0.35)"/>
      <stop offset="100%" stop-color="rgba(6,182,212,0)"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(96,144,250,0.10)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="url(#accent)"/>

  <!-- logo + marka -->
  <g transform="translate(72 70)">
    <rect width="74" height="74" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(103,232,249,0.35)" stroke-width="1.5"/>
    <text x="37" y="50" text-anchor="middle" font-family="${FONTS}" font-size="28" font-weight="800" fill="#67E8F9">TS</text>
  </g>
  <text x="168" y="106" font-family="${FONTS}" font-size="27" font-weight="700" fill="${WHITE}">Tardigrad Software</text>
  <text x="168" y="138" font-family="${FONTS}" font-size="18" font-weight="500" fill="${MUTED}">Kurumsal Web · Yazılım · SEO · Dijital Dönüşüm</text>

  ${
    badge
      ? `<g transform="translate(72 ${badgeY})">
      <rect width="${Math.min(560, 26 + badge.length * 9.6)}" height="42" rx="21" fill="rgba(6,182,212,0.14)" stroke="rgba(103,232,249,0.4)" stroke-width="1.5"/>
      <text x="21" y="28" font-family="${FONTS}" font-size="17" font-weight="700" fill="#A5F3FC" letter-spacing="0.6">${esc(badge)}</text>
    </g>`
      : ''
  }

  <!-- başlık -->
  <text x="72" y="${startY}" font-family="${FONTS}" font-size="${titleSize}" font-weight="800" fill="${WHITE}">
    ${titleLines.map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`).join('')}
  </text>

  <!-- alt bilgi -->
  <rect x="72" y="${H - 128}" width="120" height="5" rx="2.5" fill="url(#accent)"/>
  <text x="72" y="${H - 78}" font-family="${FONTS}" font-size="20" font-weight="500" fill="${MUTED}">${esc(eyebrow)}</text>
  <text x="${W - 72}" y="${H - 78}" text-anchor="end" font-family="${FONTS}" font-size="20" font-weight="600" fill="#A5F3FC">${esc(subtitle)}</text>
</svg>`
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function writePng(svg, file, size) {
  const buffer = Buffer.from(svg)
  const image = size ? sharp(buffer).resize(size, size) : sharp(buffer)
  await image.png({ compressionLevel: 9 }).toFile(file)
}

async function writeWebp(svg, file, { quality = 82, width } = {}) {
  let image = sharp(Buffer.from(svg))
  if (width) image = image.resize(width)
  await image.webp({ quality, effort: 5 }).toFile(file)
}

/** Basit ICO üretimi (PNG gömülü, çok boyutlu) */
function buildIco(pngBuffers) {
  const count = pngBuffers.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const dirSize = 16 * count
  let offset = 6 + dirSize
  const entries = []
  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    offset += buffer.length
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map((item) => item.buffer)])
}

async function generate() {
  const started = Date.now()
  await ensureDir(PUBLIC)
  await ensureDir(path.join(PUBLIC, 'images', 'og'))
  await ensureDir(path.join(PUBLIC, 'images', 'services'))
  await ensureDir(path.join(PUBLIC, 'images', 'blog'))
  await ensureDir(path.join(PUBLIC, 'images', 'cities'))

  const written = []

  // --- Logo -------------------------------------------------------------
  // Kullanıcının kendi logosu varsa (public/logo.custom.svg) onu kullanır.
  const customLogoPath = path.join(PUBLIC, 'logo.custom.svg')
  const hasCustomLogo = existsSync(customLogoPath)
  const logoSvg = hasCustomLogo
    ? await readFile(customLogoPath, 'utf8')
    : logoMark(512, { rounded: false })

  await writeFile(path.join(PUBLIC, 'logo.svg'), logoSvg, 'utf8')
  written.push('public/logo.svg')

  const markSvg = logoMark(512)
  await writeFile(path.join(PUBLIC, 'logo-mark.svg'), markSvg, 'utf8')
  written.push('public/logo-mark.svg')

  // --- Favicon ---------------------------------------------------------
  await writePng(markSvg, path.join(PUBLIC, 'favicon-32x32.png'), 32)
  await writePng(markSvg, path.join(PUBLIC, 'favicon-16x16.png'), 16)
  await writePng(markSvg, path.join(PUBLIC, 'apple-touch-icon.png'), 180)
  await writePng(markSvg, path.join(PUBLIC, 'icon-192.png'), 192)
  await writePng(markSvg, path.join(PUBLIC, 'icon-512.png'), 512)
  await writePng(markSvg, path.join(PUBLIC, 'android-chrome-192x192.png'), 192)
  await writePng(markSvg, path.join(PUBLIC, 'android-chrome-512x512.png'), 512)
  written.push(
    'public/favicon-16x16.png',
    'public/favicon-32x32.png',
    'public/apple-touch-icon.png',
    'public/icon-192.png',
    'public/icon-512.png',
    'public/android-chrome-192x192.png',
    'public/android-chrome-512x512.png',
  )

  const icoBuffers = []
  for (const size of [16, 32, 48]) {
    const buffer = await sharp(Buffer.from(markSvg)).resize(size, size).png().toBuffer()
    icoBuffers.push({ size, buffer })
  }
  await writeFile(path.join(PUBLIC, 'favicon.ico'), buildIco(icoBuffers))
  written.push('public/favicon.ico')

  // --- Manifest ---------------------------------------------------------
  const manifest = {
    name: 'Tardigrad Software — Kurumsal Web, Yazılım, SEO ve Dijital Dönüşüm',
    short_name: 'Tardigrad',
    description:
      'Türkiye geneli kurumsal web sitesi, özel yazılım, SaaS, SEO ve dijital dönüşüm hizmetleri.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: NAVY_DEEP,
    theme_color: NAVY_DEEP,
    lang: 'tr',
    categories: ['business', 'technology', 'productivity'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
  await writeFile(
    path.join(PUBLIC, 'site.webmanifest'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  )
  written.push('public/site.webmanifest')

  // --- Statik dosyalar --------------------------------------------------
  await writeFile(
    path.join(PUBLIC, 'robots.txt'),
    `# https://tardigradsoftware.com/robots.txt
# Bu dosya bilgilendirme amaçlıdır; asıl sürüm Next.js Metadata API ile
# /robots adresinden üretilir (src/app/robots.ts).

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://tardigradsoftware.com/sitemap.xml
Host: https://tardigradsoftware.com
`,
    'utf8',
  )
  written.push('public/robots.txt')

  await writeFile(
    path.join(PUBLIC, 'security.txt'),
    `Contact: mailto:info@tardigradsoftware.com
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: tr, en
Canonical: https://tardigradsoftware.com/.well-known/security.txt
Policy: https://tardigradsoftware.com/kvkk/
`,
    'utf8',
  )
  await ensureDir(path.join(PUBLIC, '.well-known'))
  await writeFile(
    path.join(PUBLIC, '.well-known', 'security.txt'),
    await readFile(path.join(PUBLIC, 'security.txt'), 'utf8'),
    'utf8',
  )
  written.push('public/security.txt', 'public/.well-known/security.txt')

  await writeFile(
    path.join(PUBLIC, 'humans.txt'),
    `/* TEAM */
Name: Tardigrad Software
Site: https://tardigradsoftware.com
Email: info@tardigradsoftware.com
Location: Maltepe / Istanbul, Türkiye

/* SITE */
Standards: HTML5, CSS3, TypeScript, JSON-LD (schema.org)
Components: Next.js App Router, Tailwind CSS, Supabase, Vercel, Cloudflare
Language: Turkish (tr)
`,
    'utf8',
  )
  written.push('public/humans.txt')

  // --- OG görselleri ----------------------------------------------------
  const ogDir = path.join(PUBLIC, 'images', 'og')
  const ogJobs = [
    {
      file: 'default-og.webp',
      title: 'Kurumsal Web Sitesi, Yazılım, SEO ve Dijital Dönüşüm',
      badge: 'Türkiye geneli · 43 hizmet alanı',
      eyebrow: 'İşletmeniz için uçtan uca dijital çözümler',
    },
    {
      file: 'hizmetler-og.webp',
      title: '43 Hizmet Alanı: Web, Yazılım, SaaS, SEO, Otomasyon, AI',
      badge: 'Hizmetler',
      eyebrow: 'Her hizmet sayfasında kapsam, süreç ve SSS',
    },
    {
      file: 'sehir-og.webp',
      title: '81 İlde Kurumsal Web Sitesi ve Yazılım Hizmetleri',
      badge: 'Lokal SEO kapsaması',
      eyebrow: '12 öncelikli şehir için ayrı lokal sayfalar',
    },
    {
      file: 'blog-og.webp',
      title: 'Web, Yazılım, SEO ve Dijital Dönüşüm Rehberleri',
      badge: 'Blog',
      eyebrow: 'Karar vermeden önce bilmeniz gerekenler',
    },
    {
      file: 'iletisim-og.webp',
      title: 'Projenizi Konuşalım — Ücretsiz Ön Analiz',
      badge: 'İletişim',
      eyebrow: 'En geç 24 saat içinde dönüş yapılıyor',
    },
    {
      file: 'surec-og.webp',
      title: '9 Adımda Şeffaf Proje Süreci',
      badge: 'Çalışma modeli',
      eyebrow: 'Analizden raporlamaya kadar tanımlı akış',
    },
    {
      file: 'hakkimizda-og.webp',
      title: 'Tardigrad Software — Yazılım ve Dijital Dönüşüm Ekibi',
      badge: 'Hakkımızda',
      eyebrow: 'Maltepe / İstanbul · Türkiye geneli',
    },
    {
      file: 'dijital-donusum-og.webp',
      title: 'Dijital Dönüşüm: Excel’den Sisteme, Manuel’den Otomatiğe',
      badge: 'Dijital dönüşüm',
      eyebrow: 'Ölçülebilir sonuçlarla dönüşüm yol haritası',
    },
  ]
  for (const job of ogJobs) {
    await writeWebp(ogImage(job), path.join(ogDir, job.file), { quality: 80 })
    written.push(`public/images/og/${job.file}`)
  }
  // 404 sayfası için de bir görsel
  await writeWebp(
    ogImage({
      title: 'Sayfa Bulunamadı',
      badge: 'Hata 404',
      eyebrow: 'Arama yapın veya hizmetlerimize göz atın',
    }),
    path.join(ogDir, '404-og.webp'),
    { quality: 78 },
  )
  written.push('public/images/og/404-og.webp')

  // --- Hizmet / şehir / blog OG görselleri ------------------------------
  const { services } = await import('../src/lib/services.ts')
  const { cities } = await import('../src/lib/cities.ts')
  const { blogPosts } = await import('../src/lib/blog-posts.ts')
  const { SERVICE_CATEGORIES } = await import('../src/lib/constants.ts')

  const categoryLabel = Object.fromEntries(
    SERVICE_CATEGORIES.map((category) => [category.key, category.label]),
  )

  for (const service of services) {
    await writeWebp(
      ogImage({
        title: service.title,
        badge: categoryLabel[service.category] ?? 'Hizmet',
        eyebrow: `${service.primaryKeyword} · Türkiye geneli`,
      }),
      path.join(ogDir, `${service.slug}-og.webp`),
      { quality: 76 },
    )
  }
  written.push(`public/images/og/${services.length} hizmet görseli`)

  for (const city of cities) {
    await writeWebp(
      ogImage({
        title: `${city.name} Web Sitesi ve Yazılım Hizmetleri`,
        badge: `${city.region} · ${city.priorityLevel <= 2 ? 'Öncelikli şehir' : 'Şehir'}`,
        eyebrow: `${city.industries.slice(0, 3).join(' · ')}`,
      }),
      path.join(ogDir, `sehir-${city.slug}-og.webp`),
      { quality: 74 },
    )
  }
  written.push(`public/images/og/${cities.length} şehir görseli`)

  for (const post of blogPosts) {
    await writeWebp(
      ogImage({
        title: post.title,
        badge: `Blog · ${post.category}`,
        eyebrow: `${post.readingTime} dk okuma`,
      }),
      path.join(ogDir, `blog-${post.slug}-og.webp`),
      { quality: 76 },
    )
  }
  written.push(`public/images/og/${blogPosts.length} blog görseli`)

  // --- Hizmet içerik görselleri (next/image için WebP) ------------------
  for (const service of services) {
    const svg = ogImage({
      title: service.title,
      badge: categoryLabel[service.category] ?? 'Hizmet',
      eyebrow: service.summary.slice(0, 78),
    })
    await writeWebp(svg, path.join(PUBLIC, 'images', 'services', service.image.filename), {
      quality: 78,
      width: service.image.width || 1200,
    })
  }
  written.push(`public/images/services/${services.length} hizmet görseli (WebP)`)

  for (const post of blogPosts) {
    await writeWebp(
      ogImage({ title: post.title, badge: post.category, eyebrow: post.excerpt.slice(0, 78) }),
      path.join(PUBLIC, 'images', 'blog', post.image.filename),
      { quality: 78, width: 1200 },
    )
  }
  written.push(`public/images/blog/${blogPosts.length} blog görseli (WebP)`)

  for (const city of cities.slice(0, 12)) {
    await writeWebp(
      ogImage({
        title: `${city.name} Dijital Çözümler`,
        badge: `${city.region}`,
        eyebrow: `Nüfus ${city.population.toLocaleString('tr-TR')} · ${city.districts.length} ilçe`,
      }),
      path.join(PUBLIC, 'images', 'cities', `${city.slug}.webp`),
      { quality: 78, width: 1200 },
    )
  }
  written.push('public/images/cities/12 öncelikli şehir görseli (WebP)')

  const seconds = ((Date.now() - started) / 1000).toFixed(1)
  console.log(`Varlıklar ${seconds}s içinde üretildi:`)
  for (const item of written) console.log(`  + ${item}`)
  if (!hasCustomLogo) {
    console.log(
      '\nNot: Logo placeholder kullanıldı. Marka logosunu public/logo.custom.svg olarak koyup `npm run assets` çalıştırın.',
    )
  }
}

generate().catch((error) => {
  console.error('Varlık üretimi başarısız:', error)
  process.exit(1)
})
