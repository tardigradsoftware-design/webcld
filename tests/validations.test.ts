import { describe, expect, it } from 'vitest'
import { contactSchema, normalizePhone } from '../src/lib/validations'

describe('Form Validation & Phone Normalization', () => {
  it('validates a correct contact form payload', () => {
    const payload = {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '05321234567',
      company: 'Yılmaz A.Ş.',
      service: 'Kurumsal Web Sitesi',
      city: 'İstanbul',
      message: 'Merhaba, şirketimiz için modern ve hızlı bir web sitesi yaptırmak istiyoruz.',
      kvkkAccepted: true,
      recaptchaToken: 'dummy-token',
    }

    const result = contactSchema.safeParse(payload)
    expect(result.success).toBe(true)
  })

  it('rejects unaccepted KVKK consent', () => {
    const payload = {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '05321234567',
      message: 'Merhaba, projemiz hakkında bilgi almak istiyoruz.',
      kvkkAccepted: false,
    }

    const result = contactSchema.safeParse(payload)
    expect(result.success).toBe(false)
  })

  it('rejects messages shorter than 20 characters', () => {
    const payload = {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      message: 'Kısa mesaj',
      kvkkAccepted: true,
    }

    const result = contactSchema.safeParse(payload)
    expect(result.success).toBe(false)
  })

  it('normalizes Turkish phone numbers correctly', () => {
    expect(normalizePhone('0 532 123 45 67')).toBe('+905321234567')
    expect(normalizePhone('+90 (532) 123-4567')).toBe('+905321234567')
    expect(normalizePhone('5321234567')).toBe('+905321234567')
  })
})
