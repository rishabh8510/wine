"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Login({
  image = "/images/join.svg",
  imageAlt = "Griffin’s Lair bottle among white roses",
  onSubmit,
  forgotHref = "/forgot-password",
  joinHref = "/sign-up",
}: {
  image?: string;
  imageAlt?: string;
  onSubmit?: (credentials: { email: string; password: string }) => void;
  forgotHref?: string;
  joinHref?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const isAgeVerified = localStorage.getItem("age-verified") === "true";
    if (!isAgeVerified) {
      router.push("/age-verification");
      return;
    }

    const regEmail = localStorage.getItem("registeredEmail");
    if (regEmail) {
      const timeoutId = window.setTimeout(() => {
        setEmail(regEmail);
        setSuccess("Account created successfully! Please enter your password to log in.");
        localStorage.removeItem("registeredEmail");
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [router]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const cleanEmail = email.trim().toLowerCase();
      const matched = users.find(
        (u: { email?: string; password?: string }) =>
          u.email?.trim().toLowerCase() === cleanEmail && u.password === password
      );

      if (matched) {
        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("currentUser", JSON.stringify(matched));
        window.dispatchEvent(new Event("storage"));
        onSubmit?.({ email, password });
        setTimeout(() => {
          router.push("/wines");
        }, 600);
      } else {
        const emailExists = users.some(
          (u: { email?: string }) => u.email?.trim().toLowerCase() === cleanEmail
        );
        if (emailExists) {
          setError("Incorrect password. Please try again.");
        } else {
          setError("No account found with this email. Please register first.");
        }
      }
    } catch {
      setError("An error occurred during login. Please try again.");
    }
  };

  const inputClass =
    "mt-2 block h-10 w-full border border-[#CFC2B0] bg-transparent px-3 text-base text-[#3A322C] outline-none transition-colors focus:border-[#BBA37F] focus:ring-1 focus:ring-[#BBA37F] sm:h-11";
  const labelClass = "block text-sm uppercase tracking-wide";

  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-14`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-30">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-14">
          {/* LEFT: form */}
          <div>
            <h1 className="border-l-4 border-[#5F7357] pl-6 text-2xl font-semibold uppercase leading-10 tracking-[0.15em] text-black sm:pl-8 sm:text-3xl">
              Login
            </h1>

            {error && (
              <div className="mt-4 border border-[#B5524A] bg-[#B5524A]/10 p-3 text-sm text-[#B5524A]">
                {error}{" "}
                {error.includes("register") && (
                  <Link href={joinHref} className="underline font-semibold">
                    Register here
                  </Link>
                )}
              </div>
            )}

            {success && (
              <div className="mt-4 border border-[#5F7357] bg-[#5F7357]/10 p-3 text-sm text-[#5F7357]">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-10 sm:mt-12">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="mt-6">
                <label htmlFor="password" className={labelClass}>
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="mt-5 flex h-10 w-full items-center justify-center gap-4 bg-[#BBA37F] text-base text-white transition-colors hover:bg-[#a89170] sm:h-11"
              >
                Log In
                <HiOutlineArrowLongRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>

            <Link
              href={forgotHref}
              className="mt-6 inline-block text-sm text-[#7B7B68] hover:underline"
            >
              Forgot your password?
            </Link>

            <p className="mt-6 text-sm">
              Don’t have an account?{" "}
              <Link href={joinHref} className="text-[#7B7B68] hover:underline">
                Join now
              </Link>
              .
            </p>
          </div>

          {/* RIGHT: image */}
          <div className="relative aspect-[4/3] w-full lg:aspect-[741/665]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
