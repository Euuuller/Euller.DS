import { useState, useEffect } from 'react';

/**
 * Hook otimizado para detectar scroll utilizando requestAnimationFrame.
 * Evita layout thrashing e execuções excessivas na main thread.
 */
export const useScroll = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > threshold;
          // Só atualiza o estado se o valor realmente mudar para evitar re-renders
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check inicial
    handleScroll();

    // { passive: true } melhora a performance de scroll em navegadores modernos
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};