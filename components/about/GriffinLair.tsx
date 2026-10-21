import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

export default function GriffinLair() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-16`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        
        {/* LEFT: image — 50% */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/images/griifin.svg"
            alt="Grape clusters on the vine"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* RIGHT: content — 50% */}
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">
            Griffin’s Lair
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg lg:text-xl">
            Cold, windswept and unmistakably coastal — Griffin’s Lair wines are
            recognized for expressing the distinctive character of the Petaluma Gap.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 bg-[#B29A7E] px-5 py-2.5 text-sm text-white transition hover:bg-[#9a8468]">
            Read News
            <span aria-hidden="true">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}