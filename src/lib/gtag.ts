// src/lib/gtag.ts
// GA4 ölçüm yardımcıları (yalnızca istemci tarafında çağrılır).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

/** Birincil dönüşüm: form gönderimi */
export function trackFormSubmit(params: {
  service?: string
  city?: string
  sourcePage: string
  location: 'form' | 'footer' | 'hero' | 'cta'
}) {
  trackEvent('form_submit', {
    event_category: 'contact',
    event_label: params.service ?? 'genel',
    city: params.city ?? '',
    source_page: params.sourcePage,
    form_location: params.location,
  })
}

/** CTA tıklaması */
export function trackCtaClick(label: string, pagePath: string) {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: label,
    page_path: pagePath,
  })
}

/** WhatsApp tıklaması (ikincil dönüşüm) */
export function trackWhatsappClick(pagePath: string) {
  trackEvent('whatsapp_click', { event_category: 'contact', page_path: pagePath })
}

/** Telefon tıklaması (ikincil dönüşüm) */
export function trackPhoneClick(pagePath: string) {
  trackEvent('phone_click', { event_category: 'contact', page_path: pagePath })
}

/** E-posta tıklaması */
export function trackEmailClick(pagePath: string) {
  trackEvent('email_click', { event_category: 'contact', page_path: pagePath })
}

/** Hizmet sayfası görüntüleme */
export function trackServiceView(serviceName: string, serviceCategory: string) {
  trackEvent('service_view', { service_name: serviceName, service_category: serviceCategory })
}

/** Kaydırmalı film sahne değişimi */
export function trackStoryStage(stageId: string, stageIndex: number) {
  trackEvent('story_stage_view', { stage_id: stageId, stage_index: stageIndex })
}

/** Dış bağlantı tıklaması */
export function trackOutbound(url: string, label: string) {
  trackEvent('outbound_click', { event_category: 'engagement', link_url: url, link_label: label })
}
