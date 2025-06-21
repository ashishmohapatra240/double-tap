import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Address() {
  return (
    <section className="relative min-h-screen bg-black flex items-center">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side - Image */}
          <div className="lg:w-1/2">
            <div className="relative flex items-center justify-center gap-4">
              <div className="w-[300px] md:w-[1000px]">
                <Image
                  src="/images/address/table.png"
                  height={1000}
                  width={1000}
                  alt="Wooden tables with laptops"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 flex flex-col items-start">
            <div className="mb-12">
              <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk text-[#F15A24] text-left">
                at
              </h2>
              <p className="text-lg md:text-xl mt-2 font-mono text-white text-left">
                1st floor, OPSL Tower
                <br />
                Plot No- F/16
                <br />
                Chandaka Industrial Estate
                <br />
                Near Trident Engineering College
                <br />
                Patia, Bhubaneswar
                <br />
                751024 Odisha
              </p>
            </div>
            <div className="flex flex-col w-full">
              <Button
                href="https://maps.google.com/?q=Trident+Engineering+College+Patia+Bhubaneswar"
                label="map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
