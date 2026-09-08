// src/lib/validations.ts
// Form validasyon şemaları (Zod) — hem istemci hem sunucu tarafında kullanılır.

import { z } from 'zod'

/** Türk cep telefonu: 05XX XXX XX XX / +905XXXXXXXXX */
const TURKISH_PHONE = /^(\+90|0090|0)?\s?5\d{2}\s?(\d{3}\s?\d{2}\s?\d{2}|\d{9})$/

/** Telefonu normalize eder: +905XXXXXXXXX */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('90')) return `+${digits}`
  if (digits.startsWith('0')) return `+9${digits}`
  return `+90${digits}`
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Ad soyad en az 3 karakter olmalıdır')
    .max(100, 'Ad soyad çok uzun'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Geçerli bir e-posta adresi giriniz'),
  phone: z
    .string()
    .trim()
    .regex(TURKISH_PHONE, 'Geçerli bir Türk cep telefonu giriniz (05XX XXX XX XX)'),
  company: z.string().trim().max(100, 'Firma adı çok uzun').optional().or(z.literal('')),
  service: z.string().trim().max(120).optional().or(z.literal('')),
  city: z.string().trim().max(80).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Mesaj en az 20 karakter olmalıdır')
    .max(2000, 'Mesaj çok uzun (en fazla 2000 karakter)'),
  kvkkAccepted: z
    .boolean()
    .refine((val) => val === true, 'KVKK aydınlatma metnini onaylamanız zorunludur'),
  /** Spam tuzağı — botlar doldurur, insanlar görmez */
  honeypot: z.string().max(0, 'Spam tespit edildi').optional().or(z.literal('')),
  recaptchaToken: z.string().optional().or(z.literal('')),
})

export type ContactSchema = z.infer<typeof contactSchema>

/** E-posta aboneliği / bülten formu */
export const newsletterSchema = z.object({
  email: z.string().trim().email('Geçerli bir e-posta adresi giriniz'),
  honeypot: z.string().max(0).optional().or(z.literal('')),
})

export type NewsletterSchema = z.infer<typeof newsletterSchema>
