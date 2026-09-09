'use client'

const STACK = [
  'Next.js 14',
  'TypeScript',
  'Tailwind CSS',
  'Supabase',
  'PostgreSQL',
  'Vercel',
  'Cloudflare',
  'Resend',
  'Upstash Redis',
  'Framer Motion',
  'React Hook Form',
  'Zod',
]

/**
 * Üretim yığınımızı taşıyan sonsuz kayan şerit.
 * Üzerine gelindiğinde durur; reduced-motion tercihinde animasyon kapanır.
 */
export function TechMarquee() {
  return (
    <section aria-label="Kullandığımız teknolojiler" className="marquee relative overflow-hidden border-y border-brand-navy-100 bg-brand-paper-soft py-3.5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-paper-soft to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-paper-soft to-transparent"
        aria-hidden
      />
      <div className="marquee-track flex w-max items-center gap-10 pr-10">
        {[...STACK, ...STACK].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="inline-flex items-center gap-10 whitespace-nowrap font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-navy-500"
          >
            {tech}
            <span className="h-1 w-1 rounded-full bg-brand-blue/50" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  )
}

export default TechMarquee
