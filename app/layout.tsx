/**
 * Componente raíz del layout para la aplicación Next.js
 * Configura las fuentes Geist y los estilos CSS globales para toda la aplicación
 */
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Configuración de fuente Geist Sans
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Configuración de fuente Geist Mono para código/texto monoespaciado
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadatos de la aplicación para SEO y visualización en navegador
export const metadata: Metadata = {
  metadataBase: new URL('https://dcoavas.com'),

  title: {
    default: 'Daniela Coavas | Full Stack Developer',
    template: '%s | Daniela Coavas',
  },

  description:
    'Portafolio interactivo 3D de Daniela Coavas, desarrolladora Full Stack y estudiante de Ingeniería de Sistemas, con experiencia en React, Next.js, TypeScript, Three.js y AWS.',

  keywords: [
    'Daniela Coavas',
    'Full Stack Developer',
    'Software Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Three.js',
    'React Three Fiber',
    'AWS',
    'Cloud Computing',
    '3D Portfolio',
    'Web Developer Colombia',
  ],

  authors: [
    {
      name: 'Daniela Sophia Coavas Barboza',
      url: 'https://dcoavas.com',
    },
  ],

  creator: 'Daniela Coavas',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: 'en_US',
    url: '/',
    siteName: 'Daniela Coavas — Interactive 3D Portfolio',
    title: 'Daniela Coavas | Full Stack Developer',
    description:
      'Explora un portafolio interactivo 3D con proyectos de desarrollo web, cloud y experiencias digitales.',
    images: [
      {
        url: '/og-image.png',
        width: 1908,
        height: 894,
        alt: 'Daniela Coavas — Interactive 3D Portfolio',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Daniela Coavas | Full Stack Developer',
    description:
      'Portafolio interactivo 3D con proyectos de desarrollo web, cloud y experiencias digitales.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/star.png',
    shortcut: '/star.png',
    apple: '/star.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
