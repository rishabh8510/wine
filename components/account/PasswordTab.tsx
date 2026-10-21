"use client";

import { useState, type FormEvent } from "react";
import { serif } from "@/lib/fonts";
import { Lead, PasswordField, PrimaryButton, SectionTitle } from "./ui";
import type { AccountUser } from "@/app/account/page";

export default function PasswordTab({ user }: { user?: AccountUser | null }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "error" | "ok"; text: string } | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (next.length < 8) {
      return setMsg({ type: "error", text: "Password must be at least 8 characters." });
    }
    if (next !== confirm) {
      return setMsg({ type: "error", text: "Passwords do not match." });
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const idx = users.findIndex(
        (u: { email?: string }) =>
          u.email?.toLowerCase() === user?.email?.toLowerCase()
      );
      if (idx > -1) {
        users[idx].password = next;
        localStorage.setItem("users", JSON.stringify(users));
      }
      setMsg({ type: "ok", text: "Password updated successfully." });
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch {
      setMsg({ type: "error", text: "Could not update password. Please try again." });
    }
  };

  return (
    <div>
      <SectionTitle>Password</SectionTitle>
      <Lead>Update your password to keep your account secure.</Lead>

      <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-5">
        <PasswordField
          label="Current Password"
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {msg && (
          <p className={`text-xs ${msg.type === "error" ? "text-[#9b3b2f]" : "text-[#5f7a4f]"}`}>
            {msg.text}
          </p>
        )}

        <div>
          <PrimaryButton type="submit">Update Password</PrimaryButton>
        </div>

        <a
          href="/forgot-password"
          className={`${serif.className} block text-[10px] italic text-[#6b5d52] underline-offset-2 hover:underline`}
        >
          Forgot your password?
        </a>
      </form>
    </div>
  );
}
