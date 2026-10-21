import Link from "next/link";
import Image from "next/image";

function LearnMore({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mt-4 inline-flex items-center gap-3 bg-[#BBA27E] px-4 py-2 font-serif text-[11px] text-white transition-colors hover:bg-[#a98f6b]"
    >
      Learn More
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

function GrapeOutline() {
  const circles = [
    [20, 10], [32, 10], [44, 10],
    [14, 22], [26, 22], [38, 22], [50, 22],
    [20, 34], [32, 34], [44, 34],
    [26, 46], [38, 46],
    [32, 58],
  ];
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      stroke="#BBA27E"
      strokeWidth="1"
      className="pointer-events-none absolute -left-12 -top-4 hidden h-28 w-24 opacity-30 sm:block"
      aria-hidden="true"
    >
      {circles.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />
      ))}
      <path d="M32 58v14M32 72c4-2 8-2 12 0" />
    </svg>
  );
}

export default function Vineyard() {
  return (
    <>
      {/* ===== Vineyard + About Us ===== */}
      <section className="bg-[#EFE6DC] px-6 pb-12 pt-32 text-[#3E342D] sm:px-10 lg:px-[5%] lg:pb-14 lg:pt-36">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[1.9fr_1fr] lg:gap-x-[8%]">
          {/* Left */}
          <div>
            <div className="relative lg:pl-[24%]">
              <GrapeOutline />
              <h2 className="font-serif text-[34px] italic leading-tight sm:text-[38px]">
                Vineyard
              </h2>
              <p className="mt-1 max-w-[300px] font-serif text-[16px] leading-snug">
                Learn about the history, geography and climate of Griffin&rsquo;s
                Lair.
              </p>
              <LearnMore href="/" />
            </div>

            <div className="relative mt-8 aspect-[507/273] w-full overflow-hidden lg:mt-10">
              <Image
                src="/images/vineyard-first.svg"
                alt="Two people inspecting grapes in the vineyard"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="relative aspect-[270/244] w-full overflow-hidden">
              <Image
                src="/images/vineyard-second.svg"
                alt="Ripe grape cluster on the vine"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-10 lg:mt-[38px]">
              <h2 className="font-serif text-[34px] italic leading-tight sm:text-[38px]">
                About Us
              </h2>
              <p className="mt-1 font-serif text-[16px] leading-snug">
                Meet the three generations behind Griffin&rsquo;s Lair.
              </p>
              <LearnMore href="/about" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}