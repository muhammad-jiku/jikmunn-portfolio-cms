import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-gray-600 mt-2">Join the Portfolio CMS</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
