// src/components/sections/FAQ.tsx
import type { ReactNode } from 'react'
import type { FAQ as FAQType } from '@/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface FAQProps {
  items: FAQType[]
  className?: string
  /** Tek seferde birden fazla açık olabilir mi? */
  multiple?: boolean
  /** Varsayılan açık öğe */
  defaultValue?: string
}

function renderItems(items: FAQType[]): ReactNode {
  return items.map((item, index) => (
    <AccordionItem key={item.question} value={`faq-${index}`}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))
}

export function FAQ({ items, className, multiple = false, defaultValue }: FAQProps) {
  if (!items.length) return null
  const defaultOpen = defaultValue ?? 'faq-0'
  const grid = cn('grid gap-3', className)

  // Radix Accordion tek/çok seçim tiplerini ayırır; koşullu render en güvenli yol.
  return multiple ? (
    <Accordion type="multiple" className={grid}>
      {renderItems(items)}
    </Accordion>
  ) : (
    <Accordion type="single" collapsible defaultValue={defaultOpen} className={grid}>
      {renderItems(items)}
    </Accordion>
  )
}

export default FAQ
