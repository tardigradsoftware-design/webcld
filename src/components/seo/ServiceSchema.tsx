// src/components/seo/ServiceSchema.tsx
import type { City, Service } from '@/types'
import { serviceSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

interface Props {
  service: Service
  pageUrl: string
  city?: City
  name?: string
  description?: string
  id?: string
}

export function ServiceSchema({ service, pageUrl, city, name, description, id = 'ld-service' }: Props) {
  return <JsonLd data={serviceSchema(service, pageUrl, { city, name, description })} id={id} />
}

export default ServiceSchema
