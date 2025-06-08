import { useRef, useState, useEffect, ReactNode } from 'react';

interface ScrollPercentageProps {
  children: ReactNode;
  showAtPercent: number; // 0-100
  hideOnScrollBack?: boolean; // Hide when scrolling back past the percentage
  once?: boolean; // Only trigger once (default: true)
}

function RevealOnScrollPercent({ 
  children, 
  showAtPercent,
  hideOnScrollBack = false,
  once = true
}: ScrollPercentageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const documentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Handle showing the element
      if (scrollPercent >= showAtPercent && (!once || !hasTriggered)) {
        setShow(true);
        setHasTriggered(true);
        
        // Remove listener if it should only trigger once
        if (once) {
          window.removeEventListener('scroll', handleScroll);
        }
      }

      // Handle hiding the element when scrolling back
      if (hideOnScrollBack && scrollPercent < showAtPercent && hasTriggered) {
        setShow(false);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAtPercent, hideOnScrollBack, once, hasTriggered]);

  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
}

export default RevealOnScrollPercent;
