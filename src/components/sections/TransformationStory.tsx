// src/components/sections/TransformationStory.tsx
'use client'

/**
 * TARDIGRAD SOFTWARE — "Dijital Dönüşüm Filmi"
 * ------------------------------------------------------------------
 * Kullanıcı sayfayı aşağı kaydırdıkça tek bir sahne üzerinde ham veri
 * parçacıkları dönüşür:
 *   1. Ham Veri (Excel hücreleri, notlar)
 *   2. Analiz (parçalar hunide toplanır)
 *   3. Mimari (düğüm ağacı / site haritası)
 *   4. Geliştirme (kod satırları ve ekranlar kurulur)
 *   5. Test (kalkan + onay işareti)
 *   6. Canlıya Alma (bulut + yayın)
 *   7. SEO (yükselen grafik + büyüteç)
 *   8. Lokal Kapsama (Türkiye haritası + şehir pinleri)
 *   9. Büyüme (dashboard + yükselen eğri)
 *
 * Teknik: tek bir SVG sahnesi, parçacık başına 9 hedef noktası.
 * useTransform ile her eksen sürekli (spring-like) ilerler; böylece
 * sahneler arası geçişte parçacıklar bir formdan diğerine akar.
 * prefers-reduced-motion durumunda animasyon kapatılır, statik liste gösterilir.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

import { TRANSFORMATION_STAGES } from '@/lib/constants'
import { seededRandom, hashString } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { LucideIcon } from '@/components/common/LucideIcon'

const VIEW_W = 1200
const VIEW_H = 680
const STAGE_COUNT = TRANSFORMATION_STAGES.length
/** Her sahne için ayrılan kaydırma yüksekliği (px) */
const PX_PER_STAGE = 720

interface Point {
  x: number
  y: number
  /** hücre/kutu şeklinde çizilsin mi? */
  box?: boolean
  /** vurgulu (başlık / ana düğüm) */
  header?: boolean
}

// ---------------------------------------------------------------------------
// SAHNE GEOMETRİLERİ
// ---------------------------------------------------------------------------

function stageHamVeri(rand: () => number): Point[] {
  const cols = 11
  const rows = 7
  const pts: Point[] = []
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      pts.push({
        x: 168 + c * 78 + (rand() - 0.5) * 7,
        y: 188 + r * 46 + (rand() - 0.5) * 7,
        box: r > 0,
        header: r === 0,
      })
    }
  }
  return pts
}

function stageAnaliz(): Point[] {
  const pts: Point[] = []
  const arms = 4
  const perArm = 19
  for (let a = 0; a < arms; a += 1) {
    for (let i = 0; i < perArm; i += 1) {
      const t = i / (perArm - 1)
      const radius = 236 * Math.pow(1 - t, 1.15) + 12
      const angle = a * ((Math.PI * 2) / arms) + t * 4.9
      pts.push({
        x: 600 + Math.cos(angle) * radius * 1.18,
        y: 344 + Math.sin(angle) * radius * 0.86,
        header: radius < 28,
      })
    }
  }
  return pts
}

function stageMimari(): Point[] {
  const pts: Point[] = []
  const rootX = 600
  const levels = [
    { y: 152, xs: [rootX] },
    { y: 264, xs: [300, 600, 900] },
    { y: 380, xs: [176, 368, 512, 688, 832, 1024] },
    { y: 496, xs: [128, 232, 328, 424, 520, 616, 712, 808, 904, 1000, 1096] },
  ]
  levels.forEach((level, levelIndex) => {
    level.xs.forEach((x) => pts.push({ x, y: level.y, box: levelIndex >= 2, header: levelIndex === 0 }))
  })
  return pts
}

function stageGelistirme(): Point[] {
  const pts: Point[] = []
  const windows = [
    { x: 172, y: 152, w: 376, h: 262, rows: 7 },
    { x: 652, y: 250, w: 376, h: 262, rows: 7 },
  ]
  windows.forEach((win, winIndex) => {
    // başlık çubuğu
    for (let i = 0; i < 6; i += 1) pts.push({ x: win.x + 22 + i * 16, y: win.y + 20, header: true })
    // kod satırları
    for (let r = 0; r < win.rows; r += 1) {
      const lineWidth = win.w - 78 - (r % 3) * 42
      const cols = Math.max(4, Math.round(lineWidth / 44))
      for (let c = 0; c < cols; c += 1) {
        pts.push({
          x: win.x + 34 + c * ((lineWidth - 12) / Math.max(1, cols - 1)),
          y: win.y + 62 + r * 28,
          box: true,
        })
      }
    }
    // pencere köşeleri
    pts.push({ x: win.x + win.w - 22, y: win.y + 20, header: winIndex === 0 })
  })
  return pts
}

