/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', '"Courier New"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        receipt: ['"ReceiptMono"', '"Courier Prime"', '"Space Mono"', 'monospace'],
      },
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#f8f4ec',
          200: '#f0e8d7',
          300: '#e3d5be',
          400: '#cfb99b',
          500: '#b89d78',
          800: '#3d3224',
          900: '#231c13',
        },
        thermal: {
          paper: '#f9f8f4',
          faded: '#363430',
          ink: '#1c1b18',
          stamp: '#b91c1c',
          blueStamp: '#1d4ed8',
          greenStamp: '#15803d',
          goldStamp: '#b45309',
        },
        noir: {
          950: '#0a0a0c',
          900: '#121216',
          850: '#18181f',
          800: '#22222b',
          700: '#32323e',
        }
      },
      boxShadow: {
        'receipt': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0,0,0,0.06)',
        'receipt-hover': '0 20px 35px -10px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.08)',
        'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.25)',
        'glow-crimson': '0 0 30px -5px rgba(239, 68, 68, 0.25)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.25)',
      },
      backgroundImage: {
        'paper-pattern': "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 0)",
        'tape-strip': "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(240,240,240,0.2) 100%)",
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(0.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
