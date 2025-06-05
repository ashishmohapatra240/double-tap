import Link from "next/link";
// import Image from "next/image";

interface ButtonProps {
  href: string;
  label: string;
  className?: string;
}

export default function Button({ href, label, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center justify-between border-t border-b border-black py-3 px-4 gap-4 overflow-hidden ${className} font-power-grotesk text-white border-gray-500`}
    >
      <span className="font-mono uppercase text-sm relative z-10">{label}</span>
      {/* <Image
        src="/icons/upper-right-arrow-black.svg"
        alt="Arrow right"
        width={12}
        height={12}
        className="relative z-10"
      /> */}
      <div className="absolute inset-0 bg-[#F15A24] pointer-events-none transform origin-center scale-y-0 transition-transform duration-[400ms] ease-in-out group-hover:scale-y-100"/>
    </Link>
  );
}
