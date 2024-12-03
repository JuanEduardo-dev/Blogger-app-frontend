//blogger-front/src/app/(routes)/auth/register/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";

interface Degree {
  id: number;
  title: string;
}

interface RegisterFormInputs {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  degreeId: number;
}

function RegisterPage() {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [error, setError] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState<Partial<RegisterFormInputs>>({});
  const [errorMessage, setErrorMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await fetch('/api/degrees');
        if (response.ok) {
          const data = await response.json();
          setDegrees(data);
          console.log("Degrees fetched:", data);
        }
      } catch (error) {
        console.error('Failed to fetch degrees', error);
      }
    };
  
    fetchDegrees();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<RegisterFormInputs>();
  const router = useRouter();
  const watchPassword = watch("password");

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setErrorMessage('');
  };

  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setRecaptchaToken(null);
    setErrorMessage('');
  };

  const onSubmitStep1: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (!recaptchaToken) {
      setErrorMessage('Por favor, completa la verificación de reCAPTCHA');
      return;
    }
    
    const isValid = await trigger(["email", "password", "confirmPassword"]);
    if (isValid) {
      setRegistrationData({
        email: data.email,
        password: data.password
      });
      setCurrentStep(2);
    }
  };

  const onSubmitStep2: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (!recaptchaToken) {
      setError('Por favor, completa la verificación de reCAPTCHA');
      return;
    }

    setIsSubmitting(true);

    const isValid = await trigger(["name", "lastName", "bio", "degreeId"]);
    if (isValid) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: data.name,
            lastName: data.lastName,
            email: registrationData.email,
            password: registrationData.password,
            bio: data.bio,
            degreeId: Number(data.degreeId)
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setIsSubmitting(false);

        if (res.ok) {
          router.push("/auth/login");
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Error en el registro");
        }
      } catch (err) {
        setError("Se produjo un error durante el registro");
        console.error(err);
      }
    }
  };

  const goBackToStep1 = () => {
    resetRecaptcha();
    setCurrentStep(1);
    //reset();
  };

  const renderStep1 = () => (
    <form onSubmit={handleSubmit(onSubmitStep1)} className="space-y-4">
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
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido"
            }
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
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres"
            }
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirma tu contraseña",
            },
            validate: (value) => 
              value === watchPassword || "Las contraseñas no coinciden"
          })}
          className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          transition-colors duration-300 ease-in-out"
          placeholder="Confirma tu contraseña"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LcXx48qAAAAAOtQ66UffdvSnLGQtJ-NRphUvby-"
          onChange={handleRecaptchaChange}
          hl="es"
        />
        {!recaptchaToken && errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>

      <button 
        type="submit"
        className="w-full bg-pallette-10 text-white py-2 rounded-md 
        hover:bg-pallette-10-contrast transition-colors duration-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Siguiente
      </button>
      <br /><hr />
      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta? {" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-500 transition-colors"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit(onSubmitStep2)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          Nombres
        </label>
        <input
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Los nombres son obligatorios",
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          transition-colors duration-300 ease-in-out"
          placeholder="Ingresa tus nombres"
        />
        {errors.name && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Apellidos
        </label>
        <input
          type="text"
          {...register("lastName", {
            required: {
              value: true,
              message: "Los apellidos son obligatorios",
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          transition-colors duration-300 ease-in-out"
          placeholder="Ingresa tus apellidos"
        />
        {errors.lastName && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
          Biografía
        </label>
        <textarea
          {...register("bio", {
            maxLength: {
              value: 500,
              message: "La biografía no puede exceder 500 caracteres"
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          transition-colors duration-300 ease-in-out"
          placeholder="Cuéntanos sobre ti"
          rows={4}
        />
        {errors.bio && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.bio.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="academicLevel" className="block text-sm font-medium text-gray-700 mb-2">
          Grado Académico
        </label>
        <div className="custom-select w-full">
          <select
            {...register("degreeId", {
              required: {
                value: true,
                message: "Debe de seleccionar un grado académico",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
              focus:outline-none focus:ring-blue-500 focus:border-blue-500
              transition-colors duration-300 ease-in-out"
          >
            <option value="">Selecciona su grado académico</option>
            {degrees.map((degree) => (
              <option key={degree.id} value={degree.id}>
                {degree.title}
              </option>
            ))}
          </select>
        </div>

        {errors.degreeId && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.degreeId.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2">
        <div className="text-right flex items-center">
          <p 
            onClick={goBackToStep1} 
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
          >
            ← Volver al paso anterior
          </p>
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
              Registrarse
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <div className="h-screen mt-0 flex flex-row items-center lg:justify-between">
      <div className="flex flex-col justify-center items-center space-y-2 w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            {currentStep === 1 ? "Crear una cuenta" : "Cuéntanos Sobre Ti"}
          </h1>
        </div>
        <div className="w-full max-w-md p-4 border-gray-200">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;