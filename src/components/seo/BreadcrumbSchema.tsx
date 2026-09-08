// src/components/seo/BreadcrumbSchema.tsx
import type { BreadcrumbItem } from '@/types'
import { breadcrumbSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

export function BreadcrumbSchema({ items, id = 'ld-breadcrumb' }: { items: BreadcrumbItem[]; id?: string }) {
  return <JsonLd data={breadcrumbSchema(items)} id={id} />
}

export default BreadcrumbSchema
