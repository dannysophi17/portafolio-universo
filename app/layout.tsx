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
  metadataBase: new URL('https://danielacoavas.com'),
  title: {
    default: "Daniela Coavas | Full Stack Developer",
    template: "%s - Daniela Coavas",
  },
  description: "Portafolio interactivo de Daniela Sophia Coavas Barboza - Desarrolladora Full Stack Junior especializada en React, Next.js, Node.js y tecnologías cloud. AWS Cloud Practitioner certificada.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "AWS", "Cloud Computing", "Daniela Coavas", "Desarrolladora Web", "Portfolio"],
  authors: [{ name: "Daniela Sophia Coavas Barboza" }],
  creator: "Daniela Coavas",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://danielacoavas.com",
    siteName: "Daniela Coavas Portfolio",
    title: "Daniela Coavas | Full Stack Developer",
    description: "Portafolio interactivo de Daniela Sophia Coavas Barboza - Desarrolladora Full Stack Junior especializada en React, Next.js, Node.js y tecnologías cloud.",
    images: [
      {
        url: "/projects/imagenDaniela.jpg",
        width: 1200,
        height: 630,
        alt: "Daniela Coavas - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniela Coavas | Full Stack Developer",
    description: "Desarrolladora Full Stack Junior | AWS Cloud Practitioner | React, Next.js, Node.js",
    images: ["/projects/imagenDaniela.jpg"],
  },
  icons: {
    icon: '/favicon.svg',
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
