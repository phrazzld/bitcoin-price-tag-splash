import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bitcoin Price Tag - See Any Price in Bitcoin Instantly',
  description:
    'Transform your shopping experience with real-time Bitcoin price conversions on every website. Free Chrome extension.',
  keywords: 'bitcoin, btc, price converter, chrome extension, cryptocurrency, bitcoin prices',
  authors: [{ name: 'Bitcoin Price Tag' }],
  metadataBase: new URL('https://bitcoinpricetag.com'),
  openGraph: {
    title: 'Bitcoin Price Tag - See Any Price in Bitcoin Instantly',
    description:
      'Transform your shopping experience with real-time Bitcoin price conversions on every website.',
    type: 'website',
    url: 'https://bitcoinpricetag.com',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Bitcoin Price Tag - Chrome Extension',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Price Tag - See Any Price in Bitcoin Instantly',
    description:
      'Transform your shopping experience with real-time Bitcoin price conversions on every website.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
