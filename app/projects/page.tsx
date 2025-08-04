"use client";
import React, { useRef, useEffect } from "react";
import { works } from "@/data/works";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Button from "@/components/Button/Button";
import ServiceChips from "@/components/ServiceChips/ServiceChips";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.fromTo(heroRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );

            // Create timeline for each project card
            const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

            cards.forEach((card) => {
                const imageContainer = card.querySelector(".project-image");
                const content = card.querySelector(".project-content");
                const services = card.querySelector(".project-services");

                // Initial state
                gsap.set([content, services], {
                    y: 30
                });
                gsap.set(imageContainer, {
                    scale: 1.05
                });

                // Create ScrollTrigger for each card
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    onEnter: () => {
                        const tl = gsap.timeline();
                        tl.to(imageContainer, {
                            scale: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        })
                            .to(content, {
                                y: 0,
                                duration: 0.5,
                                ease: "power2.out"
                            }, "-=0.3")
                            .to(services, {
                                y: 0,
                                duration: 0.4,
                                ease: "power2.out"
                            }, "-=0.2");
                    }
                });

                // Subtle scroll animations
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const yOffset = (1 - progress) * 20;
                        const scale = 0.98 + (progress * 0.02);

                        gsap.to(card, {
                            y: yOffset,
                            scale: scale,
                            duration: 0.3
                        });
                    }
                });

                // Subtle parallax effect for images
                if (imageContainer) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            gsap.to(imageContainer, {
                                y: progress * -10,
                                duration: 0.3
                            });
                        }
                    });
                }
            });

            // Parallax effect for background elements
            gsap.to(".bg-gradient", {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background gradient */}
            <div className="bg-gradient fixed inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F15A24] via-transparent to-transparent" />
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-[8rem] md:text-[12rem] font-normal font-power-grotesk text-[#F15A24] leading-none">
                            case
                        </h1>
                        <h1 className="text-[8rem] md:text-[12rem] font-normal font-power-grotesk text-white leading-none -mt-8">
                            studies
                        </h1>
                        <p className="text-2xl md:text-3xl mt-8 font-power-grotesk text-gray-400">
                            exploring our creative process
                        </p>
                        <div className="w-24 h-1 bg-[#F15A24] mx-auto mt-8" />
                        <p className="text-lg font-mono mt-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
                            Dive deep into our projects and discover how we transform ideas into
                            impactful brand experiences. Each case study reveals our creative process,
                            challenges overcome, and results achieved.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section ref={projectsRef} className="relative z-10 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-48">
                        {works.map((project, index) => (
                            <div key={project.id} className="project-card group">
                                <Link href={`/projects/${project.slug}`}>
                                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                                        {/* Project Image */}
                                        <div className={`project-image relative overflow-hidden rounded-2xl ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                            <div className="aspect-[4/3] relative">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                            </div>
                                        </div>

                                        {/* Project Content */}
                                        <div className={`project-content ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-5xl md:text-6xl font-normal font-power-grotesk text-white group-hover:text-[#F15A24] transition-colors duration-500 leading-tight">
                                                        {project.title}
                                                    </h2>
                                                    <p className="text-xl md:text-2xl text-gray-400 font-power-grotesk mt-4 leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                <div className="project-services">
                                                    <ServiceChips services={project.services} />
                                                </div>

                                                <div className="pt-6">
                                                    <Button
                                                        href={`/projects/${project.slug}`}
                                                        label="View Case Study"
                                                        className="w-full"
                                                        align="center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative z-10 py-32 border-t border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-4xl md:text-5xl font-power-grotesk text-white mb-6">
                        Ready to create your story?
                    </h3>
                    <p className="text-xl text-gray-400 font-mono mb-12">
                        Let&apos;s transform your ideas into impactful experiences
                    </p>
                    <div className="flex justify-center">
                        <Button
                            href="/"
                            label="Get in touch"
                            className="w-full max-w-md"
                            align="center"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
}