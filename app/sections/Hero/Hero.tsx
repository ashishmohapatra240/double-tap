"use client";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen h-dvh bg-[#DADADA] flex flex-col ">
      <div className="flex-1 flex items-center justify-center max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-6xl font-normal text-center mx-auto font-power-grotesk">
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("address")}
          >
            at
          </span>{" "}
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("about")}
          >
            double tap
          </span>{" "}
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("team")}
          >
            we
          </span>{" "}
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("what-we-do")}
          >
            let
          </span>{" "}
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("careers")}
          >
            our
          </span>{" "}
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("works")}
          >
            work
          </span>{" "}
          <span
            className="cursor-pointer hover:font-bold hover:text-[#F15A24] transition-all duration-300"
            onClick={() => scrollToSection("contact")}
          >
            speak
          </span>
        </h1>
      </div>
    </section>
  );
}
