"use client";

import { useState, type FormEvent } from "react";
import { Field, Lead, OutlineButton, PrimaryButton, SectionTitle, CalendarIcon } from "./ui";
import type { AccountUser } from "@/app/account/page";

export default function ProfileTab({
  user,
  onUpdateUser,
}: {
  user?: AccountUser | null;
  onUpdateUser?: (updated: AccountUser) => void;
}) {
  const getInitialData = () => {
    let birthday = "1998-12-06";
    if (user?.birthYear && user?.birthMonth && user?.birthDay) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
      let monthNum = monthNames.indexOf(user.birthMonth) + 1;
      if (monthNum === 0) monthNum = parseInt(user.birthMonth, 10) || 1;
      const dayNum = parseInt(user.birthDay, 10) || 1;
      birthday = `${user.birthYear}-${String(monthNum).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    }

    return {
      firstName: user?.firstName || "Member",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "+1 (415) 555-0198",
      birthday,
      country: user?.country || "United States",
    };
  };

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
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      country: form.country,
    });
    setDone(true);
  };

  return (
    <div>
      <SectionTitle>Profile</SectionTitle>
      <Lead>Manage your personal information and account details.</Lead>

      <form onSubmit={onSubmit} className="mt-8 max-w-2xl">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
          <Field label="First Name" value={form.firstName} onChange={set("firstName")} />
          <Field label="Last Name" value={form.lastName} onChange={set("lastName")} />
          <Field label="Email Address" type="email" value={form.email} onChange={set("email")} />
          <Field label="Mobile Phone" type="tel" value={form.phone} onChange={set("phone")} />
          <Field
            label="Birthday"
            type="date"
            value={form.birthday}
            onChange={set("birthday")}
            icon={<CalendarIcon />}
            className="[&::-webkit-calendar-picker-indicator]:opacity-0"
          />
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
