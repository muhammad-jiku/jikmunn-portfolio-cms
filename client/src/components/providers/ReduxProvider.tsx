'use client';

import { makeStore } from '@/store';
import { refreshSessionThunk } from '@/store/slices/authSlice';
import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  // Create store once using useState to avoid re-creation on re-renders
  const [store] = useState(() => makeStore());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Try to restore session on app load
    const initAuth = async () => {
      const rememberMe = localStorage.getItem('rememberMe');
      if (rememberMe === 'true') {
        try {
          await store.dispatch(refreshSessionThunk());
        } catch (error) {
          console.error('Failed to restore session:', error);
        }
      }
      setIsInitialized(true);
    };

    initAuth();
  }, [store]);

  // Show nothing or a loading screen until auth is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
