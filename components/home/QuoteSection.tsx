import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function QuoteSection() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-16`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
        {/* LEFT: author + quote */}
        <div className="lg:col-span-3">
          <p className="inline-block border-b border-[#3A322C]/70 pb-1 text-sm sm:text-base">
            Cody Rasmussen, Desire Lines Wine Co.
          </p>

          <blockquote className="mt-5 max-w-2xl text-lg leading-snug sm:text-xl lg:text-2xl lg:leading-snug">
            “The energy of the vine is held in check by wind and no-till farming
            practices, producing a balanced canopy and loose, open clusters
            with tiny, thick-skinned berries; wines are naturally dense and
            firm, opening slowly, with blue and black fruits in the glass as
            vivid as the wine’s color.”
          </blockquote>
        </div>

        {/* RIGHT: image */}
        <div className="relative aspect-[4/3] w-full lg:col-span-2">
          <Image
            src="/images/quote.svg"
            alt="Vineyard with roses in the foreground"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}