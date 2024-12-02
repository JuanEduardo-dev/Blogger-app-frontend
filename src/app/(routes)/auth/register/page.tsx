//blogger-front/src/app/(routes)/auth/register/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import ReCAPTCHA from "react-google-recaptcha";

// Define interface for Degree
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

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await fetch('/api/degrees');
        if (response.ok) {
          const data = await response.json();
          setDegrees(data);
          console.log("Degrees fetched:", data); // Verifica que los datos se están recibiendo
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
  };

  const onSubmitStep1: SubmitHandler<RegisterFormInputs> = async (data) => {
    // Verify reCAPTCHA first
    if (!recaptchaToken) {
      alert('Por favor, completa la verificación de reCAPTCHA');
      return;
    }

    // Validate step 1 fields
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
    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      setError('Por favor, completa la verificación de reCAPTCHA');
      return;
    }
  
    const isValid = await trigger(["name", "lastName", "bio", "degreeId"]);
    if (isValid) {
      try {
        console.log(data)
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
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres"
            }
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
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
          transition-all duration-300 ease-in-out"
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
          sitekey="6LcXx48qAAAAAOtQ66UffdvSnLGQtJ-NRphUvby-"
          onChange={handleRecaptchaChange}
          hl="es"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-pallette-10 text-white py-2 rounded-md 
        hover:bg-pallette-10-contrast transition-colors duration-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Siguiente
      </button>
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
      <div className="grid grid-cols-2 gap-4">
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
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
            transition-all duration-300 ease-in-out"
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
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
            transition-all duration-300 ease-in-out"
            placeholder="Ingresa tus apellidos"
          />
          {errors.lastName && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.lastName.message}
            </span>
          )}
        </div>
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
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
          transition-all duration-300 ease-in-out"
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
        <select
          {...register("degreeId", {
            required: {
              value: true,
              message: "La selección de título es obligatoria",
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 hover:border-gray-500 rounded-md 
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none
            transition-all duration-300 ease-in-out"
        >
          <option value="">Selecciona su grado académico</option>
          {degrees.map((degree) => (
            <option key={degree.id} value={degree.id}>
              {degree.title} {/* Aquí accedemos a 'title' en vez de 'name' */}
            </option>
          ))}
        </select>
        {errors.degreeId && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.degreeId.message}
          </span>
        )}
      </div>

      <button 
        type="submit"
        className="w-full bg-pallette-10 text-white py-2 rounded-md 
        hover:bg-pallette-10-contrast transition-colors duration-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Registrarse
      </button>

      <div className="text-right">
        <p 
          onClick={() => setCurrentStep(1)} 
          className="text-sm text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
        >
          ← Volver al paso anterior
        </p>
      </div>
    </form>
  );

  return (
    <div className="h-[calc(100vh-90px)] flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
      <div className="flex flex-col justify-center items-center space-y-4 w-full lg:w-1/2">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            {currentStep === 1 ? "Crear Cuenta" : "Cuéntanos Sobre Ti"}
          </h1>
        </div>
        <div className="w-full max-w-md bg-white rounded-xl p-8 border border-gray-200 shadow-[0_4px_24px_0_#00000004,0_4px_32px_0_#00000004,0_2px_64px_0_#00000003,0_16px_32px_0_#00000003]">
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative bg-black">
        {/* Optional: Add a decorative element or image */}
      </div>
    </div>
  );
}

export default RegisterPage;