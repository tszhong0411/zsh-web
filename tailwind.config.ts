import { type Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))'
      },
      fontFamily: {
        mono: ['SF Mono', 'monospace'],
        default: ['SF Pro']
      }
    }
  },
  plugins: []
}

export default config
