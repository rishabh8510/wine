// components/FollowSection.jsx
// Install: npm i react-icons
// Images: public/images/follow-1.jpg, follow-2.jpg, follow-3.jpg  (naam apne hisab se badal lena)

import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
});

const posts = [
  { src: "/images/follow-1.svg", alt: "White pony grazing between vine rows" },
  { src: "/images/follow-2.svg", alt: "Adobe Road Pinot Noir bottle against blue sky" },
  { src: "/images/follow-3.svg", alt: "Autumn vineyard rows under a cloudy sky" },
];

export default function FollowSection() {
  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-12 text-[#3A322C] lg:py-20`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-3xl font-normal sm:text-4xl lg:text-5xl">
            <span>Follow Us</span>
            <FaInstagram className="h-7 w-7 sm:h-9 sm:w-9 lg:h-12 lg:w-12" aria-hidden="true" />
            <span className="break-all sm:break-normal">@griffinslairvineyards</span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed sm:text-lg lg:mt-8 lg:text-xl">
            We believe that great wines and experiences are best when shared.
            Snap some content of your Griffin’s Lair purchases and connect with
            us on socials. your stories and posts for a chance to be featured.
          </p>

          <a
            href="#"
            className="mt-6 inline-flex items-center gap-4 bg-[#B9A383] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#a89170] lg:mt-8"
          >
            Follow us
            <HiOutlineArrowLongRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        {/* Posts grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16 lg:gap-7">
          {posts.map((post) => (
            <div key={post.src} className="relative aspect-[16/15] w-full">
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}