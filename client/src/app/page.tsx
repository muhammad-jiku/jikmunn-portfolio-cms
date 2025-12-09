'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { Briefcase, Code, FileText, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <motion.div
              whileHover={
                {
                  // rotate: 360
                }
              }
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary-hover transition-colors" />
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent absolute -top-1 -right-1 animate-pulse-glow" />
            </motion.div>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-zinc-50 dark:to-zinc-300 bg-clip-text text-transparent">
              Portfolio CMS
            </h1>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="group relative px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg overflow-hidden bg-primary hover:bg-primary-hover text-white transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10">Sign In</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 sm:mb-4 md:mb-6 leading-tight px-2"
          >
            Manage Your Professional
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative inline-block"
            >
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent animate-float">
                Portfolio with Ease
              </span>
              <motion.div
                className="absolute -inset-1 bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl -z-10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            A comprehensive content management system designed for developers, designers, and
            creators to showcase their work professionally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap px-4"
          >
            <Link
              href="/login"
              className="group relative px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg overflow-hidden bg-linear-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover transition-all duration-300 font-medium text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 text-white">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Link>
            <Link
              href="/register"
              className="group px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg bg-white dark:bg-zinc-900 text-primary transition-all duration-300 font-medium text-sm sm:text-base md:text-lg hover:scale-105 hover:shadow-lg hover:bg-primary"
            >
              <span className="group-hover:text-white transition-colors">Create Account</span>
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {/* Projects Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group p-4 sm:p-5 md:p-6 rounded-xl bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
          >
            <motion.div
              whileHover={{
                // rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.6 }}
              className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50"
            >
              <Code className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5 sm:mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Projects
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Showcase your development projects with rich media and detailed descriptions.
            </p>
          </motion.div>

          {/* Blog Posts Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group p-4 sm:p-5 md:p-6 rounded-xl bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer"
          >
            <motion.div
              whileHover={{
                // rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.6 }}
              className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-lg bg-pink-100 dark:bg-pink-950 flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-pink-500/50"
            >
              <FileText className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-pink-600 dark:text-pink-400" />
            </motion.div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5 sm:mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              Blog Posts
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Share your thoughts, tutorials, and insights with a powerful blog system.
            </p>
          </motion.div>

          {/* Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group p-4 sm:p-5 md:p-6 rounded-xl bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer"
          >
            <motion.div
              whileHover={{
                // rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.6 }}
              className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-violet-500/50"
            >
              <Briefcase className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-violet-600 dark:text-violet-400" />
            </motion.div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5 sm:mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Resume
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Manage your professional experience, education, and skills in one place.
            </p>
          </motion.div>

          {/* Secure Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group p-4 sm:p-5 md:p-6 rounded-xl bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/20 cursor-pointer"
          >
            <motion.div
              whileHover={{
                // rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.6 }}
              className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-950 flex items-center justify-center mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-fuchsia-500/50"
            >
              <Shield className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </motion.div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5 sm:mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
              Secure
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              AWS Cognito authentication and role-based access control for security.
            </p>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="mt-16 sm:mt-24 md:mt-32 py-6 sm:py-8"
      >
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          <p>
            © 2025 <span className="font-semibold text-primary">Portfolio CMS</span>. Built with
            Next.js and TypeScript.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
