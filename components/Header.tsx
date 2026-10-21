"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "Vineyard", href: "/vineyard" },
  { label: "Wines", href: "/wines" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ firstName?: string; email?: string } | null>(null);

  // Menu ke liye pathname store karte hain: jis page par menu khula,
  // sirf usi page par open maana jayega. Page badla => menu auto band.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const menuOpen = openOnPath === pathname;

  const toggleMenu = () => setOpenOnPath(menuOpen ? null : pathname);
  const closeMenu = () => setOpenOnPath(null);

  // Sirf home page ke hero par transparent; baaki pages par hamesha solid
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // refresh par bhi sahi state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = localStorage.getItem("currentUser");
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch {
        setCurrentUser(null);
      }
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    const isAgeVerified = localStorage.getItem("age-verified") === "true";
    if (!isAgeVerified) {
      router.push("/age-verification");
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("currentUser");
    } catch {}
    setCurrentUser(null);
    window.dispatchEvent(new Event("storage"));
    closeMenu();
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
        solid ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-14 ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        {/* Left: Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b py-2 text-[15px] text-neutral-800 transition-colors hover:text-black ${
                isActive(link.href) ? "border-neutral-800" : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          className="flex h-10 w-10 items-center justify-center text-neutral-800 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="m18 6-12 12M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {/* Center: Logo -> click karne par Home (/) */}
        <Link
          href="/"
          aria-label="Go to home"
          onClick={closeMenu}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/logo.svg"
            alt="Griffin's Lair"
            width={110}
            height={90}
            priority
            className="h-auto w-[90px] sm:w-[110px]"
          />
        </Link>

        {/* Right: icons + Login */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button aria-label="Wishlist" className="text-[#BBA27E] hover:opacity-80">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M12 21s-7.5-4.6-9.6-9.3C1 8.5 2.8 5 6.2 5c2 0 3.3 1 3.8 2 .5-1 1.8-2 3.8-2 3.4 0 5.2 3.5 3.8 6.7C19.5 16.4 12 21 12 21Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              const isLogged =
                typeof window !== "undefined"
                  ? localStorage.getItem("currentUser")
                  : null;
              if (!isLogged) {
                const isAgeVerified =
                  localStorage.getItem("age-verified") === "true";
                if (!isAgeVerified) {
                  router.push("/age-verification");
                } else {
                  router.push("/login");
                }
              } else {
                router.push("/cart");
              }
            }}
            aria-label="Cart"
            className="text-[#BBA27E] hover:opacity-80 cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M3 4h2.5l2 10h10l2-7H7" />
              <circle cx="9" cy="19" r="1.3" />
              <circle cx="17" cy="19" r="1.3" />
            </svg>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                aria-label="Profile"
                className="flex items-center gap-2.5 bg-[#BBA27E] px-5 py-3 font-serif text-[16px] text-white transition-colors hover:bg-[#a98f6b]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{currentUser.firstName || "Account"}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden border border-[#BBA27E] px-4 py-2.5 font-serif text-[14px] text-[#3A322C] transition-colors hover:bg-[#BBA27E] hover:text-white sm:inline-flex cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <a
              href="/login"
              onClick={handleLoginClick}
              className="hidden items-center gap-3 bg-[#BBA27E] px-7 py-3.5 font-serif text-[17px] text-white transition-colors hover:bg-[#a98f6b] sm:inline-flex"
            >
              Log In
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-neutral-100 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`px-2 py-3 text-[15px] ${
                  isActive(link.href) ? "font-medium text-black" : "text-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-2 py-3 text-[15px] font-medium text-black"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[#BBA27E]"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  My Account ({currentUser.firstName || "Profile"})
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 bg-[#BBA27E] px-4 py-3 text-center font-serif text-white w-full cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <a
                href="/login"
                onClick={handleLoginClick}
                className="mt-2 bg-[#BBA27E] px-4 py-3 text-center font-serif text-white block"
              >
                Log In
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}