/* eslint-disable react/no-unescaped-entities */
'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';
import { Frown, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Theme Toggle - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <ThemeToggle />
      </motion.div>

      <div className="flex items-center justify-center px-4 min-h-screen">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Icon */}
          <div className="my-8 flex justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              />
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative bg-white dark:bg-zinc-900 rounded-full p-8"
              >
                {/* <FileQuestion className="h-24 w-24 text-zinc-400 dark:text-zinc-600" /> */}
                <Frown className="h-24 w-24 text-zinc-400 dark:text-zinc-600" />
              </motion.div>
            </motion.div>
          </div>

          {/* Error Code */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-accent mb-4"
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4"
          >
            Page Not Found
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto"
          >
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white transition-all font-medium shadow-lg hover:shadow-xl"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-zinc-900 text-primary hover:bg-primary hover:text-white transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <Search className="h-5 w-5" />
              Go Back
            </motion.button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 mb-8 pt-8"
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/dashboard"
                // className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
                className="text-sm text-primary hover:text-primary-hover hover:underline font-medium transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Link
                href="/login"
                // className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
                className="text-sm text-primary hover:text-primary-hover hover:underline font-medium transition-colors"
              >
                Sign In
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Link
                href="/register"
                // className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
                className="text-sm text-primary hover:text-primary-hover hover:underline font-medium transition-colors"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
