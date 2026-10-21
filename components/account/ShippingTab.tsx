"use client";

import { useState, type FormEvent } from "react";
import { Field, Lead, OutlineButton, PrimaryButton, SectionTitle } from "./ui";
import type { AccountUser } from "@/app/account/page";

export default function ShippingTab({
  user,
  onUpdateUser,
}: {
  user?: AccountUser | null;
  onUpdateUser?: (updated: AccountUser) => void;
}) {
  const getInitialData = () => ({
    fullName: `${user?.firstName || "Member"} ${user?.lastName || ""}`.trim(),
    address1: user?.address1 || "128 Vineyard Lane",
    address2: user?.address2 || "",
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
      address2: form.address2,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
    });
    setDone(true);
  };

  return (
    <div>
      <SectionTitle>Shipping</SectionTitle>
      <Lead>Manage the address where your wines are delivered.</Lead>

      <form onSubmit={onSubmit} className="mt-8 max-w-2xl">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Full Name" value={form.fullName} onChange={set("fullName")} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Address Line 1" value={form.address1} onChange={set("address1")} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Address Line 2" value={form.address2} onChange={set("address2")} />
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
