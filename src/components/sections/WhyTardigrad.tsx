// src/components/sections/WhyTardigrad.tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from '@/components/common/LucideIcon'

export interface WhyItem {
  title: string
  description: string
  icon: string
}

const DEFAULT_ITEMS: WhyItem[] = [
  {
    title: 'SEO, tasarım ve yazılım tek elde',
    description:
      'Ayrı ajanslar arasında koordinasyon kaybı yaşamazsınız. Teknik SEO temeli, arayüz tasarımı ve yazılım mimarisi aynı ekip tarafından, baştan birlikte kurgulanır.',
    icon: 'Layers',
  },
  {
    title: 'Ölçülebilir teslim kriterleri',
    description:
      'Her projede hız skorları, Core Web Vitals, indexleme durumu ve dönüşüm olayları sayısal olarak raporlanır. "Bitti" demek için ölçülebilir kanıt sunarız.',
    icon: 'Target',
  },
  {
    title: 'Modern ve açık teknoloji yığını',
    description:
      'Next.js, TypeScript, Supabase/PostgreSQL, Vercel ve Cloudflare ile çalışıyoruz. Kapalı kutu çözümler yok; kod ve altyapı size teslim edilir.',
    icon: 'CodeXml',
  },
  {
    title: 'Şeffaf süreç ve tek muhatap',
    description:
      '9 adımlı süreç boyunca neyin ne zaman yapılacağını bilir, her sprint sonunda çalışan bir çıktı görürsünüz. Proje yöneticisi ile geliştirici arasındaki kayıp yaşamazsınız.',
    icon: 'MessagesSquare',
  },
  {
    title: 'Uzun vadeli ortaklık',
    description:
      'Yayına alma bir son değil başlangıçtır. Bakım, izleme, güvenlik güncellemeleri ve büyüme önerileriyle sisteminizi yıllar boyunca yaşatıyoruz.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Türkiye geneli kapsama',
    description:
      'Merkezimiz İstanbul Maltepe’de; 81 ile uzaktan hizmet veriyoruz. Şehir sayfalarımız ve lokal SEO deneyimimizle bölgesel görünürlük sağlıyoruz.',
    icon: 'MapPin',
  },
]

interface WhyTardigradProps {
  items?: WhyItem[]
  variant?: 'light' | 'dark'
  className?: string
}

export function WhyTardigrad({ items = DEFAULT_ITEMS, variant = 'dark', className }: WhyTardigradProps) {
  const dark = variant === 'dark'
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className={cn('rounded-xl border p-5', dark ? 'card-navy' : 'card-light')}
        >
          <span
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-lg',
              dark ? 'bg-blue-400/10 text-blue-300' : 'bg-brand-navy-900 text-white',
            )}
          >
            <LucideIcon name={item.icon} fallback="Sparkles" className="h-5 w-5" aria-hidden />
          </span>
          <h3 className={cn('mt-4 text-base font-semibold', dark ? 'text-white' : 'text-brand-ink')}>
            {item.title}
          </h3>
          <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-white/60' : 'text-brand-ink-soft/75')}>
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default WhyTardigrad
