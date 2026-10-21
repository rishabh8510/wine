import Link from "next/link";
import Image from "next/image";

const exploreLinks = [
  { label: "Vineyard", href: "/" },
  { label: "Wines", href: "/wines" },
  { label: "News", href: "/news" },
  { label: "Philanthropy", href: "/philanthropy" },
  { label: "About Us", href: "/about" },
];

export default function Footer() {
  return (
    // Upar cream strip (pt-14), beech me green block, neeche cream strip
    <footer className="mt-auto bg-[#EFE6DC] pt-14 font-serif">
      <div className="bg-[#6C775B] text-[#F4EEE6]">
        <div className="mx-auto grid w-full grid-cols-1 gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_220px_340px] lg:gap-x-24 lg:px-[5.4%]">
          {/* About */}
          <div>
            <h2 className="text-[26px] leading-tight">
              Griffin&rsquo;s Lair Vineyard
            </h2>

            <p className="mt-6 max-w-[660px] text-[17px] leading-[1.9] text-[#F4EEE6]/95">
              Three generations of family farming, rooted in a deep connection
              to the land. We meticulously farm our Petaluma Gap vineyard and
              partner with exceptional winemakers to create distinctive wines
              that reflect our unique terroir.
            </p>

            <Link
              href="/"
              aria-label="Griffin's Lair home"
              className="mt-8 inline-block rounded-md bg-white p-1"
            >
              {/* public/logo.png */}
              <Image
                src="/logo.svg"
                alt="Griffin's Lair"
                width={84}
                height={62}
                className="h-auto w-[84px]"
              />
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-lg">Explore</h2>
            <ul className="mt-6 space-y-[18px]">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[16px] text-[#F4EEE6]/90 transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg">Contact Us</h2>
            <ul className="mt-6 space-y-5 text-[16px]">
              <li className="flex items-center gap-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 8 8 5.5L20 8" />
                </svg>
                <a
                  href="mailto:inquiries@griffinslairvineyard.com"
                  className="break-all transition-opacity hover:opacity-70"
                >
                  inquiries@griffinslairvineyard.com.
                </a>
              </li>

              <li className="flex items-center gap-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
                </svg>
                <a
                  href="https://www.instagram.com/griffinslairvineyards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  @griffinslairvineyards
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="py-3 text-center text-[14px] text-neutral-700">
        Powered by Squarespace
      </p>
    </footer>
  );
}