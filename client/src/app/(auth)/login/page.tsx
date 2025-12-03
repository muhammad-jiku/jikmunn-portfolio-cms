import LoginForm from '@/components/auth/LoginForm';
import { generateMetadata as createMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Login - Portfolio CMS',
  description: 'Sign in to your Portfolio CMS account to manage your content.',
  path: '/login',
  noindex: true,
});

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
