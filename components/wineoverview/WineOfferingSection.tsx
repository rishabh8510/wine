"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Baskervville } from "next/font/google";
import WineCard from "@/components/WineCard";
import type { Wine } from "@/components/WineCard";
import { addToCart } from "@/lib/cart";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  try {
    return !!localStorage.getItem("currentUser");
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

// Baad me isko apne API / CMS ke data se replace kar dena
const wines: Wine[] = [
  {
    id: "sb-amaral",
    producer: "Carneros",
    name: "Sauvignon Blanc Sangiacomo Amaral Vineyard",
    price: 30,
    size: "750ml",
    image: "/images/wine.svg",
    stock: "Low Stock",
  },
];

export default function WineOfferingSection() {
  const router = useRouter();
  const isLoggedIn = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAddToCart = (wineId: string, quantity: number) => {
    const isLogged =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    if (!isLogged) {
      router.push("/login");
      return;
    }

    const target = wines.find((w) => w.id === wineId);
    if (target) {
      addToCart({
        id: target.id,
        name: target.name,
        vintage: "2024",
        variety: target.producer || "Sauvignon Blanc",
        sku: `GL-${target.id.toUpperCase()}`,
        price: target.price,
        qty: quantity,
        image: target.image,
      });
    }
    router.push("/cart");
  };

  const handleToggleFavorite = (wineId: string, favorite: boolean) => {
    // TODO: yahan apna wishlist logic lagao
    console.log("Favorite:", wineId, favorite);
  };

  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-16`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl italic sm:text-3xl">The Wines In This Offering</h2>

        <div className="relative mt-10 lg:mt-16">
          {/* Wine Cards (Blurred when not logged in) */}
          <div
            className={`grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              !isLoggedIn
                ? "pointer-events-none select-none blur-md filter transition-all duration-300"
                : ""
            }`}
            aria-hidden={!isLoggedIn}
          >
            {wines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          {/* Locked Overlay for unauthenticated users */}
          {!isLoggedIn && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-full max-w-md border border-[#CFC2B0] bg-[#F8F4EC]/95 p-8 shadow-sm backdrop-blur-sm sm:p-10">
                {/* Lock icon */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFE6DC] text-[#BBA37F]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>

                <h3 className="mt-4 text-xl font-normal text-[#3A322C] sm:text-2xl">
                  Member Exclusive Offering
                </h3>

                <p className="mt-3 font-sans text-xs leading-relaxed text-[#7A7268] sm:text-sm">
                  This allocation is reserved for active members. Please log in to your account to view available bottles and place orders.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center bg-[#BBA37F] px-8 text-xs text-white transition-colors hover:bg-[#a89170]"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="inline-flex h-10 items-center justify-center border border-[#BBA37F] bg-transparent px-8 text-xs text-[#3A322C] transition-colors hover:bg-[#BBA37F] hover:text-white"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
