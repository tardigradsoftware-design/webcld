// src/components/seo/FAQSchema.tsx
import type { FAQ } from '@/types'
import { faqSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

export function FAQSchema({ items, id = 'ld-faq' }: { items: FAQ[]; id?: string }) {
  const schema = faqSchema(items)
  if (!schema) return null
  return <JsonLd data={schema} id={id} />
}

export default FAQSchema
