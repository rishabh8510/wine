"use client";

// app/cart/page.tsx  (Next.js App Router + TypeScript + Tailwind CSS)
// Image: public/images/bottle.png

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Libre_Baskerville, Inter } from "next/font/google";

const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400"] });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

type CartItem = {
  id: number;
  name: string;
  vintage: string;
  variety: string;
  sku: string;
  price: number;
  qty: number;
  image: string;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Lair Hill Chardonnay",
    vintage: "2022",
    variety: "Chardonnay",
    sku: "GL-CH-2022",
    price: 42,
    qty: 1,
    image: "/images/bottle.png",
  },
  {
    id: 2,
    name: "Lair Hill Chardonnay",
    vintage: "2022",
    variety: "Chardonnay",
    sku: "GL-CH-2022",
    price: 42,
    qty: 1,
    image: "/images/bottle.png",
  },
];

// Screenshot jaisi values (static). Real project me yeh items se calculate karna.
const SUMMARY = { subtotal: 74, shipping: 16, tax: 10, total: 100 };

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const updateQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );

  const remove = (id: number) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const bottles = items.reduce((sum, it) => sum + it.qty, 0);

  return (
    <main
      className={`${sans.className} min-h-screen bg-[#EFE6DB] text-[#3a2f27]`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* heading */}
        <h1
          className={`${serif.className} text-3xl leading-tight font-normal text-[#4a3b30] sm:text-4xl`}
        >
          Your Cart
        </h1>
        <p
          className={`${serif.className} mt-3 text-sm text-[#4a3e35] sm:text-base`}
        >
          Review your wines before continuing to checkout.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-24">
          {/* ===== LEFT: items ===== */}
          <section className="min-w-0">
            <p className="text-[10px] tracking-[0.1em] text-[#6b5d52] uppercase">
              {bottles} {bottles === 1 ? "Bottle" : "Bottles"}
            </p>
            <div className="mt-4 border-t border-[#d4c3ae]" />

            {items.length === 0 && (
              <p className="py-10 text-sm text-[#6b5d52]">
                Your cart is empty.
              </p>
            )}

            {items.map((it, i) => (
              <article
                key={it.id}
                className={`relative flex items-center gap-4 py-6 sm:gap-6 sm:py-7 ${
                  i !== items.length - 1 ? "border-b border-[#e3d8c9]" : ""
                }`}
              >
                {/* image with circle */}
                <div className="relative aspect-square w-28 shrink-0 sm:w-36">
                  <span className="absolute inset-0 rounded-full bg-[#e8ddd0]" />
                  <div className="absolute top-1/2 left-1/2 h-[104%] w-1/3 -translate-x-1/2 -translate-y-1/2">
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* info */}
                <div className="min-w-0 flex-1 self-start pt-1 pr-20 sm:pr-24">
                  <h2
                    className={`${serif.className} text-base leading-snug text-[#3a2f27] sm:text-lg`}
                  >
                    {it.name}
                  </h2>
                  <p className="mt-3 text-[11px] tracking-[0.12em] text-[#7a6d62]">
                    {it.vintage} · {it.variety}
                  </p>
                  <p className="mt-2 text-[11px] tracking-[0.12em] text-[#7a6d62]">
                    SKU {it.sku}
                  </p>
                  <p className="mt-4 text-sm text-[#3a2f27]">
                    {money(it.price)}{" "}
                    <span className="text-xs text-[#6b5d52]">each</span>
                  </p>

                  <div className="mt-4 flex h-10 w-28 items-center justify-between border border-[#cdb99c] px-4 text-xs sm:h-11 sm:w-32">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(it.id, -1)}
                      className="px-1 text-lg leading-none"
                    >
                      −
                    </button>
                    <span>{it.qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQty(it.id, 1)}
                      className="px-1 text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* remove */}
                <button
                  onClick={() => remove(it.id)}
                  className="absolute top-6 right-0 flex items-center gap-2 text-[10px] tracking-[0.14em] text-[#5a4d43] uppercase transition hover:text-black sm:top-7"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="h-3 w-3"
                  >
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                  Remove
                </button>
              </article>
            ))}
          </section>

          {/* ===== RIGHT: summary ===== */}
          <aside className="w-full lg:sticky lg:top-8 lg:self-start">
            <div className="bg-[#f8f3ea] p-6 sm:p-8">
              <h3
                className={`${serif.className} text-[10px] tracking-[0.06em] text-[#6b5d52] uppercase`}
              >
                Order Summary
              </h3>

              <div className="mt-4 border-t border-[#d4c3ae]">
                <div className="flex h-10 items-center justify-between border-b border-[#e6dccd] text-sm">
                  <span>Subtotal</span>
                  <span>{money(SUMMARY.subtotal)}</span>
                </div>
                <div className="flex h-10 items-center justify-between border-b border-[#e6dccd] text-sm text-[#6b5d52]">
                  <span>Shipping</span>
                  <span>{money(SUMMARY.shipping)}</span>
                </div>
                <div className="flex h-10 items-center justify-between text-sm text-[#6b5d52]">
                  <span>Estimated Tax</span>
                  <span>{money(SUMMARY.tax)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#d4c3ae]" />

              <div className="mt-5 flex items-baseline justify-between">
                <span className={`${serif.className} text-lg`}>Total</span>
                <span className={`${serif.className} text-base`}>
                  {money(SUMMARY.total)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#7a6d62]">
                Shipping and tax are added once your delivery address is
                entered.
              </p>

              <button
                className={`${serif.className} mt-5 h-11 w-full bg-[#b9a07d] text-xs text-white transition hover:bg-[#a98f6b]`}
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-[11px] text-[#7a6d62]">
                Guest checkout available — no account required.
              </p>
            </div>

            <Link
              href="/"
              className={`${serif.className} mt-5 flex h-11 w-full items-center justify-center border border-[#8a7d70] text-xs text-[#5a4d43] transition hover:bg-[#3a2f27] hover:text-white`}
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}