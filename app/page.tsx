'use client'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Hero from "@/sections/Hero/Hero";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";

const Video = dynamic(() => import('./sections/Video/Video'), {
  loading: () => <div className="h-screen bg-black" />,
  ssr: false,
});

const About = dynamic(() => import("@/sections/About/About"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false,
});

const Services = dynamic(() => import("@/sections/Services/Services"), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const Team = dynamic(() => import("@/sections/Team/Team"), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const BrandsShowcase = dynamic(() => import("@/sections/BrandsShowcase/BrandsShowcase"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
  ssr: false,
});

const Works = dynamic(() => import("@/sections/Works/Works"), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const Careers = dynamic(() => import("@/sections/Careers/Careers"), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const Address = dynamic(() => import("@/sections/Address/Address"), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const Contact = dynamic(() => import("./sections/Contact/Contact"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [heroIntroComplete, setHeroIntroComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setStartHeroAnimation(true), 100);
  };

  useEffect(() => {
    if (!isLoading) {
      // Batch ScrollTrigger refresh for better performance
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  useEffect(() => {
    if (heroIntroComplete) {
      // Batch ScrollTrigger refresh for better performance
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [heroIntroComplete]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <main className="flex flex-col bg-black overflow-x-hidden">
          <Navbar startAnimation={startHeroAnimation} isMuted={isMuted} setIsMuted={setIsMuted} />

          <div id="hero" className="relative pb-[15vh]">
            <Hero
              startAnimation={startHeroAnimation}
              onIntroComplete={() => setHeroIntroComplete(true)}
            />
          </div>

          {heroIntroComplete && (
            <div id="video" className="relative -mt-[15vh]">
              <Video isMuted={isMuted} />
            </div>
          )}

          <div id="about"><About /></div>
          <div id="services"><Services /></div>
          <div id="team"><Team /></div>
          <BrandsShowcase />
          <div id="works"><Works /></div>
          <div id="careers"><Careers /></div>
          <div id="address"><Address /></div>
          <div id="contact"><Contact /></div>
        </main>
      )}
    </>
  );
}
