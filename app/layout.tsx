import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
const spaceMono = localFont({
  src: "../public/font/SpaceMono-Regular.ttf",
  variable: "--font-space-mono",
});

const powerGrotesk = localFont({
  src: "../public/font/PowerGrotesk-Regular.ttf",
  variable: "--font-power-grotesk",
});

export const metadata = {
  title: "Double Tap | Almost There",
  description: "Double Tap - Creative Direction & Strategic Brand Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${powerGrotesk.variable}`}
    >
      <body>
        {" "}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
