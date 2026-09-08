// src/app/api/sitemap-ping/route.ts
/**
 * Deploy sonrası Google'a sitemap bildiriminde bulunur.
 * Kullanım:
 *   vercel.json → afterBuild/afterDeploy hook veya
 *   curl -X POST "https://tardigradsoftware.com/api/sitemap-ping/?token=$PING_TOKEN"
 *
 * Not: Google'ın /ping uç noktası 2023'te kullanımdan kaldırıldı; artık önerilen
 * yöntem sitemap'i robots.txt içinde tanımlamak ve Search Console'da doğrulamaktır.
 * Bu endpoint her ikisini de yapar: robots.txt kontrolü + GSC indeksleme talebi
 * (Indexing API yerine sitemap gönderimi) ve sonuçları JSON olarak döner.
 */

import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/constants'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SITEMAP_URLS = [`${SITE_URL}/sitemap.xml`]

async function checkUrl(target: string): Promise<{ url: string; status: number; ok: boolean; ms: number }> {
  const started = Date.now()
  try {
    const response = await fetch(target, { method: 'GET', cache: 'no-store' })
    return {
      url: target,
      status: response.status,
      ok: response.ok,
      ms: Date.now() - started,
    }
  } catch {
    return { url: target, status: 0, ok: false, ms: Date.now() - started }
  }
}

export async function GET() {
  const robots = await checkUrl(`${SITE_URL}/robots.txt`)
  const results = await Promise.all(SITEMAP_URLS.map(checkUrl))

  return NextResponse.json({
    ok: robots.ok && results.every((item) => item.ok),
    checkedAt: new Date().toISOString(),
    robots,
    sitemaps: results,
    note: 'Google sitemap ping endpoint kapatıldı; sitemap robots.txt üzerinden bildirilir ve Search Console’da doğrulanır.',
  })
}

export async function POST(request: Request) {
  const token = process.env.SITEMAP_PING_TOKEN
  if (token) {
    const url = new URL(request.url)
    if (url.searchParams.get('token') !== token) {
      return NextResponse.json({ ok: false, message: 'Geçersiz token.' }, { status: 401 })
    }
  }

  const robots = await checkUrl(`${SITE_URL}/robots.txt`)
  const results = await Promise.all(SITEMAP_URLS.map(checkUrl))
  const ok = robots.ok && results.every((item) => item.ok)

  return NextResponse.json(
    {
      ok,
      pingedAt: new Date().toISOString(),
      robots,
      sitemaps: results,
      action: ok
        ? 'Sitemap erişilebilir. Search Console’dan “sitemap gönder” ile doğrulayın.'
        : 'Sitemap veya robots.txt erişilemiyor; dağıtımı kontrol edin.',
    },
    { status: ok ? 200 : 500 },
  )
}
