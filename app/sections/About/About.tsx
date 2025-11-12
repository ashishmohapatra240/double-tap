'use client';

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Model } from "@/components/Model";
import Button from "@/components/Button/Button";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

gsap.registerPlugin(ScrollToPlugin);

export default function About() {
  const [canvasRef, isCanvasVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px',
    freezeOnceVisible: false,
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: section,
          offsetY: 0,
        },
        ease: "power4.inOut",
      });
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div 
            ref={canvasRef}
            className="relative w-64 h-64 md:w-[420px] md:h-[420px] rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
              <span className="font-power-grotesk text-white text-4xl md:text-5xl select-none">Strike Twice</span>
            </div>
            {isCanvasVisible && (
              <div className="absolute inset-0 z-10">
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 45 }}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  style={{ width: "100%", height: "100%", background: "transparent" }}
                  frameloop="demand"
                  dpr={[1, 2]}
                >
                  <Suspense fallback={null}>
                    <Model isVisible={isCanvasVisible} />
                    <ambientLight intensity={0.5} />
                    <directionalLight intensity={2} position={[0, 2, 3]} />
                    <directionalLight intensity={1} position={[-2, -2, -3]} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} />
                    <Environment preset="city" />
                    <OrbitControls 
                      enableZoom={false} 
                      enablePan={false}
                      enableDamping={false}
                    />
                  </Suspense>
                </Canvas>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="mb-4">
            <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk bg-gradient-to-r from-[#F15A24] to-[#ffaf00] bg-clip-text text-transparent text-left">
              double tap
            </h2>
            <p className="text-lg md:text-xl mt-2 font-power-grotesk text-white text-left">
              is where brands find their voice.
            </p>
          </div>

          <p className="text-sm md:text-base font-mono mb-8 italic text-white/60">
            In a world of fleeting trends and shrinking attention spans, Double
            Tap crafts thoughtful, lasting brand stories that truly connect. We
            go beyond the noise to create communication that&apos;s genuine,
            effective, and memorable, across print, digital, and experiential
            formats. Every detail matters, and we ensure your brand&apos;s voice
            comes through clearly and meaningfully.
          </p>

          <div className="flex flex-col w-full">
            <Button
              onClick={() => scrollToSection("services")}
              label="Explore our services"
              className="border-b-0"
            />
            <Button
              onClick={() => scrollToSection("contact")}
              label="Contact us"
              className="border-b"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
