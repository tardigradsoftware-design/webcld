// src/components/seo/LocalBusinessSchema.tsx
import type { City } from '@/types'
import { localBusinessSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

export function LocalBusinessSchema({ city, id = 'ld-localbusiness' }: { city?: City; id?: string }) {
  return <JsonLd data={localBusinessSchema(city)} id={id} />
}

export default LocalBusinessSchema
