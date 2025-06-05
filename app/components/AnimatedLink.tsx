import React from "react";
import Link from "next/link";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden font-mono text-sm ${className}`}
    >
      <span className="inline-block transition duration-500 ease-out group-hover:-translate-y-[120%] text-white/60">
        {children}
      </span>
      <span className="absolute left-0 inline-block translate-y-[120%] transition duration-500 ease-out group-hover:translate-y-0">
        {children}
      </span>
    </Link>
  );
};
