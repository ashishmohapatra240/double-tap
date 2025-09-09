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
          <h3 className="text-xl font-normal font-power-grotesk text-[#D9D9D9]">
            {service.title}
          </h3>
        </div>

        <p className="text-[#D9D9D9] font-mono">{service.description}</p>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center py-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 min-h-[80vh]">
          <div className="lg:w-1/2 flex flex-col justify-center min-h-[80vh]">
            <div className="text-center lg:text-left">
              <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent">
                let
              </h2>
              <p className="text-lg md:text-xl mt-2 font-power-grotesk text-[#D9D9D9]">
                us shape your brand&apos;s journey.
              </p>
            </div>

            <p className="text-[#D9D9D9] font-mono max-w-xl mx-auto lg:mx-0 mt-4 text-center lg:text-left">
              From strategy and storytelling to design and digital, we offer
              complete creative services that help brands grow and stand out.
            </p>
          </div>

          <div className="lg:w-1/2">
            <div className="flex flex-col gap-8 md:gap-10">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
