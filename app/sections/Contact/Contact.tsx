import Image from "next/image";
import { AnimatedLink } from "@/components/AnimatedLink";
import Button from "@/components/Button/Button";
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
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-power-grotesk mb-6">
              <div className="absolute -top-16 -left-30 w-32 h-32 md:w-40 md:h-40 pointer-events-none">
                <Image
                  src="/images/contact-3d.png"
                  alt="3D decoration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-white font-bold relative">Speak</span>
              &nbsp;to us and let&apos;s build something extraordinary together.
            </h2>
          </div>
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