function stageTest(): Point[] {
  const pts: Point[] = []
  const cx = 600
  const cy = 340
  for (let i = 0; i < 34; i += 1) {
    const angle = (i / 34) * Math.PI * 2
    pts.push({ x: cx + Math.cos(angle) * 196 * 1.2, y: cy + Math.sin(angle) * 176 })
  }
  const check: [number, number][] = [
    [508, 346], [528, 368], [548, 390], [572, 356], [598, 320], [626, 286], [656, 252],
  ]
  check.forEach(([x, y], index) => pts.push({ x, y, header: index === check.length - 1 }))
  for (let i = 0; i < 16; i += 1) {
    const angle = (i / 16) * Math.PI * 2
    pts.push({ x: cx + Math.cos(angle) * 248 * 1.2, y: cy + Math.sin(angle) * 224 })
  }
  return pts
}

function stageYayin(): Point[] {
  const pts: Point[] = []
  const cx = 600
  const cy = 268
  for (let i = 0; i < 46; i += 1) {
    const angle = (i / 46) * Math.PI * 2
    const bumps = 7
    const r = 168 + Math.cos(angle * bumps) * 26
    pts.push({ x: cx + Math.cos(angle) * r * 1.62, y: cy + Math.sin(angle) * r * 0.72 })
  }
  for (let i = 0; i < 12; i += 1) {
    pts.push({ x: cx + (i - 5.5) * 26, y: 452 + Math.abs(i - 5.5) * 6, box: true })
  }
  for (let i = 0; i < 10; i += 1) {
    pts.push({ x: cx + Math.cos((i / 10) * Math.PI * 2) * 60, y: 556 + Math.sin((i / 10) * Math.PI * 2) * 16 })
  }
  return pts
}

function stageSeo(): Point[] {
  const pts: Point[] = []
  const baseY = 528
  const heights = [70, 116, 162, 214, 272, 336]
  heights.forEach((h, i) => {
    const x = 236 + i * 118
    pts.push({ x, y: baseY - h, header: i === heights.length - 1 })
    pts.push({ x, y: baseY - h / 2 })
    pts.push({ x, y: baseY })
  })
  for (let i = 0; i < 14; i += 1) {
    const angle = (i / 14) * Math.PI * 2
    pts.push({ x: 902 + Math.cos(angle) * 78, y: 226 + Math.sin(angle) * 78 })
  }
  pts.push({ x: 958, y: 286 })
  pts.push({ x: 996, y: 324, box: true })
  for (let i = 0; i < 10; i += 1) pts.push({ x: 196 + i * 84, y: baseY + 34 })
  return pts
}

/** Türkiye silueti (normalize koordinatlar) ve gerçek şehir konumları */
const TURKEY_OUTLINE: [number, number][] = [
  [0.06, 0.3], [0.16, 0.17], [0.3, 0.12], [0.45, 0.07], [0.62, 0.05], [0.78, 0.08],
  [0.92, 0.16], [1.0, 0.3], [0.97, 0.48], [0.99, 0.64], [0.9, 0.8], [0.76, 0.9],
  [0.62, 0.83], [0.5, 0.95], [0.38, 0.86], [0.26, 0.92], [0.16, 0.76], [0.08, 0.62],
  [0.13, 0.46],
]

