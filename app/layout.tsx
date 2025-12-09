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
  title: "Daniela Coavas | Full Stack Developer",
  description: "Portafolio interactivo de Daniela Sophia Coavas Barboza - Desarrolladora Full Stack Junior especializada en React, Next.js, Node.js y tecnologías cloud.",
  icons: {
    icon: '/favicon.svg',
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
