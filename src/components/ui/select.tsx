// src/components/ui/select.tsx
import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  placeholder?: string
  onValueChange?: (value: string) => void
  /** Hem onValueChange hem onChange tetiklenir */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

/**
 * Radix yerine native <select> kullanıyoruz: mobilde yerel seçici açılır,
 * erişilebilirlik ve JS boyutu açısından avantaj sağlar.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, onValueChange, onChange, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border border-brand-navy-200 bg-white px-3.5 pr-10 text-[15px] text-brand-ink shadow-sm transition-colors focus-visible:border-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/25 disabled:cursor-not-allowed disabled:opacity-60',
            className,
          )}
          onChange={(event) => {
            onValueChange?.(event.target.value)
            onChange?.(event)
          }}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy-400" />
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select }
