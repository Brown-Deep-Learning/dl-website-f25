// components/SimpleThemeController.tsx
"use client";

import { useEffect } from 'react';

const SimpleThemeController: React.FC = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('[data-earth-theme]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-earth-theme');
            // Update bubble color
            document.documentElement.style.setProperty(
              '--bubble-color', 
              `var(--${theme}-bubble)`
            );
            
            // Hide all backgrounds first
            sections.forEach(section => {
              section.classList.remove('active-theme');
            });
            
            // Show current background
            entry.target.classList.add('active-theme');
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
};

export default SimpleThemeController;