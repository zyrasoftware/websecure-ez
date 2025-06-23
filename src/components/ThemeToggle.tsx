'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-xl bg-gray-200/50 dark:bg-gray-700/50 animate-pulse border border-gray-200/30 dark:border-gray-600/30"></div>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system theme';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Toggle theme';
    }
  };

  const getThemeDisplay = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return `System (${resolvedTheme})`;
      default:
        return 'Light';
    }
  };

  return (
    <div className="relative group">
    <button
      onClick={cycleTheme}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 dark:bg-slate-700/90 backdrop-blur-md border border-gray-200/50 dark:border-slate-500/50 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
      aria-label={getLabel()}
      title={getLabel()}
    >
        <div className="flex items-center justify-center w-6 h-6 text-gray-700 dark:text-slate-200 transition-transform duration-300 group-hover:scale-110">
        {getIcon()}
        </div>
        
        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-slate-200 transition-colors duration-300">
          {getThemeDisplay()}
      </span>
      
        {/* Visual indicator for current resolved theme */}
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          resolvedTheme === 'dark' 
            ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' 
            : 'bg-amber-500 shadow-lg shadow-amber-500/50'
        }`}></div>
      </button>
      
      {/* Enhanced tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
        <div className="text-center">
          <div className="font-medium">{getLabel()}</div>
          <div className="text-xs opacity-75 mt-1">Currently: {getThemeDisplay()}</div>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
      </div>
    </div>
  );
}