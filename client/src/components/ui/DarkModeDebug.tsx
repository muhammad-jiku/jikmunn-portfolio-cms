/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function DarkModeDebug() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClass, setHtmlClass] = useState('');

  useEffect(() => {
    setMounted(true);
    const checkClass = () => {
      setHtmlClass(document.documentElement.className);
    };
    checkClass();
    const interval = setInterval(checkClass, 500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>HTML class: {htmlClass || '(none)'}</div>
    </div>
  );
}
