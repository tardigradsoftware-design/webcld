// src/components/seo/ArticleSchema.tsx
import type { BlogPost } from '@/types'
import { articleSchema } from '@/lib/schemas'
import { JsonLd } from '@/components/seo/JsonLd'

export function ArticleSchema({ post, id = 'ld-article' }: { post: BlogPost; id?: string }) {
  return <JsonLd data={articleSchema(post)} id={id} />
}

export default ArticleSchema
