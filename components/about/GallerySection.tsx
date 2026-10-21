"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/images/gallery-1.png", alt: "White roses in the garden" },
  { src: "/images/gallery-2.png", alt: "Garden path at sunset with the farmhouse" },
  { src: "/images/gallery-3.png", alt: "Adobe Road Pinot Noir against blue sky" },
  { src: "/images/gallery-4.png", alt: "Field Book wine bottle by a Christmas tree" },
  { src: "/images/gallery-5.png", alt: "Pinot Noir bottle among lemons" },
];

const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 700;

// 3 copies of the list so the slider can loop endlessly without a visible jump
const n = images.length;
const slides = [...images, ...images, ...images];

export default function GallerySection() {
  const [pos, setPos] = useState(n); // start on the first image of the middle copy
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // auto slide, one image at a time
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setPos((p) => p + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  // when we leave the middle copy, silently jump back to the identical slide inside it
  useEffect(() => {
    if (pos >= 2 * n || pos < n) {
      timeoutRef.current = setTimeout(() => {
        setAnimate(false);
        setPos((p) => (p >= 2 * n ? p - n : p + n));
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimate(true))
        );
      }, TRANSITION_MS);
    }
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [pos]);

  return (
    <section className="w-full bg-[#EFE6DC] py-10 lg:py-16">
      <div
        className="relative mx-auto h-[var(--w)] max-w-7xl overflow-hidden [--pitch:calc(var(--w)*0.91)] [--w:220px] sm:[--w:300px] lg:[--w:420px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Gallery"
      >
        {/* track: always shifted so the active slide sits in the centre */}
        <div
          className={`absolute left-1/2 top-0 flex h-full ${
            animate
              ? "transition-transform duration-700 ease-in-out motion-reduce:transition-none"
              : ""
          }`}
          style={{
            transform: `translateX(calc(${pos} * var(--pitch) * -1 - var(--w) / 2))`,
          }}
        >
          {slides.map((img, i) => {
            const active = i === pos;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPos(i)}
                aria-label={`Show ${img.alt}`}
                aria-current={active}
                className={`relative mr-[calc(var(--w)*-0.09)] aspect-square w-[var(--w)] shrink-0 ${
                  animate
                    ? "transition-transform duration-700 ease-in-out motion-reduce:transition-none"
                    : ""
                } ${active ? "z-10 scale-100" : "scale-[0.77]"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 300px, 220px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}