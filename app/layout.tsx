import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header, HeaderView } from "@/components/layout/Header";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pad.cm"),
  title: {
    default: "Port Autonome de Douala — Pôle de référence au cœur du Golfe de Guinée",
    template: "%s · Port Autonome de Douala",
  },
  description:
    "Le Port Autonome de Douala gère le port de Douala-Bonabéri, porte d’entrée du Cameroun et des pays de l’hinterland : chenal de 50 km, 11 zones d’exploitation, actualités et projets.",
  openGraph: {
    type: "website",
    locale: "fr_CM",
    siteName: "Port Autonome de Douala",
    images: [{ url: "/images/terminal-vue-aerienne.jpg", width: 2560, height: 1707, alt: "Vue aérienne du terminal à conteneurs du port de Douala" }],
  },
  icons: { icon: "/images/logo-pad.png" },
};

export const viewport: Viewport = {
  themeColor: "#193c78",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${publicSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only z-[60] bg-navy px-4 py-3 font-medium text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <Suspense fallback={<HeaderView pathname="" />}>
          <Header />
        </Suspense>
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
