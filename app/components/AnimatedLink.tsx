import React from 'react';
import Link from 'next/link';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} className="group relative overflow-hidden font-mono text-sm">
      <span className="inline-block transition duration-500 ease-out group-hover:-translate-y-[120%] text-gray-400">
        {children}
      </span>
      <span className="absolute left-0 inline-block translate-y-[120%] text-white transition duration-500 ease-out group-hover:translate-y-0">
        {children}
      </span>
    </Link>
  );
}; 