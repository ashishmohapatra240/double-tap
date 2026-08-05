"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <section className="py-20 bg-black text-white relative min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-7xl md:text-8xl font-normal font-power-grotesk text-[#F15A24] mb-8">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
                        Case Study Not Found
                    </h2>
                    <p className="text-lg text-white font-mono mb-12 max-w-2xl mx-auto">
                        The case study you&apos;re looking for doesn&apos;t exist. Please check the URL or browse our available case studies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center text-[#F15A24] font-mono hover:text-white transition-colors duration-300 text-lg"
                        >
                            View All Case Studies
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center text-[#F15A24] font-mono hover:text-white transition-colors duration-300 text-lg"
                        >
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 