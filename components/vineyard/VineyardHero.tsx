import Image from "next/image";

export default function VineyardHero() {
  return (
    <section className="relative flex min-h-125 w-full items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/vineyard-bg.webp"
        alt="Vineyard aerial view"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay - text clear karne ke liye */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Content - Perfectly Centered */}
      <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center px-6 text-center mt-30">
    

        {/* Main Heading - 7xl size */}
        <h1 className="mb-6 font-serif text-4xl leading-tight text-white drop-shadow-lg sm:text-5xl">
          The Vineyard
        </h1>

      </div>
    </section>
  );
}