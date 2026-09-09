// src/components/ui/textarea.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[132px] w-full rounded-lg border border-brand-navy-200 bg-white px-3.5 py-3 text-[15px] leading-relaxed text-brand-ink shadow-sm transition-colors placeholder:text-brand-text-muted/70 focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/25 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-red-400',
        className,
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
