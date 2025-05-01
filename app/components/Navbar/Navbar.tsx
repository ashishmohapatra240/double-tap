import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center max-w-7xl mx-auto py-8 px-4 md:px-0">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Double Tap Logo"
          width={200}
          height={100}
          quality={100}
          className="w-auto h-[24px] md:h-[30px]"
        />
      </Link>

      <button className="focus:outline-none" aria-label="Menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12H21"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 6H21"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 18H21"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
