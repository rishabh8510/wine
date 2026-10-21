"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

const STORAGE_KEY = "age-verified";

export default function AgeVerification({
  bgImage = "/images/vineyard-bg.webp",
  logo = "/logo.svg",
  exitUrl = "https://www.google.com",
  remember = true,
}: {
  bgImage?: string;
  logo?: string;
  exitUrl?: string;
  remember?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  // modal open ho to page scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleYes = () => {
    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }
    setOpen(false);
    router.push("/login");
  };

  const handleNo = () => {
    window.location.href = exitUrl;
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 bg-[#EFE6DC]"
    >
      {/* Background image (fixed, scroll nahi hoti) */}
      <Image
        src={bgImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/30" />

      {/* Scroll container: chhoti screen par scroll, baaki jagah card center me */}
      <div className="relative h-full w-full overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          {/* Card */}
          <div className="w-full max-w-md bg-white px-5 py-8 text-center text-[#3A322C] sm:max-w-xl sm:px-10 sm:py-10 lg:max-w-2xl lg:px-12 lg:py-12">
            <Image
              src={logo}
              alt="Griffin’s Lair"
              width={140}
              height={120}
              className="mx-auto h-16 w-auto sm:h-20 lg:h-24"
            />

            <p className="mt-4 font-sans text-[9px] uppercase tracking-[0.3em] sm:mt-5 sm:text-[11px] lg:text-xs">
              Petaluma Gap Sonoma County
            </p>

            <h2
              id="age-gate-title"
              className={`${baskerville.className} mt-6 text-xl font-normal sm:mt-8 sm:text-2xl lg:text-3xl`}
            >
              Welcome to Griffin’s Lair
            </h2>

            <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-6 sm:mt-5 sm:max-w-md sm:text-[15px] sm:leading-7">
              Please confirm that you are of legal drinking age in your
              location to enter our website.
            </p>

            <div
              className={`${baskerville.className} mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4`}
            >
              <button
                type="button"
                onClick={handleYes}
                className="flex-1 border border-[#BBA37F] bg-[#BBA37F] px-4 py-3 text-sm text-white transition-colors hover:bg-[#a89170] sm:text-base"
              >
                Yes, I’m of legal drinking age
              </button>
              <button
                type="button"
                onClick={handleNo}
                className="flex-1 border border-[#BBA37F] bg-white px-4 py-3 text-sm text-[#BBA37F] transition-colors hover:bg-[#F8F4EC] sm:text-base"
              >
                No, I’m not
              </button>
            </div>

            <p className="mx-auto mt-6 max-w-sm font-sans text-[11px] leading-5 sm:mt-8 sm:max-w-md sm:text-xs sm:leading-6">
              By entering, you confirm that you meet the legal drinking age
              requirements applicable to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}