import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Blogger",
  description: "Proyecto del curso de realidad nacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <main className="mt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
