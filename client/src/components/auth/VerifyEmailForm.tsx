'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, verifyEmail } from '@/store/slices/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z
    .string()
    .min(6, 'Verification code must be 6 digits')
    .max(6, 'Verification code must be 6 digits'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{
    text: string;
    type: 'success' | 'error' | 'warning' | '';
  }>({ text: '', type: '' });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const email = watch('email');
  const code = watch('code');

  useEffect(() => {
    // Clear validation message when user types
    setValidationMessage({ text: '', type: '' });

    // Show validation feedback
    if (email && code) {
      if (errors.email) {
        setValidationMessage({ text: '❌ Invalid email format', type: 'error' });
      } else if (code.length < 6) {
        setValidationMessage({ text: '⚠️ Code must be 6 digits', type: 'warning' });
      } else if (code.length === 6 && /^\d{6}$/.test(code)) {
        setValidationMessage({ text: '✓ Ready to verify', type: 'success' });
      } else if (code.length === 6) {
        setValidationMessage({ text: '❌ Code must contain only numbers', type: 'error' });
      }
    } else if (code && code.length > 0 && code.length < 6) {
      setValidationMessage({ text: '⚠️ Enter complete 6-digit code', type: 'warning' });
    }
  }, [email, code, errors.email]);

  useEffect(() => {
    // Pre-fill email if provided in URL params
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: VerifyEmailFormData) => {
    const result = await dispatch(verifyEmail({ email: data.email, code: data.code }));
    if (verifyEmail.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 px-6 py-4 rounded-lg">
        <h3 className="font-semibold mb-2">Email verified successfully!</h3>
        <p>Your account is now active. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Please enter the 6-digit verification code sent to your email address.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium mb-2">
          Verification Code
        </label>
        <input
          {...register('code')}
          type="text"
          id="code"
          maxLength={6}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest font-mono"
          placeholder="123456"
        />
        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
          {error.includes('expired') || error.includes('Expired')
            ? '❌ Code expired. Please request a new one'
            : error.includes('invalid') || error.includes('Invalid') || error.includes('incorrect')
              ? '❌ Invalid verification code'
              : error.includes('limit') || error.includes('attempts')
                ? '⚠️ Too many attempts. Try again later'
                : `❌ ${error}`}
        </div>
      )}

      {validationMessage.text && !error && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all duration-300 ${
            validationMessage.type === 'success'
              ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
              : validationMessage.type === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
          }`}
        >
          {validationMessage.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-linear-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'Verify Email'}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Didn&apos;t receive the code?{' '}
        <button
          type="button"
          className="text-primary hover:text-primary-hover hover:underline font-medium"
          onClick={() => {
            // TODO: Implement resend verification code
            alert('Resend verification code feature coming soon!');
          }}
        >
          Resend code
        </button>
      </p>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already verified?{' '}
        <a
          href="/login"
          className="text-primary hover:text-primary-hover hover:underline font-medium"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
