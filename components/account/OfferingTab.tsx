"use client";

import Link from "next/link";
import { serif } from "@/lib/fonts";
import { SectionTitle } from "./ui";
import type { TabKey } from "./AccountTabs";

export default function OfferingTab({
  onNavigate,
}: {
  onNavigate: (key: TabKey) => void;
}) {
  return (
    <div className={serif.className}>
      <SectionTitle>Offering</SectionTitle>

      <h3 className="mt-6 text-base text-[#3a2f27]">
        Exclusive Griffin&apos;s Lair Wine Offering
      </h3>

      <div className="mt-4 space-y-2 text-xs leading-5 text-[#4a3e35]">
        <p>
          Welcome to your member offering. Handcrafted vintages from our Petaluma
          Gap vineyard are available for allocation.
        </p>
        <p>
          Review our current collection of Pinot Noir, Syrah, and Chardonnay or view
          the complete vintage schedule.
        </p>
        <p>
          If you have any questions, please contact our estate team at (707) 555-0148
          or{" "}
          <a
            href="mailto:concierge@griffinslair.example"
            className="underline-offset-2 hover:underline"
          >
            concierge@griffinslair.example
          </a>
          .
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/wine-overview"
          className="inline-flex h-10 items-center justify-center bg-[#b9a07d] px-6 text-xs text-white transition hover:bg-[#a98f6b]"
        >
          View Current Offering &amp; Order
        </Link>
        <Link
          href="/wines"
          className="inline-flex h-10 items-center justify-center border border-[#8a7d70] px-6 text-xs text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white"
        >
          Browse All Wines
        </Link>
      </div>

      <div className="mt-8 border-t border-[#ddd0bf] pt-7 text-xs text-[#4a3e35]">
        Please update your{" "}
        <button
          type="button"
          onClick={() => onNavigate("shipping")}
          className="underline-offset-2 hover:underline cursor-pointer"
        >
          Shipping
        </button>{" "}
        &amp;{" "}
        <button
          type="button"
          onClick={() => onNavigate("billing")}
          className="underline-offset-2 hover:underline cursor-pointer"
        >
          Billing
        </button>{" "}
        information for upcoming releases.
      </div>
    </div>
  );
}
