"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { serif } from "@/lib/fonts";
import { ArrowRightIcon, Lead, SectionTitle } from "./ui";
import { getOrders, type Order } from "@/lib/orders";
import type { AccountUser } from "@/app/account/page";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

function BottleThumb({ src, alt, size = "w-20" }: { src: string; alt: string; size?: string }) {
  return (
    <div className={`relative aspect-square shrink-0 ${size}`}>
      <span className="absolute inset-0 rounded-full bg-[#e8ddd0]" />
      <div className="absolute top-1/2 left-1/2 h-[105%] w-[34%] -translate-x-1/2 -translate-y-1/2">
        <Image src={src} alt={alt} fill sizes="80px" className="object-contain" />
      </div>
    </div>
  );
}

export default function OrdersTab({ user }: { user?: AccountUser | null }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const loaded = getOrders(user?.email);
    if (loaded.length === 0 && user) {
      return [
        {
          id: "PMW-1024",
          wine: "Lair Hill Chardonnay",
          vintage: "2022",
          variety: "Chardonnay",
          sku: "GL-CH-2022",
          qty: 2,
          total: 100.0,
          date: "Sep 18, 2026",
          placed: "September 18, 2026",
          status: "Completed",
          image: "/images/wine.svg",
          address: [
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
              "Valued Member",
            user.address1 || "128 Vineyard Lane",
            `${user.city || "Yountville"}, ${user.state || "CA"} ${user.zip || "94599"}`,
            user.country || "United States",
          ],
          summary: { subtotal: 74, shipping: 16, tax: 10, total: 100 },
          userEmail: user.email,
        },
      ];
    }
    return loaded;
  });

  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleStorage = () => {
      setOrders(getOrders(user?.email));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user?.email]);

  if (selected !== null && orders[selected]) {
    return <OrderDetail order={orders[selected]} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <SectionTitle>Orders</SectionTitle>
      <Lead>View your wine orders and order history.</Lead>

      <div className="mt-8 max-w-3xl">
        {orders.length === 0 ? (
          <div className="py-8">
            <p className="text-sm text-[#7a6d62]">You have not placed any orders yet.</p>
            <Link
              href="/wines"
              className={`${serif.className} mt-4 inline-flex h-10 items-center border border-[#8a7d70] px-6 text-xs text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white`}
            >
              Explore Wines
            </Link>
          </div>
        ) : (
          orders.map((o, i) => (
            <article
              key={o.id + "-" + i}
              className="flex items-start gap-4 border-b border-[#e3d8c9] py-6 sm:gap-6"
            >
              <BottleThumb src={o.image} alt={o.wine} size="w-16 sm:w-20" />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`${serif.className} pt-2 text-base text-[#3a2f27] sm:text-lg`}>
                    {o.wine}
                  </h3>
                  <span className="pt-2 text-xs text-[#3a2f27]">{money(o.total)}</span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <dl className="grid grid-cols-3 gap-x-6 text-[10px] tracking-[0.1em] text-[#7a6d62] sm:gap-x-10">
                    <div>
                      <dt>Order Id</dt>
                      <dd className="mt-1.5">#{o.id}</dd>
                    </div>
                    <div>
                      <dt>Date</dt>
                      <dd className="mt-1.5">{o.date}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd className="mt-1.5">{o.status}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`${serif.className} flex h-7 shrink-0 items-center gap-1.5 border border-[#3a2f27] px-3 text-[10px] text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white cursor-pointer`}
                  >
                    View Order <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}

        <Link
          href="/wines"
          className={`${serif.className} mt-6 inline-flex h-10 items-center border border-[#8a7d70] px-6 text-xs text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white`}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

/* ================= Order detail ================= */

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  const s = order.summary;

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-1.5 text-[11px] tracking-[0.1em] text-[#6b5d52] uppercase transition hover:text-black cursor-pointer"
      >
        <span className="rotate-180">
          <ArrowRightIcon />
        </span>
        Back to Orders
      </button>

      <SectionTitle>Order #{order.id}</SectionTitle>
      <Lead>
        Placed {order.placed} · {order.status}
      </Lead>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-24">
        {/* left */}
        <div className="min-w-0">
          <div className="flex items-start gap-5 border-b border-[#e3d8c9] pb-6">
            <BottleThumb src={order.image} alt={order.wine} size="w-16 sm:w-[4.5rem]" />
            <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
              <div>
                <h3 className={`${serif.className} text-base text-[#3a2f27]`}>{order.wine}</h3>
                <p className="mt-3 text-[10px] tracking-[0.12em] text-[#7a6d62]">
                  {order.vintage} · {order.variety}
                </p>
                <p className="mt-1.5 text-[10px] tracking-[0.12em] text-[#7a6d62]">
                  SKU {order.sku}
                </p>
                <p className="mt-3 text-xs text-[#3a2f27]">Qty - {order.qty}</p>
              </div>
              <span className="text-xs text-[#3a2f27]">{money(order.total)}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className={`${serif.className} text-[11px] text-[#3a2f27]`}>Shipping Address</h4>
              <address className="mt-1.5 text-[10px] leading-4 tracking-[0.1em] text-[#7a6d62] not-italic">
                {order.address.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h4 className={`${serif.className} text-[11px] text-[#3a2f27]`}>Order Status</h4>
              <p className="mt-1.5 text-[10px] tracking-[0.1em] text-[#7a6d62]">{order.status}</p>
            </div>
          </div>
        </div>

        {/* right: summary */}
        <aside className="w-full">
          <div className="bg-[#f8f3ea] p-6 sm:p-8">
            <h3 className={`${serif.className} text-[10px] tracking-[0.06em] text-[#6b5d52] uppercase`}>
              Order Summary
            </h3>

            <div className="mt-4 border-t border-[#d4c3ae]">
              <div className="flex h-9 items-center justify-between border-b border-[#e6dccd] text-xs">
                <span>Subtotal</span>
                <span>{money(s.subtotal)}</span>
              </div>
              <div className="flex h-9 items-center justify-between border-b border-[#e6dccd] text-xs text-[#6b5d52]">
                <span>Shipping</span>
                <span>{s.shipping === 0 ? "Complimentary" : money(s.shipping)}</span>
              </div>
              <div className="flex h-9 items-center justify-between text-xs text-[#6b5d52]">
                <span>Estimated Tax</span>
                <span>{money(s.tax)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-[#d4c3ae]" />

            <div className="mt-5 flex items-baseline justify-between">
              <span className={`${serif.className} text-base`}>Total</span>
              <span className={`${serif.className} text-sm`}>{money(s.total)}</span>
            </div>
          </div>

          <Link
            href="/wines"
            className={`${serif.className} mt-5 flex h-10 w-full items-center justify-center border border-[#8a7d70] text-xs text-[#5a4d43] transition hover:bg-[#3a2f27] hover:text-white`}
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
