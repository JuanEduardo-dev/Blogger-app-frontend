'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Menu, Plus, User as IconUser} from 'lucide-react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Shadcn/drawer"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/Shadcn/navigation-menu"

import React from 'react';
import { cn } from '@/lib/utils';

import { PiTreeStructure } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useUser } from '@/app/context/UserContext';
import { Degree, User } from '@/types/user';
import { DegreeIcon } from '@/utils/user/degreeIcon';


const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const { user, loading } = useUser();
  const degree: Degree = user?.degreeTitle as Degree;
  
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];
  const isAuthRoute = authRoutes.includes(pathname) || pathname.startsWith('/auth/reset-password/');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [fechaFormateada, setFechaFormateada] = useState<string>('');

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Definir las acciones que se ejecutarán al hacer clic
  const menuItems = [
    { 
      icon: <IconUser className="h-5 w-5" />, 
      label: 'Mi cuenta', 
      href: '/mi-cuenta',
    },
    { 
      icon: <Plus className="h-5 w-5" />, 
      label: 'Crear propuesta', 
      href: '/mis-propuestas?step=2'
    },
    { 
      icon: <LogOut className="h-5 w-5" />, 
      label: 'Cerrar Sesión', 
      href: '/',
      action: () => {
        localStorage.clear();
        sessionStorage.clear();
        signOut();
      }
    },
  ];

  useEffect(() => {
    // Obtener la fecha y formatearla
    const fecha = new Date();

    // Opciones de formato en español
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Nombre completo del día (por ejemplo, 'lunes')
      year: 'numeric', // Año completo (por ejemplo, '2020')
      month: 'long',   // Nombre completo del mes (por ejemplo, 'marzo')
      day: 'numeric',  // Día del mes (por ejemplo, '26')
    };

    // Formatear la fecha en español
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);

    // Actualizar el estado con la fecha formateada
    setFechaFormateada(fechaFormateada);
  }, []);

  // Route change detection
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 90);
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
    { href: '/temas/organizacion-politica-y-administrativa-del-peru', label: 'Organización política y administrativa' },
    { href: '/temas/evolucion-de-los-movimientos-sociales-en-el-peru', label: 'Historia y evolución de los movimiento sociales' },
    { href: '/propuestas', label: 'Propuestas' },
    { href: '/mis-propuestas', label: 'Mis propuestas' }
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
    <Menu className='mr-4' size={24} />
    </button>
  );

  // Nav Links Component
  const NavLinks = () => (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink 
                className={`
                  ${navigationMenuTriggerStyle()}
                `}
              >
                Inicio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={''}>
              <NavigationMenuTrigger>
                Temas
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <div className="w-[325px] gap-3">
                <ul className=" gap-3">
                    <ListItem href="/temas/organizacion-politica-y-administrativa-del-peru">
                      <span className='flex items-center gap-2 text-gray-700'>
                        <PiTreeStructure className='text-lg' />
                        Organización política y administrativa
                      </span>
                    </ListItem>
                </ul>
                <ul className=" gap-3">
                    <ListItem href="/temas/evolucion-de-los-movimientos-sociales-en-el-peru">
                      <span className='flex items-center gap-2 text-gray-700 '>
                        <HiOutlineUserGroup className='text-lg' />
                        Historia y evolución de los movimiento sociales
                      </span>
                    </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/propuestas" legacyBehavior passHref>
              <NavigationMenuLink 
                className={`
                  ${navigationMenuTriggerStyle()}
                `}
              >
                Propuestas
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/mis-propuestas" legacyBehavior passHref>
              <NavigationMenuLink 
                className={`
                  ${navigationMenuTriggerStyle()}
                `}
              >
                Mis propuestas
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );

  // Social Icons Component
  const AuthButtons = ({ mobile = false }) => {
    return (
      <div className={`flex
        ${!isAuthRoute ? 'gap-4 ' : ''}
        ${mobile ? 'pt-8 flex-col' : 'font-medium'}`
        }>
          {!session ? (
            <>
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
            </> 
          ) : 
          <div ref={dropdownRef} className="relative inline-block text-left">
            <div className='flex flex-row items-center space-x-4'>         
              <div className='hidden md:block font-semibold text-gray-700'>
                {user?.name} {user?.lastName}
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out"
              >
                <DegreeIcon degree={degree} size="24px" />
              </button>
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-4 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {menuItems.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          // Si el ítem tiene una acción definida, ejecutarla
                          if (item.action) {
                            e.preventDefault(); // Prevenir navegación si hay una acción
                            item.action(); // Ejecutar la acción
                          }
                          setIsOpen(false); // Cerrar el menú
                        }}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          }
      </div>
    );
  };

  // Mobile Menu Component
  const MobileMenu = () => (
    <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className='text-center'>Menú</DrawerTitle>
          </DrawerHeader>
          <div className='relative flex flex-col items-center'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full pl-8 pr-8 text-center text-gray-700 text-lg py-3 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {!session ? (
            <div className='m-2'>
              <Link href="/auth/login">
                <button className="w-full bg-white hover:bg-gray-100 text-gray-800 text-lg py-2 rounded-md mb-3 border-[1px] border-gray-300">
                  Iniciar sesión
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="w-full bg-pallette-10 text-white text-lg py-2 rounded-md">
                  Registrarse
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <nav 
      className={`${isFixed && !isAuthRoute ? 'fixed' : 'relative'} top-0 left-0 right-0 w-full z-50 flex-col transition-all duration-100
        ${
          isFixed 
            ? 'h-14' 
            : ''
        }
        ${isAuthRoute ? 'bg-transparent' : 'bg-pallette-60'}
        `}
    >
      <div  className={`max-w-7xl mx-auto m-1 justify-between items-center px-4 text-gray-500
        ${!isFixed && !isAuthRoute ? 'flex' : 'hidden'}`
      }>
        <div className='flex'>
          <div className='flex bg-orange-600 items-center'>
            <p className='text-white pl-2 pr-2'>Tendencias</p>
          </div>
        </div>

        <p>{fechaFormateada}</p>
      </div>
      <hr className={`
        ${isFixed ? 'hidden' : 'block'}
        `}/>

      <div
        className={`
        ${isFixed ? 'h-full' : 'h-14'}
        `}
        style={{
          WebkitBackdropFilter: isFixed ? 'saturate(180%) blur(5px)' : 'none',
          backdropFilter: isFixed ? 'none' : 'none',
          boxShadow: !isAuthRoute ? 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div 
          className={`mx-auto px-4 flex items-center justify-between h-full
            ${isAuthRoute ? 'max-w-full' : 'max-w-7xl '}
            `}
        >
          <div className='flex items-center justify-start'>
            <MenuButton />
            <div className="lg:flex lg:items-center lg:gap-12">
              <Logo />
              <div className={`items-center gap-4 font-regular
                ${!isAuthRoute ? 'hidden lg:flex' : 'hidden'}
                `}>
                <NavLinks />
              </div>
            </div>
          </div>
          
          {/* Desktop Social Icons */}
          <div className={`
              ${!isAuthRoute ? 'lg:flex' : 'flex'}
              ${isAuthRoute && 
                (pathname !== "/auth/register" && pathname !== "/auth/login")
                 ? 'hidden' : ''}
                 
              ${!session && (pathname !== "/auth/register" && pathname !== "/auth/login") ? 'hidden' : ''}
              `}
          >
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"