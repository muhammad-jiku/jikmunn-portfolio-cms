'use client';

import { makeStore } from '@/store';
import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  // Create store once using useState to avoid re-creation on re-renders
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
