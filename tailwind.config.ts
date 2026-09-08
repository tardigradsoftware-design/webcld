import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindcssAnimate from 'tailwindcss-animate'

/**
 * Tardigrad Software — Design Tokens
 * Tema: lacivert (navy) + mavi (blue) + beyaz (white)
 * Vurgu: cyan / emerald (teknoloji hissi)
 */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // ---------- Marka paleti (lacivert / mavi / beyaz) ----------
        brand: {
          // Koyu lacivert arka planlar
          'bg-primary': '#0A0F1E',
          'bg-secondary': '#0D1626',
          'bg-surface': '#111827',
          'bg-card': '#0F172A',

          // Lacivert tonları
          navy: {
            50: '#EEF4FF',
            100: '#DBE6FE',
            200: '#BFD3FE',
            300: '#93B4FD',
            400: '#6090FA',
            500: '#3B6EF6',
            600: '#1D4ED8',
            700: '#1E40AF',
            800: '#172554',
            900: '#0F1B3D',
            950: '#08112B',
          },

          // Mavi vurgular
          blue: {
            DEFAULT: '#2563EB',
            light: '#3B82F6',
            soft: '#DBEAFE',
          },

          // Cyan + yeşil vurgular (teknoloji / AI)
          cyan: '#06B6D4',
          'cyan-light': '#22D3EE',
          green: '#10B981',
          'green-light': '#34D399',
          purple: '#8B5CF6',

          // Metin
          'text-primary': '#F9FAFB',
          'text-secondary': '#9CA3AF',
          'text-muted': '#6B7280',

          // Kenarlık
          border: '#1F2937',
          'border-hover': '#374151',

          // Açık tema yüzeyleri (beyaz / lacivert kombinasyonu)
          paper: '#FFFFFF',
          'paper-soft': '#F5F8FF',
          'paper-muted': '#EAF0FB',
          ink: '#0B1B3A',
          'ink-soft': '#1E3A6E',
        },

        // ---------- shadcn/ui token'ları ----------
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 10px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        // H1: text-5xl md:text-6xl lg:text-7xl
        display: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.875rem, 3.4vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.25' }],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(6, 182, 212, 0.25), 0 18px 60px -20px rgba(6, 182, 212, 0.45)',
        'glow-blue': '0 0 0 1px rgba(37, 99, 235, 0.22), 0 20px 60px -24px rgba(37, 99, 235, 0.55)',
        card: '0 1px 2px rgba(11, 27, 58, 0.06), 0 12px 32px -16px rgba(11, 27, 58, 0.28)',
        'card-hover': '0 2px 4px rgba(11, 27, 58, 0.08), 0 28px 60px -24px rgba(29, 78, 216, 0.45)',
        navy: '0 24px 80px -32px rgba(8, 17, 43, 0.75)',
      },
      backgroundImage: {
        'hero-navy': 'linear-gradient(135deg, #08112B 0%, #0F1B3D 45%, #0A0F1E 100%)',
        'cta-gradient': 'linear-gradient(90deg, #06B6D4 0%, #2563EB 55%, #10B981 100%)',
        'grid-navy':
          'linear-gradient(rgba(59, 130, 246, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.07) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(rgba(15, 27, 61, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 27, 61, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
        'grid-sm': '28px 28px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.35)', opacity: '0' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-200' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.24, 0, 0.38, 1) infinite',
        shimmer: 'shimmer 2.2s infinite',
        'dash-flow': 'dash-flow 3s linear infinite',
        marquee: 'marquee 38s linear infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
