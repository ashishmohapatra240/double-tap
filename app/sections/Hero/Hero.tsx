"use client";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface HeroProps {
  startAnimation: boolean;
  onIntroComplete?: () => void;
}

export default function Hero({ startAnimation, onIntroComplete }: HeroProps) {
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animationStartedRef = useRef(false);
  const hasIntroCompletedRef = useRef(false);
  const onIntroCompleteRef = useRef(onIntroComplete);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    onIntroCompleteRef.current = onIntroComplete;
  }, [onIntroComplete]);

  // Memoized event handler factory with RAF throttling
  const createMouseEnterHandler = useCallback((ref: HTMLSpanElement) => {
    return () => {
      if (rafIdRef.current) return; // Prevent stacking
      
      rafIdRef.current = requestAnimationFrame(() => {
        // Add will-change only during interaction
        ref.style.willChange = 'transform, color, font-weight';
        
        gsap.to(ref, {
          color: "#F15A24",
          scale: 1.1,
          rotation: 3,
          fontWeight: 600,
          duration: 0.3,
          ease: "power2.out",
        });
        
        rafIdRef.current = null;
      });
    };
  }, []);

  const createMouseLeaveHandler = useCallback((ref: HTMLSpanElement, index: number) => {
    return () => {
      if (rafIdRef.current) return;
      
      rafIdRef.current = requestAnimationFrame(() => {
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
                onComplete: () => {
                  // Remove will-change after animation
                  ref.style.willChange = 'auto';
                }
              }
            : {
                color: "#FFFFFF",
                scale: 1,
                rotation: 0,
                fontWeight: 400,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                  // Remove will-change after animation
                  ref.style.willChange = 'auto';
                }
              }
        );
        
        rafIdRef.current = null;
      });
    };
  }, []);

  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    textRefs.current.forEach((ref, index) => {
      if (ref) {
        const handleMouseEnter = createMouseEnterHandler(ref);
        const handleMouseLeave = createMouseLeaveHandler(ref, index);

        ref.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        ref.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        
        cleanupFunctions.push(() => {
          ref.removeEventListener("mouseenter", handleMouseEnter);
          ref.removeEventListener("mouseleave", handleMouseLeave);
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
    
    let animation: gsap.core.Tween | undefined;

    if (startAnimation && !animationStartedRef.current) {
      const targets = textRefs.current.filter(
        (item): item is HTMLSpanElement => Boolean(item)
      );

      if (targets.length) {
        animationStartedRef.current = true;
        animation = gsap.fromTo(
          targets,
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
              if (!hasIntroCompletedRef.current) {
                hasIntroCompletedRef.current = true;
                onIntroCompleteRef.current?.();
              }
            },
          }
        );
      }
    }

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      if (animation) {
        animation.kill();
      }
      // Cancel any pending RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [startAnimation, createMouseEnterHandler, createMouseLeaveHandler]);

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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 transform-gpu"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 text-[#F15A24] rotate-3 transform-gpu"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 transform-gpu"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 transform-gpu"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 transform-gpu"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 transform-gpu"
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
            className="cursor-pointer inline-block translate-y-[100px] opacity-0 transform-gpu"
            onClick={() => scrollToSection("contact")}
          >
            speak
          </span>
        </h1>
      </div>
    </section>
  );
}
