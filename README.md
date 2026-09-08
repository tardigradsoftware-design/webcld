# Tardigrad Software — tardigradsoftware.com

Kurumsal web sitesi, özel yazılım, SaaS, SEO ve dijital dönüşüm hizmetleri için
üretime hazır **Next.js 14 (App Router) + TypeScript + Tailwind CSS** projesi.

- **Dil / bölge:** `tr` / `tr-TR`, Türkiye geneli (81 il) kapsama
- **Mimari:** 43 hizmet sayfası, 12 öncelikli şehir + 69 şehir sayfası,
  60 hizmet+şehir kombinasyonu, 10 blog yazısı, kurumsal sayfalar —
  toplam **202 statik URL** (`sitemap.xml`)
- **Tema:** lacivert / mavi / beyaz (`#0A0F1E` zemin, cyan-mavi vurgular)

## Hızlı başlangıç

```bash
npm install
cp .env.example .env.local   # değerleri doldurun (boş bırakılırsa site çalışır)
npm run assets               # logo/favicon/OG görsellerini üretir (sharp)
npm run check:data           # veri bütünlüğü denetimi (43/81/60/10 kontrolü)
npm run dev                  # http://localhost:3000
npm run build && npm run start
```

Ortam değişkenleri kurulmadan da site tamamen çalışır: Supabase, Resend,
Upstash ve reCAPTCHA katmanları "kurulu değil" modunda zarifçe devre dışı
kalır (form 200 döner, uyarılar yanıtta `warnings` olarak gelir).

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (0.0.0.0:3000) |
| `npm run build` | Üretim derlemesi (207 sayfa statik üretilir) |
| `npm run start` | Üretim sunucusu |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check:data` | Hizmet/şehir/blog veri bütünlüğü + ikon adı denetimi |
| `npm run assets` | `public/` altına logo, favicon, OG ve içerik görselleri üretir |

## Dizin yapısı

```
src/
  app/
    page.tsx                    # Ana sayfa (12 bölüm)
    hizmetler/                  # /hizmetler/ + /hizmetler/[slug]/ (43 sayfa)
    hizmet/[slug]/[sehir]/      # Lokal kombinasyonlar (60 sayfa)
    sehir/                      # /sehir/ + /sehir/[slug]/ (81 sayfa)
    blog/                       # /blog/ + /blog/[slug]/ (10 yazı)
    surec/ hakkimizda/ iletisim/ kvkk/
    api/contact/route.ts        # honeypot → Zod → reCAPTCHA → rate limit → Supabase → Resend
    api/sitemap-ping/route.ts   # robots + sitemap erişilebilirlik kontrolü
    robots.ts sitemap.ts not-found.tsx
  components/
    layout/   Header, Footer, Breadcrumb, MobileMenu, Logo (<!-- LOGO SVG BURAYA -->)
    sections/ Hero, TransformationStory (scrollytelling), ServiceHero, CityHero,
              CityComboHero, ProcessSteps, Benefits, FAQ, CTA, ContactSection, …
    forms/    ContactForm (RHF + Zod), FormSuccess
    seo/      JsonLd, ServiceSchema, FAQSchema, BreadcrumbSchema, Organization…
    blog/     MarkdownContent (TOC + otomatik iç linkler)
    ui/       button, card, accordion, input, textarea, select, badge
  lib/
    services.ts  cities.ts  blog-posts.ts  constants.ts  schemas.ts  seo.ts
    supabase.ts  resend.ts  ratelimit.ts  validations.ts  gtag.ts  utils.ts
scripts/
  check-data.ts        # veri denetimi
  generate-assets.mjs  # görsel varlık üretimi (sharp + SVG)
supabase/migrations/0001_contacts.sql   # contacts tablosu + RLS + tetikleyiciler
```

## SEO özeti

- Her sayfa: benzersiz `metaTitle` (≤60), `metaDescription` (≤155), canonical,
  Open Graph + Twitter kartı (üretilen WebP görseller).
- JSON-LD: `Organization`, `WebSite`, `LocalBusiness` (şehir bazlı `areaServed`),
  `Service`/`ProfessionalService`, `FAQPage`, `BreadcrumbList`, `Article`,
  `Blog`, `ItemList`, `HowTo` (/surec/), `WebPage`.
- `robots.ts` + `sitemap.xml` (202 URL, öncelik/tarama sıklığı profilli).
- İç link ağı: hizmet ↔ şehir ↔ kombinasyon ↔ blog çapraz bağları;
  blog içeriğinde hizmet/şehir adları otomatik iç linke dönüşür.
- GA4 yalnızca çerez onayı sonrası yüklenir; Vercel Analytics her zaman açıktır.

## Form akışı (POST /api/contact)

1. **Honeypot** — gizli alan doluysa 200 dönülür, kayıt atılmaz.
2. **Zod** sunucu doğrulaması (TR telefon regex, 20–2000 karakter mesaj, KVKK onayı).
3. **reCAPTCHA v3** — skor < 0.5 → 403.
4. **Upstash** hız sınırı — IP başına 3 istek/saat → 429 (+ `Retry-After`).
5. **Supabase** `contacts` tablosuna kayıt (RLS: yalnızca `service_role`).
6. **Resend** — yönetici bildirimi + kullanıcıya otomatik yanıt.
7. `200` + referans kodu. Kurulum eksikse katman atlanır, akış bozulmaz.

Veritabanı şeması: `supabase/migrations/0001_contacts.sql`
(`supabase db push` veya Dashboard → SQL Editor ile uygulayın).

## Logo

Tüm bileşenlerde logo yer tutucudur: `<!-- LOGO SVG BURAYA -->`.
Marka SVG’si teslim edildiğinde:

1. Dosyayı `public/logo.custom.svg` olarak koyun,
2. `npm run assets` çalıştırın — favicon, apple-touch-icon ve OG görselleri
   yeni logoyla yeniden üretilir (`public/logo.svg` güncellenir).

## Dağıtım (Vercel + Cloudflare)

- Framework: Next.js; build `npm run build`, output `.next`.
- Ortam değişkenlerini `.env.example` listesinden tanımlayın.
- Cloudflare: proxy + CDN kuralları `/images/*` ve `/_next/static/*` için
  `Cache-Control: public, max-age=31536000, immutable` (next.config.mjs başlıklarıyla uyumlu).
- `www` → non-www yönlendirmesi ve güvenlik başlıkları `next.config.mjs` içinde hazır.
