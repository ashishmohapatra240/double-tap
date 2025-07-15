import Image from "next/image";

interface SocialLinkProps {
  href: string;
  label: string;
}

export default function SocialLink({ href, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#1A1A1A] text-white px-6 py-2 flex items-center gap-2 hover:opacity-80 transition-opacity font-mono"
    >
      {label}
      <Image
        src="/icons/upper-right-arrow.svg"
        alt="External link"
        width={16}
        height={16}
      />
    </a>
  );
} 