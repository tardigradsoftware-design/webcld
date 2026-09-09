// src/components/forms/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import { AlertTriangle, CheckCircle2, Loader2, Send } from 'lucide-react'

import { contactSchema, normalizePhone, type ContactSchema } from '@/lib/validations'
import { CONTACT, FORM_SERVICE_OPTIONS } from '@/lib/constants'
import { cities } from '@/lib/cities'
import { trackFormSubmit } from '@/lib/gtag'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { FormSuccess } from '@/components/forms/FormSuccess'

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; reference?: string }
  | { status: 'error'; message: string }

interface ContactFormProps {
  /** Ön seçili hizmet adı */
  defaultService?: string
  /** Ön seçili şehir adı */
  defaultCity?: string
  /** Koyu (lacivert) zemin için 'dark', beyaz zemin için 'light' */
  variant?: 'dark' | 'light'
  className?: string
  compact?: boolean
}

const SERVICE_OPTIONS = FORM_SERVICE_OPTIONS.map((value) => ({ value, label: value }))
const CITY_OPTIONS = cities.map((city) => ({ value: city.name, label: city.name }))

const inputDark =
  'border-white/12 bg-white/[0.045] text-white placeholder:text-white/35 focus-visible:border-blue-400/70 focus-visible:bg-white/[0.07] focus-visible:ring-blue-400/25'
const labelDark = 'text-white/70'
const inputLight = 'border-brand-navy-200 bg-white text-brand-ink'
const labelLight = 'text-brand-ink-soft'

