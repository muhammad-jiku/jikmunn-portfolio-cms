'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-3 sm:px-4 py-8 sm:py-12">
      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50"
      >
        <ThemeToggle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
      >
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-linear-to-br from-secondary to-accent items-center justify-center mb-3 sm:mb-4 shadow-lg"
            style={{ boxShadow: '0 10px 40px -10px rgb(236 72 153 / 0.5)' }}
          >
            <UserPlus className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-zinc-50 dark:to-zinc-300 bg-clip-text text-transparent"
          >
            Create account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 mt-1.5 sm:mt-2"
          >
            Join the Portfolio CMS
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RegisterForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
