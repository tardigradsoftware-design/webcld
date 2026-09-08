// src/components/seo/OrganizationSchema.tsx
import { organizationSchema, websiteSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

/** Ana sayfada Organization + WebSite şemalarını birlikte basar */
export function OrganizationSchema({ withWebsite = true }: { withWebsite?: boolean }) {
  return <JsonLd data={withWebsite ? [organizationSchema(), websiteSchema()] : organizationSchema()} id="ld-organization" />
}

export default OrganizationSchema
