//blogger-front/src/app/(routes)/auth/register/page.tsx

"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface RegisterFormInputs {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

        <label htmlFor="name" className="text-slate-500 mb-2 block text-sm">
          Name:
        </label>
        <input
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="John"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}

        <label htmlFor="lastName" className="text-slate-500 mb-2 block text-sm">
          Last Name:
        </label>
        <input
          type="text"
          {...register("lastName", {
            required: {
              value: true,
              message: "Last Name is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Doe"
        />
        {errors.lastName && (
          <span className="text-red-500 text-xs">
            {errors.lastName.message}
          </span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;