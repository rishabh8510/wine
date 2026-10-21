import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[560px] w-full overflow-hidden">
      {/* Background image: public/vineyard.jpg me rakho */}
      <Image
        src="/images/hero-main.svg"
        alt="Vineyard aerial view"
        fill
        priority
        className="object-cover"
      />

      {/* Upar halka white fade taaki transparent header clean dikhe */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/80 to-transparent" />

      {/* Quote text */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1 className="max-w-3xl text-center font-serif text-4xl leading-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
          &ldquo;The vineyard links together our three passions&mdash; family,
          land and wine.&rdquo;
        </h1>
      </div>
    </section>
  );
}