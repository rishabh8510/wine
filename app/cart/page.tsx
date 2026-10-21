"use client";

// app/cart/page.tsx  (Next.js App Router + TypeScript + Tailwind CSS)

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Libre_Baskerville, Inter } from "next/font/google";
import {
  getCart,
  updateCartItemQty,
  removeFromCart,
  clearCart,
  type CartItem,
} from "@/lib/cart";
import { saveOrder, createOrderFromCart } from "@/lib/orders";

const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400"] });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

export default function CartPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderNotice, setOrderNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let initializeTimer: ReturnType<typeof setTimeout>;

    try {
      const user = localStorage.getItem("currentUser");
      if (!user) {
        router.push("/login");
        return;
      }
      initializeTimer = setTimeout(() => {
        if (!active) return;
        setAuthorized(true);
        setItems(getCart());
      }, 0);
    } catch {
      router.push("/login");
      return;
    }

    const handleStorage = () => {
      setItems(getCart());
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      active = false;
      clearTimeout(initializeTimer);
      window.removeEventListener("storage", handleStorage);
    };
  }, [router]);

  if (!authorized) {
    return null;
  }

  const handleUpdateQty = (id: string | number, delta: number) => {
    const updated = updateCartItemQty(id, delta);
    setItems(updated);
  };

  const handleRemove = (id: string | number) => {
    const updated = removeFromCart(id);
    setItems(updated);
  };

  const bottles = items.reduce((sum, it) => sum + it.qty, 0);
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = items.length > 0 ? (subtotal >= 150 ? 0 : 16) : 0;
  const tax = items.length > 0 ? Math.round(subtotal * 0.08 * 100) / 100 : 0;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (items.length === 0) return;

    try {
      const userStr = localStorage.getItem("currentUser");
      if (!userStr) {
        setOrderNotice("Please log in to proceed to checkout.");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        return;
      }

      const currentUser = JSON.parse(userStr);
      const newOrder = createOrderFromCart(items, currentUser, {
        subtotal,
        shipping,
        tax,
        total,
        bottles,
      });

      saveOrder(newOrder);
      clearCart();
      setItems([]);
      setOrderNotice("Order placed successfully! Redirecting to your orders...");
      setTimeout(() => {
        router.push("/account");
      }, 1000);
    } catch {
      setOrderNotice("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <main
      className={`${sans.className} min-h-screen bg-[#EFE6DB] text-[#3a2f27]`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10 mt-20">
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

        {orderNotice && (
          <div className="mt-4 border border-[#5F7357] bg-[#5F7357]/10 p-4 text-sm text-[#5F7357]">
            {orderNotice}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-24">
          {/* ===== LEFT: items ===== */}
          <section className="min-w-0">
            <p className="text-[10px] tracking-[0.1em] text-[#6b5d52] uppercase">
              {bottles} {bottles === 1 ? "Bottle" : "Bottles"}
            </p>
            <div className="mt-4 border-t border-[#d4c3ae]" />

            {items.length === 0 && (
              <div className="py-12 text-center sm:text-left">
                <p className="text-base text-[#6b5d52]">
                  Your cart is currently empty.
                </p>
                <Link
                  href="/wines"
                  className={`${serif.className} mt-4 inline-flex items-center gap-2 border border-[#8a7d70] px-5 py-2 text-xs text-[#5a4d43] transition hover:bg-[#3a2f27] hover:text-white`}
                >
                  Explore Our Wines
                </Link>
              </div>
            )}

            {items.map((it, i) => (
              <article
                key={it.id + "-" + i}
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
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => handleUpdateQty(it.id, -1)}
                      className="px-1 text-lg leading-none cursor-pointer"
                    >
                      −
                    </button>
                    <span>{it.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => handleUpdateQty(it.id, 1)}
                      className="px-1 text-lg leading-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* remove */}
                <button
                  type="button"
                  onClick={() => handleRemove(it.id)}
                  className="absolute top-6 right-0 flex items-center gap-2 text-[10px] tracking-[0.14em] text-[#5a4d43] uppercase transition hover:text-black sm:top-7 cursor-pointer"
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
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex h-10 items-center justify-between border-b border-[#e6dccd] text-sm text-[#6b5d52]">
                  <span>Shipping</span>
                  <span>{items.length === 0 ? money(0) : shipping === 0 ? "Complimentary" : money(shipping)}</span>
                </div>
                <div className="flex h-10 items-center justify-between text-sm text-[#6b5d52]">
                  <span>Estimated Tax</span>
                  <span>{money(tax)}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#d4c3ae]" />

              <div className="mt-5 flex items-baseline justify-between">
                <span className={`${serif.className} text-lg`}>Total</span>
                <span className={`${serif.className} text-base`}>
                  {money(total)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#7a6d62]">
                Shipping and tax are calculated based on your order.
              </p>

              <button
                type="button"
                disabled={items.length === 0}
                onClick={handleCheckout}
                className={`${serif.className} mt-5 h-11 w-full bg-[#b9a07d] text-xs text-white transition hover:bg-[#a98f6b] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-[11px] text-[#7a6d62]">
                Member checkout with instant confirmation.
              </p>
            </div>

            <Link
              href="/wines"
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
