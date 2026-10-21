"use client";

// components/wines/WineCard.tsx
import { useState } from "react";
import type { ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiHeart, HiOutlineHeart, HiOutlinePlus } from "react-icons/hi2";
import { addToCart } from "@/lib/cart";

export type StockStatus = "In Stock" | "Low Stock" | "Sold Out";

export interface Wine {
  id: string;
  producer: string; // e.g. "Carneros"
  name: string; // e.g. "Sauvignon Blanc Sangiacomo Amaral Vineyard"
  price: number;
  size: string; // e.g. "750ml"
  image: string; // public/images/... (half-circle background image ke andar hi hoga)
  stock: StockStatus;
  href?: string;
}

interface WineCardProps {
  wine: Wine;
  onAddToCart?: (wineId: string, quantity: number) => void;
  onToggleFavorite?: (wineId: string, favorite: boolean) => void;
}

const dotColor: Record<StockStatus, string> = {
  "In Stock": "bg-[#7A9A6B]",
  "Low Stock": "bg-[#BBA37F]",
  "Sold Out": "bg-[#B5524A]",
};

export default function WineCard({ wine, onAddToCart, onToggleFavorite }: WineCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [favorite, setFavorite] = useState<boolean>(false);

  const soldOut = wine.stock === "Sold Out";
  const wineLink = wine.href || "/wine-overview/wine-view";

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const next = parseInt(e.target.value, 10);
    setQuantity(Number.isNaN(next) || next < 1 ? 1 : next);
  };

  const handleFavorite = () => {
    const next = !favorite;
    setFavorite(next);
    onToggleFavorite?.(wine.id, next);
  };

  const handleAddToCartClick = () => {
    const isLogged =
      typeof window !== "undefined"
        ? localStorage.getItem("currentUser")
        : null;
    if (!isLogged) {
      router.push("/login");
      return;
    }

    if (onAddToCart) {
      onAddToCart(wine.id, quantity);
    } else {
      addToCart({
        id: wine.id,
        name: wine.name,
        vintage: "2024",
        variety: wine.producer || "Sauvignon Blanc",
        sku: `GL-${wine.id.toUpperCase()}`,
        price: wine.price,
        qty: quantity,
        image: wine.image,
      });
      router.push("/cart");
    }
  };

  return (
    <article className="flex flex-col">
      {/* Image (half-circle background image me hi aayega) */}
      <Link href={wineLink} className="relative aspect-[4/5] w-full block">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </Link>

      {/* Info */}
      <div className="px-4 pt-6">
        <p className="text-lg text-[#7A7268]">{wine.producer}</p>
        <Link href={wineLink} className="block">
          <h3 className="mt-1 text-xl leading-snug sm:text-2xl">{wine.name}</h3>
        </Link>

        <div className="mt-5 flex items-center justify-between gap-3 font-sans">
          <span className="text-base">
            ${wine.price.toFixed(2)} / {wine.size}
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <span className={`h-1.5 w-1.5 rounded-full ${dotColor[wine.stock]}`} aria-hidden="true" />
            {wine.stock}
          </span>
        </div>

        {/* Quantity + favorite + add to cart */}
        <div className="mt-3">
          <label htmlFor={`qty-${wine.id}`} className="block text-[11px]">
            Quantity
          </label>
          <div className="mt-1.5 flex items-center gap-2.5">
            <input
              id={`qty-${wine.id}`}
              type="number"
              min={1}
              value={quantity}
              onChange={handleQuantity}
              disabled={soldOut}
              className="h-10 w-10 border border-[#D8CCBB] bg-[#F8F4EC] text-center font-sans text-sm outline-none [appearance:textfield] focus:border-[#BBA37F] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <button
              type="button"
              onClick={handleFavorite}
              aria-pressed={favorite}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8CCBB] bg-[#F8F4EC] transition-colors hover:border-[#BBA37F]"
            >
              {favorite ? (
                <HiHeart className="h-5 w-5 text-[#B5524A]" />
              ) : (
                <HiOutlineHeart className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              disabled={soldOut}
              onClick={handleAddToCartClick}
              className="flex h-10 flex-1 items-center justify-center gap-4 bg-[#BBA37F] text-base text-white transition-colors hover:bg-[#a89170] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to Cart
              <HiOutlinePlus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}