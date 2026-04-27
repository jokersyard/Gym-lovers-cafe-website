// components/ScrollToTop.tsx
'use client';

import { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-40 group"
        >
          <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition" />
        </button>
      )}
    </>
  );
}