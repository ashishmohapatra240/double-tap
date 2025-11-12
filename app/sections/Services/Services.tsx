"use client";
import { useRef } from "react";

export default function Services() {
  const services = [
    {
      title: "Brand Communication",
      icon: "/icons/service/Direct message (Black Bg).mp4",
      description:
        "We give your brand a voice that doesn’t mumble. Clear, confident, and unforgettable, so your audience can’t help but fall in love.",
    },
    {
      title: "Brand Identity",
      icon: "/icons/service/Paint Roller (Black Bg).mp4",
      description:
        "First impressions matter. We craft looks so sharp, your brand won’t just get noticed, it’ll get remembered (and maybe even stalked).",
    },
    {
      title: "Brand Strategy",
      icon: "/icons/service/Verified (Black Bg).mp4",
      description:
        "Behind every “wow” brand is some solid brainwork. We dig deep, connect the dots, and plot your brand’s master plan to stay two steps ahead.",
    },
    {
      title: "Social Media",
      icon: "/icons/service/Color swatches (Black Bg).mp4",
      description:
        "We turn endless scrolling into “Wait, what’s this?” moments. Trend-savvy, story-rich, and community-growing—your brand’s hype squad online.",
    },
    {
      title: "Design",
      icon: "/icons/service/Blend (Black Bg).mp4",
      description:
        "From logos to packaging to the tiny details that make people go “Whoah,” our design makes sure your brand is not just seen but felt everywhere.",
    },
    {
      title: "TVC Production",
      icon: "/icons/service/Video Camera (Black bg).mp4",
      description:
        "Lights, camera, brand action! Whether it’s a 30-second stunner or binge-worthy branded content, we create films people actually want to watch.",
    },
  ];

  const AnimatedIcon = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleMouseLeave = () => {
      const video = videoRef.current;
      if (!video) return;

      video.pause();
      video.currentTime = 0;
    };

    return (
      <video
        ref={videoRef}
        className="w-12 h-12 object-cover"
        src={src}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          const video = videoRef.current;
          if (!video) return;
          video.pause();
          video.currentTime = 0;
        }}
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
