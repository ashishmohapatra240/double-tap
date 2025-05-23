'use client'
import { useState } from 'react'
import Footer from "@/sections/Footer/Footer";
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [startHeroAnimation, setStartHeroAnimation] = useState(false)

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Trigger hero animation after a small delay
    setTimeout(() => {
      setStartHeroAnimation(true);
    }, 100);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <main className={`flex flex-col bg-[#DADADA] ${isLoading ? 'hidden' : ''}`}>
        <Navbar />
        <div id="hero"><Hero startAnimation={startHeroAnimation} /></div>
        <div id="about"><About /></div>
        <div id="services"><Services /></div>
        <div id="team"><Team /></div>
        <BrandsShowcase />
        <div id="works"><Works /></div>
        <div id="careers"><Careers /></div>
        <div id="address"><Address /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </main>
    </>
  );
}
