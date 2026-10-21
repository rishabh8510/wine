"use client";

import { useRouter } from "next/navigation";
import { Baskervville } from "next/font/google";
import WineCard from "@/components/WineCard";
import type { Wine } from "@/components/WineCard";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

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

  const handleAddToCart = (wineId: string, quantity: number) => {
    // TODO: yahan apna add-to-cart logic lagao
    console.log("Add to cart:", wineId, quantity);
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
        <h2 className="text-4xl italic sm:text-5xl">The Wines In This Offering</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4">
          {wines.map((wine) => (
            <WineCard
              key={wine.id}
              wine={wine}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
}