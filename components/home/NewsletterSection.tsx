// components/NewsletterSection.jsx
// Install: npm i react-icons
// Image: public/images/newsletter-bg.svg

import Image from "next/image";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function NewsletterSection() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-6 text-[#3A322C] lg:py-10`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner with background image */}
        <div className="relative flex min-h-[300px] items-center p-4 sm:min-h-[340px] sm:p-6 lg:min-h-[380px] lg:p-10">
          <Image
            src="/images/newsletter-bg.svg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
            priority
          />

          {/* White card */}
          <div className="relative z-10 w-full bg-white p-5 sm:p-7 lg:w-[46%] lg:p-8">
            <h2 className="text-2xl font-normal sm:text-3xl lg:text-4xl">
              Stay Connected
            </h2>

            <p className="mt-3 text-sm leading-snug sm:text-base lg:mt-4 lg:text-lg lg:leading-snug">
              Sign up for our newsletter and discover the world of Griffin’s
              Lair. Be the first to hear about new releases, vineyard stories,
              seasonal updates, and special offerings from our family to yours.
            </p>

            <a
              href="#"
              className="mt-5 inline-flex items-center gap-3 bg-[#B9A383] px-4 py-2 text-xs text-white transition-colors hover:bg-[#a89170] sm:gap-4 sm:px-5 sm:py-2.5 sm:text-sm lg:mt-6"
            >
              Sign Up
              <HiOutlineArrowLongRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}