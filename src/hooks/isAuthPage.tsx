"use client";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';

function LoginPage() {
  const pathname = usePathname();

  useEffect(() => {
    // Cambiar el fondo de la página solo si estamos en la ruta /reset-password
    if (pathname === "/auth/login") {
      document.body.classList.add("bg-blue-500");
    } else {
      document.body.classList.remove("bg-blue-500");
    }

    // Limpiar al desmontar el componente o cambiar de ruta
    return () => {
      document.body.classList.remove("bg-blue-500");
    };
  }, [pathname]);

  return (
    <div className="h-[calc(100vh-90px)] flex justify-center items-center bg-black">
      
    </div>
  );
}

export default LoginPage;
