'use client';

import { usePathname} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();

  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
  
  const isAuthRoute = authRoutes.includes(pathname) || pathname.startsWith('/auth/reset-password/');

  return (
    <>
    <footer className={`
      ${!isAuthRoute ? 'block' : 'hidden'}
      `}>
      <div className="bg-pallette-10-contrast text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo-footer.png"
              alt="Buccasan Logo"
              style={{
                width: 'auto', height: '64px',
              }}
              width={0}
              height={0}
              sizes="100vw"
            />
            </Link>
            <p className="text-pallette-60">
              Una plataforma en la que puedes compartir tus propuestas e ideas con el Perú.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pallette-30 p-2 rounded-full hover:bg-pallette-60 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-pallette-10-contrast">
                  <path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
                </svg>
              </a>
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pallette-30 p-2 rounded-full hover:bg-pallette-60 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-pallette-10-contrast">
                  <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                </svg>
              </a>
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pallette-30 p-2 rounded-full hover:bg-pallette-60 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-pallette-10-contrast">
                  <path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                </svg>
              </a>
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pallette-30 p-2 rounded-full hover:bg-pallette-60 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-pallette-10-contrast">
                  <path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className="text-pallette-30 text-xl font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-pallette-60 hover:text-pallette-30 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/propuestas" className="text-pallette-60 hover:text-pallette-30 transition-colors">
                  Propuestas
                </Link>
              </li>
              <li>
                <Link href="/mis-propuestas" className="text-pallette-60 hover:text-pallette-30 transition-colors">
                  Mis propuestas
                </Link>
              </li>
              <li>
                <Link href="/mi-cuenta" className="text-pallette-60 hover:text-pallette-30 transition-colors">
                  Mi cuenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Horario de Atención */}
          <div className="space-y-4">
            <h3 className="text-pallette-30 text-xl font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-pallette-60">
                <span>Términos y condiciones</span>
              </li>
              <li className="flex justify-between text-pallette-60">
                <span>Política de privacidad</span>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-pallette-30 text-xl font-semibold">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-pallette-60">
                <Phone className="text-pallette-30" size={20} />
                <span>+51 974 980 380</span>
              </li>
              <li className="flex items-center space-x-3 text-pallette-60">
                <Mail className="text-pallette-30" size={20} />
                <span>propuestasperu@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-pallette-60">
                <MapPin className="text-pallette-30" size={20} />
                <span>Av. Los Laureles 328, Amarilis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-pallette-10-contrast bg-gradient-to-b from-black/25 to-black/25 text-pallette-60 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} PropuestasPerú.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;