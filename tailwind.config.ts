import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-sf-pro)'],
        mono: ['var(--font-sf-mono)']
      }
    }
  },
  plugins: []
}
export default config
