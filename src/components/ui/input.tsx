// src/components/ui/input.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg border border-brand-navy-200 bg-white px-3.5 py-2 text-[15px] text-brand-ink shadow-sm transition-colors placeholder:text-brand-text-muted/70 focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/25 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100',
        className,
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
