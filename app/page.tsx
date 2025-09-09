'use client'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Services from "@/sections/Services/Services";
import Team from "@/sections/Team/Team";
import BrandsShowcase from "@/sections/BrandsShowcase/BrandsShowcase";
import Works from "@/sections/Works/Works";
import Contact from "./sections/Contact/Contact";
import Address from "@/sections/Address/Address";
import Careers from "@/sections/Careers/Careers";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import Video from './sections/Video/Video';

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
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [isLoading]);

  useEffect(() => {
    if (heroIntroComplete) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
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
