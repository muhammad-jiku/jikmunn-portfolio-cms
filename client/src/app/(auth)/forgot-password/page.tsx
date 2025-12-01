import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Reset password</h1>
          <p className="text-gray-600 mt-2">We&apos;ll help you get back in</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
