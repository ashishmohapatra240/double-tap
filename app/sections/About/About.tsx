import Image from "next/image";
import Button from "@/components/Button/Button";

export default function About() {
  return (
    <section className="min-h-screen bg-black flex items-center">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-64 h-64 md:w-[420px] md:h-[420px] rounded-full overflow-hidden bg-[#f3e9d9]">
            <Image
              src="/images/about/about.png"
              alt="About Double Tap"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="font-power-grotesk mb-6 text-white leading-tight flex flex-col gap-2">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold">
              double tap
            </span>{" "}
            <span className="text-xl md:text-2xl lg:text-3xl">
              is where brands find their voice.
            </span>
          </div>

          <p className="text-sm md:text-base font-mono mb-8 italic text-white/60">
            In a world of fleeting trends and shrinking attention spans, Double
            Tap crafts thoughtful, lasting brand stories that truly connect. We
            go beyond the noise to create communication that’s genuine,
            effective, and memorable, across print, digital, and experiential
            formats. Every detail matters, and we ensure your brand’s voice
            comes through clearly and meaningfully.
          </p>

          <div className="flex flex-col w-full">
            <Button
              href="/services"
              label="Explore our services"
              className="border-b-0"
            />
            <Button href="/contact" label="Contact us" className="border-b" />
          </div>
        </div>
      </div>
    </section>
  );
}
