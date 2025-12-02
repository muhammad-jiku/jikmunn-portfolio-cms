'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      expand={true}
      richColors
      closeButton
      theme="system"
      toastOptions={{
        style: {
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
        },
        className: 'group toast',
        duration: 4000,
      }}
    />
  );
}
