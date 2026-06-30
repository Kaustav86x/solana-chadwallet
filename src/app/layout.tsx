import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PrivyProvider from '@/components/providers/PrivyProvider';
import Navbar from '@/components/layout/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Solscope — Your Lens on Solana',
  description:
    'Buy, sell, and discover the hottest Solana tokens — instantly, from your phone or the web. No wallet needed to start.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Solscope — Your Lens on Solana',
    description: 'The premier Solana memecoin trading platform.',
    images: ['/assets/solana.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solscope',
    description: 'Your Lens on Solana.',
    images: ['/assets/solana.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrivyProvider>
          <Navbar />
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
