// src/components/ui/badge.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-brand-navy-200 bg-brand-navy-50 text-brand-navy-800',
        cyan: 'border-brand-cyan/25 bg-brand-cyan/10 text-cyan-700',
        green: 'border-brand-green/25 bg-brand-green/10 text-emerald-700',
        navy: 'border-brand-navy-900 bg-brand-navy-900 text-white',
        outline: 'border-brand-navy-200 bg-white text-brand-ink-soft',
        light: 'border-white/20 bg-white/10 text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
