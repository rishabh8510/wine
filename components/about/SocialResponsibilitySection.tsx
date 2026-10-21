import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const logos = [
  { src: "/images/logo-1.svg", alt: "Bay Area Discovery Museum" },
  { src: "/images/logo-2.svg", alt: "CASA for Children, Sonoma County" },
  { src: "/images/logo-3.svg", alt: "Giant Steps Therapeutic Equestrian Center" },
  { src: "/images/logo-4.svg", alt: "Boys & Girls Clubs of San Francisco" },
  { src: "/images/logo-5.svg", alt: "San Francisco Zoo & Gardens" },
  { src: "/images/logo-6.svg", alt: "Friends of the Urban Forest" },
];

export default function SocialResponsibilitySection() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-12 text-[#3A322C] lg:py-20`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="relative mx-auto max-w-3xl text-center">
          <Image
            src="/images/grap-1.svg"
            alt=""
            width={100}
            height={180}
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-0 hidden h-44 w-auto xl:block"
          />
          <Image
            src="/images/grap-2.svg"
            alt=""
            width={100}
            height={180}
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-0 hidden h-44 w-auto xl:block"
          />

          <h2 className="text-3xl font-normal italic sm:text-4xl lg:text-5xl">
            Social Responsibility
          </h2>
          <p className="mt-3 text-base leading-snug sm:text-lg lg:text-xl lg:leading-snug">
            We proudly support our local community by directing Griffin’s Lair
            profits to charities and dedicating our time to causes that support
            education, children, animals, and the environment.
          </p>
        </div>

        {/* Logo cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="relative aspect-[16/7] w-full"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}