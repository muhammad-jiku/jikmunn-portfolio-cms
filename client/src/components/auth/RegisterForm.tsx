/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, register as registerUser } from '@/store/slices/authSlice';
import { UserRole } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState<{
    text: string;
    type: 'success' | 'error' | 'warning' | '';
  }>({ text: '', type: '' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: UserRole.AUTHOR,
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const email = watch('email');

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[@$!%*?&#]/.test(pwd)) score++;

    if (score <= 2) return { score, text: '🔴 Too weak', type: 'error' };
    if (score <= 4) return { score, text: '🟡 Weak password', type: 'warning' };
    if (score <= 5) return { score, text: '🟢 Strong password', type: 'success' };
    return { score, text: '🟢 Very strong password!', type: 'success' };
  };

  useEffect(() => {
    if (!password && !confirmPassword) {
      setValidationMessage({ text: '', type: '' });
      return;
    }

    const strength = getPasswordStrength(password || '');

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setValidationMessage({ text: '❌ Passwords do not match', type: 'error' });
      } else {
        if (strength.score <= 2) {
          setValidationMessage({ text: strength.text, type: 'error' });
        } else {
          setValidationMessage({ text: '✓ Passwords matched! ' + strength.text, type: 'success' });
        }
      }
    } else if (password) {
      setValidationMessage({
        text: strength.text,
        type: strength.type as 'success' | 'error' | 'warning',
      });
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      setSuccess(true);
      setRegisteredEmail(data.email);
      setTimeout(() => router.push(`/verify-email?email=${encodeURIComponent(data.email)}`), 3000);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 px-6 py-4 rounded-lg">
        <h3 className="font-semibold mb-2">Registration successful!</h3>
        <p>
          We&apos;ve sent a 6-digit verification code to <strong>{registeredEmail}</strong>.
        </p>
        <p className="mt-2">Redirecting to verification page...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
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
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password *
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            className="w-full px-4 py-2 pr-12 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-2">
          Role *
        </label>
        <select
          {...register('role')}
          id="role"
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value={UserRole.AUTHOR}>Author</option>
          <option value={UserRole.EDITOR}>Editor</option>
          <option value={UserRole.ADMIN}>Admin</option>
          <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
          {error.includes('already exists') || error.includes('already registered')
            ? '❌ User already exists'
            : error.includes('Invalid')
              ? '❌ Invalid user information'
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
        className="w-full bg-linear-to-r from-secondary to-accent hover:from-secondary-hover hover:to-accent-hover text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{' '}
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
