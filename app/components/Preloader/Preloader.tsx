"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const rectangleRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const greetings = useMemo(
    () => [
      "ନମସ୍କାର", // Odia
      "नमस्कार", // Hindi
      "नमस्कार", // Marathi
      "नमस्कारः", // Sanskrit
      "নমস্কার", // Bengali
      "નમસ્કાર", // Gujarati
      "ਨਮਸਕਾਰ", // Punjabi
      "வணக்கம்", // Tamil
      "నమస్కారం", // Telugu
      "ನಮಸ್ಕಾರ", // Kannada
      "నమస్కారం", // Malayalam
      "নমস্কাৰ", // Assamese
      "نمسکار", // Urdu
      "نمسڪار", // Sindhi
      "Namaskar", // English
    ],
    []
  );

  // Start with empty string to prevent flash of Odia text
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

    // Set initial states
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
      fontSize: "2rem",
      fontFamily: "var(--font-power-grotesk)",
      zIndex: 51,
    });

    const textTimeline = gsap.timeline();

    greetings.slice(0, -1).forEach((greeting) => {
      textTimeline.to(
        {},
        {
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => setCurrentGreeting(greeting),
        }
      );
    });

    // Add final English "Namaskar"
    textTimeline.to(
      {},
      {
        duration: 0.5,
        onComplete: () => setCurrentGreeting("Namaskar"),
      }
    );

    tl.to(textRef.current, {
      opacity: 1,
      duration: 1,
      onStart: () => setCurrentGreeting(greetings[0]), // Set first greeting when fade-in starts
    })
      .add(textTimeline)
      .to(rectangleRef.current, {
        width: "100vw",
        duration: 3,
        ease: "power2.inOut",
      })
      .to(rectangleRef.current, {
        height: "100vh",
        bottom: 0,
        duration: 1.5,
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
