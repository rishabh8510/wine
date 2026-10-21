import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

type FeatureBannerProps = {
  title: string;
  linkText: string;
  href?: string;
  image: string;
  imageAlt?: string;
  decoration?: string;
  reverse?: boolean;
};

export default function FeatureBanner({
  title,
  linkText,
  href = "#",
  image,
  imageAlt = "",
  decoration,
  reverse = false,
}: FeatureBannerProps) {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-6 text-[#3A322C] lg:py-10`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center ${
            reverse ? "lg:grid-cols-[37fr_63fr]" : "lg:grid-cols-[63fr_37fr]"
          }`}
        >
          {/* Card */}
          <div
            className={`relative flex min-h-[220px] flex-col justify-center gap-5 overflow-hidden bg-[#F8F4EC] px-6 py-10 sm:px-10 lg:min-h-[340px] lg:flex-row lg:items-center lg:gap-11 lg:px-20 ${
              reverse ? "lg:order-2" : ""
            }`}
          >
            {decoration && (
              <Image
                src={decoration}
                alt=""
                width={120}
                height={170}
                aria-hidden="true"
                className="pointer-events-none absolute left-[38%] top-0 hidden h-36 w-auto lg:block"
              />
            )}

            <h2 className="relative text-4xl font-normal sm:text-5xl">
              {title}
            </h2>

            <span
              className="hidden h-px bg-[#E5DCCD] lg:block lg:w-40 xl:w-48"
              aria-hidden="true"
            />

            {/* after:inset-0 => poora card clickable ho jata hai */}
            <Link
              href={href}
              className="inline-flex items-center gap-3 text-base after:absolute after:inset-0 after:content-[''] sm:text-lg"
            >
              {linkText}
              <HiOutlineArrowLongRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Image: card se thodi lambi, upar-neeche nikli hui */}
          <Link
            href={href}
            className={`relative aspect-[4/3] w-full lg:aspect-[94/100] ${
              reverse ? "lg:order-1" : ""
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
        </div>
      </div>
    </section>
  );
}