//blogger-front/src/app/(routes)/auth/forgot-password/page.tsx

"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';

interface ForgotPasswordInputs {
  email: string;
}

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ForgotPasswordInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      setMessage(null);
      setError(null);
      setIsSubmitting(true);

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        setShowForm(false);
        setMessage('¡Correo enviado! Por favor revise la dirección de correo electrónico y busque el correo que le enviamos al buzón de entrada.');
      } else {
        setError(result.message || 'Algo salió mal');
      }
    } catch {
      setError('Error de red. Inténtalo de nuevo.');
    }
    
  };

  return (
    <div>
      {showForm && (
        <div className="h-[calc(100svh-114px)] flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center space-y-2 p-4">
            <div className="text-center max-w-md">
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">Restablece contraseña</h1>
              <p className="text-base text-gray-600">Escribe la dirección de tu correo y te enviaremos un enlace para restablecer la contraseña.</p>
            </div>

            <div className="w-full p-4 max-w-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <p className="bg-red-500 text-white p-3 rounded mb-2">{error}</p>
                )}

                <label className="text-gray-700 text-sm block">Correo Electrónico:</label>
                <input
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El correo electrónico es obligatorio",
                    }
                  })}
                  className="w-full p-3 mb-2 block border border-gray-300 hover:border-gray-500 rounded-md 
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500
                    transition-colors duration-300 ease-in-out"
                  placeholder="tu-correo@ejemplo.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
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
                      Enviar enlace de recuperación
                    </>
                  )}
                </button>
                <br />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    <Link
                      href="/auth/login"
                    >
                      Volver a Iniciar sesión
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className="flex flex-col items-center justify-center h-[calc(100svh-114px)]">
          <div className="bg-gray-500 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='max-w-md p-8 lg:p-4'>
            <p className="text-black text-xl mb-2 text-center">¡Revise su email!</p>
            <p className="text-gray-600 text-center">{message}</p>
            <button
              className="mt-4 bg-transparent hover:bg-gray-200 text-black w-full py-2 rounded-md border border-gray-300
              transition-all duration-300 ease-in-out
              "
              onClick={() => {
                setShowForm(true);
                setMessage(null);
              }}
            >
              Reenviar email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}