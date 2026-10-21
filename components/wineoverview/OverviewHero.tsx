import Image from "next/image";

export default function OverviewHero() {
  return (
    <section className="relative flex min-h-125 w-full items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/wines-bg.svg" // Make sure this path is correct for your project
        alt="Wine glasses in vineyard"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay - darker on the left for text readability, similar to the image */}
      <div className="absolute inset-0 bg-[#433628BA]" />

      {/* Text Content - Left Aligned */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-start justify-center px-6 py-20 mx-auto sm:px-12 lg:px-16 mt-20">
        
        {/* Small Top Text */}
        <span className="mb-4 font-sans text-xs font-medium tracking-wide text-[#e8e6e1] sm:text-sm">
          Spring 2027
        </span>

        {/* Main Heading */}
        <h1 className="mb-6 font-serif text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl">
          Griffin&apos;s Lair Rose
        </h1>

        {/* Paragraph Text */}
        <p className="max-w-2xl font-serif text-base leading-relaxed text-[#e8e6e1] sm:text-lg md:text-xl">
          An exclusive selection of Griffin&apos;s Lair wines curated for our members.
        </p>

      </div>
    </section>
  );
}