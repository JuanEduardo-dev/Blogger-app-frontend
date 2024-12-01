"use client";
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ForgotPasswordInputs {
  email: string;
}

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ForgotPasswordInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      setMessage(null);
      setError(null);
  
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage('Password reset link sent to your email');
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Forgot Password</h1>

        {message && (
          <p className="bg-green-500 text-white p-3 rounded mb-2">{message}</p>
        )}
        {error && (
          <p className="bg-red-500 text-white p-3 rounded mb-2">{error}</p>
        )}

        <label className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}