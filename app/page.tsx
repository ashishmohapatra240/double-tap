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

export default function Home() {
  return (
    <main className="flex flex-col bg-[#DADADA]">
      <div id="hero"><Hero /></div>
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
  );
}
