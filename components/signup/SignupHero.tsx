import Image from "next/image";

export default function SignupHero() {
  return (
    <section className="relative flex min-h-125 w-full items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/wines-bg.svg" // Make sure this path is correct for your project
        alt="Wine glasses in vineyard"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay - darker on the left for text readability, similar to the image */}
      <div className="absolute inset-0 bg-[#433628BA]" />

      {/* Text Content - Left Aligned */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-start justify-center px-6 py-20 mx-auto sm:px-12 lg:px-16 mt-20">
        

        {/* Main Heading */}
        <h1 className="mb-6 font-serif text-5xl font-normal leading-tight text-white sm:text-6xl md:text-7xl">
          Join Our Wine Community
        </h1>

        {/* Paragraph Text */}
        <p className="max-w-7xl font-serif text-lg leading-relaxed text-[#e8e6e1] sm:text-xl md:text-2xl">
          Create your account to stay connected with our estate and explore our wines. By joining, you&apos;ll be able to manage your profile and receive updates about new releases, wines, and opportunities to experience the vineyard. We look forward to welcoming you into our community.
        </p>
        <p className="max-w-7xl font-serif text-lg leading-relaxed text-[#e8e6e1] sm:text-xl md:text-2xl">
          Please explore our Wines or learn more about Our Estate before creating your account.
        </p>

      </div>
    </section>
  );
}