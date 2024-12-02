//blogger-front/src/app/(routes)/auth/login/page.tsx

"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const pathname = usePathname();
  const bgColor = "lg:bg-custom-gradient"

  useEffect(() => {
    // Cambiar el fondo de la página solo si estamos en la ruta /reset-password
    if (pathname === "/auth/login") {
      document.body.classList.add(bgColor);
    } else {
      document.body.classList.remove(bgColor);
    }

    // Limpiar al desmontar el componente o cambiar de ruta
    return () => {
      document.body.classList.remove(bgColor);
    };
  }, [pathname]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="h-[calc(100vh-90px)] flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
      <div className="flex flex-col justify-center items-center space-y-4 w-full lg:w-1/2">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Iniciar Sesión</h1>
          <p className="text-gray-500 text-lg">Transforma tus ideas en propuestas con PropuestasPerú</p>
        </div>
        <div className="w-full max-w-md bg-white rounded-xl p-8 border border-gray-200 shadow-[0_4px_24px_0_#00000004,0_4px_32px_0_#00000004,0_2px_64px_0_#00000003,0_16px_32px_0_#00000003]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <p className="text-gray-500 text-sm text-center">¡Bienvenido de nuevo! Por favor, ingresa tus datos.</p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo electrónico es obligatorio",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
                transition-all duration-300 ease-in-out"
                placeholder="tu-correo@ejemplo.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
                transition-all duration-300 ease-in-out"
                placeholder="Ingresa tu contraseña"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link 
                href="./forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button 
              className="w-full bg-pallette-10 text-white py-2 rounded-md 
              hover:bg-pallette-10-contrast transition-colors duration-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Iniciar Sesión
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta? {" "}
                <Link 
                  href="/register" 
                  className="text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
       
      </div>
    </div>
  );
}

export default LoginPage;
