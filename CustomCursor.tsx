import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices ideally, but simpler to just run on mount
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (cursorRef.current) {
        // Size is 24px (w-6), so offset is -12px to center
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) {
        const inner = cursorRef.current.querySelector('.cursor-inner') as HTMLElement;
        if(inner) inner.style.transform = 'scale(0.8)';
      }
    };

    const onMouseUp = () => {
      if (cursorRef.current) {
        const inner = cursorRef.current.querySelector('.cursor-inner') as HTMLElement;
        if(inner) inner.style.transform = 'scale(1)';
      }
    };

    const onMouseEnterLink = () => {
      if (cursorRef.current) {
         // Reduced scale slightly since base size is bigger (24px * 2.5 = 60px)
         cursorRef.current.classList.add('scale-[2.5]');
      }
    };

    const onMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('scale-[2.5]');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Attach listeners to interactive elements
    const attachHoverListeners = () => {
      const links = document.querySelectorAll('a, button, .cursor-pointer');
      links.forEach(link => {
        link.addEventListener('mouseenter', onMouseEnterLink);
        link.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    attachHoverListeners();

    // Re-attach if DOM changes significantly (optional, but good for SPAs)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      
      const links = document.querySelectorAll('a, button, .cursor-pointer');
      links.forEach(link => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, [isVisible]);

  return (
    <div 
      ref={cursorRef}
      id="cursor" 
      // Changed to w-6 h-6 (24px) for a larger bubble
      className={`fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] mix-blend-difference hidden md:block transition-all duration-100 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
        {/* Transparent background with white border */}
        <div className="cursor-inner w-full h-full bg-transparent border border-white rounded-full transition-transform duration-200" />
    </div>
  );
};

export default CustomCursor;