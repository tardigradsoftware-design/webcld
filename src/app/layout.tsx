// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
// Fontlar self-host edilir (@fontsource-variable): build Google Fonts'a bağımlı değildir,
// kullanıcı tarayıcısı dış isteğe çıkmaz (KVKK + Core Web Vitals açısından avantaj).
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'

import './globals.css'
import { CONTACT, SITE, SITE_URL } from '@/lib/constants'
import { organizationSchema, websiteSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/common/CookieConsent'
import { FloatingActions } from '@/components/common/FloatingActions'

const inter = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2',
      style: 'normal',
    },
  ],
  display: 'swap',
  weight: '100 900',
  variable: '--font-inter',
  fallback: ['Inter', 'system-ui', 'sans-serif'],
  preload: true,
})

const jetbrainsMono = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-ext-wght-normal.woff2',
      style: 'normal',
    },
  ],
  display: 'swap',
  weight: '100 800',
  variable: '--font-jetbrains',
  fallback: ['JetBrains Mono', 'ui-monospace', 'monospace'],
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Template kullanmıyoruz: sayfa metadata yardımcıları (lib/seo.ts) başlığa
  // marka adını kendileri ekler; template çift marka üretirdi.
  title: `${SITE.name} — Kurumsal Web Sitesi, Yazılım, SEO ve Dijital Dönüşüm`,
  description: SITE.description,
  keywords: [
    'kurumsal web sitesi',
    'web sitesi tasarımı',
    'özel yazılım geliştirme',
    'CRM sistemi',
    'SaaS platformu',
    'teknik SEO',
    'lokal SEO',
    'dijital dönüşüm',
    'yönetim paneli',
    'AI chatbot',
  ],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  category: 'technology',
  alternates: { canonical: `${SITE_URL}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `${SITE_URL}/`,
    siteName: SITE.name,
    title: `${SITE.name} — Türkiye'nin İşletmeleri İçin Uçtan Uca Dijital Çözümler`,
    description: SITE.description,
    images: [
      {
        url: '/images/og/default-og.webp',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — kurumsal web sitesi, yazılım, SEO ve dijital dönüşüm`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Uçtan Uca Dijital Çözümler`,
    description: SITE.description,
    images: ['/images/og/default-og.webp'],
    creator: '@tardigradsw',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: true, address: true, email: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F1B3D' },
    { media: '(prefers-color-scheme: dark)', color: '#08112B' },
  ],
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans">
        <JsonLd data={[organizationSchema(), websiteSchema()]} id="ld-organization" />

        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          İçeriğe geç
        </a>

        <Header />

        <main id="icerik" className="flex-1">
          {children}
        </main>

        <Footer />
        <FloatingActions />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
