import Marquee from "react-fast-marquee";

export default function CustomMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[#1A1A1A] text-white py-10 font-space-mono">
      <Marquee speed={50}>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
        <span className="mx-4">*this site is under construction</span>
      </Marquee>
    </div>
  );
}
