import Image from "next/image";

export default function WineHero() {
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
          Griffin&apos;s Lair Vineyard
        </span>

        {/* Main Heading */}
        <h1 className="mb-6 font-serif text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl">
          Explore Our Wines
        </h1>

        {/* Paragraph Text */}
        <p className="max-w-2xl font-serif text-sm leading-relaxed text-[#e8e6e1] sm:text-base md:text-lg">
          Discover distinctive wines shaped by the cool climate and character of
          the Petaluma Gap, thoughtfully crafted from fruit grown on our family
          vineyard.
        </p>

      </div>
    </section>
  );
}