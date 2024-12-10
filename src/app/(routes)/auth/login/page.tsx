//blogger-front/src/app/(routes)/auth/login/page.tsx

"use client";

import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

import Link from 'next/link';
import Typewriter from '@/components/ui/Typewriter/Typewriter';

interface LoginFormInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const pathname = usePathname();
  const bgColor = "lg:bg-custom-gradient"

  const [currentImage, setCurrentImage] = useState("/images/fondo-1.png");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === "/images/fondo-1.png" ? "/images/fondo-2.png" : "/images/fondo-1.png"
        );
        setFadeOut(false);
      }, 1000)

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cambiar el fondo de la página para /reset-password
    if (pathname === "/auth/login") {
      document.body.classList.add(bgColor);
    } else {
      document.body.classList.remove(bgColor);
    }

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    
    setIsSubmitting(false);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error en el inicio de sesión con Google", error);
    }
  };

  return (
    <div className="h-[calc(100svh-114px)] flex flex-row items-center justify-center">
      <div className="flex flex-col justify-center items-center space-y-4 w-full lg:w-1/2 ml-4 mr-4 lg:mg-0">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 sm:mb-2">Iniciar Sesión</h1>
          <p className="text-gray-500 text-base hidden sm:block">Transforma tus ideas en propuestas innovadoras.</p>
        </div>
        <div className="w-full max-w-md bg-white rounded-xl p-6 border border-gray-200 shadow-[0_4px_24px_0_#00000004,0_4px_32px_0_#00000004,0_2px_64px_0_#00000003,0_16px_32px_0_#00000003]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
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
                focus:outline-none focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-300 ease-in-out"
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
                focus:outline-none focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-300 ease-in-out"
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
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 rounded-md flex justify-center
                 transition-all duration-300 
              
                ${isSubmitting ? 'bg-gray-400' 
                  : 'bg-pallette-10 hover:bg-pallette-10-contrast focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
            >
              {isSubmitting ? (
                <>
                  <svg aria-hidden="true" className="inline w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </>
              ) : (
                <>
                  Iniciar Sesión
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta? {" "}
                <Link 
                  href="./register" 
                  className="text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
          <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* Botón de Google */}
          <div className="mt-4">
            <button
              type="button" // Asegura que no se envíe el formulario
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 text-sm font-medium text-black hover:bg-gray-50"
            >
              <div className="flex items-center">         
                <FcGoogle className="w-5 h-5 mr-2" />
                Continuar con Google
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className='p-20 2xl:p-36 animate-float text-center justify-center'>
          <Typewriter />
          <Image
            className={`relative object-cover h-full block shadow-lg transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            src={currentImage}
            alt="Background"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
