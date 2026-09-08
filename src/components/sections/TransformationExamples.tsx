// src/components/sections/TransformationExamples.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { TRANSFORMATION_EXAMPLES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { LucideIcon } from '@/components/common/LucideIcon'

export function TransformationExamples({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      {TRANSFORMATION_EXAMPLES.map((example, index) => (
        <motion.article
          key={example.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="card-navy group relative overflow-hidden p-6"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/12 text-cyan-300">
              <LucideIcon name={example.icon} fallback="Sparkles" className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="text-lg font-semibold text-white">{example.title}</h3>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
            <span className="rounded-lg border border-white/12 bg-white/[0.05] px-3 py-1.5 text-sm text-white/60 line-through decoration-white/30">
              {example.before}
            </span>
            <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" aria-hidden />
            <span className="rounded-lg bg-cta-gradient px-3 py-1.5 text-sm font-semibold text-white">
              {example.after}
            </span>
            <span className="ml-auto rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
              {example.gain}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/65">{example.description}</p>
        </motion.article>
      ))}
    </div>
  )
}

export default TransformationExamples
