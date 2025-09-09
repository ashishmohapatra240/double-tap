"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const rectangleRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const greetings = useMemo(
    () => [
      "ନମସ୍କାର",
      "नमस्कार",
      "नमस्कार",
      "नमस्कारः",
      "নমস্কার",
      "નમસ્કાર",
      "ਨਮਸਕਾਰ",
      "வணக்கம்",
      "నమస్కారం",
      "ನಮಸ್ಕಾರ",
      "నమస్కారం",
      "নমস্কাৰ",
      "نمسکار",
      "نمسڪار",
      "Namaskar",
    ],
    []
  );

  const [currentGreeting, setCurrentGreeting] = useState("");

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(
          [containerRef.current, rectangleRef.current, textRef.current],
          {
            backgroundColor: "#000000",
          }
        );
        onComplete();
      },
    });

    gsap.set(containerRef.current, {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#F15A24",
      zIndex: 50,
    });

    gsap.set(rectangleRef.current, {
      width: 0,
      height: "2px",
      backgroundColor: "#000000",
      position: "fixed",
      left: 0,
      bottom: "10vh",
      transformOrigin: "center",
      zIndex: 51,
    });

    gsap.set(textRef.current, {
      opacity: 0,
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      color: "#000000",
      fontSize: "2.4rem",
      fontFamily: "var(--font-power-grotesk)",
      zIndex: 51,
    });

    const textTimeline = gsap.timeline();

    greetings.slice(0, -1).forEach((greeting) => {
      textTimeline.to(
        {},
        {
          duration: 0.15,
          ease: "power2.inOut",
          onComplete: () => setCurrentGreeting(greeting),
        }
      );
    });

    textTimeline.to(
      {},
      {
        duration: 0.4,
        onComplete: () => setCurrentGreeting("Namaskar"),
      }
    );

    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      onStart: () => setCurrentGreeting(greetings[0]),
    })
      .add(textTimeline)
      .to(rectangleRef.current, {
        width: "100vw",
        duration: 2.5,
        ease: "power2.inOut",
      })
      .to(rectangleRef.current, {
        height: "100vh",
        bottom: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });
  }, [onComplete, greetings]);

  return (
    <div ref={containerRef}>
      <div ref={rectangleRef}></div>
      <div ref={textRef}>{currentGreeting}</div>
    </div>
  );
};

export default Preloader;
