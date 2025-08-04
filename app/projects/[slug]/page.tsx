"use client";
import React from "react";
import { works } from "@/data/works";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ServiceChips from "@/components/ServiceChips/ServiceChips";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = works.find((work) => work.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-20 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-500 font-mono mb-8 hover:text-white transition-colors duration-300"
          >
            ← Back to Case Studies
          </Link>

          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-normal font-power-grotesk text-[#F15A24] mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl font-power-grotesk text-white mb-6">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-12">
            <div>
              <ServiceChips services={project.services} />
            </div>
            {/* <div>
              <h3 className="text-lg font-mono text-[#F15A24] mb-2">Client</h3>
              <p className="text-white font-power-grotesk">{project.client}</p>
            </div> */}

          </div>
        </motion.div>

        {/* Project Images */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="relative">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src={project.image2}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Goal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
            Goal
          </h2>
          <p className="text-lg text-gray-400 font-mono leading-relaxed">
            {project.goal}
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
            Problem Statement
          </h2>
          <p className="text-lg text-gray-400 font-mono leading-relaxed">
            {project.problemStatement}
          </p>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
            Our Approach
          </h2>
          <p className="text-lg text-gray-400 font-mono leading-relaxed">
            {project.approach}
          </p>
        </motion.div>

        {/* What We Did */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
            What We Did
          </h2>
          <ul className="space-y-4">
            {project.whatWeDid.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="text-gray-400 font-mono text-lg">●</span>
                <p className="text-lg text-gray-400 font-mono leading-relaxed flex-1">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Mediums Used */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
            Mediums Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.mediumsUsed.map((medium, index) => (
              <span
                key={index}
                className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full font-mono border border-gray-700"
              >
                {medium}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-normal font-power-grotesk text-white mb-6">
            Results
          </h2>
          <p className="text-lg text-gray-400 font-mono leading-relaxed">
            {project.results}
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="border-t border-gray-600 pt-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-500 font-mono hover:text-white transition-colors duration-300"
          >
            ← Back to Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}