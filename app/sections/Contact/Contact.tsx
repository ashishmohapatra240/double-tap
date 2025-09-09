import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AnimatedLink } from "@/components/AnimatedLink";
import Button from "@/components/Button/Button";
import { ModelLogo } from "@/components/Model/ModelLogo";
import { useState, useEffect } from "react";

export default function Contact() {
  const [modelScale, setModelScale] = useState<[number, number, number]>([
    1, 1, 1,
  ]);
  const [textSize, setTextSize] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setModelScale([1, 1, 1]);
        setTextSize(2);
      } else if (window.innerWidth < 768) {
        setModelScale([0.8, 0.8, 0.8]);
        setTextSize(2.5);
      } else if (window.innerWidth < 1024) {
        setModelScale([1.2, 1.2, 1.2]);
        setTextSize(3);
      } else {
        setModelScale([1.5, 1.5, 1.5]);
        setTextSize(3.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/30" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/30" />
      </div>

      <div className="max-w-7xl mx-auto relative w-full">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="relative flex flex-col items-center justify-center mb-4 w-full max-w-[95vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] h-64 sm:h-80 md:h-96 lg:h-[28rem]">
            <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 35 }}
                style={{ width: "100%", height: "100%", background: "#000000" }}
              >
                <ModelLogo scale={modelScale} textSize={textSize} />
                <directionalLight intensity={2} position={[0, 2, 3]} />
                <Environment preset="city" />
              </Canvas>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-40 sm:mt-48 md:mt-56 lg:mt-64 font-power-grotesk text-white text-center relative z-20">
              to us about your next project.
            </p>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-mono mt-6 sm:mt-8 mb-6 sm:mb-8 italic text-white/60 px-4 sm:px-8 max-w-2xl">
            Whether you&apos;ve got a brief or just a hunch, we&apos;d love to
            hear it. Let&apos;s do something great together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-16 sm:mb-20 md:mb-32 px-4">
          <Button
            href="mailto:write@doubletap.work"
            label="write@doubletap.work"
            className="border-gray-800 w-full sm:w-auto text-sm sm:text-base"
          />
          <Button
            href="tel:+919124999144"
            label="+91 9124 999 144"
            className="border-gray-800 w-full sm:w-auto text-sm sm:text-base"
          />
        </div>

        <footer className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-4 mb-8">
          <p className="font-mono text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © 2025 Double Tap. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm">
            <AnimatedLink href="/privacy">Privacy Policy</AnimatedLink>
            <AnimatedLink href="/terms">Terms of Service</AnimatedLink>
          </div>
        </footer>
      </div>
    </section>
  );
}
