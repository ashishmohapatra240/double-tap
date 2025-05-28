import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Careers() {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center py-40 px-4 lg:px-0">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-10 md:gap-20">
        {/* Left side - Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="font-power-grotesk mb-6 text-white">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold">
              Our
            </span>{" "}
            <span className="text-xl md:text-2xl lg:text-3xl">
              tables big enough for big thinkers
            </span>
          </h2>

          <p className="text-sm md:text-base font-mono mb-8 italic text-white/60">
            We believe bold ideas come from bold minds. If you think
            differently, we’ve got a seat with your name on it.
          </p>

          <div className="flex flex-col w-full">
            <Button href="/contact" label="Contact us" />
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src="/images/careers/meeting.png"
              alt="Team meeting at Double Tap"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 md:gap-8 mt-20 md:mt-40">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-power-grotesk mb-6 text-white">
          Why should you join double tap?
        </h2>
        <div className="flex flex-col w-full">
          <Button href="/careers" label="Give me a reason" />
        </div>
      </div>
    </section>
  );
}
