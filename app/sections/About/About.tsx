import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="min-h-screen bg-[#DADADA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal font-power-grotesk mb-6">
            double tap
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
            <Link
              href="/services"
              className="flex items-center justify-between border-t border-black py-3 px-4 gap-4 hover:bg-[#F15A24] transition-colors duration-300"
            >
              <span className="font-mono uppercase text-sm">
                Explore our services
              </span>
              <Image
                src="/icons/upper-right-arrow-black.svg"
                alt="Arrow right"
                width={12}
                height={12}
              />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-between border-t border-b border-black py-3 px-4 gap-4 hover:bg-[#F15A24] transition-colors duration-300"
            >
              <span className="font-mono uppercase text-sm tracking-wider">
                Contact us
              </span>
              <Image
                src="/icons/upper-right-arrow-black.svg"
                alt="Arrow right"
                width={12}
                height={12}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
