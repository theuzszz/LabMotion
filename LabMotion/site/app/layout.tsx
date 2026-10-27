import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({ variable: '--font-fredoka', subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://labmotion-fisica.alinnecastro155.chatgpt.site'),
  title: 'LabMotion — Do dado à lei física',
  description: 'Escape room digital de Física Experimental sobre medidas, gráficos, MRU e MRUV.',
  openGraph: {
    title: 'LabMotion — Do dado à lei física',
    description: 'Cinco missões para transformar dados experimentais em conclusões físicas.',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'LabMotion — Do dado à lei física' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LabMotion — Do dado à lei física',
    description: 'Cinco missões para transformar dados experimentais em conclusões físicas.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${fredoka.variable} antialiased`}>{children}</body>
    </html>
  );
}
