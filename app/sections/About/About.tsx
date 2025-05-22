import Image from "next/image";
import Button from "@/components/Button/Button";

export default function About() {
  return (
    <section className="min-h-screen bg-[#DADADA]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-16 md:my-0">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-power-grotesk mb-6">
            <span className="font-bold">double tap</span> is where brands find
            their voice.
          </h2>

          <p className="text-sm md:text-base font-mono mb-8 italic">
            Design is the cornerstone of effective communication and
            problem-solving. It distills complexity into simplicity, making
            information more accessible and experiences more intuitive. Whether
            it&apos;s a logo, a website, or a piece of furniture, thoughtful
            design has the power to captivate, inspire, and connect with people
            on a deeper level, enriching their lives in countless ways.
          </p>

          <div className="flex flex-col w-full md:w-auto">
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
