// src/components/ui/button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-cta-gradient text-white shadow-glow-blue hover:brightness-110 hover:shadow-glow active:scale-[0.98]',
        navy: 'bg-brand-navy-900 text-white hover:bg-brand-navy-800 active:scale-[0.98]',
        outline:
          'border border-brand-navy-200 bg-white text-brand-navy-900 hover:border-brand-cyan hover:text-brand-navy-700 hover:bg-brand-navy-50',
        'outline-light':
          'border border-white/25 bg-white/5 text-white backdrop-blur hover:border-brand-cyan-light/70 hover:bg-white/10',
        ghost: 'text-brand-navy-800 hover:bg-brand-navy-50 hover:text-brand-navy-900',
        'ghost-light': 'text-white/80 hover:bg-white/10 hover:text-white',
        link: 'text-brand-navy-700 underline-offset-4 hover:underline',
        soft: 'bg-brand-navy-50 text-brand-navy-800 hover:bg-brand-navy-100',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-13 rounded-xl px-7 py-3 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
