// src/components/sections/SystemArchitectureVisual.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  Lock,
  Zap,
  Server,
  Terminal,
  Layers,
  ArrowRight,
} from 'lucide-react'

interface SystemNode {
  id: string
  name: string
  status: 'operational' | 'optimized' | 'active'
  latency: string
  metric: string
  tag: string
  description: string
  codeSnippet: string
  icon: typeof Server
}

const NODES: SystemNode[] = [
  {
    id: 'edge-api',
    name: 'Next.js 14 App Router & Edge Mesh',
    status: 'operational',
    latency: '8ms',
    metric: 'LCP < 0.8s',
    tag: 'Web & API Layer',
    description: 'Server Components ile sıfır istemci tarafı JS yükü. Edge CDN üzerinden <10ms yanıt süresi.',
    codeSnippet: `// app/api/v1/services/route.ts
export const runtime = 'edge'
export async function GET() {
  const data = await getCachedServices()
  return Response.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600' }
  })
}`,
    icon: Globe2,
  },
  {
    id: 'type-db',
    name: 'Supabase PostgreSQL & Strict Schema',
    status: 'operational',
    latency: '12ms',
    metric: 'RLS & Indexing',
    tag: 'Veri & Güvenlik',
    description: 'Satır bazlı erişim kontrolü (RLS) ve tip güvenli sorgular. SQL injection ve yetkisiz erişim imkânsızdır.',
    codeSnippet: `-- supabase/migrations/0001_contacts.sql
CREATE POLICY "Strict Service Role Insert"
  ON public.contacts FOR INSERT
  TO service_role
  WITH CHECK (kvkk_accepted = true);`,
    icon: Database,
  },
  {
    id: 'cache-limit',
    name: 'Upstash Redis Rate Limiting',
    status: 'active',
    latency: '4ms',
    metric: 'Bot & DDoS Block',
    tag: 'Spam Koruması',
    description: 'IP ve token bazlı akıllı hız sınırlama. Form spamlerini ve otomatize saldırıları anında engeller.',
    codeSnippet: `// lib/ratelimit.ts
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
})`,
    icon: Zap,
  },
  {
    id: 'type-validation',
    name: 'Zod & React Hook Form Engine',
    status: 'optimized',
    latency: '<1ms',
    metric: 'Strict Validation',
    tag: 'Form & Tip Güvenliği',
    description: 'Çift taraflı (Client + Server) tip doğrulaması. Hatalı veri sisteme sızamaz.',
    codeSnippet: `// lib/validations.ts
export const contactSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli e-posta giriniz"),
  phone: z.string().regex(/^(\\+?90|0)?[5][0-9]{9}$/),
})`,
    icon: Lock,
  },
]

export function SystemArchitectureVisual() {
  const [activeNodeId, setActiveNodeId] = useState<string>('edge-api')
  const activeNode = NODES.find((n) => n.id === activeNodeId) ?? NODES[0]

  return (
    <div className="relative w-full rounded-2xl border border-white/15 bg-brand-navy-900/90 p-5 shadow-2xl backdrop-blur-xl lg:p-6">
      {/* Üst Bar: Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-3 w-3 items-center justify-center">
            <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300">
            SİSTEM CANLI · TÜM DÜĞÜMLER AKTİF
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-white/50">
          <span className="hidden sm:inline-flex items-center gap-1 text-blue-300">
            <Activity className="h-3.5 w-3.5" /> Core Web Vitals 100/100
          </span>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-white/80">v14.2.35</span>
        </div>
      </div>

      {/* Düğüm Seçim Alanı (4 Katman) */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {NODES.map((node) => {
          const Icon = node.icon
          const isActive = node.id === activeNodeId
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              type="button"
              className={`group relative flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                isActive
                  ? 'border-blue-400/80 bg-blue-500/15 ring-1 ring-blue-400/40'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  isActive
                    ? 'border-blue-400/50 bg-blue-500/20 text-blue-300'
                    : 'border-white/10 bg-white/5 text-white/60 group-hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-blue-300/90">
                    {node.tag}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {node.latency}
                  </span>
                </div>
                <h4 className="mt-0.5 truncate text-xs font-semibold text-white">
                  {node.name}
                </h4>
                <p className="mt-1 font-mono text-[10.5px] text-white/50">
                  Metrik: <span className="text-white/80">{node.metric}</span>
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Detay & Kod İnceleme Paneli */}
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-300">
                <Terminal className="h-3.5 w-3.5 text-blue-400" />
                <span>{activeNode.name}</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                <CheckCircle2 className="h-3 w-3" /> %100 Tip Güvenliği
              </span>
            </div>

            <p className="text-xs text-white/75 leading-relaxed">
              {activeNode.description}
            </p>

            {/* Snippet */}
            <div className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-brand-navy-950 p-3 font-mono text-[11px] leading-relaxed text-blue-200/90">
              <pre><code>{activeNode.codeSnippet}</code></pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Alt Bilgi */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/40">
        <span className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-blue-400/70" />
          Sıfır AI Boşluğu · %100 Üretime Hazır Kod
        </span>
        <span className="text-blue-300/80">Tardigrad Arch Mesh v2.0</span>
      </div>
    </div>
  )
}

export default SystemArchitectureVisual
