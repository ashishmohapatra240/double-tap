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
    let ticking = false;
    const mouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHoveredImages((prev) => {
            const newState = { ...prev };
            // Update position for all active images
            Object.keys(newState).forEach((key) => {
              newState[Number(key)] = { x: e.clientX, y: e.clientY };
            });
            return newState;
          });
          ticking = false;
        });
        ticking = true;
      }
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
    <section className="py-20 bg-black text-white relative">
      <AnimatePresence>
        {Object.entries(hoveredImages).map(([index, position]) => (
          <React.Fragment key={index}>
            {/* First Image */}
            <motion.div
              className="fixed z-50 pointer-events-none"
              style={{
                left: `${position.x - 100}px`,
                top: `${position.y - 100}px`,
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
                className="object-cover border-2 border-white"
                width={240}
                height={240}
              />
            </motion.div>

            {/* Second Image */}
            <motion.div
              className="fixed z-50 pointer-events-none"
              style={{
                left: `${position.x + 100}px`,
                top: `${position.y - 40}px`,
              }}
              initial={{
                x: -40,
                scale: 0.4,
                opacity: 0,
                rotate: 6,
              }}
              animate={{
                x: 0,
                scale: 1,
                opacity: 1,
                rotate: 6,
              }}
              exit={{
                x: -100,
                scale: 0.4,
                opacity: 0,
                rotate: 6,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: 0.1,
              }}
            >
              <Image
                src={works[Number(index)].image2}
                alt={works[Number(index)].title}
                className="object-cover border-2 border-white"
                width={240}
                height={240}
              />
            </motion.div>
          </React.Fragment>
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
        <div className="mb-12 md:mb-24">
          <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk text-[#F15A24] text-center">
            works
          </h2>
          <p className="text-lg md:text-xl mt-2 font-power-grotesk text-center">
            that proves creativity means business
          </p>
          <p className="text-white font-mono max-w-xl mt-24">
            Here&apos;s a glimpse into the brands we&apos;ve helped shape. Each
            project is the result of sharp thinking, fresh ideas, and close
            collaboration.
          </p>
        </div>

        <div>
          {works.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden"
              tabIndex={0}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
              onFocus={(e) =>
                handleMouseEnter(index, e as unknown as React.MouseEvent)
              }
              onBlur={() => handleMouseLeave(index)}
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
