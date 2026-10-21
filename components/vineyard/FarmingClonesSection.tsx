import { EB_Garamond } from "next/font/google";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function FarmingClonesSection() {
  return (
    <section
      className={`${garamond.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-16`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP: Farming (left) + Clones (right) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Farming</h2>
            <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8 lg:mt-6">
              Griffin’s Lair is farmed to the highest standards with meticulous
              and laborious focus on each row and each plant. We are certified
              sustainable and we are organic by ethos, with our vines
              individually tended to and harvested by hand. We believe that the
              most interesting and expressive wines come from vines which are
              farmed to generate low yields and with limited watering to
              concentrate the taste of the land and the vine captured in the
              fruit. This is our farming philosophy, and we are grateful for the
              efforts of the dozens of skilled individuals it requires to care
              for this small plot of land.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Clones</h2>
            <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8 lg:mt-6">
              We believe strongly in partnering with world class winemakers to
              generate creative and limited-production expressions of our
              terroir. The Griffins had a wonderful sense for the artistry of
              winemaking and planted a lovely mix of clones, including four each
              for our Syrah and Pinot Noir.
            </p>
          </div>
        </div>

        {/* BOTTOM: remaining text, full width */}
        <div className="mt-10 lg:mt-14">
          <p className="text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl lg:leading-snug">
            This mixture of clones allows our winemakers to not only benefit
            from our unique geological location and meticulous farming
            standards, but also to each receive a unique collection of clones to
            express their individual creativity.
          </p>

          <div className="mt-6 space-y-4 text-base leading-7 sm:text-lg sm:leading-8 lg:mt-8">
            <p>
              This way even if isolating for varietal and vintage, you will
              literally never taste two Griffin’s Lair wines which are alike,
              and when comparing them side by side, you will be able to isolate
              the creative expressions of our talented winemakers.
            </p>
            <p>
              In Pinot, our clones range from the exotic Swan to heartier Dijon
              115 and 667 and are anchored by Pommard at the top of the knoll.
              This fruit exhibits bold and ripe flavors with an exotic nuance of
              the cool evening sea breeze and our 20-year-old vines. The soil
              under our Pinot varies from loam under the Pommard, Swan and 115,
              to heavier clay-infused soils under our Dijon clone 667, and all
              of it is planted on 101-14 rootstock.
            </p>
            <p>
              Griffin’s Lair produces some of the finest Syrah in the world
              across four clones: Syrah Noir, 470, Alban PB and 877 clones on
              101-14 and 3309 rootstock. This fruit is on the Northwest end of
              our property running down a knoll in front of our home. In this
              location, the vines bask in the late summer sunlight at the same
              time as the fog begins to roll over the mountains, creating a
              unique warming and cooling event for the vines. This cool weather
              results in extended ripening with harvest typically well into
              October, enabling the fruit to pick up extraordinary nuances from
              the vines, soil and the cool Pacific Ocean fog.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}