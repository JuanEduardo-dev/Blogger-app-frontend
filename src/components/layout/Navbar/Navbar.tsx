'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const authRoutes = ['/auth/login', '/auth/register'];
  const isAuthRoute = authRoutes.includes(pathname)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // Route change detection
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 96);
    };
  
    handleScroll(); // Check initial scroll state
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Body overflow control when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);
  
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Temas' },
    { href: '/sede', label: 'Propuestas' }
  ];

  // Logo Component
  const Logo = () => (
    <div className={`transition-all duration-100 md:${isFixed ? 'w-32' : 'w-48'} w-48`}>
      <Link href="/">
        <Image
          src={isFixed ? '/images/logo.png' : '/images/logo.png'}
          alt="Logo"
          width={180}
          height={60}
          className="object-contain"
          priority
          style={{ width: 'auto', height: 'auto' }}
        />
      </Link>
    </div>
  );

  // Menu Button Component
  const MenuButton = () => (
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={`z-50 
         ${isAuthRoute ? 'hidden' : 'lg:hidden'}
      `}
      aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isMenuOpen ? (
        <X className="text-pallette-10" size={24} />
      ) : (
        <Menu className={`${isFixed ? 'text-pallette-10' : 'text-pallette-10'}`} size={24} />
      )}
    </button>
  );

  // Nav Links Component
  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link 
          key={link.href}
          href={link.href}
          className={`h-9 px-4 flex items-center rounded-full
            ${pathname === link.href ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}
          `}
        >

          {link.label}
          {/*
          {!mobile && (
            <span className={`absolute bottom-0 left-0 h-[1px] bg-current transition-all duration-200 ease-out 
              ${pathname === link.href ? 'w-full' : 'w-0'}
              group-hover:w-full
            `}></span>
          )}
          */}
        </Link>
      ))}
    </>
  );

  // Social Icons Component
  const AuthButtons = ({ mobile = false }) => {
    return (
      <div className={`flex
        ${!isAuthRoute ? 'gap-4 ' : ''}
        ${mobile ? 'pt-8 flex-col' : 'font-medium'}`
        }>
        <Link 
          href="/auth/login"
        >
          <button className={`h-9 items-center gap-4 text-black px-4 transition-colors rounded-lg duration-200 hover:bg-gray-100 border-[1px]
              ${pathname === "/auth/login" ? 'hidden' : ''}
            `}>
            <span>Iniciar sesión</span>
          </button>
        </Link>
        <Link 
          href="/auth/register"
        >
          <button className={`h-9 items-center gap-4 bg-pallette-10 text-white rounded-lg px-4 transition-colors duration-200 hover:bg-pallette-10-contrast
            ${pathname === "/auth/register" ? 'hidden' : ''}
            `}>
            <span>Registrarse</span>
          </button>
        </Link>
      </div>
    );
  };

  // Mobile Menu Component
  const MobileMenu = () => (
    <div
      className={`relative bg-black transition-transform transform duration-300 ease-in-out z-40 
        ${isFixed ? 'h-[calc(100svh-48px)] ' : 'h-[calc(100svh-90px)] '}
        ${isMenuOpen ? 'translate-x-0' : 'hidden'}
        lg:hidden`}
    >
      <div className="flex flex-col items-center pt-10 space-y-4 w-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-full text-center text-gray-700 text-lg py-3 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="w-full px-6 absolute bottom-0 left-0  pb-6">
          <Link href="/auth/login">
            <button className="w-full bg-gray-100 text-gray-700 text-lg py-2 rounded-md mb-3">
              Iniciar sesión
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="w-full bg-blue-600 text-white text-lg py-2 rounded-md">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <nav 
      className={`${isFixed ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full z-50 flex-col transition-all duration-100
        ${
          isFixed 
            ? 'h-14 bg-pallette-60' 
            : 'bg-transparent'
        }`}
    >
      <div  className={`max-w-7xl mx-auto m-1 justify-end items-center px-4 text-pallette-10
        ${!isFixed && !isAuthRoute ? 'flex' : 'hidden'}`
      }>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"></path></svg>
        
        <p>Av. Los Laureles 328</p>

        <a className='ml-4 flex items-center' href="https://linktr.ee/buccasan" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"></path></svg>
          <p>Linktree</p>
        </a>
      </div>
      <hr className={`${!isFixed && !isAuthRoute ? 'flex' : 'hidden'}`}/>

      <div
        className={`
        ${isFixed ? 'h-full' : 'h-14'}
        `}
        style={{
          WebkitBackdropFilter: isFixed ? 'saturate(180%) blur(5px)' : 'none',
          backdropFilter: isFixed ? 'none' : 'none',
          boxShadow: isFixed ? 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div 
          className={`mx-auto px-4 flex items-center justify-between h-full
            ${isAuthRoute ? 'max-w-full' : 'max-w-7xl '}
            `}
        >
          <div className="lg:flex lg:items-center lg:gap-12">
            <Logo />
            <div className={`items-center gap-4 font-regular
              ${!isAuthRoute ? 'hidden lg:flex' : 'hidden'}
              `}>
              <NavLinks />
            </div>
          </div>
          <MenuButton />
          
          {/* Desktop Social Icons */}
          <div className={`
              ${!isAuthRoute ? 'hidden lg:flex' : 'flex'}
              `}>
            <AuthButtons />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu />
    </nav>
  );
};

export default Navbar;