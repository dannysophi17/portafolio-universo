/**
 * Componente raíz del layout para la aplicación Next.js
 * Configura las fuentes Geist y los estilos CSS globales para toda la aplicación
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuración de fuente Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configuración de fuente Geist Mono para código/texto monoespaciado
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos de la aplicación para SEO y visualización en navegador
export const metadata: Metadata = {
  metadataBase: new URL('https://dcoavas.com'),
  title: {
    default: "Daniela Coavas | Full Stack Developer",
    template: "%s | Daniela Coavas",
  },
  description: "Portafolio interactivo 3D - Desarrolladora Full Stack especializada en React, Next.js, Node.js y AWS Cloud. Explorá mi universo de proyectos y habilidades.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "AWS", "Cloud Computing", "Daniela Coavas", "Desarrolladora Web", "Portfolio", "Three.js", "3D Portfolio"],
  authors: [{ name: "Daniela Sophia Coavas Barboza" }],
  creator: "Daniela Coavas",
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    url: "https://dcoavas.com",
    siteName: "Daniela Coavas - Portfolio",
    title: "Daniela Coavas | Full Stack Developer ⭐",
    description: "Portafolio interactivo 3D - Desarrolladora Full Stack especializada en React, Next.js, Node.js y AWS Cloud. Explorá mi universo de proyectos y habilidades.",
    images: [
      {
        url: "https://dcoavas.com/og-image.png",
        width: 1908,
        height: 894,
        alt: "Daniela Coavas - Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dcoavas",
    creator: "@dcoavas",
    title: "Daniela Coavas | Full Stack Developer ⭐",
    description: "Portafolio interactivo 3D - React, Next.js, Node.js & AWS Cloud",
    images: ["https://dcoavas.com/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/star.png', sizes: '32x32', type: 'image/png' },
      { url: '/star.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/star.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
