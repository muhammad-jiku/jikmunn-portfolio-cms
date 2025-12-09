import { WebVitals } from '@/components/performance/WebVitals';
import ReduxProvider from '@/components/providers/ReduxProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { Toaster } from '@/components/ui/Toaster';
import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = createMetadata({
  title: 'Portfolio CMS - Content Management System',
  description:
    'Professional portfolio content management system for managing projects, blogs, services, skills, resume, testimonials, and FAQs.',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="portfolio-cms-theme"
        >
          <ReduxProvider>
            <SocketProvider>
              <WebVitals />
              <div className="relative">{children}</div>
              <Toaster />
              <CommandPalette />
            </SocketProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
