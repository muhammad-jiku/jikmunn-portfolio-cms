'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  children: ReactNode;
  className?: string;
  description?: string;
}

export function FormField({
  label,
  error,
  required,
  children,
  className,
  description,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      {children}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  registration?: UseFormRegisterReturn;
  error?: FieldError;
}

export function Input({ registration, error, className, ...props }: InputProps) {
  return (
    <input
      {...registration}
      {...props}
      className={cn(
        'w-full px-4 py-2 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-white',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        error
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        className
      )}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${props.id}-error` : undefined}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  registration?: UseFormRegisterReturn;
  error?: FieldError;
}

export function Textarea({ registration, error, className, ...props }: TextareaProps) {
  return (
    <textarea
      {...registration}
      {...props}
      className={cn(
        'w-full px-4 py-2 rounded-lg border transition-colors resize-y',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-white',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        error
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        className
      )}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${props.id}-error` : undefined}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  registration?: UseFormRegisterReturn;
  error?: FieldError;
  options: Array<{ value: string; label: string }>;
}

export function Select({ registration, error, options, className, ...props }: SelectProps) {
  return (
    <select
      {...registration}
      {...props}
      className={cn(
        'w-full px-4 py-2 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-800',
        'text-gray-900 dark:text-white',
        error
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        className
      )}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${props.id}-error` : undefined}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  registration?: UseFormRegisterReturn;
  label: string;
}

export function Checkbox({ registration, label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        {...registration}
        {...props}
        className={cn(
          'w-4 h-4 rounded border-gray-300 dark:border-gray-600',
          'text-blue-600 focus:ring-blue-500 focus:ring-2',
          'bg-white dark:bg-gray-800',
          className
        )}
      />
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
    </label>
  );
}

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export function FormButton({
  variant = 'primary',
  isLoading,
  children,
  className,
  disabled,
  ...props
}: FormButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
