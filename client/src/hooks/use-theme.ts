import { useState, useEffect } from 'react';

interface UseThemeReturn {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useTheme = (): UseThemeReturn => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Get the initial theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark') {
        return true;
      }
      
      if (localStorage.theme === 'light') {
        return false;
      }
      
      // If no theme is set in localStorage, use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return false;
  });

  useEffect(() => {
    // Update the document class when the theme changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  // Add a listener for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.theme !== 'dark' && localStorage.theme !== 'light') {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const setTheme = (theme: 'dark' | 'light') => {
    setIsDarkMode(theme === 'dark');
  };

  return {
    isDarkMode,
    toggleTheme,
    setTheme
  };
};
