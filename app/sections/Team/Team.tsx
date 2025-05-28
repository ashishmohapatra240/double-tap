"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Team() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const featuredMembers = [
    {
      id: 1,
      name: "Priyaranjan",
      image: "/images/team/priyaranjan.png",
      description: `A visionary co-founder and Creative Director, Priyaranjan brings a wealth of experience and a bold creative spirit to the company. With formative stints at renowned agencies like Saatchi & Saatchi and Xpand, he has mastered the art of crafting compelling visual narratives and strategic brand solutions. His passion for fresh ideas and fearless approach to creativity keep our engine running. A rare blend of artistic flair and strategic insight, Priyaranjan consistently delivers work that not only meets but surpasses industry benchmarks.`,
    },
    {
      id: 2,
      name: "Lata",
      image: "/images/team/lata.png",
      description: `With a law background from HNLU and experience in corporate law, Lata dedicated the past eight years to working with numerous brands & helping them realise their branding potential. Her core competencies lie in brand communications, strategic planning, marketing campaign development, perception management, and brand identity building and development. A highlight of her expertise is crafting compelling brand narratives and effective strategies that help build brand visibility. `,
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Geetesh",
      designation: "Creative Lead",
      image: "/images/team/sailesh.png",
      description: `The pixel-perfectionist who bring ideas to life. Leads the creative team with calm, class, and colour codes. Responsible? Yes. Boring? Never.`,
    },
    {
      id: 2,
      name: "Sailesh",
      designation: "Senior Project Manager",
      image: "/images/team/sailesh.png",
      description: `The heartbeat of the room. Laughs loud, works louder. Juggles timelines, tasks, and team moods like a pro. If it's crazy, it's probably his idea (and we love it).`,
    },
    {
      id: 3,
      name: "Jyoti",
      designation: "Project Management Lead",
      image: "/images/team/jyoti.png",
      description: `Keeps the crew sailing smooth, no matter the storm. Balances people, projects, and pizza orders with ease. Leads with heart, delivers with hustle.`,
    },
    {
      id: 4,
      name: "Divya",
      designation: "Graphic Designer",
      image: "/images/team/jyoti.png",
      description: `Silent on Slack, loud on the canvas. He won't say much, but his designs say it all. First to stay back, last to miss the fun.`,
    },
    {
      id: 5,
      name: "Smita",
      designation: "Graphic Designer",
      image: "/images/team/jyoti.png",
      description: `The only lady in the creative den. Punctuality and talent? She's got both, no contest.`,
    },
    {
      id: 6,
      name: "Abhinash",
      designation: "Motion Editor",
      image: "/images/team/sailesh.png",
      description: `Quick with the cuts, sharper with the trends. He's the motion pro and forever mom-approved.`,
    },
    {
      id: 7,
      name: "Justin",
      designation: "3D artist and CGI Editor ",
      image: "/images/team/sailesh.png",
      description: `Breathes life into the unreal. Camera loves him almost as much as his renders do.`,
    },
    {
      id: 8,
      name: "Priyasmita",
      designation: "Content Writer",
      image: "/images/team/jyoti.png",
      description: `Runs on coffee, powered by music, and writing that's as smooth as her playlist.`,
    },
    {
      id: 9,
      name: "Debjani",
      designation: "Project Manager Associate",
      image: "/images/team/jyoti.png",
      description: `Fidget queen with a to-do list in hand. She's all heart, all hustle, all precision. Also doubles up as our default model.`,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Only animate on desktop
    if (!isMobile) {
      memberRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            width: activeTeamMember === index ? "30%" : "10%",
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      });
    }

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTeamMember, isMobile]);

  const handleMemberHover = (index: number) => {
    if (!isMobile && index !== activeTeamMember) {
      gsap.to(memberRefs.current[index], {
        width: "15%",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMemberLeave = (index: number) => {
    if (!isMobile && index !== activeTeamMember) {
      gsap.to(memberRefs.current[index], {
        width: "10%",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <section>
      <div className="bg-black">
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 md:px-8 py-16 md:pt-20">
          <h2 className="font-power-grotesk text-white">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold">
              We
            </span>{" "}
            <span className="text-xl md:text-2xl lg:text-3xl">
              are a passionate mix of storytellers.
            </span>{" "}
          </h2>
          <p className="text-white/60 font-mono max-w-xl mx-auto mt-4 text-center">
            A dynamic collective of designers, writers, strategists and doers.
            United by passion, driven by purpose, and fueled by good coffee.
          </p>
        </div>
        {/* Upper section - Two featured team members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-7xl mx-auto px-6 md:px-8">
          {featuredMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row gap-6">
              {/* Image on left side */}
              <div className="w-full md:w-1/2 aspect-square relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content on right side */}
              <div className="w-full md:w-1/2">
                <h3 className="text-xl md:text-2xl font-power-grotesk mb-4 text-white">
                  {member.name}
                </h3>
                <p className="font-mono text-xs md:text-sm text-white/60">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-black">
          <div className="flex flex-col py-20 md:py-40 px-6 md:px-40 md:flex-row md:items-end">
            {/* Mobile: 3x3 Grid Layout */}
            <div className="grid grid-cols-3 gap-2 w-full mb-8 md:hidden">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="cursor-pointer relative h-32 sm:h-40"
                  onClick={() => setActiveTeamMember(index)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Active member indicator */}
                  {activeTeamMember === index && (
                    <div className="absolute inset-0 border-2 border-white"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal Layout */}
            <div className="hidden md:flex md:flex-row gap-2 w-full md:w-3/4 h-[300px] mb-8 md:mb-0 overflow-hidden">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={(el: HTMLDivElement | null) => {
                    memberRefs.current[index] = el;
                  }}
                  className="cursor-pointer relative h-full transition-all duration-300"
                  onClick={() => setActiveTeamMember(index)}
                  onMouseEnter={() => handleMemberHover(index)}
                  onMouseLeave={() => handleMemberLeave(index)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs md:text-sm font-power-grotesk">
                      {member.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={contentRef} className="w-full md:w-1/3 md:pl-8 lg:pl-16">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`${
                    activeTeamMember === index ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-row gap-2 items-end">
                    <h3 className="text-xl md:text-2xl font-power-grotesk mb-2 text-white">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs md:text-md text-white/60 mb-2">
                      ({member.designation})
                    </p>
                  </div>

                  <p className="font-mono text-xs md:text-sm text-white/60 max-w-md">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
