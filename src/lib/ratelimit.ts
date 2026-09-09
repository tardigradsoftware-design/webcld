// src/lib/ratelimit.ts
// Upstash Redis ile IP bazlı hız sınırlama. Yapılandırma yoksa istekleri engellemez.

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { RATE_LIMIT } from '@/lib/constants'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

export const isRatelimitConfigured = Boolean(redisUrl && redisToken)

let ratelimit: Ratelimit | null = null
function getRatelimit(): Ratelimit | null {
  if (!isRatelimitConfigured || !redisUrl || !redisToken) return null
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT.contactPerHour, '1 h'),
      analytics: true,
      prefix: 'tardigrad:contact',
    })
  }
  return ratelimit
}

export interface RatelimitResult {
  success: boolean
  limited: boolean
  remaining: number
  resetInSeconds: number
}

/** IP bazlı kontrol — Redis yoksa her zaman izin verir (geliştirme ortamı) */
export async function checkContactRateLimit(identifier: string): Promise<RatelimitResult> {
  const limiter = getRatelimit()
  if (!limiter) {
    return { success: true, limited: false, remaining: RATE_LIMIT.contactPerHour, resetInSeconds: 0 }
  }
  try {
    const result = await limiter.limit(identifier)
    return {
      success: result.success,
      limited: !result.success,
      remaining: result.remaining,
      resetInSeconds: Math.max(0, Math.ceil((result.reset - Date.now()) / 1000)),
    }
  } catch {
    // Redis erişim hatasında kullanıcıyı engelleme; yalnızca logla
    return { success: true, limited: false, remaining: 0, resetInSeconds: 0 }
  }
}

/** reCAPTCHA v3 doğrulama — anahtar tanımlı değilse atlanır */
export async function verifyRecaptcha(token?: string): Promise<{ ok: boolean; score: number; skipped: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { ok: true, score: 1, skipped: true }
  if (!token) return { ok: false, score: 0, skipped: false }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      cache: 'no-store',
    })
    const json = (await response.json()) as { success?: boolean; score?: number; action?: string }
    const score = typeof json.score === 'number' ? json.score : 0
    return { ok: Boolean(json.success) && score >= 0.5, score, skipped: false }
  } catch {
    // Doğrulama servisine ulaşılamazsa kullanıcıyı engelleme
    return { ok: true, score: 0.5, skipped: true }
  }
}
