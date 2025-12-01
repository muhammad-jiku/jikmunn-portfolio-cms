'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, forgotPassword, resetPassword } from '@/store/slices/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetSchema = z
  .object({
    code: z.string().min(6, 'Verification code must be at least 6 characters'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type EmailFormData = z.infer<typeof emailSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [step, setStep] = useState<'email' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onEmailSubmit = async (data: EmailFormData) => {
    const result = await dispatch(forgotPassword(data));
    if (forgotPassword.fulfilled.match(result)) {
      setEmail(data.email);
      setStep('reset');
    }
  };

  const onResetSubmit = async (data: ResetFormData) => {
    const result = await dispatch(
      resetPassword({
        email,
        code: data.code,
        newPassword: data.newPassword,
      })
    );
    if (resetPassword.fulfilled.match(result)) {
      setStep('success');
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  if (step === 'success') {
    return (
      <div className="bg-green-50 text-green-800 px-6 py-4 rounded-lg">
        <h3 className="font-semibold mb-2">Password reset successful!</h3>
        <p>You can now sign in with your new password. Redirecting to login...</p>
      </div>
    );
  }

  if (step === 'reset') {
    return (
      <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
        <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm">
          We&apos;ve sent a verification code to <strong>{email}</strong>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-2">
            Verification Code
          </label>
          <input
            {...resetForm.register('code')}
            type="text"
            id="code"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123456"
          />
          {resetForm.formState.errors.code && (
            <p className="text-red-500 text-sm mt-1">{resetForm.formState.errors.code.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
            New Password
          </label>
          <input
            {...resetForm.register('newPassword')}
            type="password"
            id="newPassword"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          {resetForm.formState.errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {resetForm.formState.errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            {...resetForm.register('confirmPassword')}
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          {resetForm.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {resetForm.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Resetting password...' : 'Reset password'}
        </button>

        <button
          type="button"
          onClick={() => setStep('email')}
          className="w-full text-blue-600 hover:underline text-sm"
        >
          Back to email entry
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">
          Enter your email address and we&apos;ll send you a code to reset your password.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          {...emailForm.register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
        {emailForm.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">{emailForm.formState.errors.email.message}</p>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending code...' : 'Send verification code'}
      </button>

      <p className="text-center text-sm">
        Remember your password?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
