// components/ThemeManager.tsx
"use client";

import { useEffect } from 'react';

const ThemeManager: React.FC = () => {
  useEffect(() => {
    const themeSections = [
      { id: 'landing-page', theme: 'sea-level-theme' },
      { id: 'lectures', theme: 'crust-theme' },
      { id: 'assignments', theme: 'upper-mantle-theme' },
      { id: 'calendar', theme: 'lower-mantle-theme' },
      { id: 'resources', theme: 'outer-core-theme' },
      { id: 'staff', theme: 'inner-core-theme' },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const { id, theme } of themeSections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            document.documentElement.className = theme;
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial theme

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null; // This component doesn't render anything
};

export default ThemeManager;