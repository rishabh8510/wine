import WineHero from "@/components/wines/WineHero";
import EstateCircleBanner from "@/components/wines/EstateCircleBanner";
import FeatureBanner from "@/components/FeatureBanner";
import FeatureListBanner from "@/components/FeatureListBanner";
import FeatureListBannerReverse from "@/components/FeatureListBannerReverse";

export default function WinePages() {
  return (
    <>
      <WineHero />
      <EstateCircleBanner />
      <FeatureBanner
        title="Chardonnay"
        linkText="2026 First Vintage!"
        href="/wine-overview"
        image="/images/chardonnay.svg"
        imageAlt="Cheers with white wine"
        decoration="/images/graps.svg"
      />
      <FeatureListBanner
        title="Roses"
        links={[
          { label: "Vintage 2026", href: "/wine-overview" },
          { label: "Vintage 2025", href: "/wine-overview" },
          { label: "Vintage 2024", href: "/wine-overview" },
        ]}
        image="/images/rose.svg"
        imageAlt="Various wine bottles"
        decoration="/images/glass.svg"
      />

      <FeatureListBannerReverse
        title="Pinot Noir"
        image="/images/rose.svg"
        imageAlt="Cheers with wine glasses"
        decoration="/images/bottle.svg"
        links={[
          { label: "Vintage 2026", href: "/wine-overview" },
          { label: "Vintage 2025", href: "/wine-overview" },
          { label: "Vintage 2024", href: "/wine-overview" },
          { label: "Vintage 2023", href: "/wine-overview" },
        ]}
      />

      <FeatureListBanner
        title="Syrah"
        links={[
          { label: "Vintage 2026", href: "/wine-overview" },
          { label: "Vintage 2025", href: "/wine-overview" },
          { label: "Vintage 2024", href: "/wine-overview" },
          { label: "Vintage 2023", href: "/wine-overview" },
        ]}
        image="/images/rose.svg"
        imageAlt="Various wine bottles"
        decoration="/images/glass.svg"
      />

      <FeatureListBannerReverse
        title="Cabernet Franc"
        image="/images/rose.svg"
        imageAlt="Cheers with wine glasses"
        decoration="/images/bottle.svg"
        links={[
          { label: "coming soon", href: "/wine-overview" },
        ]}
      />

      <FeatureListBanner
        title="Sauvignon Blanc / Semillon"
        links={[
          { label: "coming soon", href: "/wine-overview" },
        ]}
        image="/images/rose.svg"
        imageAlt="Various wine bottles"
        decoration="/images/glass.svg"
      />
    </>
  );
}
