import Header from '@/components/Header';
import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Simple blog to practice Next.js and Nest.js in Turborepo',
};

const geist = Geist({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={geist.className} suppressHydrationWarning>
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
