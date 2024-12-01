'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter(); // Añadir esta línea cerca de los otros hooks

  const scrolledRoutes = ['/nosotros', '/sede', '/servicios', '/contacto'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolledRoute = scrolledRoutes.includes(pathname) || pathname == '/'; // Verdadero si pathname está en las rutas definidas
  const [isScrolled, setIsScrolled] = useState(false); // Verdadero si el usuario ha scrolleado
  const [isFixed, setIsFixed] = useState(false); // Verdadero si el scroll es mayor a 50px
  const [isNavigating, setIsNavigating] = useState(false);

  // Añadir este useEffect para detectar cambios de ruta
  useEffect(() => {
    setIsNavigating(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Manejo del scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Actualiza isScrolled según el scroll
      setIsFixed(window.scrollY > 96); // Establece isFixed si el scroll es mayor a 50px
    };
  
    handleScroll(); // Comprueba el estado inicial del scroll
    window.addEventListener('scroll', handleScroll); // Escucha el evento de scroll
  
    return () => window.removeEventListener('scroll', handleScroll); // Limpia el listener al desmontar
  }, []);
  
  // Control del scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);
  
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/sede', label: 'Sede' },
    { href: '/servicios', label: 'Servicios' }
  ];

  // Componentes reutilizables
  const Logo = () => (
    <div className={`transition-all duration-100 md:${isScrolled ? 'w-32' : 'w-48'} w-48`}>
      <Link href="/">
        <Image
          src={isScrolled || isScrolledRoute ? '/images/logo.png' : '/images/logo.png'}
          alt="Logo"
          width={isScrolled || isScrolledRoute ? '128' : '180'}
          height={isScrolled || isScrolledRoute ? '40' : '60'}
          className="object-contain"
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </Link>
    </div>
  );

  const MenuButton = () => (
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="lg:hidden z-50"
      aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isMenuOpen ? (
        <X className="text-pallette-10" size={24} />
      ) : (
        <Menu className={`${isScrolled || isScrolledRoute ? 'text-pallette-10' : 'text-white'}`} size={24} />
      )}
    </button>
  );

  const NavLinks = ({ mobile = false }) => (
    <>
      {navLinks.map((link) => (
        <Link 
          key={link.href}
          href={link.href}
          onClick={(e) => {
            if (mobile) {
              e.preventDefault();
              setIsNavigating(true);
              router.push(link.href);
            }
          }}
          className={mobile ? 
            `text-xl font-medium text-pallette-10 relative
            ${pathname === link.href ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pallette-10' : ''}`
            :
            `relative group transition-colors duration-200 
            ${isScrolled || isScrolledRoute ? 'text-pallette-10' : 'text-white'}`
          }
        >
          {link.label}
          {!mobile && (
            <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-200 ease-out 
              ${pathname === link.href ? 'w-full' : 'w-0'}
              group-hover:w-full
            `}></span>
          )}
        </Link>
      ))}
    </>
  );

  const SocialIcons = ({ mobile = false }) => {
    return (
      <>
      <Link 
        href="/contacto"
        onClick={(e) => {
          if (mobile) {
            e.preventDefault();
            setIsNavigating(true);
            router.push('/contacto');
          }
        }}
        className={mobile ? "w-full px-8" : "group transition-colors duration-200 text-white"}
      >
        <button className={`flex items-center gap-4 text-black px-4 transition-colors duration-200
          ${mobile ? 'w-full h-12 justify-center' : 'h-10'}`}>
          <span>Contáctenos</span>
        </button>
      </Link>
      <Link 
        href="/contacto"
        onClick={(e) => {
          if (mobile) {
            e.preventDefault();
            setIsNavigating(true);
            router.push('/contacto');
          }
        }}
        className={mobile ? "w-full px-8" : "group transition-colors duration-200 text-white"}
      >
        <button className={`flex items-center gap-4 bg-pallette-10 text-white rounded-lg px-4 transition-colors duration-200 hover:bg-pallette-10-contrast
          ${mobile ? 'w-full h-12 justify-center' : 'h-10'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
          </svg>
          <span>Contáctenos</span>
        </button>
      </Link>
      </>
    );
  };

  const MobileMenu = () => (
    <div 
      className={`
        fixed inset-0 bg-pallette-60 transition-transform duration-300 ease-in-out transform 
        ${isMenuOpen && !isNavigating ? 'translate-x-0' : 'translate-x-full'}
        lg:hidden flex flex-col items-center justify-center
        space-y-8 pt-20 z-40
      `}
    >
      <NavLinks mobile />
      <SocialIcons mobile />
    </div>
  );

  return (
    <nav 
      className={`${isFixed || !isScrolledRoute ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full z-50  flex-col transition-all duration-100
        ${
          isScrolled 
            ? 'h-16 bg-pallette-60' 
            : isScrolledRoute 
            ? 'h-24 bg-pallette-60' 
            : 'h-20 bg-transparent'
        }`}
    >
      <div  className={`max-w-7xl mx-auto m-1 justify-end items-center px-4 text-pallette-10
        ${isFixed || !isScrolledRoute ? 'hidden' : 'flex'}`
      }>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"></path></svg>
        
        <p>Av. Los Laureles 328</p>

        <a className='ml-4 flex items-center' href="https://linktr.ee/buccasan" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"></path></svg>
          <p>Linktree</p>
          
        </a>

      </div>
      <hr className={`${isFixed || !isScrolledRoute ? 'hidden' : 'flex'}`}/>

      <div
        className={`
        ${isFixed || !isScrolledRoute ? 'h-full' : 'h-16'}
        `}
        style={{
          WebkitBackdropFilter: isScrolled || isScrolledRoute ? 'saturate(180%) blur(5px)' : 'none',
          backdropFilter: isScrolled || isScrolledRoute ? 'none' : 'none',
          boxShadow: isScrolled || isScrolledRoute ? 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div 
          className={`max-w-7xl mx-auto px-4 flex items-center justify-between h-full
          `}>
          <Logo />
          <MenuButton />
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12 font-regular">
            <NavLinks />
          </div>
          
          {/* Desktop Social Icons */}
          <div className="hidden lg:flex">
            <SocialIcons />
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;