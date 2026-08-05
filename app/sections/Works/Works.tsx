"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Work } from "@/sanity/lib/content";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

// Hover overlays are 240x240 at q80. The warm-up pass below must use these exact
// values so it produces the same optimizer URLs the overlays request — that is
// what makes the hover a cache hit rather than a fresh round trip.
const OVERLAY_SIZE = 240;
const OVERLAY_QUALITY = 80;

export default function Works({ works }: { works: Work[] }) {
  const [hoveredIndices, setHoveredIndices] = useState<Set<number>>(new Set());
  // Overlays only mount while hovered, so their images could not begin loading
  // until the cursor was already on the row — the first hover always showed an
  // empty outline. Warming them once the list is near the viewport means the
  // bytes are in cache before any hover happens.
  const [prefetchRef, shouldPrefetch] = useIntersectionObserver({
    threshold: 0,
    rootMargin: "600px",
    freezeOnceVisible: true,
  });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const overlayRefsLeft = useRef<Map<number, HTMLDivElement>>(new Map());
  const overlayRefsRight = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    let ticking = false;

    const mouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { x, y } = mousePositionRef.current;
          overlayRefsLeft.current.forEach((el) => {
            el.style.left = `${x}px`;
            el.style.top = `${y + 200}px`;
          });
          overlayRefsRight.current.forEach((el) => {
            el.style.left = `${x + 200}px`;
            el.style.top = `${y + 200}px`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    setHoveredIndices((prev) => new Set(prev).add(index));
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndices((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  return (
    <section ref={prefetchRef} className="py-20 bg-black text-white relative">
      {/* Off-screen warm-up for the hover overlays. Kept at opacity 0 rather than
          display:none so the fetches are guaranteed to fire in every browser. */}
      {shouldPrefetch && (
        <div
          aria-hidden
          className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        >
          {works.map((work) => (
            <React.Fragment key={`prefetch-${work.id}`}>
              <Image
                src={work.image}
                alt=""
                width={OVERLAY_SIZE}
                height={OVERLAY_SIZE}
                quality={OVERLAY_QUALITY}
              />
              <Image
                src={work.image2}
                alt=""
                width={OVERLAY_SIZE}
                height={OVERLAY_SIZE}
                quality={OVERLAY_QUALITY}
              />
            </React.Fragment>
          ))}
        </div>
      )}

      <AnimatePresence>
        {Array.from(hoveredIndices).map((index) => {
          const { x, y } = mousePositionRef.current;
          return (
            <React.Fragment key={index}>
              <motion.div
                ref={(el) => {
                  if (el) overlayRefsLeft.current.set(index, el);
                  else overlayRefsLeft.current.delete(index);
                }}
                className="fixed z-50 pointer-events-none"
                style={{
                  left: `${x}px`,
                  top: `${y + 200}px`,
                  transform: 'translate(-260px, -120px)',
                }}
                initial={{ scale: 0.4, opacity: 0, rotate: -6 }}
                animate={{ scale: 1, opacity: 1, rotate: -6 }}
                exit={{ scale: 0.4, opacity: 0, rotate: -6 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Image
                  src={works[index].image}
                  alt={works[index].title}
                  className="object-cover border-2 border-white"
                  width={OVERLAY_SIZE}
                  height={OVERLAY_SIZE}
                  // Eager, not lazy: by the time this mounts the user is already
                  // hovering, so deferring only adds latency.
                  loading="eager"
                  quality={OVERLAY_QUALITY}
                  {...(works[index].blurDataURL
                    ? {
                        placeholder: "blur" as const,
                        blurDataURL: works[index].blurDataURL,
                      }
                    : {})}
                />
              </motion.div>

              <motion.div
                ref={(el) => {
                  if (el) overlayRefsRight.current.set(index, el);
                  else overlayRefsRight.current.delete(index);
                }}
                className="fixed z-50 pointer-events-none"
                style={{
                  left: `${x + 200}px`,
                  top: `${y + 200}px`,
                  transform: 'translate(20px, -120px)',
                }}
                initial={{ scale: 0.4, opacity: 0, rotate: 6 }}
                animate={{ scale: 1, opacity: 1, rotate: 6 }}
                exit={{ scale: 0.4, opacity: 0, rotate: 6 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
              >
                <Image
                  src={works[index].image2}
                  alt={works[index].title}
                  className="object-cover border-2 border-white"
                  width={OVERLAY_SIZE}
                  height={OVERLAY_SIZE}
                  loading="eager"
                  quality={OVERLAY_QUALITY}
                  {...(works[index].blurDataURL2
                    ? {
                        placeholder: "blur" as const,
                        blurDataURL: works[index].blurDataURL2,
                      }
                    : {})}
                />
              </motion.div>
            </React.Fragment>
          );
        })}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-24">
          <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent text-center">
            works
          </h2>
          <p className="text-lg md:text-xl mt-2 font-power-grotesk text-[#D9D9D9] text-center">
            that proves creativity means business
          </p>
          <p className="text-[#D9D9D9] font-mono mt-24 text-center max-w-2xl mx-auto">
            Here&apos;s a glimpse into the brands we&apos;ve helped shape. Each
            project is the result of sharp thinking, fresh ideas, and close
            collaboration.
          </p>
        </div>

        <div>
          {works.map((item, index) => (
            <Link
              key={index}
              href={`/projects/${item.slug}`}
              className="group relative overflow-hidden block"
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
                  <h3 className="text-2xl md:text-3xl font-normal font-power-grotesk text-[#D9D9D9]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#D9D9D9] group-hover:text-white transition-colors duration-300 font-power-grotesk">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#F15A24] transform origin-center scale-y-0 transition-transform duration-[400ms] ease-in-out group-hover:scale-y-100" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/projects"
            className="inline-flex items-center text-[#D9D9D9] font-mono hover:text-white transition-colors duration-300 text-lg"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
