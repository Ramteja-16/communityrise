/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#09090b',
          surface: '#121215',
          card: '#18181b',
          border: '#27272a',
          muted: '#71717a',
          lightBg: '#fcfcfc',
          lightSurface: '#ffffff',
          lightBorder: '#e4e4e7',
          green: '#10b981', // Crisp Emerald
          greenHover: '#059669',
          greenDark: '#064e3b',
          greenLight: '#d1fae5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
