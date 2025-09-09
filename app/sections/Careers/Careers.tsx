"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { getRandomReason } from "@/data/reasons";

export default function Careers() {
  const [currentReason, setCurrentReason] = useState<string | null>(null);
  const [showReason, setShowReason] = useState(false);

  const handleShowReason = () => {
    const reason = getRandomReason();
    setCurrentReason(reason);
    setShowReason(true);
  };

  return (
    <section className="min-h-screen bg-black flex flex-col items-center py-40 px-4 lg:px-0">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-10 md:gap-20">
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="mb-12">
            <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent text-left">
              our
            </h2>
            <p className="text-lg md:text-xl mt-2 font-mono text-[#D9D9D9] text-left">
              tables big enough for big thinkers
            </p>
          </div>

          <p className="text-sm md:text-base font-mono mb-8 italic text-[#D9D9D9]">
            We believe bold ideas come from bold minds. If you think
            differently, we&apos;ve got a seat with your name on it.
          </p>

          <div className="flex flex-col w-full">
            <Button href="/contact" label="Contact us" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src="/images/careers/careers.jpg"
              alt="Team meeting at Double Tap"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-10 md:gap-8 mt-20 md:mt-40">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal font-power-grotesk mb-6 text-[#D9D9D9]">
          Why should you join double tap?
        </h2>

        {showReason && currentReason && (
          <div className="text-center mb-2 animate-fade-in">
            <p className="text-xl md:text-2xl font-mono text-[#D9D9D9] italic max-w-4xl tracking-tight">
              {currentReason}
            </p>
          </div>
        )}

        <div className="flex flex-col w-full items-center">
          <Button
            onClick={handleShowReason}
            label={showReason ? "Give me another reason" : "Give me a reason"}
            align="center"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
