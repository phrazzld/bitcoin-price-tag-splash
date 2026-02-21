import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { CorrelationProvider } from '@/lib/logging/correlation';
import { PostHogProvider } from '@/lib/posthog/PostHogProvider';
import { PostHogPageview } from '@/lib/posthog/PostHogPageview';

export const metadata: Metadata = {
  title: 'Bitcoin Price Tag - See Bitcoin prices everywhere',
  description:
    'Convert any price to Bitcoin automatically with our Chrome extension. See BTC values instantly on any website.',
  keywords: 'bitcoin, btc, price converter, chrome extension, cryptocurrency, bitcoin prices',
  authors: [{ name: 'Bitcoin Price Tag' }],
  openGraph: {
    title: 'Bitcoin Price Tag - See Bitcoin prices everywhere',
    description: 'Convert any price to Bitcoin automatically with our Chrome extension',
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
    title: 'Bitcoin Price Tag - See Bitcoin prices everywhere',
    description: 'Convert any price to Bitcoin automatically with our Chrome extension',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang="en">
      <body className="antialiased">
        <PostHogProvider>
          <PostHogPageview />
          <CorrelationProvider>{children}</CorrelationProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
