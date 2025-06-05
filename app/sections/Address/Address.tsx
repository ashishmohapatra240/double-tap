import Image from "next/image";
import Button from "@/components/Button/Button";

export default function Address() {
  return (
    <section className="relative min-h-screen bg-black flex items-center">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20 md:gap-40">
          {/* Left side - Image */}
          <div className="lg:w-1/2">
            <div className="relative flex items-center justify-center gap-4">
              <div className="w-[300px] md:w-[600px]">
                <Image
                  src="/images/address/table.png"
                  height={600}
                  width={600}
                  alt="Wooden tables with laptops"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-power-grotesk mb-8 text-white">
              at
            </h2>

            <address className="not-italic font-mono text-lg mb-8 leading-relaxed text-white/60">
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
            </address>
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
