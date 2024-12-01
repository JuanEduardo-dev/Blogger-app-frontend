"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<ResetPasswordInputs>();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: params.token,
          newPassword: data.password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/auth/login');
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Reset Password</h1>

        {error && (
          <p className="bg-red-500 text-white p-3 rounded mb-2">{error}</p>
        )}

        <label className="text-slate-500 mb-2 block text-sm">
          New Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}

        <label className="text-slate-500 mb-2 block text-sm">
          Confirm New Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}