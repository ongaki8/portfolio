'use client';
import { useEffect, useState } from 'react';

export default function OSWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 768 for Mobile breakpoint and 1024 for Tablet breakpoint
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={isMobile ? 'ios-container' : 'desktop-container'}>
      {children}
    </div>
  );
}