"use client";

import { serif } from "@/lib/fonts";

export type TabKey =
  | "offering"
  | "profile"
  | "orders"
  | "shipping"
  | "billing"
  | "password"
  | "invite";

export const TABS: { key: TabKey; label: string }[] = [
  { key: "offering", label: "Offering" },
  { key: "profile", label: "Profile" },
  { key: "orders", label: "Orders" },
  { key: "shipping", label: "Shipping" },
  { key: "billing", label: "Billing" },
  { key: "password", label: "Password" },
  { key: "invite", label: "Personally Invite Your Friends" },
];

type Props = {
  active: TabKey;
  onChange: (key: TabKey) => void;
  onLogout: () => void;
};

export default function AccountTabs({ active, onChange, onLogout }: Props) {
  const itemClass = `${serif.className} relative whitespace-nowrap px-4 py-4 text-sm text-[#3a2f27] transition hover:text-black sm:px-5 sm:text-base`;

  return (
    <nav
      aria-label="Account sections"
      className="mt-8 overflow-x-auto border-b border-[#ddd0bf] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex min-w-max items-center">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <li key={t.key}>
              <button
                onClick={() => onChange(t.key)}
                aria-current={isActive ? "page" : undefined}
                className={itemClass}
              >
                {t.label}
                <span
                  className={`absolute right-0 -bottom-px left-0 h-px bg-[#3a2f27] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
        <li>
          <button onClick={onLogout} className={itemClass}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}