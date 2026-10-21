import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative h-150 w-full overflow-hidden">
      <Image
        src="/images/banner.svg"
        alt="Vineyard aerial view"
        fill
        priority
        className="object-cover"
      />
    </section>
  );
}