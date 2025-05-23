"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  startAnimation: boolean;
}

export default function Hero({ startAnimation }: HeroProps) {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (startAnimation) {
      gsap.to(textRefs.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }
  }, [startAnimation]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen h-dvh bg-[#DADADA] flex flex-col">
      <div className="flex-1 flex items-center justify-center max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-6xl font-normal text-center mx-auto font-power-grotesk">
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[0] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("address")}
          >
            at
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[1] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("about")}
          >
            double tap
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[2] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("team")}
          >
            we
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[3] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("what-we-do")}
          >
            let
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[4] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("careers")}
          >
            our
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[5] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("works")}
          >
            work
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[6] = el;
              }
            }}
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300 inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("contact")}
          >
            speak
          </span>
        </h1>
      </div>
    </section>
  );
}
