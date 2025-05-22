import Image from "next/image";

export default function Services() {
  const services = [
    {
      title: "Brand Communication ",
      icon: "/icons/what-we-do/icon-1.svg",
      description:
        "Your brand needs a voice, one that speaks with clarity, confidence, and purpose. We craft communication strategies that help your brand connect, resonate, and stay memorable.",
    },
    {
      title: "Brand Identity",
      icon: "/icons/what-we-do/icon-2.svg",
      description:
        "Your brand's first impression starts here. We create distinct, cohesive identities that reflect your brand's vision and build lasting recognition.",
    },
    {
      title: "Brand Strategy",
      icon: "/icons/what-we-do/icon-3.svg",
      description:
        "Great branding begins with great thinking. We dive deep into insights, positioning, and purpose to shape a strategy that sets your brand apart and ahead. ",
    },
    {
      title: "Social Media",
      icon: "/icons/what-we-do/icon-1.svg",
      description:
        "We turn scrolls into stops. With platform-specific content, engaging storytelling, and timely trends, we build digital presence that grows your community and brand love.",
    },
    {
      title: "Design",
      icon: "/icons/what-we-do/icon-2.svg",
      description:
        "Design is how your brand is seen and felt. From visual systems to packaging, we design with intention, impact, and aesthetics that work across every touchpoint.",
    },
    {
      title: "TVC Production",
      icon: "/icons/what-we-do/icon-3.svg",
      description:
        "From idea to screen, we produce films that move people. Whether it's a 30-second commercial or branded content, our team delivers stories that stick visually and emotionally.",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white py-8 md:py-16 md:pt-20 md:pb-60">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-20">
        {/* Headline */}
        <div className="mb-12 md:mb-24 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal font-power-grotesk flex flex-row md:justify-center md:pt-20 md:pb-20">
            <span className="text-[#F15A24] font-bold mb-1 md:mb-0">let</span>
            <span className="ml-2">us shape your brand&apos;s journey.</span>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-16">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="w-5 md:w-6 h-5 md:h-6 relative">
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={24}
                    height={24}
                    className="text-[#F15A24]"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-normal font-power-grotesk">
                  {service.title}
                </h3>
              </div>
              <p className="font-mono text-xs md:text-sm text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
