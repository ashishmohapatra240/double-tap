"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface HeroProps {
  startAnimation: boolean;
  onIntroComplete?: () => void;
}

export default function Hero({ startAnimation, onIntroComplete }: HeroProps) {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (startAnimation) {
      gsap.fromTo(
        textRefs.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete: () => {
            if (onIntroComplete) {
              onIntroComplete();
            }
          },
        }
      );
    }

    textRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener("mouseenter", () => {
          gsap.to(ref, {
            color: "#F15A24",
            scale: 1.1,
            rotation: 3,
            fontWeight: 600,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        ref.addEventListener("mouseleave", () => {
          gsap.to(
            ref,
            index === 1
              ? {
                  color: "#F15A24",
                  scale: 1,
                  rotation: 3,
                  fontWeight: 700,
                  duration: 0.3,
                  ease: "power2.out",
                }
              : {
                  color: "#FFFFFF",
                  scale: 1,
                  rotation: 0,
                  fontWeight: 400,
                  duration: 0.3,
                  ease: "power2.out",
                }
          );
        });

        if (index === 1) {
          gsap.set(ref, {
            color: "#F15A24",
            rotation: 3,
            fontWeight: 700,
            scale: 1.1,
          });
        }
      }
    });
  }, [startAnimation]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 0,
        },
        ease: "power4.inOut",
      });
    }
  };

  return (
    <section className="min-h-[85dvh] bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center mx-auto px-4">
        <h1 className="text-5xl lg:text-6xl font-normal md:text-center mx-auto font-power-grotesk text-[#D9D9D9]">
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[0] = el;
              }
            }}
            className="cursor-pointer inline-block translate-y-[100px] opacity-0"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 text-[#F15A24] rotate-3"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("services")}
          >
            let
          </span>{" "}
          <span
            ref={(el) => {
              if (el) {
                textRefs.current[4] = el;
              }
            }}
            className="cursor-pointer inline-block translate-y-[100px] opacity-0"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0"
            onClick={() => scrollToSection("contact")}
          >
            speak
          </span>
        </h1>
      </div>
    </section>
  );
}
