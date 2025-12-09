'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, login } from '@/store/slices/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{
    text: string;
    type: 'success' | 'error' | '';
  }>({ text: '', type: '' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    // Clear validation message when user types
    setValidationMessage({ text: '', type: '' });

    // Show validation feedback
    if (email && password) {
      if (password.length < 8) {
        setValidationMessage({ text: '⚠️ Password too weak', type: 'error' });
      } else if (errors.email) {
        setValidationMessage({ text: '❌ Invalid email format', type: 'error' });
      } else if (!errors.email && !errors.password) {
        setValidationMessage({ text: '✓ Ready to sign in', type: 'success' });
      }
    }
  }, [email, password, errors.email, errors.password]);

  useEffect(() => {
    if (isAuthenticated) {
      // Check if we need to verify email based on error message
      // Cognito will prevent login if email is not verified
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(login(data));
    // Check if login failed due to unverified email
    if (login.rejected.match(result)) {
      const errorMessage = result.error?.message || '';
      if (errorMessage.includes('not confirmed') || errorMessage.includes('not verified')) {
        // Redirect to verification page
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
        }, 2000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full px-4 py-2 pr-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            {...register('rememberMe')}
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-primary focus:ring-primary"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
            Remember me
          </label>
        </div>
        <a
          href="/forgot-password"
          className="text-sm text-primary hover:text-primary-hover hover:underline"
        >
          Forgot password?
        </a>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
          {error.includes('not found') || error.includes('not exist')
            ? '❌ User not found'
            : error.includes('Invalid') || error.includes('incorrect') || error.includes('wrong')
              ? '❌ Invalid credentials'
              : error.includes('authenticated')
                ? '⚠️ User not authenticated'
                : `❌ ${error}`}
        </div>
      )}

      {isAuthenticated && (
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm font-medium">
          🎉 Login successful! Redirecting...
        </div>
      )}

      {validationMessage.text && !error && !isAuthenticated && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-medium border ${
            validationMessage.type === 'success'
              ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'
          }`}
        >
          {validationMessage.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Don&apos;t have an account?{' '}
        <a
          href="/register"
          className="text-primary hover:text-primary-hover hover:underline font-medium"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
