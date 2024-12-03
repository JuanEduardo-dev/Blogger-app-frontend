import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Provider } from "@/components/ui/provider"; // Importa tu Provider personalizado

export const metadata: Metadata = {
  title: "PropuestasPerú",
  description: "Proyecto del curso de realidad nacional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Geist:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        
      <Navbar />
        <Provider>
          <main>{children}</main>
        </Provider>
      <Footer />
      </body>
    </html>
  );
}
