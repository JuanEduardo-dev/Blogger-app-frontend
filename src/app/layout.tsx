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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Geist:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main className="mt-[90px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}