"use client";

// app/page.tsx  (Next.js App Router + TypeScript + Tailwind CSS)
// Images: public/images/
//   bottle.png, thumb-1.jpg, thumb-2.jpg, thumb-3.jpg, thumb-4.jpg

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Libre_Baskerville, Inter } from "next/font/google";
import { addToCart } from "@/lib/cart";

const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400"] });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

const IMAGES = [
  { src: "/images/wine-1.svg", alt: "Griffin Ridge Syrah bottle" },
  { src: "/images/wine-2.svg", alt: "Bottle on warm background" },
  { src: "/images/wine-3.svg", alt: "Two glasses of red wine" },
  { src: "/images/wine-4.svg", alt: "Bottle label and cork" },
  { src: "/images/wine-5.svg", alt: "Vineyard at sunset" },
];

const THUMBS = IMAGES.slice(1);

const ACCORDION = [
  {
    key: "tasting",
    title: "Tasting Notes",
    body: "Blackberry, olive tapenade and cracked black pepper, threaded with violet.",
  },
  {
    key: "winemaking",
    title: "Winemaking",
    body: "Hand-harvested, native fermentation, aged 14 months in French oak.",
  },
  {
    key: "vineyard",
    title: "Vineyard",
    body: "Our oldest Syrah block, dry-farmed on shallow clay loam.",
  },
  {
    key: "pairings",
    title: "Food Pairings",
    body: "Grilled lamb, smoked brisket, aged cheddar and wild mushroom risotto.",
  },
  {
    key: "shipping",
    title: "Shipping",
    body: "Ships within 2 business days. Complimentary shipping on six bottles or more.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function WineView() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [vintage, setVintage] = useState("2023");
  const [wished, setWished] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>("shipping");

  const handleAddToCart = () => {
    const isLogged =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    if (!isLogged) {
      router.push("/login");
      return;
    }

    addToCart({
      id: `griffin-ridge-syrah-${vintage}`,
      name: "Griffin Ridge Syrah",
      vintage,
      variety: "Syrah",
      sku: `GL-SY-${vintage}`,
      price: 74,
      qty,
      image: IMAGES[0].src || "/images/wine-1.svg",
    });
    router.push("/cart");
  };

  return (
    <main
      className={`${sans.className} min-h-screen  bg-[#EFE6DB] text-[#3a2f27]`}
    >
      {/* ===== TOP SECTION ===== */}
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 mt-30">
          {/* ---- Left: gallery ---- */}
          <div className="w-full">
            <div className="relative aspect-[9/10] w-full">
              <Image
                src={IMAGES[active].src}
                alt={IMAGES[active].alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={active === 0 ? "object-cover p-6 sm:p-10" : "object-cover"}
              />
            </div>

            <div className="mt-2.5 grid grid-cols-4 gap-2.5 sm:gap-3">
              {THUMBS.map((t, i) => {
                const idx = i + 1;
                return (
                  <button
                    key={t.src}
                    onClick={() => setActive(active === idx ? 0 : idx)}
                    className={`relative aspect-square w-full overflow-hidden transition ${
                      active === idx
                        ? "ring-1 ring-[#3a2f27]"
                        : "opacity-95 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={t.src}
                      alt={t.alt}
                      fill
                      sizes="(min-width: 1024px) 12vw, 25vw"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- Right: details ---- */}
          <div className="w-full">
            {/* meta + title + vintage select */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.14em] text-[#6b5d52] uppercase sm:text-[11px]">
                  2022 · Syrah · Red
                </p>
                <h1
                  className={`${serif.className} mt-3 text-3xl leading-tight font-normal tracking-tight text-[#3a2f27] sm:text-4xl xl:text-[2.6rem]`}
                >
                  Griffin Ridge Syrah
                </h1>
              </div>

              <div className="relative mt-3 shrink-0">
                <select
                  value={vintage}
                  onChange={(e) => setVintage(e.target.value)}
                  aria-label="Vintage"
                  className="h-8 w-20 appearance-none border border-[#d9ccbb] bg-[#f3ece3] pr-6 pl-3 text-xs tracking-wide outline-none sm:h-9 sm:w-24"
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3.5">
              <span className="text-xl text-[#3a2f27]">$74</span>
              <span className="flex items-center gap-1.5 text-[11px] text-[#3a2f27]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b89b72]" />
                Low Stock
              </span>
            </div>

            <p className="mt-3.5 text-[10px] tracking-[0.14em] text-[#7a6d62] uppercase">
              SKU: GL-SY-2022
            </p>

            <p className="mt-6 text-sm tracking-wide text-[#5a4d43]">
              Peppery, dark-fruited Syrah with a cool-climate spine.
            </p>

            {/* qty + wishlist */}
            <div className="mt-7 flex items-center gap-2.5">
              <div className="flex h-10 w-28 items-center justify-between border border-[#d4c6b4] px-3 text-xs">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-1 text-base leading-none"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-1 text-base leading-none"
                >
                  +
                </button>
              </div>

              <button
                aria-label="Add to wishlist"
                onClick={() => setWished((w) => !w)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4c6b4] transition hover:bg-[#e6d9ca]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={wished ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>
            </div>

            {/* CTA buttons */}
            <div className="mt-3.5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`${serif.className} flex h-11 flex-1 items-center justify-center bg-[#b9a07d] text-xs text-white transition hover:bg-[#a98f6b] cursor-pointer`}
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`${serif.className} flex h-11 flex-1 items-center justify-center border border-[#3a2f27] bg-transparent text-xs text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white cursor-pointer`}
              >
                Buy Now
              </button>
            </div>

            {/* accordion */}
            <div className="mt-8 border-t border-[#ddd0bf]">
              {ACCORDION.map((item) => {
                const open = openKey === item.key;
                return (
                  <div key={item.key} className="border-b border-[#ddd0bf]">
                    <button
                      onClick={() => setOpenKey(open ? null : item.key)}
                      aria-expanded={open}
                      className="flex min-h-[3rem] w-full items-center justify-between py-3 text-left text-[11px] tracking-[0.14em] uppercase"
                    >
                      {item.title}
                      <Chevron open={open} />
                    </button>
                    {open && (
                      <p className="pb-5 text-xs leading-relaxed tracking-wide text-[#6b5d52]">
                        {item.body}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM SECTION ===== */}
      <section className="border-t border-[#ddd0bf]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16 xl:gap-16">
          <div>
            <h2 className={`${serif.className} text-xl text-[#3a2f27]`}>
              About the Wine
            </h2>
            <span className="mt-3 block h-px w-10 bg-[#c9b9a3]" />
            <p
              className={`${serif.className} mt-6 max-w-xl text-sm leading-6 text-[#4a3e35]`}
            >
              Peppery, dark-fruited Syrah with a cool-climate spine.
              Blackberry, olive tapenade and cracked black pepper, threaded
              with violet. Fine-grained tannins carry a long, smoky finish.
            </p>
          </div>

          <div>
            <h2 className={`${serif.className} text-xl text-[#3a2f27]`}>
              The Vineyard
            </h2>
            <span className="mt-3 block h-px w-10 bg-[#c9b9a3]" />
            <p
              className={`${serif.className} mt-6 max-w-xl text-sm leading-6 text-[#4a3e35]`}
            >
              Our oldest Syrah block, dry-farmed on shallow clay loam that
              keeps yields naturally low.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}