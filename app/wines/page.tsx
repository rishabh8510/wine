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
        decoration="/images/grape-faint.png"
      />
      <FeatureListBanner
        title="Our Wines"
        links={[
          { label: "Chardonnay", href: "/wine-overview" },
          { label: "Pinot Noir", href: "/wine-overview" },
          { label: "Cabernet Sauvignon", href: "/wine-overview" },
        ]}
        image="/images/rose.svg"
        imageAlt="Various wine bottles"
        decoration="/images/grape-faint.png"
      />

      <FeatureListBannerReverse
        title="Pinot Noir"
        image="/images/rose.svg"
        imageAlt="Cheers with wine glasses"
        decoration="/images/bottle-glasses-faint.png"
        links={[
          { label: "Clos du Ciel", href: "/wine-overview" },
          { label: "Le Caprice", href: "/wine-overview" },
          { label: "Le Moulin Rouge®", href: "/wine-overview" },
          { label: "Ma Danseuse", href: "/wine-overview" },
        ]}
      />

      <FeatureListBanner
        title="Syrah"
        links={[
          { label: "Clos du Ciel", href: "/wine-overview" },
          { label: "Le Caprice", href: "/wine-overview" },
          { label: "Le Moulin Rouge®", href: "/wine-overview" },
          { label: "Ma Danseuse", href: "/wine-overview" },
        ]}
        image="/images/rose.svg"
        imageAlt="Various wine bottles"
        decoration="/images/grape-faint.png"
      />

      <FeatureListBannerReverse
        title="Cabernet Franc"
        image="/images/rose.svg"
        imageAlt="Cheers with wine glasses"
        decoration="/images/bottle-glasses-faint.png"
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
        decoration="/images/grape-faint.png"
      />
    </>
  );
}
