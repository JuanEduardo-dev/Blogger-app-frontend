// src/app/context/UserContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@/types/user';


// Definir el tipo del contexto
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Crear el contexto
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true
});

// Proveedor del contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Rutas públicas que no requieren carga de usuario
  const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reser-password'];

  useEffect(() => {
    // No cargar usuario en rutas públicas
    if (publicPaths.some(path => pathname.startsWith(path))) {
      setLoading(false);
      return;
    }

    // Primero, intenta obtener datos de localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (parseError) {
        console.error('Error parsing stored user:', parseError);
      }
    }

    // Si no hay datos en localStorage, realiza la solicitud de fetch
    async function fetchData() {
      try {
        const response = await fetch('/api/user/get');
        const data = await response.json();
        
        if (response.ok) {
          console.log(JSON.stringify(data.data))
          setUser(data.data);
          localStorage.setItem('user', JSON.stringify(data.data));
        } 
        
        setLoading(false);
      } catch (fetchError) {
        console.error('Error:', fetchError);
        setLoading(false);
      }
    }

    fetchData();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  
  return context;
};