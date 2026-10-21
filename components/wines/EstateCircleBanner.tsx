import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function EstateCircleBanner() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-6 text-[#3A322C] lg:py-8`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner with background image */}
        <div className="relative overflow-hidden p-4 sm:p-6">
          <Image
            src="/images/banner.svg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
            priority
          />
          {/* soft cream wash so the text stays readable */}
          <div className="absolute inset-0 bg-[#EFE6DC]/30" />

          {/* Thin outlined box */}
          <div className="relative flex flex-col gap-5 border border-[#3A322C]/60 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 lg:py-7 backdrop-blur-sm">
            {/* Left: status + title */}
            <div>
              <span className="inline-flex items-center gap-1.5 border border-[#3A322C]/70 px-1.5 py-0.5 font-sans text-[10px] leading-none sm:text-xs">
                <span className="h-1 w-1 rounded-full bg-[#3A322C]" />
                Active
              </span>
              <h2 className="mt-3 text-2xl font-normal sm:text-3xl">
                Estate Circle
              </h2>
            </div>

            {/* Right: membership info */}
            <p className="self-start border border-[#3A322C]/60 px-3 py-2 font-sans text-[10px] leading-snug sm:self-auto sm:text-xs">
              Member since March 2024. Renews March 2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}