// src/app/sehir/layout.tsx
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import { cityCount } from '@/lib/cities'


export const metadata: Metadata = buildMetadata({
  title: `Hizmet Verdiğimiz Şehirler — ${cityCount} İl`,
  description: `${SITE.name} Türkiye’nin ${cityCount} ilinde kurumsal web sitesi, yazılım, SEO ve dijital dönüşüm hizmetleri sunuyor. Şehrinize özel kapsam ve senaryoları inceleyin.`,
  path: '/sehir/',
  keywords: ['İstanbul web tasarım', 'Ankara yazılım firması', 'İzmir kurumsal web sitesi', 'şehir bazlı dijital hizmetler'],
  image: '/images/og/sehir-og.webp',
})

export default function SehirLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
