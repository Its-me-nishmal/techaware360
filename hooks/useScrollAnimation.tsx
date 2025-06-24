import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  animationClass: string; // Tailwind animation class
}

const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions
): RefObject<T> => {
  const elementRef = useRef<T>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px', animationClass } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (elementRef.current) {
              elementRef.current.classList.add(...animationClass.split(' '));
              elementRef.current.classList.remove('animate-on-scroll'); // Remove initial hidden state
            }
            if (triggerOnce) {
              observer.unobserve(entry.target);
              setHasAnimated(true);
            }
          } else {
            // Optional: Remove class if element leaves viewport and triggerOnce is false
            if (!triggerOnce && elementRef.current && elementRef.current.classList.contains(animationClass)) {
              // elementRef.current.classList.remove(...animationClass.split(' '));
              // elementRef.current.classList.add('animate-on-scroll');
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement && !(triggerOnce && hasAnimated)) {
       currentElement.classList.add('animate-on-scroll'); // Ensure initial hidden state
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, triggerOnce, rootMargin, animationClass, hasAnimated]);

  return elementRef;
};

export default useScrollAnimation;
