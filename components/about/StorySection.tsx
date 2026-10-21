import Image from "next/image";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function StorySection() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-14`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + intro */}
        <h2 className="text-3xl font-normal italic sm:text-4xl">
          Growing Great Wine Since 2018
        </h2>

        <div className="mt-8 text-sm leading-snug sm:text-base lg:mt-12">
          <p>
            Our family’s farming roots began in Chile’s Casablanca Valley, where
            we discovered a passion for growing cool-climate Pinot Noir and
            Syrah. In 2018, that legacy brought us to Griffin’s Lair in
            Sonoma’s Petaluma Gap—a place that felt remarkably like our
            family’s ranch in Chile.
          </p>
          <p>
            Inspired by this connection, we embraced Griffin’s Lair as a
            multigenerational family home and vineyard. With the guidance of
            experienced vineyard and winemaking partners, we continue to care
            for this remarkable land and its unique heritage.
          </p>
        </div>

        {/* Story + collage */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-x-24">
          {/* Text */}
          <div>
            <p className="text-xl leading-snug sm:text-2xl sm:leading-snug">
              Today, we are focused on meticulously farming this land with the
              utmost of care and under sustainable growing practices while
              cultivating relationships with the finest winemakers in
              California.
            </p>

            <div className="mt-6 space-y-6 text-sm leading-snug sm:text-base">
              <p>
                We are here to play our small part in making world class wines
                that you will enjoy, will make you think and will demonstrate
                both a taste of our land as well as the artistic expression of
                the winemaker. We relish our family walks through the vineyard
                throughout the changing seasons to monitor the health and
                growth of the vines. Everyone has a special role to play on our
                farm… Tigger, the family dog, takes his job of chasing rabbits
                out of the vineyard very seriously, Chester and Tess, our cats,
                watch over the vegetable garden, and our daughters are chief
                sugar-content tasters for the ripening grapes!
              </p>
              <p>
                Thank you for taking the time to read our story. Please share
                your story with us and of course let us know what you think of
                the wines!
              </p>
            </div>

            <p className="mt-6 inline-block border-b border-[#3A322C]/60 pb-1 text-sm sm:text-base">
              Susan, John, Alix, Leila and Claire
            </p>
          </div>

          {/* Collage */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative col-span-2 aspect-[7/3]">
              <Image
                src="/images/story-1.svg"
                alt="The family sitting together in the vineyard"
                fill
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[8/7]">
              <Image
                src="/images/story-2.svg"
                alt="Walking the dog along the vineyard road"
                fill
                sizes="(min-width: 1280px) 260px, (min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[8/7]">
              <Image
                src="/images/story-3.svg"
                alt="Miniature horses grazing in the field"
                fill
                sizes="(min-width: 1280px) 260px, (min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}