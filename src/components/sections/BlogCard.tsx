// src/components/sections/BlogCard.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import type { BlogPost } from '@/types'
import { blogPhoto } from '@/lib/photos'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  variant?: 'light' | 'dark'
  className?: string
}

export function BlogCard({ post, variant = 'light', className }: BlogCardProps) {
  const dark = variant === 'dark'
  const photo = blogPhoto(post)
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
    <Link
      href={`/blog/${post.slug}/`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300',
        dark
          ? 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-blue-400/45 hover:bg-white/[0.07]'
          : 'border-brand-navy-100 bg-white hover:-translate-y-1 hover:border-brand-blue/45 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/75 via-brand-navy-950/10 to-transparent"
          aria-hidden
        />
        <span className="absolute bottom-2.5 left-4 rounded-full bg-brand-navy-950/70 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-100 backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div
          className={cn(
            'flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px]',
            dark ? 'text-white/45' : 'text-brand-ink-soft/60',
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readingTime} dk okuma
          </span>
        </div>

        <h3
          className={cn(
            'mt-3 text-base font-semibold leading-snug',
            dark ? 'text-white' : 'text-brand-ink',
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            'mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed',
            dark ? 'text-white/60' : 'text-brand-ink-soft/75',
          )}
        >
          {post.excerpt}
        </p>

        <span
          className={cn(
            'mt-4 inline-flex items-center gap-1.5 text-xs font-semibold',
            dark ? 'text-blue-300' : 'text-brand-navy-600',
          )}
        >
          Yazıyı oku
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
    </motion.div>
  )
}

export default BlogCard
