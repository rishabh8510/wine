import Image from "next/image";
import { EB_Garamond } from "next/font/google";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function RanchSection() {
  return (
    <section
      className={`${garamond.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-16`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* items-stretch: image column text column ki height ke barabar ho jata hai */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: text */}
          <div className="flex flex-col justify-center">
            <p className="text-sm leading-7 sm:text-base sm:leading-8">
              Griffin’s Lair is a 35-acre ranch located in Sonoma County in the
              hills running west down to the Petaluma River Valley about 40
              minutes north of San Francisco. We are less than 15 miles from
              the Pacific Ocean and less than 5 miles from the San Pablo Bay.
              Together these bodies of water create a very unique cooling
              effect, which results in protracted ripening and amplified
              complexity in our fruit. Our estate and surrounding areas are
              protected from development, creating an oasis of classic
              California farming heritage and wide expanses of land. We live on
              the property, which also includes a horse pasture (currently
              populated with a friendly array of ponies), olive groves, a pond,
              streams, ancient eucalyptus and gorgeous all-season gardens by
              our home.
            </p>

            <p className="mt-6 text-xl font-semibold leading-snug sm:text-2xl sm:leading-snug lg:mt-8">
              The vineyards were originally planted by Joan and Jim Griffin in
              the late 1990s, one of the early pioneers of what is known today
              as the Petaluma Gap AVA. With 15 acres of Pinot Noir, 6 acres of
              Syrah and a smattering of Viognier for blending, we are a boutique
              grower in Sonoma focused on cultivating the highest quality
              fruit.
            </p>
          </div>

          {/* RIGHT: image (fills the full height of the row) */}
          <div className="relative min-h-[320px] w-full sm:min-h-[420px] lg:min-h-0">
            <Image
              src="/images/ranch.webp"
              alt="Syrah Noir grapes on the vine, block 124"
              fill
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}