"use client";
import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

interface LenisProviderProps {
    children: React.ReactNode;
}

const shouldUseSmoothScroll = () => {
  if (typeof window === 'undefined') return true;
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  const memory = (navigator as { deviceMemory?: number }).deviceMemory;
  const hasLowMemory = memory !== undefined && memory < 4;
  
  return !isMobile && !hasLowMemory;
};

export default function LenisProvider({ children }: LenisProviderProps) {
    const [useSmoothScroll, setUseSmoothScroll] = useState(true);
    
    useEffect(() => {
        setUseSmoothScroll(shouldUseSmoothScroll());
    }, []);
    
    if (!useSmoothScroll) {
        return <>{children}</>;
    }
    
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.2,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
                infinite: false,
                autoResize: true,
                syncTouch: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
