// src/lib/resend.ts
// E-posta gönderimi (Resend) — admin bildirimi + kullanıcıya otomatik yanıt.

import { Resend } from 'resend'
import { CONTACT, SITE } from '@/lib/constants'
import type { ContactFormData } from '@/types'

const apiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL ?? CONTACT.email
const toEmail = process.env.RESEND_TO_EMAIL ?? CONTACT.email

export const isResendConfigured = Boolean(apiKey)

let resendClient: Resend | null = null
function getResend(): Resend | null {
  if (!apiKey) return null
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Ortak e-posta kabuğu — lacivert/mavi/beyaz marka teması */
function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="tr">
  <body style="margin:0;padding:0;background:#F5F8FF;font-family:Inter,Arial,sans-serif;color:#0B1B3A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F8FF;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #DBE6FE;">
            <tr>
              <td style="background:#0F1B3D;padding:22px 28px;">
                <span style="color:#60A5FA;font-family:monospace;font-size:15px;letter-spacing:1px;">${escapeHtml(SITE.name)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:20px;color:#0F1B3D;">${escapeHtml(title)}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#F5F8FF;border-top:1px solid #DBE6FE;font-size:12px;color:#6B7280;">
                ${escapeHtml(SITE.name)} · ${escapeHtml(CONTACT.address.full)} · ${escapeHtml(CONTACT.email)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function row(label: string, value?: string | null): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 0;font-size:13px;color:#6B7280;width:130px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-size:14px;color:#0B1B3A;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`
}

export interface SendResult {
  ok: boolean
  skipped?: boolean
  error?: string
}

/** Admin'e yeni talep bildirimi */
export async function sendAdminNotification(data: ContactFormData, meta: {
  sourceUrl?: string
  ip?: string
}): Promise<SendResult> {
  const resend = getResend()
  if (!resend) return { ok: false, skipped: true, error: 'RESEND_NOT_CONFIGURED' }

  const body = `
    <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#1E3A6E;">
      Web sitesi üzerinden yeni bir iletişim talebi geldi.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${row('Ad Soyad', data.name)}
      ${row('E-posta', data.email)}
      ${row('Telefon', data.phone)}
      ${row('Firma', data.company)}
      ${row('İlgilendiği Hizmet', data.service)}
      ${row('Şehir', data.city)}
      ${row('Kaynak Sayfa', meta.sourceUrl)}
      ${row('IP', meta.ip)}
    </table>
    <div style="margin-top:18px;padding:14px 16px;background:#F5F8FF;border-left:3px solid #2563EB;border-radius:6px;">
      <div style="font-size:12px;color:#6B7280;margin-bottom:6px;">Mesaj</div>
      <div style="font-size:14px;line-height:1.6;color:#0B1B3A;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    </div>`

  try {
    await resend.emails.send({
      from: `${SITE.name} <${fromEmail}>`,
      to: toEmail.split(',').map((item) => item.trim()),
      replyTo: data.email,
      subject: `Yeni talep: ${data.name}${data.service ? ` — ${data.service}` : ''}`,
      html: layout('Yeni iletişim talebi', body),
    })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'SEND_FAILED' }
  }
}

/** Kullanıcıya otomatik yanıt */
export async function sendAutoReply(data: ContactFormData): Promise<SendResult> {
  const resend = getResend()
  if (!resend) return { ok: false, skipped: true, error: 'RESEND_NOT_CONFIGURED' }

  const body = `
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#1E3A6E;">
      Merhaba ${escapeHtml(data.name.split(' ')[0])},
    </p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#1E3A6E;">
      Talebiniz bize ulaştı. ${escapeHtml(CONTACT.responseTime)}.
    </p>
    <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#1E3A6E;">
      Görüşmeye hazırlıklı gelmemiz için aşağıdaki bilgileri paylaşmanız yeterli:
    </p>
    <ul style="margin:0 0 18px;padding-left:20px;font-size:14px;line-height:1.8;color:#0B1B3A;">
      <li>Projenizin kısa tanımı ve hedefi</li>
      <li>Varsa mevcut web siteniz veya kullandığınız yazılımlar</li>
      <li>Tahmini takvim beklentiniz</li>
    </ul>
    <p style="margin:0;font-size:14px;line-height:1.7;color:#1E3A6E;">
      Acil konular için bu e-postayı yanıtlayabilirsiniz.
    </p>`

  try {
    await resend.emails.send({
      from: `${SITE.name} <${fromEmail}>`,
      to: data.email,
      subject: `Talebiniz alındı — ${SITE.name}`,
      html: layout('Talebiniz bize ulaştı', body),
    })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'SEND_FAILED' }
  }
}
