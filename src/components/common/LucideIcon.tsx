// src/components/common/LucideIcon.tsx
// Veri dosyalarındaki ikon adlarını Lucide bileşenine güvenle çevirir.

import * as Lucide from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { Circle } from 'lucide-react'

type IconName = keyof typeof Lucide.icons

interface Props extends LucideProps {
  name?: string
  fallback?: keyof typeof Lucide.icons
}

/** Veride tanımlı ikon adı yoksa yedek ikon döner (build'i kırmaz) */
export function LucideIcon({ name, fallback = 'Circle', ...props }: Props) {
  const candidate = (name ?? fallback) as IconName
  const Component = (Lucide.icons[candidate] ?? Lucide.icons[fallback] ?? Circle) as React.ElementType
  return <Component {...props} />
}

/** Verideki ikon adının Lucide kütüphanesinde var olup olmadığını kontrol eder */
export function isValidIconName(name?: string): boolean {
  if (!name) return false
  return Object.prototype.hasOwnProperty.call(Lucide.icons, name as IconName)
}

export default LucideIcon
