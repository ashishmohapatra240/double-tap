"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatedLink } from "../AnimatedLink";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "home", href: "/" },
    { label: "about us", href: "#about" },
    { label: "work", href: "#works" },
    { label: "team", href: "#team" },
    { label: "address", href: "#address" },
    { label: "join us", href: "#careers" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center max-w-6xl mx-auto py-8 px-6 md:px-0">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Double Tap Logo"
            width={200}
            height={100}
            quality={100}
            className="w-auto h-[24px] md:h-[30px]"
          />
        </Link>

        <button
          className="focus:outline-none relative w-6 h-6"
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <path
              d={isMenuOpen ? "M6 6L18 18" : "M4 12H20"}
              stroke={isMenuOpen ? "black" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
            <path
              d={isMenuOpen ? "M18 6L6 18" : "M4 6H20"}
              stroke={isMenuOpen ? "black" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out origin-center"
              transform={isMenuOpen ? "" : "translate(0, 6)"}
            />
            <path
              d={isMenuOpen ? "M18 6L6 18" : "M4 18H20"}
              stroke={isMenuOpen ? "black" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out origin-center"
              transform={isMenuOpen ? "translate(0, 12) scale(0)" : ""}
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-[#FF5C28] z-40 transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="text-center">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-4xl md:text-5xl font-light my-4 font-power-grotesk hover:font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-8 absolute bottom-8">
            <AnimatedLink href="https://instagram.com">Instagram</AnimatedLink>
            <AnimatedLink href="https://linkedin.com">LinkedIn</AnimatedLink>
          </div>
        </div>
      </div>
    </>
  );
}
