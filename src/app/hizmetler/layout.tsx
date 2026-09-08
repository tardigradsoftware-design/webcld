// src/app/hizmetler/layout.tsx
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import { serviceCount } from '@/lib/services'

export const metadata: Metadata = buildMetadata({
  title: `Hizmetlerimiz — ${serviceCount} Hizmet Alanı`,
  description: `${SITE.name} hizmetleri: kurumsal web sitesi, e-ticaret, özel yazılım ve yönetim panelleri, SaaS, SEO, dijital otomasyon, altyapı ve yapay zekâ. ${serviceCount} hizmet alanı, Türkiye geneli.`,
  path: '/hizmetler/',
  keywords: [
    'web sitesi hizmeti',
    'yazılım geliştirme hizmeti',
    'SEO hizmeti',
    'dijital dönüşüm hizmeti',
    'özel yazılım firması',
  ],
  image: '/images/og/hizmetler-og.webp',
})

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
