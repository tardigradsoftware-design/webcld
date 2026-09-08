// src/app/blog/layout.tsx
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { blogPosts } from '@/lib/blog-posts'


export const metadata: Metadata = buildMetadata({
  title: `Blog — Web, Yazılım, SEO ve Dijital Dönüşüm Rehberleri`,
  description: `${blogPosts.length} rehber içerik: kurumsal web sitesi, e-ticaret, SEO, özel yazılım, SaaS, altyapı, yapay zekâ ve dijital dönüşüm hakkında pratik bilgiler.`,
  path: '/blog/',
  keywords: ['web tasarım blog', 'SEO rehberi', 'dijital dönüşüm blog', 'yazılım geliştirme rehberi'],
  image: '/images/og/blog-og.webp',
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
