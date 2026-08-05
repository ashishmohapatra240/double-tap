'use client'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import Hero from "@/sections/Hero/Hero";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import type { Brand, TeamMember, Work } from "@/sanity/lib/content";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 150,
  });
}

const Video = dynamic(() => import('@/sections/Video/Video'), {
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

const Contact = dynamic(() => import("@/sections/Contact/Contact"), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false,
});

type HomeClientProps = {
  works: Work[];
  featuredMembers: TeamMember[];
  teamMembers: TeamMember[];
  brands: Brand[];
  reasons: string[];
};

export default function HomeClient({
  works,
  featuredMembers,
  teamMembers,
  brands,
  reasons,
}: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [heroIntroComplete, setHeroIntroComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setStartHeroAnimation(true), 100);
  };

  // The three.js + drei bundle behind About/Contact is by far the heaviest chunk
  // on the page, and it used to only start downloading after the preloader AND the
  // hero intro had both finished — the fetch, parse and WebGL warm-up were fully
  // serialised behind several seconds of animation. Kicking the same dynamic
  // imports off on mount lets that happen during the intro instead; webpack dedupes
  // by module request, so the later dynamic() render resolves from cache.
  useEffect(() => {
    const warm = () => {
      void import("@/sections/Video/Video");
      void import("@/sections/About/About");
      void import("@/sections/Contact/Contact");
    };

    // Bound to a local rather than branching on `window` directly, which would
    // narrow the fallback branch to `never` (lib.dom declares these as required).
    const requestIdle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback.bind(window)
        : null;

    if (requestIdle) {
      const id = requestIdle(warm, { timeout: 1000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(warm, 200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!heroIntroComplete) return;
    // Single refresh after all dynamic sections have mounted
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, 300);
    return () => clearTimeout(timeoutId);
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
            <>
              <div id="video" className="relative -mt-[15vh]">
                <Video isMuted={isMuted} />
              </div>

              <div id="about"><About /></div>
              <div id="services"><Services /></div>
              <div id="team">
                <Team featuredMembers={featuredMembers} teamMembers={teamMembers} />
              </div>
              <BrandsShowcase brands={brands} />
              <div id="works"><Works works={works} /></div>
              <div id="careers"><Careers reasons={reasons} /></div>
              <div id="address"><Address /></div>
              <div id="contact"><Contact /></div>
            </>
          )}
        </main>
      )}
    </>
  );
}
