import Footer from "@/sections/Footer/Footer";
import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import WhatWeDo from "@/sections/WhatWeDo/WhatWeDo";
import Team from "@/sections/Team/Team";
import BrandsShowcase from "@/sections/BrandsShowcase/BrandsShowcase";
import Works from "@/sections/Works/Works";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <About />
      <WhatWeDo />
      <Team />
      <BrandsShowcase />
      <Works />
      <Footer />
    </main>
  );
}
