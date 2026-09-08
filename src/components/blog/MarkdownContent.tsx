// src/components/blog/MarkdownContent.tsx
/**
 * Basit markdown benzeri blog içeriğini erişilebilir HTML’e çevirir.
 * Desteklenenler: ## başlık, paragraf, - madde, 1. sıralı madde, ``` kod bloğu,
 * **kalın**, `kod`, [metin](url).
 *
 * Ayrıca `autoLinks` ile hizmet/şehir adlarının içerikte ilk geçtiği yeri otomatik
 * iç linke çevirir (SEO iç link ağı). Her terim en fazla bir kez linklenir.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'

import { parseContent, slugify, cn } from '@/lib/utils'

export interface AutoLink {
  text: string
  href: string
}

interface MarkdownContentProps {
  content: string
  className?: string
  /** Otomatik iç linkler — her biri içerikte yalnızca 1 kez linklenir */
  autoLinks?: AutoLink[]
  /** Başlık id öneki (sayfa içi çakışmaları önler) */
  idPrefix?: string
}

/** Kalan link bütçesi (terim → kaç kez daha linklenebilir) */
type Budget = Map<string, number>

const INLINE_PATTERN =
  /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)|\*\*([^*]+)\*\*|`([^`]+)`/g

function LinkNode({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  const className =
    'font-medium text-brand-navy-700 underline decoration-brand-cyan/60 underline-offset-4 hover:text-brand-navy-900'
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/** Otomatik linklenecek terimleri uzunluğa göre sıralar (uzun terim öncelikli) */
function pickAutoLink(
  text: string,
  offset: number,
  autoLinks: AutoLink[],
  budget: Budget,
): { start: number; length: number; href: string; phrase: string } | null {
  const haystack = text.slice(offset).toLocaleLowerCase('tr-TR')
  let best: { start: number; length: number; href: string; phrase: string } | null = null

  for (const link of autoLinks) {
    if ((budget.get(link.text) ?? 0) <= 0) continue
    const phrase = link.text.toLocaleLowerCase('tr-TR')
    const found = haystack.indexOf(phrase)
    if (found === -1) continue
    if (!best || found < best.start || (found === best.start && phrase.length > best.length)) {
      best = { start: found, length: phrase.length, href: link.href, phrase: link.text }
    }
  }
  return best
}

/** Satır içi işaretlemeyi React düğümlerine çevirir */
function renderInline(
  text: string,
  keyBase: string,
  budget: Budget,
  autoLinks: AutoLink[],
): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let index = 0
  const pattern = new RegExp(INLINE_PATTERN.source, 'g')
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(...withAutoLinks(text.slice(cursor, match.index), keyBase, budget, autoLinks, index))
      index += 100
    }
    const key = `${keyBase}-m${index++}`
    if (match[1] && match[2]) {
      nodes.push(
        <LinkNode key={key} href={match[2]}>
          {match[1]}
        </LinkNode>,
      )
    } else if (match[3]) {
      nodes.push(
        <strong key={key} className="font-semibold text-brand-ink">
          {match[3]}
        </strong>,
      )
    } else if (match[4]) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-brand-navy-50 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-navy-700"
        >
          {match[4]}
        </code>,
      )
    }
    cursor = match.index + match[0].length
  }

  if (cursor < text.length) {
    nodes.push(...withAutoLinks(text.slice(cursor), keyBase, budget, autoLinks, index))
  }
  if (!nodes.length) nodes.push(text)
  return nodes
}

/** Düz metin parçasında otomatik iç linkleri uygular */
function withAutoLinks(
  text: string,
  keyBase: string,
  budget: Budget,
  autoLinks: AutoLink[],
  seed = 0,
): ReactNode[] {
  if (!text || !autoLinks.length) return text ? [text] : []
  const nodes: ReactNode[] = []
  let cursor = 0
  let index = seed

  for (;;) {
    const found = pickAutoLink(text, cursor, autoLinks, budget)
    if (!found) break
    const start = cursor + found.start
    if (start > cursor) nodes.push(text.slice(cursor, start))
    nodes.push(
      <LinkNode key={`${keyBase}-a${index++}`} href={found.href}>
        {text.slice(start, start + found.length)}
      </LinkNode>,
    )
    budget.set(found.phrase, 0)
    cursor = start + found.length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

export function MarkdownContent({
  content,
  className,
  autoLinks = [],
  idPrefix = 'b',
}: MarkdownContentProps) {
  const sections = parseContent(content)

  const budget: Budget = new Map()
  for (const link of autoLinks) {
    const phrase = link.text.trim()
    if (phrase && !budget.has(phrase)) budget.set(phrase, 1)
  }
  const usableLinks = autoLinks.filter((link) => budget.has(link.text.trim()))

  const toc = sections
    .filter((section) => section.heading)
    .map((section) => ({
      heading: section.heading as string,
      id: `${idPrefix}-${slugify(section.heading as string)}`,
    }))

  return (
    <div className={cn('relative', className)}>
      {toc.length > 2 ? (
        <nav
          aria-label="İçindekiler"
          className="mb-9 rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
            İçindekiler
          </h2>
          <ol className="mt-3 space-y-1.5">
            {toc.map((item, itemIndex) => (
              <li key={item.id} className="flex gap-2.5 text-[14.5px]">
                <span className="font-mono text-xs text-brand-navy-300">{itemIndex + 1}.</span>
                <a
                  href={`#${item.id}`}
                  className="text-brand-ink-soft underline-offset-4 transition hover:text-brand-navy-900 hover:underline"
                >
                  {item.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <div className="prose-brand">
        {sections.map((section, sectionIndex) => {
          const headingId = section.heading
            ? `${idPrefix}-${slugify(section.heading)}`
            : undefined
          return (
            <section key={headingId ?? `sec-${sectionIndex}`} aria-labelledby={headingId}>
              {section.heading ? (
                <h2 id={headingId} className="scroll-mt-28">
                  {renderInline(section.heading, `h-${sectionIndex}`, new Map(), [])}
                </h2>
              ) : null}

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`p-${sectionIndex}-${paragraphIndex}`}>
                  {renderInline(
                    paragraph,
                    `p-${sectionIndex}-${paragraphIndex}`,
                    budget,
                    usableLinks,
                  )}
                </p>
              ))}

              {section.bullets.length ? (
                <ul>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`ul-${sectionIndex}-${bulletIndex}`}>
                      {renderInline(bullet, `ul-${sectionIndex}-${bulletIndex}`, budget, usableLinks)}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.ordered.length ? (
                <ol>
                  {section.ordered.map((item, itemIndex) => (
                    <li key={`ol-${sectionIndex}-${itemIndex}`}>
                      {renderInline(item, `ol-${sectionIndex}-${itemIndex}`, budget, usableLinks)}
                    </li>
                  ))}
                </ol>
              ) : null}

              {section.code.map((block, codeIndex) => (
                <pre key={`code-${sectionIndex}-${codeIndex}`}>
                  <code>{block}</code>
                </pre>
              ))}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default MarkdownContent
