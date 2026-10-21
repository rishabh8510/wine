"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

interface VintageData {
  vintageNotes: string;
  winegrowingNotes: string;
  availability: string;
  qtyProduced: string;
  harvestDate: string;
  status: string;
}

// Year ke hisaab se content. Baad me isko apne API / CMS se replace kar sakte ho.
const vintages: Record<string, VintageData> = {
  "2023": {
    vintageNotes:
      "The 2024 growing season for the Chardonnay vineyards in Knights Valley began with abundant rains from December through March which fully recharged the water profile in the soils, setting the stage for healthy vines and canopies. In combination with the rains, cooler than average temperatures delayed budbreak by two weeks compared to normal, but still two weeks earlier than the very late 2023 season. During flowering in late March and April, the weather was ideal, resulting in excellent fruit set. The remainder of spring was mild, with some heat in early July, then temperate weather in August and September, allowing a steady, unhurried harvest which began in Ma Belle-Fille on August 30th and completed October 4th in Belle Cote.",
    winegrowingNotes:
      "Point Rouge is the ‘tête de cuvée’ or top Chardonnay blend at Peter Michael Winery. Always the smallest of the blends, it exemplifies the essence of what is possible from our estate vineyards. Every barrel from each of the best vineyard blocks is evaluated with only the most exceptional having the ‘Point Rouge’ (“Red Dot”) designation bestowed upon them by the winemaker. These barrels are selected for their exceptional quality, richness, mouthfeel, structure and potential for long-term aging in the bottle.",
    availability: "March 1, 2027 — May 15, 2027",
    qtyProduced: "3 Wines Available",
    harvestDate: "March 1, 2027",
    status: "Open Now",
  },
  "2024": {
    vintageNotes: "2024 vintage notes yahan aayenge.",
    winegrowingNotes: "2024 winegrowing notes yahan aayenge.",
    availability: "March 1, 2028 — May 15, 2028",
    qtyProduced: "2 Wines Available",
    harvestDate: "March 1, 2028",
    status: "Coming Soon",
  },
};

const years: string[] = Object.keys(vintages);

export default function OverviewSection() {
  const [year, setYear] = useState<string>(years[0]);
  const data = vintages[year];

  const details: { label: string; value: string }[] = [
    { label: "Availability", value: data.availability },
    { label: "(Barrel) Qty Produced", value: data.qtyProduced },
    { label: "Harvest Date", value: data.harvestDate },
  ];

  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-14`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title + year select */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-5xl leading-tight sm:text-6xl">Overview</h1>

          <div className="relative shrink-0">
            <label htmlFor="year" className="sr-only">
              Select vintage year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setYear(e.target.value)}
              className="h-12 w-28 appearance-none border border-[#D8CCBB] bg-[#F8F4EC] pl-4 pr-10 font-sans text-sm outline-none focus:border-[#BBA37F] sm:w-36"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <HiChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[3fr_2fr] lg:gap-24">
          {/* LEFT: notes */}
          <div>
            <article>
              <h2 className="text-2xl sm:text-3xl">Vintage Notes</h2>
              <span className="mt-4 block h-px w-14 bg-[#CFC2B0]" aria-hidden="true" />
              <p className="mt-6 text-base leading-8 sm:text-lg sm:leading-9">
                {data.vintageNotes}
              </p>
            </article>

            <article className="mt-12 lg:mt-16">
              <h2 className="text-2xl sm:text-3xl">Winegrowing Notes</h2>
              <span className="mt-4 block h-px w-14 bg-[#CFC2B0]" aria-hidden="true" />
              <p className="mt-6 text-base leading-8 sm:text-lg sm:leading-9">
                {data.winegrowingNotes}
              </p>
            </article>
          </div>

          {/* RIGHT: details card */}
          <aside className="self-start bg-[#F8F4EC] px-6 py-10 sm:px-10 lg:py-14">
            <dl className="space-y-8 font-sans">
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs tracking-[0.2em] text-[#5B534B]">{item.label}</dt>
                  <dd className="mt-3 text-lg tracking-[0.14em] text-[#5B534B] sm:text-xl">
                    {item.value}
                  </dd>
                </div>
              ))}

              <div>
                <dt className="text-xs tracking-[0.2em] text-[#5B534B]">Status</dt>
                <dd className="mt-3 flex items-center gap-3 text-sm text-[#5B534B]">
                  <span className="h-2 w-2 rounded-full bg-[#BBA37F]" aria-hidden="true" />
                  {data.status}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}