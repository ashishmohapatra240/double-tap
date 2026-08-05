import localFont from "next/font/local";

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

/**
 * Deliberately bare. Site chrome (globals.css, Lenis smooth scroll, ScrollToTop)
 * lives in app/(site)/layout.tsx so that /studio renders Sanity Studio without
 * inheriting it — globals.css in particular applies `content-visibility` to every
 * <section>, which clips the Studio UI.
 */
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
      <body>{children}</body>
    </html>
  );
}
