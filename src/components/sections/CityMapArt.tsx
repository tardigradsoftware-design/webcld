// src/components/sections/CityMapArt.tsx
/**
 * Türkiye haritası üzerinde şehir vurgusu — dekoratif, kodla üretilen SVG.
 * Şehir görselleri (public/images/cities/{sehir}-web-yazilim.webp) hazır olduğunda
 * next/image ile değiştirilebilir; oran ve alt metin kuralları aynı kalır.
 */

import type { City } from '@/types'
import { cities } from '@/lib/cities'
import { cn } from '@/lib/utils'

/** Normalize edilmiş Türkiye silueti (0-1 aralığı) */
const OUTLINE: [number, number][] = [
  [0.055, 0.33], [0.115, 0.21], [0.2, 0.15], [0.29, 0.11], [0.39, 0.08], [0.5, 0.055],
  [0.61, 0.05], [0.72, 0.075], [0.82, 0.11], [0.9, 0.17], [0.965, 0.25], [1.0, 0.34],
  [0.985, 0.44], [0.995, 0.55], [0.96, 0.66], [0.9, 0.76], [0.82, 0.84], [0.73, 0.9],
  [0.64, 0.86], [0.56, 0.93], [0.48, 0.88], [0.41, 0.95], [0.34, 0.88], [0.27, 0.93],
  [0.2, 0.84], [0.135, 0.74], [0.085, 0.63], [0.115, 0.52], [0.07, 0.43],
]

const BOX = { minX: 96, maxX: 704, minY: 74, maxY: 306 }
const LAT = { min: 35.7, max: 42.3 }
const LNG = { min: 25.5, max: 45.0 }

function project(lng: number, lat: number): { x: number; y: number } {
  return {
    x: BOX.minX + ((lng - LNG.min) / (LNG.max - LNG.min)) * (BOX.maxX - BOX.minX),
    y: BOX.maxY - ((lat - LAT.min) / (LAT.max - LAT.min)) * (BOX.maxY - BOX.minY),
  }
}

const OUTLINE_PATH = OUTLINE.map(([nx, ny], index) => {
  const x = BOX.minX + nx * (BOX.maxX - BOX.minX)
  const y = BOX.minY + ny * (BOX.maxY - BOX.minY)
  return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
}).join(' ') + ' Z'

interface CityMapArtProps {
  city: City
  className?: string
}

export function CityMapArt({ city, className }: CityMapArtProps) {
  const center = city.geo ? project(city.geo.lng, city.geo.lat) : { x: 400, y: 190 }
  const others = cities
    .filter((item) => item.slug !== city.slug && item.geo && item.priorityLevel <= 2)
    .slice(0, 10)

  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-950/70 p-2 shadow-navy backdrop-blur',
        className,
      )}
    >
      <svg
        viewBox="0 0 800 400"
        width={800}
        height={400}
        className="h-auto w-full"
        role="img"
        aria-label={`${city.name} konumunu gösteren Türkiye haritası`}
      >
        <defs>
          <radialGradient id="city-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="rgba(96,144,250,0.12)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="400" fill="#08112B" />
        <rect width="800" height="400" fill="url(#map-grid)" />

        <path d={OUTLINE_PATH} fill="rgba(37,99,235,0.14)" stroke="#6090FA" strokeWidth="1.8" strokeLinejoin="round" />
        <path d={OUTLINE_PATH} fill="none" stroke="#22D3EE" strokeWidth="0.8" opacity="0.4" />

        {others.map((other) => {
          const point = project(other.geo!.lng, other.geo!.lat)
          return (
            <g key={other.slug}>
              <line
                x1={center.x}
                y1={center.y}
                x2={point.x}
                y2={point.y}
                stroke="#3B82F6"
                strokeWidth="0.9"
                opacity="0.32"
                strokeDasharray="4 5"
              />
              <circle cx={point.x} cy={point.y} r="3.4" fill="#93B4FD" opacity="0.8" />
            </g>
          )
        })}

        <circle cx={center.x} cy={center.y} r="86" fill="url(#city-glow)" />
        <circle cx={center.x} cy={center.y} r="26" fill="none" stroke="#22D3EE" strokeWidth="1.4" opacity="0.55" />
        <circle cx={center.x} cy={center.y} r="16" fill="none" stroke="#22D3EE" strokeWidth="1.6" opacity="0.8" />
        <circle cx={center.x} cy={center.y} r="7" fill="#22D3EE" />

        <g transform={`translate(${Math.min(Math.max(center.x + 24, 120), 640)}, ${center.y - 14})`}>
          <rect x="0" y="0" width="176" height="34" rx="9" fill="rgba(8,17,43,0.88)" stroke="#22D3EE" strokeOpacity="0.45" />
          <text x="14" y="22" fill="#F9FAFB" fontSize="14.5" fontWeight="700" fontFamily="Inter, sans-serif">
            {city.name}
          </text>
          <text x="122" y="22" fill="#22D3EE" fontSize="11" fontFamily="monospace">
            {city.region.slice(0, 3).toLocaleUpperCase('tr-TR')}
          </text>
        </g>

        <text x="46" y="356" fill="#DBEAFE" opacity="0.5" fontSize="12" fontFamily="monospace" letterSpacing="2">
          TURKIYE · 81 IL KAPSAMA
        </text>
        <text x="46" y="376" fill="#22D3EE" fontSize="12.5" fontFamily="monospace" letterSpacing="1.6">
          {city.name.toLocaleUpperCase('tr-TR')} · TARDIGRAD SOFTWARE
        </text>
      </svg>
      <figcaption className="sr-only">
        {city.name} ({city.region}) için Tardigrad Software web sitesi ve yazılım hizmetleri
      </figcaption>
    </figure>
  )
}

export default CityMapArt
