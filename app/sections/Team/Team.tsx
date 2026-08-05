"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { TeamMember } from "@/sanity/lib/content";

export default function Team({
  featuredMembers,
  teamMembers,
}: {
  featuredMembers: TeamMember[];
  teamMembers: TeamMember[];
}) {
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const widthAnimsRef = useRef<gsap.core.Tween[]>([]);
  
  // The images used to be gated behind an IntersectionObserver *and* marked
  // loading="lazy". The JS gate was strictly worse than the native one: it hid the
  // <img> from the preload scanner entirely and only mounted it 300px out, after
  // hydration. Native lazy loading starts fetching much further ahead (Chrome
  // scales the threshold by connection speed, ~1250px on fast links) and needs no
  // JS at all, so the gate is gone and `loading="lazy"` now does the work alone.

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Optimized width animations with cleanup
  useEffect(() => {
    if (!isMobile) {
      // Kill existing animations
      widthAnimsRef.current.forEach(anim => anim?.kill());
      widthAnimsRef.current = [];

      memberRefs.current.forEach((ref, index) => {
        if (ref) {
          const isActive = activeTeamMember === index;
          const targetWidth = isActive ? "30%" : "10%";
          
          ref.style.willChange = 'width';
          
          const anim = gsap.to(ref, {
            width: targetWidth,
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: 'auto',
            onComplete: () => {
              // Remove will-change after animation
              ref.style.willChange = 'auto';
            }
          });
          
          widthAnimsRef.current.push(anim);
        }
      });
    }

    if (contentRef.current) {
      const el = contentRef.current;
      el.style.willChange = 'opacity, transform';
      
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            el.style.willChange = 'auto';
          }
        }
      );
    }
  }, [activeTeamMember, isMobile]);

  // Memoized hover handlers with RAF throttling
  const handleMemberHover = useCallback((index: number) => {
    if (isMobile || index === activeTeamMember || rafIdRef.current) return;
    
    rafIdRef.current = requestAnimationFrame(() => {
      const ref = memberRefs.current[index];
      if (ref) {
        ref.style.willChange = 'width';
        gsap.to(ref, {
          width: "15%",
          duration: 0.1,
          ease: "power2.inOut",
          overwrite: 'auto',
          onComplete: () => {
            ref.style.willChange = 'auto';
          }
        });
      }
      rafIdRef.current = null;
    });
  }, [isMobile, activeTeamMember]);

  const handleMemberLeave = useCallback((index: number) => {
    if (isMobile || index === activeTeamMember) return;
    
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    
    rafIdRef.current = requestAnimationFrame(() => {
      const ref = memberRefs.current[index];
      if (ref) {
        ref.style.willChange = 'width';
        gsap.to(ref, {
          width: "10%",
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: 'auto',
          onComplete: () => {
            ref.style.willChange = 'auto';
          }
        });
      }
      rafIdRef.current = null;
    });
  }, [isMobile, activeTeamMember]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      widthAnimsRef.current.forEach(anim => anim?.kill());
    };
  }, []);

  return (
    <section>
      <div className="bg-black">
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 md:px-8 py-16 md:pt-20">
          <div className="mb-4">
            <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent text-center">
              we
            </h2>
            <p className="text-lg md:text-xl mt-2 font-power-grotesk text-[#D9D9D9] text-center">
              are a passionate mix of storytellers.
            </p>
          </div>
          <p className="text-[#D9D9D9] font-mono max-w-2xl mx-auto mt-4 text-center">
            A dynamic collective of designers, writers, strategists and doers.
            United by passion, driven by purpose, and fueled by good coffee.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-7xl mx-auto px-6 md:px-8">
          {featuredMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col md:flex-row md:items-end gap-6"
              style={{ contain: 'layout style paint' }}
            >
              <div className="relative h-[360px] md:h-[520px] w-full md:w-1/2 transform-gpu">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  quality={85}
                  {...(member.blurDataURL
                    ? { placeholder: "blur" as const, blurDataURL: member.blurDataURL }
                    : {})}
                />
              </div>

              <div className="w-full md:w-1/2 md:h-[520px] md:flex md:flex-col md:justify-end">
                <h3 className="text-xl md:text-2xl font-power-grotesk mb-4 bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent text-[#D9D9D9]">
                  {member.name}
                </h3>
                <p className="font-mono text-xs md:text-sm text-[#D9D9D9]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-black">
          <div className="flex flex-col py-20 md:py-40 px-6 md:px-40 md:flex-row md:items-end">
            <div className="grid grid-cols-3 gap-2 w-full mb-8 md:hidden">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="cursor-pointer relative h-32 sm:h-40 transform-gpu"
                  onClick={() => setActiveTeamMember(index)}
                  style={{ contain: 'layout style paint' }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="33vw"
                    className="object-cover"
                    loading="lazy"
                    quality={75}
                    {...(member.blurDataURL
                      ? { placeholder: "blur" as const, blurDataURL: member.blurDataURL }
                      : {})}
                  />
                  {activeTeamMember === index && (
                    <div className="absolute inset-0 border-2 border-white"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex md:flex-row gap-1 w-full md:w-3/4 h-[260px] mb-8 md:mb-0 overflow-hidden">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={(el: HTMLDivElement | null) => {
                    memberRefs.current[index] = el;
                  }}
                  className="cursor-pointer relative h-full transition-all duration-300 transform-gpu"
                  onClick={() => setActiveTeamMember(index)}
                  onMouseEnter={() => handleMemberHover(index)}
                  onMouseLeave={() => handleMemberLeave(index)}
                  style={{ contain: 'layout style paint' }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="10vw"
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    {...(member.blurDataURL
                      ? { placeholder: "blur" as const, blurDataURL: member.blurDataURL }
                      : {})}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-[#D9D9D9] text-xs md:text-xs font-power-grotesk">
                      {member.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={contentRef} className="w-full md:w-1/3 md:pl-8 lg:pl-16">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`${
                    activeTeamMember === index ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-col">
                    <h3 className="text-xl md:text-3xl font-power-grotesk text-[#D9D9D9]">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs md:text-base text-[#D9D9D9]  mb-2">
                      {member.designation}
                    </p>
                  </div>

                  <p className="font-mono text-xs md:text-sm text-[#D9D9D9] max-w-md mt-1">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
