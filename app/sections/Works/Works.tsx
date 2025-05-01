"use client";
import React from "react";
import { works } from "@/data/works";

export default function Works() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-normal font-power-grotesk flex justify-center">
            our &nbsp;<span className="text-[#F15A24]">works</span>
          </h2>
        </div>

        <div>
          {works.map((item, index) => (
            <div
              key={index}
              className="border-t border-b border-white py-6 hover:bg-[#F15A24] hover:text-white transition-all duration-300"
            >
              <div className="px-6 flex flex-row gap-6 items-end">
                <h3 className="text-2xl md:text-3xl font-normal font-power-grotesk">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4D4D4D] font-power-grotesk">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
