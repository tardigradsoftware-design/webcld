// src/components/sections/BlogCard.tsx
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import type { BlogPost } from '@/types'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  variant?: 'light' | 'dark'
  className?: string
}

export function BlogCard({ post, variant = 'light', className }: BlogCardProps) {
  const dark = variant === 'dark'
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300',
        dark
          ? 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-cyan-400/45 hover:bg-white/[0.07]'
          : 'border-brand-navy-100 bg-white hover:-translate-y-1 hover:border-brand-cyan/45 hover:shadow-card-hover',
        className,
      )}
    >
      <div
        className={cn(
          'relative flex h-36 items-center justify-center overflow-hidden',
          dark ? 'bg-brand-navy-900' : 'bg-brand-navy-50',
        )}
      >
        <div className="absolute inset-0 bg-grid-navy opacity-40" aria-hidden />
        <span
          className={cn(
            'relative font-mono text-xs uppercase tracking-[0.2em]',
            dark ? 'text-cyan-300/70' : 'text-brand-navy-500',
          )}
        >
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
            dark ? 'text-cyan-300' : 'text-brand-navy-600',
          )}
        >
          Yazıyı oku
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

export default BlogCard
