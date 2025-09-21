import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Simple blog to practice Next.js and Nest.js in Turborepo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