const CITY_POINTS: { slug: string; lat: number; lng: number; major: boolean }[] = [
  { slug: 'istanbul', lat: 41.01, lng: 28.98, major: true },
  { slug: 'ankara', lat: 39.93, lng: 32.86, major: true },
  { slug: 'izmir', lat: 38.42, lng: 27.14, major: true },
  { slug: 'bursa', lat: 40.19, lng: 29.06, major: false },
  { slug: 'antalya', lat: 36.9, lng: 30.71, major: false },
  { slug: 'kocaeli', lat: 40.85, lng: 29.88, major: false },
  { slug: 'konya', lat: 37.87, lng: 32.49, major: false },
  { slug: 'gaziantep', lat: 37.07, lng: 37.38, major: false },
  { slug: 'adana', lat: 37.0, lng: 35.32, major: false },
  { slug: 'kayseri', lat: 38.72, lng: 35.48, major: false },
  { slug: 'eskisehir', lat: 39.78, lng: 30.52, major: false },
  { slug: 'denizli', lat: 37.78, lng: 29.09, major: false },
  { slug: 'trabzon', lat: 41.0, lng: 39.72, major: false },
  { slug: 'diyarbakir', lat: 37.91, lng: 40.23, major: false },
  { slug: 'samsun', lat: 41.29, lng: 36.33, major: false },
  { slug: 'van', lat: 38.49, lng: 43.41, major: false },
]

const MAP_BOX = { minX: 176, maxX: 1024, minY: 196, maxY: 520 }
const LAT = { min: 35.8, max: 42.2 }
const LNG = { min: 25.6, max: 44.9 }

function mapPoint(lng: number, lat: number): Point {
  const x = MAP_BOX.minX + ((lng - LNG.min) / (LNG.max - LNG.min)) * (MAP_BOX.maxX - MAP_BOX.minX)
  const y = MAP_BOX.maxY - ((lat - LAT.min) / (LAT.max - LAT.min)) * (MAP_BOX.maxY - MAP_BOX.minY)
  return { x, y }
}

function stageLokal(): Point[] {
  const pts: Point[] = TURKEY_OUTLINE.map(([nx, ny]) => ({
    x: MAP_BOX.minX + nx * (MAP_BOX.maxX - MAP_BOX.minX),
    y: MAP_BOX.minY + ny * (MAP_BOX.maxY - MAP_BOX.minY),
  }))
  CITY_POINTS.forEach((city) => {
    const point = mapPoint(city.lng, city.lat)
    pts.push({ ...point, header: city.major })
  })
  // yayılan halkalar (büyük şehirler)
  CITY_POINTS.filter((c) => c.major).forEach((city) => {
    const center = mapPoint(city.lng, city.lat)
    for (let i = 0; i < 5; i += 1) {
      const angle = (i / 5) * Math.PI * 2
      pts.push({ x: center.x + Math.cos(angle) * 34, y: center.y + Math.sin(angle) * 20 })
    }
  })
  return pts
}

function stageBuyume(rand: () => number): Point[] {
  const pts: Point[] = []
  for (let i = 0; i < 26; i += 1) {
    const t = i / 25
    const x = 200 + t * 800
    const y = 546 - Math.pow(t, 1.5) * 352 + (rand() - 0.5) * 9
    pts.push({ x, y, header: i === 25 })
  }
  const cards = [
    { x: 216, y: 176 },
    { x: 508, y: 176 },
    { x: 800, y: 176 },
  ]
  cards.forEach((card) => {
    for (let i = 0; i < 4; i += 1) pts.push({ x: card.x + i * 52, y: card.y, box: true })
    pts.push({ x: card.x + 26, y: card.y + 34 })
  })
  for (let i = 0; i < 8; i += 1) pts.push({ x: 486 + i * 32, y: 596, box: i > 1 && i < 6 })
  for (let i = 0; i < 10; i += 1) {
    pts.push({ x: 168 + rand() * 864, y: 250 + rand() * 240 })
  }
  return pts
}

const STAGE_BUILDERS: ((rand: () => number) => Point[])[] = [
  stageHamVeri,
  stageAnaliz,
  stageMimari,
  stageGelistirme,
  stageTest,
  stageYayin,
  stageSeo,
  stageLokal,
  stageBuyume,
]

const MAX_POINTS = 78

function buildAllStages(): Point[][] {
  const rand = seededRandom(hashString('tardigrad-transformation-story'))
  const stages = STAGE_BUILDERS.map((builder) => builder(rand))
  return stages.map((stage) => {
    const limited = stage.slice(0, MAX_POINTS)
    // Sahne daha az parçacık kullanıyorsa kenara park et (görünmez kalır)
    while (limited.length < MAX_POINTS) {
      limited.push({ x: 1188, y: 668 })
    }
    return limited
  })
}

