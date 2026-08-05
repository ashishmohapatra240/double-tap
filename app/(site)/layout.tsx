import "../globals.css";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import LenisProvider from "@/components/LenisProvider/LenisProvider";

export const metadata = {
  title: "Double Tap | Almost There",
  description: "Double Tap - Creative Direction & Strategic Brand Solutions",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      {/* React hoists these into <head>, so the GLBs start downloading alongside
          the initial HTML instead of waiting for the preloader to finish, the
          three.js chunk to arrive, and an IntersectionObserver to fire. Astriks is
          only 9.6KB and Logo.glb is 1.2MB, so both are worth having in cache
          before their canvas exists.

          `crossOrigin="anonymous"` is load-bearing, not boilerplate: three's
          FileLoader issues `new Request(url, { credentials: 'same-origin' })` in
          cors mode, and a preload without the attribute is no-cors/include. That
          mismatch makes the browser discard the preload and fetch again ("was
          preloaded but not used" in the console). Anonymous gives cors +
          same-origin, which matches exactly. */}
      <link
        rel="preload"
        href="/models/Astriks.glb"
        as="fetch"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/models/Logo.glb"
        as="fetch"
        crossOrigin="anonymous"
      />
      {children}
      <ScrollToTop />
    </LenisProvider>
  );
}
