import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import site from '@/config'
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`
  },
  description: site.description,
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
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    site: '@tszhong0411',
    siteId: '1152256803746377730',
    creator: '@tszhong0411',
    creatorId: '1152256803746377730',
    images: [`${site.url}/images/og.png`]
  },
  keywords: site.keywords,
  creator: 'tszhong0411',
  openGraph: {
    url: site.url,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'en-US',
    images: [
      {
        url: 'https://zsh.honghong.me/images/og.png',
        width: 1280,
        height: 832,
        alt: site.description,
        type: 'image/png'
      }
    ]
  },
  icons: {
    icon: '/favicon/favicon.svg',
    shortcut: '/favicon/favicon.svg',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [...site.favicons]
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
