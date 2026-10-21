import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

type FeatureListBannerProps = {
  title: string;
  links?: { label: string; href: string }[];
  image: string;
  imageAlt?: string;
  decoration?: string;
  reverse?: boolean;
};

export default function FeatureListBanner({
  title,
  links = [],
  image,
  imageAlt = "",
  decoration,
  reverse = false,
}: FeatureListBannerProps) {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-6 text-[#3A322C] lg:py-10`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center ${
            reverse ? "lg:grid-cols-[63fr_37fr]" : "lg:grid-cols-[37fr_63fr]"
          }`}
        >
          {/* Image: card se lambi, upar-neeche nikli hui */}
          <Link
            href={links[0]?.href || "/wine-overview"}
            className={`relative aspect-[4/3] w-full lg:aspect-[94/100] ${
              reverse ? "lg:order-2" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1280px) 450px, (min-width: 1024px) 37vw, 100vw"
              className="object-cover"
            />
          </Link>

          {/* Card */}
          <div
            className={`relative flex min-h-[220px] flex-col justify-center gap-6 overflow-hidden bg-[#F8F4EC] px-6 py-10 sm:px-10 lg:min-h-[340px] lg:flex-row lg:items-center lg:gap-12 lg:px-20 ${
              reverse ? "lg:order-1" : ""
            }`}
          >
            {decoration && (
              <Image
                src={decoration}
                alt=""
                width={160}
                height={160}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 left-[38%] hidden h-28 w-auto lg:block"
              />
            )}

            <h2 className="relative text-2xl font-normal sm:text-3xl lg:text-4xl">
              {title}
            </h2>

            {/* patli line: bachi hui jagah bhar leti hai */}
            <span
              className="hidden h-px flex-1 bg-[#E5DCCD] lg:block"
              aria-hidden="true"
            />

            <ul className="relative flex flex-col gap-4 lg:gap-6">
              {links.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-base sm:text-lg lg:text-xl"
                  >
                    {item.label}
                    <HiOutlineArrowLongRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}