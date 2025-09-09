"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  isMuted?: boolean;
  src?: string;
  poster?: string;
}

const Video = ({
  isMuted = true,
  src = "/videos/Hero1.mp4",
  poster = "/videos/hero1-poster.jpg",
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.set(el, {
      width: "85%",
      height: "100svh",
      marginInline: "auto",
      position: "relative",
      zIndex: 1,
      willChange: "width",
      opacity: 1,
      y: 0,
    });

    const anim = gsap.to(el, {
      width: "100%",
      ease: "power2.out",
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 10%",
        scrub: 1,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [isMuted]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ boxShadow: "0 -10px 30px rgba(0,0,0,0.5)" }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        poster={poster}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Video;
