// src/components/common/Photo.tsx
/**
 * next/image tabanlı fotoğraf bileşeni.
 * Sarmalayıcıya aspect/oran sınıfı verilir; görsel alanı doldurur (fill).
 * Alt metinler her zaman Türkçedir; isteğe bağlı Türkçe alt yazı bandı eklenir.
 */
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PhotoProps {
  src: string
  alt: string
  /** Sarmalayıcı sınıfları — oran (aspect-*) ve köşe yuvarlaklık buradan verilir */
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  /** Görselin altına binen Türkçe açıklama bandı */
  caption?: string
}

export function Photo({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  caption,
}: PhotoProps) {
  return (
    <figure className={cn('relative overflow-hidden bg-brand-navy-100', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={cn('object-cover', imgClassName)}
      />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-950/90 via-brand-navy-950/45 to-transparent px-4 pb-3 pt-10 text-[12px] font-medium leading-snug text-white/90">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default Photo
