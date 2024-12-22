import Image from "next/image";
import SocialLink from "@/components/SocialLink/index";
import { SOCIAL_LINKS } from "@/constants";

export default function Hero() {
  return (
    <div className="flex-1 flex flex-col items-start justify-center p-8 max-w-2xl mx-auto">
      <h1 className="text-6xl md:text-7xl mb-8">
        <span className="font-power-grotesk">almost</span>
        <span className="font-power-grotesk text-[#DE5C35]">there</span>
      </h1>

      <p className="font-space-mono text-left mb-12 text-[12px] md:text-base">
        Get ready to Double Tap into A+ branding! This website is launching
        soon, bringing you creative direction, engaging social media
        communication, and strategic brand solutions. While we put the finishing
        touches on our digital home, we are fully operational and ready to
        collaborate on your next big project.
      </p>

      <div className="flex flex-wrap gap-4 items-start mb-12">
        <SocialLink
          href={SOCIAL_LINKS.INSTAGRAM}
          label="instagram"
        />
        <SocialLink
          href={SOCIAL_LINKS.LINKEDIN}
          label="linkedin"
        />
        <SocialLink href={SOCIAL_LINKS.TEXT} label="text" />
      </div>

      <Image
        src="/images/logo.png"
        alt="Double Tap Logo"
        width={120}
        height={60}
        className="mb-8"
        quality={100}
      />
    </div>
  );
}
