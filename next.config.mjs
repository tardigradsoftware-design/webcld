// next.config.mjs
// Next.js 14, TypeScript config dosyasını desteklemediği için .mjs kullanılır.
/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://www.google-analytics.com;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co https://*.upstash.io https://api.resend.com https://www.google-analytics.com https://www.google.com https://va.vercel-scripts.com;
    frame-src 'self' https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
`.replace(/\s{2,}/g, ' ').trim()

const nextConfig = {
  reactStrictMode: true,

  // Görsel optimizasyon — WebP öncelikli, uzun cache
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 yıl
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  // trailing slash tutarlılığı (tüm iç linkler "/" ile üretilir)
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // www -> non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tardigradsoftware.com' }],
        destination: 'https://tardigradsoftware.com/:path*',
        permanent: true,
      },
      // eski tekil hizmet yolu -> hizmetler mimarisi
      { source: '/hizmet/:slug', destination: '/hizmetler/:slug/', permanent: true },
      { source: '/hizmet/:slug/', destination: '/hizmetler/:slug/', permanent: true },
      // şehir kısayolu
      { source: '/sehirler', destination: '/sehir/', permanent: true },
      { source: '/sehirler/:path*', destination: '/sehir/:path*', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspHeader },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
