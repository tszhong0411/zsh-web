import { type IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

export const TTY_NAME = 'ttys001'
export const USERNAME = 'user'
export const HOSTNAME = 'zsh-honghong-me'

type Site = {
  url: string
  title: string
  name: string
  keywords: string[]
  titleTemplate: string
  description: string
  favicons: IconDescriptor[]
}

const prodBaseURL = 'https://zsh.honghong.me'
const devBaseURL = 'http://localhost:3000'

const site: Site = {
  url: process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL,
  title: 'Zsh On Web | Hong - A Full Stack Developer',
  name: 'Hong',
  keywords: ['zsh', 'zsh on web', 'shell'],
  titleTemplate: '| Zsh On Web | Hong - A Full Stack Developer',
  description:
    'Experience the power of Zsh on the web. Zsh On Web is a simulation of the Zsh shell, allowing you to try shell commands in a browser-based environment.',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png'
    }
  ]
}

export default site
