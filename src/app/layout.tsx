import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Provider } from "@/components/ui/ChakraUI/provider"; // Importa tu Provider personalizado
import { getServerSession } from "next-auth";
import SessionProviderClientComponent from "@/components/layout/SessionProviderClientComponent/SessionProviderClientComponent";
import { Toaster } from "@/components/ui/Shadcn/toaster";
import { UserProvider } from './context/UserContext';
import { LandbotComponent } from "@/components/layout/LandbotComponent";
export const metadata: Metadata = {
  title: "PropuestasPerú",
  description: "Proyecto del curso de realidad nacional",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Geist:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProviderClientComponent session={session}>
          <Provider>
            <UserProvider>
              <Navbar />
                <main>{children}
                <LandbotComponent />
                  </main>  
              <Footer />
            </UserProvider>
          </Provider>
        </SessionProviderClientComponent>
        <Toaster />
      </body>
    </html>
  );
}
