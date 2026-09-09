// src/components/sections/ContactSection.tsx
import { CTA } from '@/components/sections/CTA'
import { ContactForm } from '@/components/forms/ContactForm'

interface ContactSectionProps {
  title?: string
  description?: string
  defaultService?: string
  defaultCity?: string
  cityContext?: string
  compact?: boolean
}

/** CTA bölümü + iletişim formu (id="iletisim-formu") — her sayfada kullanılır */
export function ContactSection({
  title,
  description,
  defaultService,
  defaultCity,
  cityContext,
  compact,
}: ContactSectionProps) {
  return (
    <CTA
      title={title}
      description={description}
      cityContext={cityContext}
      compact={compact}
      formSlot={
        <ContactForm
          defaultService={defaultService}
          defaultCity={defaultCity}
          variant="dark"
          compact={compact}
        />
      }
    />
  )
}

export default ContactSection