const PALETTE = ['#60A5FA', '#3B82F6', '#1E40AF', '#DBEAFE', '#6090FA']

interface Particle {
  id: number
  color: string
  r: number
  opacity: number
  delay: number
  points: Point[]
}

function buildParticles(stages: Point[][]): Particle[] {
  const rand = seededRandom(hashString('tardigrad-particles'))
  return stages[0].map((_, index) => ({
    id: index,
    color: PALETTE[Math.floor(rand() * PALETTE.length)],
    r: 2.4 + rand() * 4.2,
    opacity: 0.55 + rand() * 0.45,
    delay: rand() * 0.35,
    points: stages.map((stage) => stage[index]),
  }))
}

// ---------------------------------------------------------------------------
// BİLEŞEN
// ---------------------------------------------------------------------------

export function TransformationStory() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  const stages = useMemo(buildAllStages, [])
  const particles = useMemo(() => buildParticles(stages), [stages])

  const [activeStage, setActiveStage] = useState(0)

  // Aktif sahne takibi (metin katmanı için ayrık değer)
  const stageProgress = useTransform(smooth, (value) => Math.min(STAGE_COUNT - 1, Math.max(0, Math.round(value * (STAGE_COUNT - 1)))))
  useEffect(() => {
    const unsubscribe = stageProgress.on('change', (latest) => setActiveStage(latest))
    return unsubscribe
  }, [stageProgress])

  // Arka plan tonu sahneler arasında yumuşak geçiş yapar
  const tone = useTransform(
    smooth,
    TRANSFORMATION_STAGES.map((_, index) => index / (STAGE_COUNT - 1)),
    TRANSFORMATION_STAGES.map((stage) => stage.tone),
  )

  const progressPercent = useTransform(smooth, (value) => `${Math.round(value * 100)}%`)
  const railScale = useSpring(smooth, { stiffness: 90, damping: 24 })

  if (reducedMotion) {
    return <ReducedVersion />
  }

  return (
    <section
      id="donusum-filmi"
      aria-labelledby="donusum-filmi-baslik"
      className="relative bg-brand-navy-950 text-white"
    >
      {/* Kaydırma yüksekliği: sahne sayısı × sahne başına px */}
      <div ref={containerRef} style={{ height: `${STAGE_COUNT * PX_PER_STAGE}px` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div className="absolute inset-0" style={{ backgroundColor: tone }} aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-grid-navy opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(70% 55% at 50% 45%, rgba(37,99,235,0.20), transparent 70%)' }}
            aria-hidden
          />

          <div className="relative flex h-full flex-col">
            {/* Üst bilgi şeridi */}
            <div className="container flex flex-wrap items-end justify-between gap-4 pt-8 lg:pt-10">
              <div className="max-w-2xl">
                <span className="eyebrow-light">Dijital dönüşüm filmi</span>
                <h2
                  id="donusum-filmi-baslik"
                  className="mt-4 text-3xl font-semibold leading-tight md:text-[42px]"
                >
                  Kaydırdıkça bir işletmenin{' '}
                  <span className="text-gradient-light">dijital dönüşümü</span> oluşuyor
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                  Dağınık Excel sayfalarından canlı bir platforma: analiz, mimari, geliştirme, test,
                  yayın, SEO, lokal kapsama ve büyüme. Aşağı kaydırmaya devam edin.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-mono text-3xl font-bold text-blue-300 md:text-4xl">
                    <motion.span>{progressPercent}</motion.span>
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                    dönüşüm ilerlemesi
                  </div>
                </div>
              </div>
            </div>

            {/* Sahne */}
            <div className="relative flex-1">
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Dijital dönüşüm sürecini gösteren animasyonlu şema"
              >
                <defs>
                  <linearGradient id="ts-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>

                {/* Bağlantı çizgileri (mimari / büyüme sahnelerinde belirginleşir) */}
                <ConnectorLines stages={stages} progress={smooth} />

                {/* Parçacıklar */}
                <g>
                  {particles.map((particle) => (
                    <ParticleDot key={particle.id} particle={particle} progress={smooth} />
                  ))}
                </g>
              </svg>

              {/* Sahne açıklaması */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0">
                <div className="container pb-8 lg:pb-12">
                  <div className="grid items-end gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="pointer-events-auto max-w-2xl rounded-2xl border border-white/10 bg-brand-navy-950/70 p-5 backdrop-blur-md md:p-6">
                      {TRANSFORMATION_STAGES.map((stage, index) => (
                        <motion.div
                          key={stage.id}
                          initial={false}
                          animate={{
                            opacity: activeStage === index ? 1 : 0,
                            y: activeStage === index ? 0 : 10,
                          }}
                          transition={{ duration: 0.35 }}
                          className={cn(activeStage === index ? 'block' : 'hidden')}
                        >
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-400/10 text-blue-300">
                              <LucideIcon name={stage.icon} fallback="Sparkles" className="h-5 w-5" />
                            </span>
                            <div>
                              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300/80">
                                Adım {String(index + 1).padStart(2, '0')} / 0{STAGE_COUNT} ·{' '}
                                {stage.subtitle}
                              </div>
                              <h3 className="text-xl font-semibold text-white md:text-2xl">
                                {stage.title}
                              </h3>
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-[15px]">
                            {stage.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Süreç rayı */}
                    <div className="pointer-events-auto hidden lg:block">
                      <div className="rounded-2xl border border-white/10 bg-brand-navy-950/60 p-4 backdrop-blur-md">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                            9 adımlı süreç
                          </span>
                          <Link
                            href="/surec/"
                            className="text-[11px] font-semibold text-blue-300 hover:text-blue-200"
                          >
                            Detay →
                          </Link>
                        </div>
                        <ol className="relative space-y-2 pl-5">
                          <span className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px bg-white/12" aria-hidden />
                          <motion.span
                            className="absolute left-[7px] top-1 w-px origin-top bg-blue-400"
                            style={{ height: 'calc(100% - 8px)', scaleY: railScale }}
                            aria-hidden
                          />
                          {TRANSFORMATION_STAGES.map((stage, index) => (
                            <li key={stage.id} className="relative">
                              <span
                                className={cn(
                                  'absolute -left-5 top-1.5 h-[7px] w-[7px] rounded-full transition-colors',
                                  activeStage >= index ? 'bg-blue-400' : 'bg-white/25',
                                )}
                                aria-hidden
                              />
                              <span
                                className={cn(
                                  'block text-[12.5px] leading-tight transition-colors',
                                  activeStage === index
                                    ? 'font-semibold text-white'
                                    : activeStage > index
                                      ? 'text-white/55'
                                      : 'text-white/35',
                                )}
                              >
                                {String(index + 1).padStart(2, '0')}. {stage.title}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// ALT BİLEŞENLER
// ---------------------------------------------------------------------------

/**
 * Tek parçacık = 1 çekirdek + 1 hâle (glow).
 * Kutu formlar (Excel hücresi, kod satırı) için genişlik/yükseklik büyür ve
 * köşe yarıçapı küçülür; nokta formlar için kare bir daireye dönüşür.
 */
function ParticleDot({
  particle,
  progress,
}: {
  particle: Particle
  progress: ReturnType<typeof useSpring>
}) {
  const indexes = TRANSFORMATION_STAGES.map((_, index) => index / (STAGE_COUNT - 1))

  const widths = particle.points.map((point) =>
    point.box ? 27 : point.header ? 34 : particle.r * 2,
  )
  const heights = particle.points.map((point) =>
    point.box ? 13 : point.header ? 17 : particle.r * 2,
  )
  const radiuses = particle.points.map((point) => (point.box || point.header ? 3.5 : particle.r))
  const opacities = particle.points.map((point) =>
    point.x > VIEW_W - 40 && point.y > VIEW_H - 40 ? 0 : point.header ? 1 : particle.opacity,
  )

  const cx = useTransform(progress, indexes, particle.points.map((point) => point.x))
  const cy = useTransform(progress, indexes, particle.points.map((point) => point.y))
  const w = useTransform(progress, indexes, widths)
  const h = useTransform(progress, indexes, heights)
  const rx = useTransform(progress, indexes, radiuses)
  const op = useTransform(progress, indexes, opacities)

  const haloX = useTransform([cx, w], ([x, width]) => (x as number) - ((width as number) * 2.1) / 2)
  const haloY = useTransform([cy, h], ([y, height]) => (y as number) - ((height as number) * 2.1) / 2)
  const haloW = useTransform(w, (width) => (width as number) * 2.1)
  const haloH = useTransform(h, (height) => (height as number) * 2.1)
  const coreX = useTransform([cx, w], ([x, width]) => (x as number) - ((width as number) as number) / 2)
  const coreY = useTransform([cy, h], ([y, height]) => (y as number) - ((height as number) as number) / 2)

  return (
    <motion.g opacity={op}>
      <motion.rect
        x={haloX}
        y={haloY}
        width={haloW}
        height={haloH}
        rx={rx}
        fill={particle.color}
        opacity={0.12}
      />
      <motion.rect x={coreX} y={coreY} width={w} height={h} rx={rx} fill={particle.color} />
    </motion.g>
  )
}

/** Sahneler arası ince bağlantı çizgileri — mimari ve büyüme sahnelerinde görünür */
function ConnectorLines({
  stages,
  progress,
}: {
  stages: Point[][]
  progress: ReturnType<typeof useSpring>
}) {
  const architectureOpacity = useTransform(
    progress,
    [0.12, 0.24, 0.34, 0.46],
    [0, 0.5, 0.5, 0],
  )
  const growthOpacity = useTransform(progress, [0.78, 0.9, 1], [0, 0.55, 0.55])

  const architectureLines = useMemo(() => {
    const pts = stages[2]
    if (!pts.length) return []
    const levels = [
      { parents: [0], children: [1, 2, 3] },
      { parents: [1, 2, 3], children: [4, 5, 6, 7, 8, 9] },
      { parents: [4, 5, 6, 7, 8, 9], children: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    ]
    const lines: string[] = []
    levels.forEach((level) => {
      level.children.forEach((childIndex) => {
        const child = pts[childIndex]
        if (!child) return
        // en yakın ebeveyne bağla
        let best = pts[level.parents[0]]
        let bestDistance = Number.POSITIVE_INFINITY
        level.parents.forEach((parentIndex) => {
          const parent = pts[parentIndex]
          if (!parent) return
          const distance = Math.abs(parent.x - child.x)
          if (distance < bestDistance) {
            bestDistance = distance
            best = parent
          }
        })
        if (!best) return
        const midY = (best.y + child.y) / 2
        lines.push(`M ${best.x} ${best.y} C ${best.x} ${midY}, ${child.x} ${midY}, ${child.x} ${child.y}`)
      })
    })
    return lines
  }, [stages])

  const growthPath = useMemo(() => {
    const pts = stages[8].slice(0, 26)
    return pts.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  }, [stages])

  return (
    <g>
      <motion.g opacity={architectureOpacity}>
        {architectureLines.map((d, index) => (
          <path key={index} d={d} stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.55" />
        ))}
      </motion.g>
      <motion.g opacity={growthOpacity}>
        <path d={growthPath} stroke="#1E40AF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </motion.g>
    </g>
  )
}

/** prefers-reduced-motion: animasyonsuz, erişilebilir özet */
function ReducedVersion() {
  return (
    <section id="donusum-filmi" aria-labelledby="donusum-filmi-baslik" className="section-navy py-20">
      <div className="container">
        <span className="eyebrow-light">Dijital dönüşüm süreci</span>
        <h2 id="donusum-filmi-baslik" className="mt-4 max-w-3xl text-3xl font-semibold md:text-[42px]">
          Dağınık veriden canlı platforma: <span className="text-gradient-light">9 adımlı dönüşüm</span>
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRANSFORMATION_STAGES.map((stage, index) => (
            <li key={stage.id} className="card-navy p-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-400/10 text-blue-300">
                  <LucideIcon name={stage.icon} fallback="Sparkles" className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-300/80">
                    Adım {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{stage.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link
            href="/surec/"
            className="inline-flex items-center gap-2 rounded-lg bg-cta-gradient px-5 py-3 text-sm font-semibold text-white"
          >
            Sürecin detayını inceleyin
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TransformationStory
