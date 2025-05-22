"use client";
import React, { useEffect, useState } from "react";
import { works } from "@/data/works";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Works() {
  const [hoveredImages, setHoveredImages] = useState<{
    [key: number]: { x: number; y: number };
  }>({});

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setHoveredImages((prev) => {
        const newState = { ...prev };
        // Update position for all active images
        Object.keys(newState).forEach((key) => {
          newState[Number(key)] = { x: e.clientX, y: e.clientY };
        });
        return newState;
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    setHoveredImages((prev) => ({
      ...prev,
      [index]: { x: e.clientX, y: e.clientY },
    }));
  };

  const handleMouseLeave = (index: number) => {
    setHoveredImages((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  return (
    <section className="py-40 bg-black text-white relative">
      <AnimatePresence>
        {Object.entries(hoveredImages).map(([index, position]) => (
          <motion.div
            key={index}
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            initial={{
              x: 40,
              scale: 0.4,
              opacity: 0,
              rotate: -6,
            }}
            animate={{
              x: 0,
              scale: 1,
              opacity: 1,
              rotate: -6,
            }}
            exit={{
              x: 100,
              scale: 0.4,
              opacity: 0,
              rotate: -6,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <Image
              src={works[Number(index)].image}
              alt={works[Number(index)].title}
              className="w-48 h-48 object-cover"
              width={100}
              height={100}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes imageAppear {
          from {
            opacity: 0;
            transform: translate(20px, 0) scale(0.8) rotate(-6deg);
          }
          to {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(-6deg);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-24 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal font-power-grotesk pt-0 md:pt-20 pb-0 md:pb-20">
            <span className="text-[#F15A24] font-bold">works </span>
            that proves creativity means business.
          </h2>
        </div>

        <div>
          {works.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden"
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="border-t border-b border-gray-600 py-6 relative z-10">
                <div className="px-2 md:px-6 flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-end">
                  <h3 className="text-2xl md:text-3xl font-normal font-power-grotesk">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4D4D4D] group-hover:text-white transition-colors duration-300 font-power-grotesk">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#F15A24] transform origin-center scale-y-0 transition-transform duration-[400ms] ease-in-out group-hover:scale-y-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
