// src/hooks/useIntersectionObserver.js
import { useEffect } from 'react';

const useIntersectionObserver = (sections, setLoadedSections) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sections.findIndex(
              section => section.ref.current === entry.target
            );
            if (sectionIndex !== -1) {
              setLoadedSections(prev => new Set([...prev, sectionIndex]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, [sections, setLoadedSections]);
};

export default useIntersectionObserver;