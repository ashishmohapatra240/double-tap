"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatedLink } from "../AnimatedLink";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function Navbar({
  startAnimation = false,
}: {
  startAnimation?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const menuItems = [
    { label: "home", href: "/" },
    { label: "about us", href: "#about" },
    { label: "work", href: "#works" },
    { label: "team", href: "#team" },
    { label: "address", href: "#address" },
    { label: "join us", href: "#careers" },
    { label: "contact", href: "#contact" },
  ];

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, {
        y: "-100%",
      });
    }
  }, []);

  // Add hover animations to menu items
  useEffect(() => {
    menuItemRefs.current.forEach((ref) => {
      if (ref) {
        ref.addEventListener("mouseenter", () => {
          gsap.to(ref, {
            color: "#FFFFFF",
            scale: 1.1,
            rotation: 3,
            fontWeight: 700,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        ref.addEventListener("mouseleave", () => {
          gsap.to(ref, {
            color: "#000000",
            scale: 1,
            rotation: 0,
            fontWeight: 400,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });
  }, []);


  useEffect(() => {
    const menu = menuRef.current;
    const navItems = navItemsRef.current;
    const socialLinks = socialLinksRef.current;

    if (!menu || !navItems || !socialLinks) return;

    if (isMenuOpen) {
      gsap.to(menu, {
        y: 0,
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.fromTo(
        navItems.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        socialLinks.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.6,
        }
      );
    } else {
      gsap.to(menu, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (startAnimation) {
      gsap.fromTo(
        logoRef.current,
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        menuButtonRef.current,
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.3,
        }
      );
    }
  }, [startAnimation]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center mx-auto py-8 px-6 lg:px-20">
        <div ref={logoRef} className="opacity-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={100}
              className="w-auto h-[24px] md:h-[30px]"
            />
          </Link>
        </div>

        <motion.button
          ref={menuButtonRef}
          className="focus:outline-none relative w-6 h-6 opacity-0"
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <motion.path
              d="M4 6H20"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="white"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
              }}
              transition={{ duration: 0.4, ease: "backOut" }}
            />
            <motion.path
              d="M4 12H20"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="white"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scale: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.path
              d="M4 18H20"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="white"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
              }}
              transition={{ duration: 0.4, ease: "backOut" }}
            />
          </svg>
        </motion.button>
      </div>

      <div ref={menuRef} className="fixed inset-0 bg-[#FF5C28] z-40">
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="text-center" ref={navItemsRef}>
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                ref={(el) => {
                  if (el) {
                    menuItemRefs.current[index] = el;
                  }
                }}
                className="block text-4xl md:text-5xl font-normal my-4 font-power-grotesk cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-8 absolute bottom-8" ref={socialLinksRef}>
            <AnimatedLink
              href="https://instagram.com"
              className="text-black/50 hover:text-black"
            >
              Instagram
            </AnimatedLink>
            <AnimatedLink
              href="https://linkedin.com"
              className="text-black/50 hover:text-black"
            >
              LinkedIn
            </AnimatedLink>
          </div>
        </div>
      </div>
    </>
  );
}
