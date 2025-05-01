"use client";
import { useState } from "react";
import Image from "next/image";

export default function Team() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  const featuredMembers = [
    {
      id: 1,
      name: "Priyaranjan",
      image: "/images/team/priyaranjan.png",
      description: `Design is the cornerstone of effective communication and problem-solving. It distills complexity into simplicity, making information more accessible and experiences more intuitive. Whether it's a logo, a website, or a piece of furniture, thoughtful design has the power to captivate, inspire, and connect with people on a deeper level, enriching their lives in countless ways.Design is the cornerstone of effective communication and problem-solving. It distills complexity into simplicity, making information more accessible and experiences more intuitive.`,
    },
    {
      id: 2,
      name: "Lata",
      image: "/images/team/lata.png",
      description: `Design is the cornerstone of effective communication and problem-solving. It distills complexity into simplicity, making information more accessible and experiences more intuitive. Whether it's a logo, a website, or a piece of furniture, thoughtful design has the power to captivate, inspire, and connect with people on a deeper level, enriching their lives in countless ways.Design is the cornerstone of effective communication and problem-solving. It distills complexity into simplicity, making information more accessible and experiences more intuitive.`,
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Jyoti",
      image: "/images/team/jyoti.png",
      description: `Jyoti is a creative force to be reckoned with. With a keen eye for detail and a passion for innovative design, she brings a unique perspective to every project she touches.`,
    },
    {
      id: 2,
      name: "Sailesh",
      image: "/images/team/sailesh.png",
      description: `Sailesh is a master of his craft, with a deep understanding of the latest technologies and trends. His dedication to delivering high-quality solutions is unmatched.`,
    },
    {
      id: 3,
      name: "Jyoti",
      image: "/images/team/jyoti.png",
      description: `Jyoti's infectious enthusiasm and collaborative spirit make her a joy to work with. Her ability to distill complex ideas into simple, actionable insights is a valuable asset to the team.`,
    },
    {
      id: 4,
      name: "Sailesh",
      image: "/images/team/sailesh.png",
      description: `Sailesh's analytical mind and problem-solving skills are second to none. He approaches each challenge with a logical and methodical approach, ensuring that every solution is both effective and efficient.`,
    },
    {
      id: 5,
      name: "Jyoti",
      image: "/images/team/jyoti.png",
      description: `Jyoti's passion for learning and growth is inspiring. She is always seeking out new opportunities to expand her skillset and stay at the forefront of industry developments.`,
    },
    {
      id: 6,
      name: "Sailesh",
      image: "/images/team/sailesh.png",
      description: `Sailesh's calm and composed demeanor under pressure is a valuable asset to the team. His ability to remain focused and deliver under tight deadlines is a testament to his exceptional work ethic.`,
    },
  ];

  return (
    <section className="text-white">
      <div className="bg-white py-16 md:py-24">
        {/* Upper section - Two featured team members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-7xl mx-auto px-6 md:px-8">
          {featuredMembers.map((member) => (
            <div key={member.id} className="flex flex-col md:flex-row gap-6">
              {/* Image on left side */}
              <div className="w-full md:w-1/2 aspect-square bg-blue-700 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content on right side */}
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl md:text-5xl font-power-grotesk mb-4 text-black">
                  {member.name}
                </h3>
                <p className="font-mono text-xs md:text-sm text-black">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-black">
          <div className="flex flex-col md:flex-row py-20 px-6 md:px-40 items-end">
            <div className="flex flex-row gap-1 md:gap-2 w-full md:w-3/4 h-[300px] md:h-[400px] mb-8 md:mb-0 overflow-x-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`cursor-pointer transition-all duration-500 ease-in-out relative h-full ${
                    activeTeamMember === index
                      ? "flex-grow"
                      : "flex-shrink-0 w-8 sm:w-12 md:w-28"
                  }`}
                  onClick={() => setActiveTeamMember(index)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Active team member details - positioned at bottom right */}
            <div className="self-end md:w-1/3 md:pl-8 lg:pl-16">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`${
                    activeTeamMember === index ? "block" : "hidden"
                  }`}
                >
                  <h3 className="text-3xl md:text-5xl font-power-grotesk mb-4">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs md:text-sm text-gray-300 max-w-md">
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
