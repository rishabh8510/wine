"use client";

// app/account/page.tsx
// Ek hi page, tabs ke click par alag-alag component render hota hai.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { serif, sans } from "@/lib/fonts";
import AccountTabs, { type TabKey } from "@/components/account/AccountTabs";
import OfferingTab from "@/components/account/OfferingTab";
import ProfileTab from "@/components/account/ProfileTab";
import OrdersTab from "@/components/account/OrdersTab";
import ShippingTab from "@/components/account/ShippingTab";
import BillingTab from "@/components/account/BillingTab";
import PasswordTab from "@/components/account/PasswordTab";
import InviteTab from "@/components/account/InviteTab";

export type AccountUser = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
  country?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  company?: string;
};

export default function AccountPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("offering");
  const [user, setUser] = useState<AccountUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleUpdateUser = (updated: AccountUser) => {
    setUser(updated);
    try {
      localStorage.setItem("currentUser", JSON.stringify(updated));
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const idx = allUsers.findIndex(
        (u: { email?: string }) =>
          u.email?.toLowerCase() === updated.email?.toLowerCase()
      );
      if (idx > -1) {
        allUsers[idx] = { ...allUsers[idx], ...updated };
      } else {
        allUsers.push(updated);
      }
      localStorage.setItem("users", JSON.stringify(allUsers));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("currentUser");
    } catch {}
    window.dispatchEvent(new Event("storage"));
    router.push("/login");
  };

  if (!user) {
    return (
      <main
        className={`${sans.className} min-h-screen bg-[#EFE6DB] text-[#3a2f27]`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
          <p className="text-sm text-[#6b5d52]">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  const displayName = user.firstName || "Member";

  return (
    <main
      className={`${sans.className} min-h-screen bg-[#EFE6DB] text-[#3a2f27]`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 mt-20">
        {/* header */}
        <header>
          <h1
            className={`${serif.className} text-3xl leading-tight font-normal text-[#4a3b30] sm:text-4xl lg:text-[2.6rem]`}
          >
            Welcome {displayName}
          </h1>
          <p
            className={`${serif.className} mt-3 max-w-md text-sm leading-5 text-[#4a3e35]`}
          >
            Manage your account preferences, view your orders, update your
            information, and stay connected with the estate.
          </p>
        </header>

        <AccountTabs active={tab} onChange={setTab} onLogout={handleLogout} />

        {/* active tab content */}
        <section className="pt-8 pb-10 lg:pt-10">
          {tab === "offering" && <OfferingTab onNavigate={setTab} />}
          {tab === "profile" && (
            <ProfileTab
              key={`profile-${user.email}`}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {tab === "orders" && (
            <OrdersTab key={`orders-${user.email}`} user={user} />
          )}
          {tab === "shipping" && (
            <ShippingTab
              key={`shipping-${user.email}`}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {tab === "billing" && (
            <BillingTab
              key={`billing-${user.email}`}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {tab === "password" && (
            <PasswordTab key={`password-${user.email}`} user={user} />
          )}
          {tab === "invite" && (
            <InviteTab key={`invite-${user.email}`} user={user} />
          )}
        </section>
      </div>
    </main>
  );
}
