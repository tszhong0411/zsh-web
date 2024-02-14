import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import { cn } from '@/utils/cn'

type RootLayoutProps = {
  children: React.ReactNode
}

const SFMono = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Mono-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SF-Mono-Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SF-Mono-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SF-Mono-Semibold.otf',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-sf-mono'
})

const SFPro = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--font-sf-pro'
})

const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://zsh.honghong.me'
    : 'http://localhost:3000'
const SITE_DESCRIPTION =
  'Experience the power of Zsh on the web. Zsh On Web is a simulation of the Zsh shell, allowing you to try shell commands in a browser-based environment.'
const SITE_TITLE = 'Zsh On Web | Hong - A Full Stack Developer'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  manifest: '/favicon/site.webmanifest',
  twitter: {
    title: 'Hong',
    card: 'summary_large_image',
    site: '@tszhong0411',
    creator: '@tszhong0411',
    images: [
      {
        url: 'https://honghong.me/images/projects/zsh-on-web/cover.png',
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION
      }
    ]
  },
  alternates: {
    canonical: SITE_URL
  },
  keywords: ['zsh', 'zsh on web', 'shell'],
  creator: 'tszhong0411',
  openGraph: {
    url: SITE_URL,
    type: 'website',
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en-US',
    images: [
      {
        url: 'https://honghong.me/images/projects/zsh-on-web/cover.png',
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION,
        type: 'image/png'
      }
    ]
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
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
}

export const viewport: Viewport = {
  themeColor: {
    color: '#000000'
  }
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang='en-US' className={cn(SFMono.variable, SFPro.variable)}>
      <body className='bg-[#1e1e1e] font-default text-white'>{children}</body>
    </html>
  )
}

export default RootLayout
