import Image from "next/image";

export default function WhatWeDo() {
  const services = [
    {
      title: "brand comm.",
      icon: "/icons/what-we-do/icon-1.svg",
    },
    {
      title: "brand identity",
      icon: "/icons/what-we-do/icon-2.svg",
    },
    {
      title: "brand strategy",
      icon: "/icons/what-we-do/icon-3.svg",
    },
    {
      title: "social media",
      icon: "/icons/what-we-do/icon-1.svg",
    },
    {
      title: "design",
      icon: "/icons/what-we-do/icon-2.svg",
    },
    {
      title: "tvc production",
      icon: "/icons/what-we-do/icon-3.svg",
    },
  ];

  const description = `Design is the cornerstone of effective communication and problem-solving. It distills complexity into simplicity, making information more accessible and experiences more intuitive. Whether it's a logo, a website, or a piece of furniture, thoughtful design has the power to captivate, inspire, and connect with people on a deeper level.`;

  return (
    <section className="min-h-screen bg-black text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Headline */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal font-power-grotesk flex justify-center ">
            make your<span>&nbsp;</span>
            <span className="text-[#F15A24]"> brand work</span>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 relative">
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={24}
                    height={24}
                    className="text-[#F15A24]"
                  />
                </div>
                <h3 className="text-xl font-normal font-power-grotesk">
                  {service.title}
                </h3>
              </div>
              <p className="font-mono text-xs md:text-sm text-gray-300">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
