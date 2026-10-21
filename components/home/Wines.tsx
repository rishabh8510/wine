// components/WinesSection.jsx
// Image: public/images/wine-bottle.png  (apni image ka naam yahan badal lena)

import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function Wines() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-12 text-[#3A322C] lg:py-20`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* LEFT: bottle */}
        <div className="flex justify-center">
          <Image
            src="/images/wine.svg"
            alt="Adobe Road Sauvignon Blanc 2024"
            width={320}
            height={1000}
            priority
            className="h-[360px] w-auto object-contain sm:h-[440px] lg:h-[520px]"
          />
        </div>

        {/* RIGHT: text */}
        <div className="max-w-xl">
          <h2 className="text-3xl font-normal italic sm:text-4xl">Wines</h2>

          <p className="mt-2 text-base leading-snug sm:text-lg">
            From inception through the 2020 vintage, Griffin’s Lair has been an
            agricultural focused vineyard selling our fruit to some of the most
            well known Pinot Noir and Syrah winemakers in Sonoma and Napa. 2020
            will mark an important milestone for Griffin’s Lair as we set out on
            a new journey of making wine! We will be making both a Pinot Noir as
            well as Syrah and a Rosé will be available for each and we are
            considering an experimental surprise. Expect the Rosé in 2021, the
            Pinot Noir in 2023 and the Syrah in 2024.
          </p>

          <a
            href="#"
            className="mt-5 inline-flex items-center gap-4 bg-[#B9A383] px-4 py-1.5 text-xs text-white transition-colors hover:bg-[#a89170]"
          >
            Learn More
            <svg
              className="h-2 w-4"
              viewBox="0 0 16 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M0 4h15M12 1l3 3-3 3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}