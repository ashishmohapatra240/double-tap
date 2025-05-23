"use client";
import { useRef } from "react";

export default function Services() {
  const services = [
    {
      title: "Brand Communication",
      icon: "/icons/service/Direct message (Black Bg).mp4",
      description:
        "Your brand needs a voice, one that speaks with clarity, confidence, and purpose. We craft communication strategies that help your brand connect, resonate, and stay memorable.",
    },
    {
      title: "Brand Identity",
      icon: "/icons/service/Paint Roller (Black Bg).mp4",
      description:
        "Your brand's first impression starts here. We create distinct, cohesive identities that reflect your brand's vision and build lasting recognition.",
    },
    {
      title: "Brand Strategy",
      icon: "/icons/service/Verified (Black Bg).mp4",
      description:
        "Great branding begins with great thinking. We dive deep into insights, positioning, and purpose to shape a strategy that sets your brand apart and ahead. ",
    },
    {
      title: "Social Media",
      icon: "/icons/service/Color swatches (Black Bg).mp4",
      description:
        "We turn scrolls into stops. With platform-specific content, engaging storytelling, and timely trends, we build digital presence that grows your community and brand love.",
    },
    {
      title: "Design",
      icon: "/icons/service/Blend (Black Bg).mp4",
      description:
        "Design is how your brand is seen and felt. From visual systems to packaging, we design with intention, impact, and aesthetics that work across every touchpoint.",
    },
    {
      title: "TVC Production",
      icon: "/icons/service/Video Camera (Black bg).mp4",
      description:
        "From idea to screen, we produce films that move people. Whether it's a 30-second commercial or branded content, our team delivers stories that stick visually and emotionally.",
    },
  ];

  const AnimatedIcon = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const shouldStopRef = useRef(false);

    const handleMouseEnter = () => {
      shouldStopRef.current = false;
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    const handleMouseLeave = () => {
      shouldStopRef.current = true;
      if (videoRef.current) {
        const handleAnimationEnd = () => {
          if (videoRef.current && shouldStopRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.removeEventListener("ended", handleAnimationEnd);
          }
        };

        videoRef.current.addEventListener("ended", handleAnimationEnd);
      }
    };

    return (
      <video
        ref={videoRef}
        className="w-12 h-12 object-cover"
        src={src}
        muted
        playsInline
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  const ServiceCard = ({ service }: { service: (typeof services)[number] }) => {
    return (
      <div className="flex flex-col">
        <div className="flex gap-4 items-center">
          <AnimatedIcon src={service.icon} />
          <h3 className="text-xl font-medium font-power-grotesk">{service.title}</h3>
        </div>

        <p className="text-neutral-400 font-mono">{service.description}</p>
      </div>
    );
  };

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
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
