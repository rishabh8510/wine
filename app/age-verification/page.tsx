"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

const STORAGE_KEY = "age-verified";

const subscribeToStorage = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export default function AgeVerification({
  bgImage = "/images/age-gate-bg.jpg",
  logo = "/images/logo.png",
  exitUrl = "https://www.google.com",
  remember = true,
}) {
  const [open, setOpen] = useState(true);
  const alreadyVerified = useSyncExternalStore(
    subscribeToStorage,
    () => {
      if (!remember) return false;
      try {
        return localStorage.getItem(STORAGE_KEY) === "true";
      } catch {
        return false;
      }
    },
    () => false
  );

  // modal open ho to page scroll lock
  useEffect(() => {
    if (!open || alreadyVerified) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, alreadyVerified]);

  const handleYes = () => {
    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }
    setOpen(false);
  };

  const handleNo = () => {
    window.location.href = exitUrl;
  };

  if (!open || alreadyVerified) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#EFE6DC]"
    >
      {/* Background image */}
      <Image
        src={bgImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/30" />

      {/* Card */}
      <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white px-6 py-10 text-center text-[#3A322C] sm:px-12 sm:py-14">
          <Image
            src={logo}
            alt="Griffin’s Lair"
            width={140}
            height={120}
            className="mx-auto h-24 w-auto sm:h-28"
          />

          <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.35em] sm:mt-6 sm:text-sm">
            Petaluma Gap Sonoma County
          </p>

          <h2
            id="age-gate-title"
            className={`${baskerville.className} mt-10 text-3xl font-normal sm:mt-14 sm:text-5xl`}
          >
            Welcome to Griffin’s Lair
          </h2>

          <p className="mx-auto mt-6 max-w-md font-sans text-base leading-8 sm:mt-8 sm:text-lg">
            Please confirm that you are of legal drinking age in your location
            to enter our website.
          </p>

          <div
            className={`${baskerville.className} mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row`}
          >
            <button
              type="button"
              onClick={handleYes}
              className="flex-1 border border-[#BBA37F] bg-[#BBA37F] px-4 py-3.5 text-base text-white transition-colors hover:bg-[#a89170] sm:text-lg"
            >
              Yer, I’m of legal drinking age
            </button>
            <button
              type="button"
              onClick={handleNo}
              className="flex-1 border border-[#BBA37F] bg-white px-4 py-3.5 text-base text-[#BBA37F] transition-colors hover:bg-[#F8F4EC] sm:text-lg"
            >
              No, I’m not
            </button>
          </div>

          <p className="mx-auto mt-8 max-w-md font-sans text-xs leading-6 sm:mt-10 sm:text-sm">
            By entering, you confirm that you meet the legal drinking age
            requirements applicable to you.
          </p>
        </div>
      </div>
    </div>
  );
}