// src/components/seo/JsonLd.tsx
// JSON-LD bloğunu <script type="application/ld+json"> olarak basar.

import type { JsonLd as JsonLdType } from '@/lib/schemas'

interface Props {
  data: JsonLdType | (JsonLdType | null | undefined)[] | null | undefined
  id?: string
}

export function JsonLd({ data, id }: Props) {
  if (!data) return null
  const payload = Array.isArray(data)
    ? (data.filter(Boolean) as JsonLdType[])
    : data
  if (Array.isArray(payload) && payload.length === 0) return null

  return (
    <script
      id={id}
      type="application/ld+json"
      // İçerik lib/schemas.ts tarafından üretilir; kullanıcı girdisi escape edilir.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
      suppressHydrationWarning
    />
  )
}

export default JsonLd
