"use client";

import { useState, type FormEvent } from "react";
import { serif } from "@/lib/fonts";
import { Field, Lead, OutlineButton, PrimaryButton, SectionTitle } from "./ui";
import type { AccountUser } from "@/app/account/page";

export default function BillingTab({
  user,
  onUpdateUser,
}: {
  user?: AccountUser | null;
  onUpdateUser?: (updated: AccountUser) => void;
}) {
  const getInitialData = () => ({
    fullName: `${user?.firstName || "Member"} ${user?.lastName || ""}`.trim(),
    address1: user?.address1 || "128 Vineyard Lane",
    city: user?.city || "Yountville",
    state: user?.state || "CA",
    zip: user?.zip || "94599",
    country: user?.country || "United States",
  });

  const [saved, setSaved] = useState(getInitialData);
  const [form, setForm] = useState(getInitialData);
  const [done, setDone] = useState(false);

  const set =
    (key: keyof ReturnType<typeof getInitialData>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDone(false);
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(form);
    onUpdateUser?.({
      ...user,
      address1: form.address1,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
    });
    setDone(true);
  };

  return (
    <div>
      <SectionTitle>Billing</SectionTitle>
      <Lead>Manage your payment method and billing address.</Lead>

      <div className="mt-8 flex max-w-2xl items-center justify-between border border-[#d9ccbb] bg-[#f3ece3] px-4 py-3">
        <div>
          <p className="text-[10px] tracking-[0.04em] text-[#4a3e35] uppercase">
            Payment Method
          </p>
          <p className={`${serif.className} mt-1 text-xs text-[#3a2f27]`}>
            Visa ending in 4417
          </p>
        </div>
        <button
          type="button"
          className={`${serif.className} text-[11px] text-[#5a4d43] underline-offset-2 hover:underline cursor-pointer`}
        >
          Update
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-8 max-w-2xl">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Name on Card" value={form.fullName} onChange={set("fullName")} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Billing Address" value={form.address1} onChange={set("address1")} />
          </div>
          <Field label="City" value={form.city} onChange={set("city")} />
          <Field label="State" value={form.state} onChange={set("state")} />
          <Field label="Zip Code" value={form.zip} onChange={set("zip")} />
          <Field label="Country" value={form.country} onChange={set("country")} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <PrimaryButton type="submit">Save Changes</PrimaryButton>
          <OutlineButton
            type="button"
            onClick={() => {
              setForm(saved);
              setDone(false);
            }}
          >
            Cancel
          </OutlineButton>
          {done && <span className="text-xs text-[#5F7357]">Changes saved.</span>}
        </div>
      </form>
    </div>
  );
}
