import { AuthProvider } from '@/AuthContext';

import './globals.css';
import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import QueryProvider from './queryClientProvider';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'アシスポ',
  description: '新体操衣装レンタルサービス',
  icons: { icon: '/assispo_favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
