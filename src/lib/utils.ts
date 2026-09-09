// src/lib/utils.ts
// Yardımcı fonksiyonlar

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind class birleştirme (shadcn/ui standardı) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TR_MAP: Record<string, string> = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ş: 's', Ş: 's',
  ü: 'u', Ü: 'u', â: 'a', î: 'i', û: 'u',
}

/** Türkçe karakterlere duyarlı slug üretici */
export function slugify(input: string): string {
  return input
    .split('')
    .map((ch) => TR_MAP[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Basitleştirilmiş Türkçe başlık hâli (şehir/hizmet adları için) */
export function titleCase(input: string): string {
  return input
    .split(' ')
    .map((word) => {
      if (!word) return word
      const first = word[0] === 'i' ? 'İ' : word[0].toLocaleUpperCase('tr-TR')
      return first + word.slice(1).toLocaleLowerCase('tr-TR')
    })
    .join(' ')
}

/** Kelime sayısı (Türkçe içerik kontrolü için) */
export function countWords(text: string): number {
  return text
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

/** Metni kelime bazında kısalt */
export function truncateWords(text: string, max: number): string {
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= max) return text
  return `${words.slice(0, max).join(' ')}…`
}

/** Karakter bazında kısalt (meta description güvenlik ağı) */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd()}…`
}

/**
 * Deterministik PRNG (mulberry32) — aynı seed her zaman aynı çıktıyı verir.
 * Placeholder görsel / dekoratif varyasyonlar için kullanılır.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hashString(input: string): number {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash)
}

/** Aralık içinde deterministik tam sayı */
export function seededInt(rand: () => number, min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min
}

/** Aralık içinde seçme */
export function pick<T>(rand: () => number, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length) % list.length]
}

/** Diziyi deterministik karıştır */
export function shuffle<T>(rand: () => number, list: readonly T[]): T[] {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Sayı biçimlendirme: 16.800.000 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('tr-TR').format(value)
}

/** Basit tarih biçimi: 12 Mart 2026 */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** Markdown benzeri içeriği bölüm listesine ayırır (## başlıkları) */
export interface ContentSection {
  heading: string | null
  paragraphs: string[]
  bullets: string[]
  /** "1." ile başlayan sıralı liste maddeleri */
  ordered: string[]
  /** ``` ile sarılmış kod blokları */
  code: string[]
}

const emptySection = (): ContentSection => ({
  heading: null,
  paragraphs: [],
  bullets: [],
  ordered: [],
  code: [],
})

function isEmpty(section: ContentSection): boolean {
  return (
    !section.heading &&
    !section.paragraphs.length &&
    !section.bullets.length &&
    !section.ordered.length &&
    !section.code.length
  )
}

export function parseContent(content: string): ContentSection[] {
  const lines = content.split('\n')
  const sections: ContentSection[] = []
  let current: ContentSection = emptySection()
  let inCode = false
  let codeBuffer: string[] = []

  for (const raw of lines) {
    const line = raw.trimEnd()
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      if (inCode) {
        current.code.push(codeBuffer.join('\n'))
        codeBuffer = []
        inCode = false
      } else {
        inCode = true
      }
      continue
    }
    if (inCode) {
      codeBuffer.push(line)
      continue
    }

    if (!trimmed) continue

    if (trimmed.startsWith('## ')) {
      if (!isEmpty(current)) sections.push(current)
      current = emptySection()
      current.heading = trimmed.replace(/^##\s+/, '')
      continue
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      current.bullets.push(trimmed.replace(/^[-*]\s+/, ''))
      continue
    }
    const orderedMatch = /^(\d{1,2})[.)]\s+(.*)$/.exec(trimmed)
    if (orderedMatch) {
      current.ordered.push(orderedMatch[2])
      continue
    }
    current.paragraphs.push(trimmed)
  }

  if (inCode && codeBuffer.length) current.code.push(codeBuffer.join('\n'))
  if (!isEmpty(current)) sections.push(current)
  return sections
}

/** Tel numarasından arama linki */
export function telLink(phone?: string): string | null {
  if (!phone) return null
  const digits = phone.replace(/[^\d+]/g, '')
  return digits.length > 5 ? `tel:${digits}` : null
}
