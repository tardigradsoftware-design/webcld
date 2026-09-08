// src/app/api/contact/route.ts
/**
 * POST /api/contact
 * ------------------------------------------------------------------
 * 1. honeypot kontrolü        → dolu ise 200 (bot aldatma, kayıt yok)
 * 2. Zod sunucu doğrulaması   → hata varsa 400
 * 3. reCAPTCHA v3             → score < 0.5 ise 403
 * 4. Upstash rate limit       → 3 istek/saat/IP → 429
 * 5. Supabase contacts kaydı
 * 6. Resend: admin bildirimi
 * 7. Resend: kullanıcıya otomatik yanıt
 * 8. 200 + başarı mesajı
 */

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { contactSchema, normalizePhone } from '@/lib/validations'
import { checkContactRateLimit, verifyRecaptcha } from '@/lib/ratelimit'
import { insertContact, isSupabaseConfigured } from '@/lib/supabase'
import { isResendConfigured, sendAdminNotification, sendAutoReply } from '@/lib/resend'
import { CONTACT } from '@/lib/constants'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 64 * 1024

function clientIp(): string {
  const headerList = headers()
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headerList.get('x-real-ip') ?? 'unknown'
}

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status })
}

export async function GET() {
  return json(200, {
    ok: true,
    service: 'contact',
    supabase: isSupabaseConfigured ? 'configured' : 'not_configured',
    email: isResendConfigured ? 'configured' : 'not_configured',
    recaptcha: process.env.RECAPTCHA_SECRET_KEY ? 'configured' : 'not_configured',
  })
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_BODY_BYTES) {
      return json(413, { message: 'İstek çok büyük. Lütfen mesajınızı kısaltın.' })
    }
    payload = JSON.parse(text || '{}')
  } catch {
    return json(400, { message: 'Geçersiz istek gövdesi.' })
  }

  const raw = (payload ?? {}) as Record<string, unknown>

  // 1) Honeypot — botlar gizli alanı doldurur; 200 dönerek başarılı olduğuna inandırırız
  if (typeof raw.honeypot === 'string' && raw.honeypot.trim().length > 0) {
    return json(200, { ok: true, message: 'Teşekkürler! Talebiniz alındı.' })
  }

  // 2) Sunucu tarafı doğrulama
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return json(400, {
      message: firstIssue?.message ?? 'Lütfen form alanlarını kontrol edin.',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    })
  }

  const values = parsed.data

  // 3) reCAPTCHA v3
  const captcha = await verifyRecaptcha(values.recaptchaToken)
  if (!captcha.ok) {
    return json(403, {
      message: 'Güvenlik doğrulaması başarısız oldu. Lütfen sayfayı yenileyip tekrar deneyin.',
    })
  }

  // 4) Rate limit (IP bazlı)
  const ip = clientIp()
  const limit = await checkContactRateLimit(ip)
  if (!limit.success) {
    return NextResponse.json(
      {
        message: 'Çok fazla deneme yapıldı. Lütfen 1 saat sonra tekrar deneyin.',
        retryAfter: limit.resetInSeconds,
      },
      {
        status: 429,
        headers: limit.resetInSeconds ? { 'Retry-After': String(limit.resetInSeconds) } : undefined,
      },
    )
  }

  const sourceUrl =
    typeof raw.sourceUrl === 'string' && raw.sourceUrl.startsWith('http') ? raw.sourceUrl : null

  // 5) Supabase kaydı
  const dbResult = await insertContact({
    name: values.name,
    email: values.email,
    phone: values.phone ? normalizePhone(values.phone) : null,
    company: values.company || null,
    service: values.service || null,
    city: values.city || null,
    message: values.message,
    kvkk_accepted: values.kvkkAccepted,
    source_url: sourceUrl,
    ip_address: ip === 'unknown' ? null : ip,
  })

  // 6) + 7) E-posta bildirimleri
  const adminMail = await sendAdminNotification(values, { sourceUrl: sourceUrl ?? undefined, ip })
  const autoMail = await sendAutoReply(values)

  // Kurulu sistemlerden en az biri talebi almışsa kullanıcıya başarı döneriz.
  // Ortam değişkenleri hiç kurulu değilse (geliştirme) talep konsola loglanır ve
  // form akışı bozulmaz; üretimde Supabase+Resend zorunludur.
  const dbFailed = isSupabaseConfigured && !dbResult.ok
  const mailFailed = isResendConfigured && !adminMail.ok
  if (dbFailed && mailFailed) {
    console.error('[api/contact] teslim edilemedi', {
      dbError: dbResult.error,
      mailError: adminMail.error,
    })
    return json(500, {
      message: `Bir sorun oluştu. Lütfen ${CONTACT.email} adresine yazın; en kısa sürede dönüş yapacağız.`,
    })
  }

  if (!isSupabaseConfigured || !isResendConfigured) {
    console.info(
      '[api/contact] geliştirme modu — kayıt depolanmadı/e-posta gönderilmedi',
      { service: values.service, city: values.city, name: values.name },
    )
  }

  const reference = dbResult.id ? dbResult.id.slice(0, 8).toLocaleUpperCase('tr-TR') : undefined

  return json(200, {
    ok: true,
    message: 'Teşekkürler! En geç 24 saat içinde dönüş yapacağız.',
    reference,
    warnings: [
      dbResult.ok ? null : 'database_unavailable',
      autoMail.ok ? null : 'auto_reply_failed',
    ].filter(Boolean),
  })
}
