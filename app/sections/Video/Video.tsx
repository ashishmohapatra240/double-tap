"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
gsap.registerPlugin(ScrollTrigger);

interface VideoProps {
  isMuted?: boolean;
  src?: string;
  poster?: string;
}

const Video = ({
  isMuted = true,
  src = "/videos/Hero.mp4",
  poster = "/videos/hero-poster.jpg",
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const enterAnimationRef = useRef<gsap.core.Tween | null>(null);
  const [videoIntersectionRef, isVideoVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px',
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (isVideoVisible) {
      setShouldLoadVideo(true);
    }
  }, [isVideoVisible]);

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
      opacity: 0,
      y: 80,
    });

    enterAnimationRef.current?.kill();
    enterAnimationRef.current = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
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
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((st) => {
        if (st.trigger === el) {
          st.kill();
        }
      });
      enterAnimationRef.current?.kill();
      enterAnimationRef.current = null;
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shouldLoadVideo) return;
    
    v.muted = isMuted;
    
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    
    if (v.readyState >= 3) {
      tryPlay();
    } else {
      v.addEventListener("canplay", tryPlay, { once: true });
    }
    
    return () => {
      v.removeEventListener("canplay", tryPlay);
    };
  }, [isMuted, shouldLoadVideo]);

  return (
    <div
      ref={(node) => {
        if (node) {
          containerRef.current = node;
          (videoIntersectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className="relative overflow-hidden"
      style={{ boxShadow: "0 -10px 30px rgba(0,0,0,0.5)" }}
    >
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          poster={poster}
          className="w-full h-full object-cover"
        />
      ) : (
        <div 
          className="w-full h-full bg-black"
          style={{ 
            backgroundImage: poster ? `url(${poster})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
    </div>
  );
};

export default Video;
