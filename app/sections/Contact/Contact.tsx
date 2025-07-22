import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { AnimatedLink } from "@/components/AnimatedLink";
import Button from "@/components/Button/Button";
import { ModelLogo } from "@/components/Model/ModelLogo";
export default function Contact() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/30" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/30" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="relative flex flex-col items-center justify-center mb-4" style={{ height: '20rem', width: '40rem' }}>
            <div className="absolute inset-0 flex items-center justify-center z-10" style={{ height: '100%', width: '100%' }}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ width: '100%', height: '100%', background: '#000000' }}
              >
                <ModelLogo scale={[1,1,1]} />
                <directionalLight intensity={2} position={[0, 2, 3]} />
                <Environment preset="city" />
              </Canvas>
            </div>
            {/* <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk text-[#F15A24] text-center relative z-0" style={{ pointerEvents: 'none' }}>
              speak
            </h2> */}
            <p className="text-lg md:text-xl mt-80 font-power-grotesk text-white text-center relative z-20">
              to us about your next project.
            </p>
          </div>
          <p className="text-sm md:text-base font-mono mt-8 mb-8 italic text-white/60">
            Whether you&apos;ve got a brief or just a hunch, we&apos;d love to
            hear it. Let&apos;s do something great together.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-row flex-wrap items-center justify-center md:gap-12 mb-32">
          <Button
            href="mailto:write@doubletap.work"
            label="write@doubletap.work"
            className="border-gray-800 w-full md:w-auto"
          />
          <Button
            href="tel:+919124999144"
            label="+91 9124 999 144"
            className="border-gray-800 w-full md:w-auto "
          />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-400">
            © 2025 Double Tap. All rights reserved.
          </p>
          <div className="flex gap-8">
            <AnimatedLink href="/privacy">Privacy Policy</AnimatedLink>
            <AnimatedLink href="/terms">Terms of Service</AnimatedLink>
          </div>
        </footer>
      </div>
    </section>
  );
}
