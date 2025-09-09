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
      image: "/images/team/Priya.jpg",
      description: `The big-picture dreamer and our idea machine with a knack for turning “what ifs” into “wow.” From Saatchi & Saatchi to Xpand, he’s mastered the art of storytelling through visuals and vocals. Equal parts strategy and imagination, Priyaranjan is the co-founder whose spark keeps our creativity buzzing.`,
    },
    {
      id: 2,
      name: "Lata",
      image: "/images/team/Lata.jpg",
      description: `The strategist with a law degree in her pocket and brand stories in her heart. With years of building brands from the ground up, she’s the co-founder who brings clarity, campaigns, and communication that clicks. If it’s about making brands shine, she is already on it.`,
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Geetesh",
      designation: "Creative Lead",
      image: "/images/team/Geetesh.jpg",
      description: `The pixel-perfectionist who bring ideas to life. Leads the creative team with calm, class, and colour codes. Responsible? Yes. Boring? Never.`,
    },
    {
      id: 2,
      name: "Sailesh",
      designation: "Senior Project Manager",
      image: "/images/team/Sailesh.jpg",
      description: `The heartbeat of the room. Laughs loud, works louder. Juggles timelines, tasks, and team moods like a pro. If it's crazy, it's probably his idea (and we love it).`,
    },
    {
      id: 3,
      name: "Jyoti",
      designation: "Project Management Lead",
      image: "/images/team/Jyoti.jpg",
      description: `Keeps the crew sailing smooth, no matter the storm. Balances people, projects, and pizza orders with ease. Leads with heart, delivers with hustle.`,
    },
    {
      id: 4,
      name: "Dibya",
      designation: "Graphic Designer",
      image: "/images/team/Dibya.jpg",
      description: `Silent on Slack, loud on the canvas. He won't say much, but his designs say it all. First to stay back, last to miss the fun.`,
    },
    {
      id: 5,
      name: "Smita",
      designation: "Graphic Designer",
      image: "/images/team/Smita.jpg",
      description: `The only lady in the creative den. Punctuality and talent? She's got both, no contest.`,
    },
    {
      id: 6,
      name: "Abhinash",
      designation: "Motion Editor",
      image: "/images/team/Abhinash.jpg",
      description: `Quick with the cuts, sharper with the trends. He's the motion pro and forever mom-approved.`,
    },
    {
      id: 7,
      name: "Justin",
      designation: "3D artist and CGI Editor ",
      image: "/images/team/Justin.jpg",
      description: `Breathes life into the unreal. Camera loves him almost as much as his renders do.`,
    },
    {
      id: 8,
      name: "Priyasmita",
      designation: "Content Writer",
      image: "/images/team/Priyasmita.jpg",
      description: `Runs on coffee, powered by music, and writing that's as smooth as her playlist.`,
    },
    {
      id: 9,
      name: "Debjani",
      designation: "Project Manager Associate",
      image: "/images/team/Debjani.jpg",
      description: `Fidget queen with a to-do list in hand. She's all heart, all hustle, all precision. Also doubles up as our default model.`,
    },
    {
      id: 10,
      name: "Shuvam",
      designation: "Project Manager Associate",
      image: "/images/team/Shuvam.jpg",
      description: `Can smell biryani from two floors up. Always first to catch a trend or a deadline. Currently interning and definitely eating. `,
    },
    {
      id: 11,
      name: "Apurba",
      designation: "Lead Cinematographer",
      image: "/images/team/Apurb.jpg",
      description: `Speaks like a podcast on 2x speed. Sees stories where others see shadows. The seasoned eye that never misses. `,
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
    if (!isMobile) {
      memberRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            width: activeTeamMember === index ? "30%" : "10%",
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      });
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [activeTeamMember, isMobile]);

  const handleMemberHover = (index: number) => {
    if (!isMobile && index !== activeTeamMember) {
      gsap.to(memberRefs.current[index], {
        width: "15%",
        duration: 0.1,
        ease: "power2.inOut",
      });
    }
  };

  const handleMemberLeave = (index: number) => {
    if (!isMobile && index !== activeTeamMember) {
      gsap.to(memberRefs.current[index], {
        width: "10%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <section>
      <div className="bg-black">
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 md:px-8 py-16 md:pt-20">
          <div className="mb-4">
            <h2 className="text-7xl md:text-8xl font-normal font-power-grotesk bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent text-center">
              we
            </h2>
            <p className="text-lg md:text-xl mt-2 font-power-grotesk text-[#D9D9D9] text-center">
              are a passionate mix of storytellers.
            </p>
          </div>
          <p className="text-[#D9D9D9] font-mono max-w-2xl mx-auto mt-4 text-center">
            A dynamic collective of designers, writers, strategists and doers.
            United by passion, driven by purpose, and fueled by good coffee.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-7xl mx-auto px-6 md:px-8">
          {featuredMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative h-[360px] md:h-[520px] w-full md:w-1/2">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 md:h-[520px] md:flex md:flex-col md:justify-end">
                <h3 className="text-xl md:text-2xl font-power-grotesk mb-4 bg-gradient-to-r from-[#F15A24] to-[#fdc800] bg-clip-text text-transparent text-[#D9D9D9]">
                  {member.name}
                </h3>
                <p className="font-mono text-xs md:text-sm text-[#D9D9D9]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-black">
          <div className="flex flex-col py-20 md:py-40 px-6 md:px-40 md:flex-row md:items-end">
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
                  {activeTeamMember === index && (
                    <div className="absolute inset-0 border-2 border-white"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex md:flex-row gap-1 w-full md:w-3/4 h-[260px] mb-8 md:mb-0 overflow-hidden">
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
                    <p className="text-[#D9D9D9] text-xs md:text-xs font-power-grotesk">
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
                  <div className="flex flex-col">
                    <h3 className="text-xl md:text-3xl font-power-grotesk text-[#D9D9D9]">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs md:text-base text-[#D9D9D9]  mb-2">
                      {member.designation}
                    </p>
                  </div>

                  <p className="font-mono text-xs md:text-sm text-[#D9D9D9] max-w-md mt-1">
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
