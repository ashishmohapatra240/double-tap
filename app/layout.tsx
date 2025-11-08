import localFont from "next/font/local";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LenisProvider from "./components/LenisProvider/LenisProvider";

const spaceMono = localFont({
  src: "../public/font/SpaceMono-Regular.ttf",
  variable: "--font-space-mono",
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

const powerGrotesk = localFont({
  src: "../public/font/PowerGrotesk-Regular.ttf",
  variable: "--font-power-grotesk",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
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
        <LenisProvider>
          {children}
          <ScrollToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