export function ContactForm({
  defaultService,
  defaultCity,
  variant = 'dark',
  className,
  compact = false,
}: ContactFormProps) {
  const pathname = usePathname()
  const dark = variant === 'dark'
  const [state, setState] = useState<SubmitState>({ status: 'idle' })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: defaultService ?? '',
      city: defaultCity ?? '',
      message: '',
      kvkkAccepted: false,
      honeypot: '',
    },
  })

  const messageValue = watch('message') ?? ''

  async function onSubmit(values: ContactSchema) {
    setState({ status: 'loading' })

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: values.phone ? normalizePhone(values.phone) : values.phone,
          sourceUrl: `${window.location.origin}${pathname}`,
        }),
      })

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string
        reference?: string
        retryAfter?: number
      }

      if (response.ok) {
        trackFormSubmit({
          service: values.service || undefined,
          city: values.city || undefined,
          sourcePage: pathname,
          location: 'form',
        })
        setState({ status: 'success', reference: payload.reference })
        reset({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: defaultService ?? '',
          city: defaultCity ?? '',
          message: '',
          kvkkAccepted: false,
          honeypot: '',
        })
        return
      }

      if (response.status === 429) {
        setState({
          status: 'error',
          message:
            payload.message ??
            'Çok fazla deneme yapıldı. Lütfen 1 saat sonra tekrar deneyin veya info@tardigradsoftware.com adresine yazın.',
        })
        return
      }

      if (response.status === 403) {
        setState({
          status: 'error',
          message: 'Güvenlik doğrulaması başarısız oldu. Lütfen sayfayı yenileyip tekrar deneyin.',
        })
        return
      }

      setState({
        status: 'error',
        message: payload.message ?? 'Bir sorun oluştu. Lütfen info@tardigradsoftware.com adresine yazın.',
      })
    } catch {
      setState({
        status: 'error',
        message: `Bağlantı sorunu. Lütfen ${CONTACT.email} adresine e-posta ile ulaşın.`,
      })
    }
  }

  if (state.status === 'success') {
    return <FormSuccess reference={state.reference} onReset={() => setState({ status: 'idle' })} />
  }

  const fieldError = (name: keyof ContactSchema) =>
    errors[name]?.message ? (
      <span
        className={cn(
          'mt-1.5 flex items-start gap-1.5 text-[12.5px] font-medium',
          dark ? 'text-rose-300' : 'text-red-600',
        )}
        role="alert"
      >
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        {String(errors[name]?.message)}
      </span>
    ) : null

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'rounded-2xl border p-5 backdrop-blur md:p-7',
        dark ? 'border-white/12 bg-white/[0.045]' : 'border-brand-navy-100 bg-white shadow-card',
        className,
      )}
      aria-labelledby="iletisim-formu-baslik"
    >
      <h2
        id="iletisim-formu-baslik"
        className={cn('text-xl font-semibold', dark ? 'text-white' : 'text-brand-ink')}
      >
        Projenizi anlatın
      </h2>
      <p className={cn('mt-1.5 text-sm', dark ? 'text-white/60' : 'text-brand-ink-soft/70')}>
        Formu doldurun, {CONTACT.responseTime.toLowerCase()}.
      </p>

      {/* Honeypot — görsel olarak gizli, botlar için */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Web siteniz (bu alanı boş bırakın)</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      <div className={cn('grid gap-4', compact ? '' : 'sm:grid-cols-2')}>
        <Field label="Ad Soyad *" dark={dark} error={fieldError('name')} htmlFor="name">
          <Input
            id="name"
            placeholder="Adınız ve soyadınız"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={cn(dark ? inputDark : inputLight)}
            {...register('name')}
          />
        </Field>

        <Field label="Firma" dark={dark} htmlFor="company" optional>
          <Input
            id="company"
            placeholder="Firma adı (opsiyonel)"
            autoComplete="organization"
            className={cn(dark ? inputDark : inputLight)}
            {...register('company')}
          />
        </Field>

        <Field label="E-posta *" dark={dark} error={fieldError('email')} htmlFor="email">
          <Input
            id="email"
            type="email"
            placeholder="ornek@firmaniz.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={cn(dark ? inputDark : inputLight)}
            {...register('email')}
          />
        </Field>

        <Field label="Telefon *" dark={dark} error={fieldError('phone')} htmlFor="phone">
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="05XX XXX XX XX"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={cn(dark ? inputDark : inputLight)}
            {...register('phone')}
          />
        </Field>

        <Field label="İlgilendiğiniz hizmet" dark={dark} htmlFor="service">
          <Select
            id="service"
            options={SERVICE_OPTIONS}
            placeholder="Hizmet seçin (opsiyonel)"
            className={cn(dark ? inputDark : inputLight, dark && 'text-white [&>option]:text-brand-ink')}
            value={watch('service') ?? ''}
            onValueChange={(value) => setValue('service', value, { shouldDirty: true })}
            {...register('service')}
          />
        </Field>

        <Field label="Şehir" dark={dark} htmlFor="city">
          <Select
            id="city"
            options={CITY_OPTIONS}
            placeholder="Şehir seçin (opsiyonel)"
            className={cn(dark ? inputDark : inputLight, dark && 'text-white [&>option]:text-brand-ink')}
            value={watch('city') ?? ''}
            onValueChange={(value) => setValue('city', value, { shouldDirty: true })}
            {...register('city')}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field
          label="Projeniz hakkında kısa bilgi *"
          dark={dark}
          error={fieldError('message')}
          htmlFor="message"
          counter={`${messageValue.length}/2000`}
        >
          <Textarea
            id="message"
            placeholder="Ne yapmak istiyorsunuz? Mevcut bir siteniz/yazılımınız var mı? Tahmini takvim beklentiniz nedir?"
            aria-invalid={Boolean(errors.message)}
            className={cn(dark ? inputDark : inputLight, 'min-h-[140px]')}
            {...register('message')}
          />
        </Field>
      </div>

      <label
        className={cn(
          'mt-4 flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors',
          dark
            ? 'border-white/10 bg-white/[0.03] hover:border-white/20'
            : 'border-brand-navy-100 bg-brand-paper-soft hover:border-brand-navy-200',
          errors.kvkkAccepted && (dark ? 'border-rose-400/60' : 'border-red-300'),
        )}
      >
        <input
          type="checkbox"
          className={cn(
            'mt-0.5 h-4.5 w-4.5 shrink-0 rounded border-2 accent-blue-500',
            dark ? 'border-white/25 bg-white/5' : 'border-brand-navy-200 bg-white',
          )}
          aria-invalid={Boolean(errors.kvkkAccepted)}
          {...register('kvkkAccepted')}
        />
        <span className={cn('text-[13px] leading-relaxed', dark ? 'text-white/65' : 'text-brand-ink-soft/80')}>
          <a
            href="/kvkk/"
            target="_blank"
            rel="noreferrer"
            className={cn('font-semibold underline-offset-2 hover:underline', dark ? 'text-blue-300' : 'text-brand-navy-700')}
          >
            KVKK Aydınlatma Metni
          </a>
          ’ni okudum; iletişim talebimin işlenmesine ve tarafıma dönüş yapılmasına açık rıza
          gösteriyorum. *
        </span>
      </label>
      {fieldError('kvkkAccepted')}

      {state.status === 'error' ? (
        <p
          className={cn(
            'mt-4 flex items-start gap-2 rounded-xl border p-3.5 text-sm',
            dark ? 'border-rose-400/30 bg-rose-500/10 text-rose-200' : 'border-red-200 bg-red-50 text-red-700',
          )}
          role="alert"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className={cn(
          'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 text-base font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70',
        )}
      >
        {state.status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Gönderiliyor…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Talebi Gönder
          </>
        )}
      </button>

      <p className={cn('mt-3 text-center text-[12px]', dark ? 'text-white/40' : 'text-brand-ink-soft/55')}>
        <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 align-[-2px] text-sky-400" aria-hidden />
        Bilgileriniz yalnızca talebinize dönüş yapmak için kullanılır, üçüncü taraflarla paylaşılmaz.
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
  dark,
  error,
  optional,
  counter,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  dark: boolean
  error?: React.ReactNode
  optional?: boolean
  counter?: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={htmlFor}
          className={cn('text-[13px] font-semibold', dark ? labelDark : labelLight)}
        >
          {label}
          {optional ? (
            <span className={cn('ml-1 font-normal', dark ? 'text-white/35' : 'text-brand-ink-soft/50')}>
              (opsiyonel)
            </span>
          ) : null}
        </label>
        {counter ? (
          <span className={cn('font-mono text-[11px]', dark ? 'text-white/35' : 'text-brand-ink-soft/50')}>
            {counter}
          </span>
        ) : null}
      </div>
      {children}
      {error}
    </div>
  )
}

export default ContactForm
