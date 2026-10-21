import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-125 w-full items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/aboutbg.svg"
        alt="Vineyard aerial view"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay - text clear karne ke liye */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Content - Perfectly Centered */}
      <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-6 text-center mt-30">
        
        {/* Small Top Text */}
        <span className="mb-3 font-sans text-sm font-medium tracking-wider text-white/90 md:text-base">
          About Us
        </span>

        {/* Main Heading - 7xl size */}
        <h1 className="mb-6 font-serif text-4xl leading-tight text-white drop-shadow-lg sm:text-5xl">
          Rooted in Family. Grown with Purpose.
        </h1>

        {/* Paragraph Text */}
        <p className="max-w-4xl font-serif text-base leading-relaxed text-white/90 drop-shadow-md sm:text-lg lg:text-xl">
          Our family took over as caretakers of Griffin&apos;s Lair in 2018. We represent three generations committed to growing high-quality fruit and working with world class winemakers to produce outstanding wines.
        </p>

      </div>
    </section>
  );
}