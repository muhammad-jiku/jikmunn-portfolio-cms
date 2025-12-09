'use client';

import VerifyEmailForm from '@/components/auth/VerifyEmailForm';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function VerifyEmailContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-zinc-50 dark:to-zinc-300 bg-clip-text text-transparent mb-2">
              Verify Your Email
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">Complete your registration</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <VerifyEmailForm />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-6 text-sm text-zinc-600 dark:text-zinc-400"
        >
          Need help?{' '}
          <a
            href="/contact"
            className="text-primary hover:text-primary-hover hover:underline font-medium"
          >
            Contact support
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
