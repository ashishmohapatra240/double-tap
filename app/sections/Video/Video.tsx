"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  isMuted?: boolean;
}

const Video = ({ isMuted = false }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error('Video failed to load:', e);
  };

  useEffect(() => {
    if (containerRef.current && videoRef.current) {
      gsap.set(containerRef.current, {
        width: '85%',
        height: '50vh',
        position: 'relative',
        top: '0vh', 
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      });

      gsap.to(containerRef.current, {
        width: '100%',
        height: '100vh',
        top: 0,
        left: '0%',
        transform: 'translateX(0%)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.5)',
        minHeight: '50vh',
        width: '85%',
        margin: '0 auto',
      }}
    >
      <video 
        ref={videoRef}
        src="/videos/Hero.mp4" 
        autoPlay 
        loop 
        muted={isMuted}
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        className='w-full h-full object-cover' 
        style={{ minHeight: '100%', minWidth: '100%' }}
      />
    </div>
  );
};

export default Video;