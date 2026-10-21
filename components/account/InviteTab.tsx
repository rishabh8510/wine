"use client";

import { useState } from "react";
import { serif } from "@/lib/fonts";
import { ChatIcon, CopyIcon, MailIcon, SectionTitle } from "./ui";
import type { AccountUser } from "@/app/account/page";

export default function InviteTab({ user }: { user?: AccountUser | null }) {
  const [copied, setCopied] = useState(false);

  const inviteCode = (
    (user?.firstName || "MEMBER").toUpperCase() +
    (user?.id ? user.id.slice(-4) : "1024")
  ).replace(/[^A-Z0-9]/g, "");

  const INVITE_LINK = `https://example.com/invite/${inviteCode}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const message = encodeURIComponent(
    `Join me for direct access to wonderful wines: ${INVITE_LINK}`
  );
  const shareBtn = `${serif.className} flex h-10 items-center gap-2 border border-[#8a7d70] px-5 text-xs text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white cursor-pointer`;

  return (
    <div className={serif.className}>
      <SectionTitle>Personally Invite Your Friends</SectionTitle>

      <h3 className="mt-6 text-base text-[#3a2f27]">
        Share Direct Access to Our Wines. Without the Wait.
      </h3>
      <p className="mt-4 max-w-xl text-xs leading-5 text-[#4a3e35]">
        Share your personalized invitation link via text or email to invite
        friends to sign up as active members. They&apos;ll bypass the waitlist
        and receive seasonal wine offers with access to their preferred wines.
      </p>

      <div className="mt-8 border-t border-[#ddd0bf] pt-7">
        <p className="text-[10px] tracking-[0.04em] text-[#4a3e35] uppercase">
          Your Personal Invitation Link
        </p>

        <div className="mt-2 flex h-10 w-full max-w-md items-center border border-[#d9ccbb] bg-[#f3ece3] pr-1 pl-3">
          <input
            readOnly
            value={INVITE_LINK}
            aria-label="Invitation link"
            className="min-w-0 flex-1 bg-transparent text-[10px] tracking-wide text-[#5a4d43] uppercase outline-none"
          />
          <button
            type="button"
            onClick={copy}
            className="flex h-8 items-center gap-1.5 bg-[#4a3e35] px-3 text-[10px] text-white transition hover:bg-black cursor-pointer"
          >
            <CopyIcon />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`sms:?&body=${message}`}
            className={shareBtn}
            aria-label="Invite friends via text"
          >
            <ChatIcon /> Invite via Text
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(
              "Invitation to Griffin's Lair"
            )}&body=${message}`}
            className={shareBtn}
            aria-label="Invite friends via email"
          >
            <MailIcon /> Invite via Email
          </a>
        </div>
      </div>
    </div>
  );
}
