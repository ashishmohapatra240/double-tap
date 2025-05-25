import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Careers() {
  return (
    <section className="min-h-screen bg-[#DADADA] max-w-6xl mx-auto flex flex-col items-center justify-center py-40 px-4 lg:px-0">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left side - Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal font-power-grotesk mb-6">
            <span className="font-bold">Our</span> tables big enough for big
            thinkers
          </h2>

          <p className="text-sm md:text-base font-mono mb-8 italic">
            At Double Tap, we&apos;re always looking for passionate individuals
            who think differently and aren&apos;t afraid to challenge the status
            quo. If you&apos;re ready to join a team that values creativity,
            innovation, and collaboration, we want to hear from you.
          </p>

          <div className="flex flex-col w-full md:w-auto">
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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-power-grotesk mb-6">
          Why shoud you join double tap?
        </h2>
        <div className="flex flex-col w-full md:w-auto">
          <Button href="/careers" label="Give me a reason" />
        </div>
      </div>
    </section>
  );
}
