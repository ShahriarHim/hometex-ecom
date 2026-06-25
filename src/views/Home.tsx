import HotDeals from "@/components/home/HotDeals";
import { HeroShowcase } from "@/views/home/HeroShowcase";
import { InfoHighlights } from "@/views/home/InfoHighlights";
import { NewsletterCta } from "@/views/home/NewsletterCta";
import { StartBuilding } from "@/views/home/StartBuilding";
import dynamic from "next/dynamic";

interface SectionSkeletonProps {
  title: string;
}

const SectionSkeleton = ({ title }: SectionSkeletonProps) => (
  <section className="py-12">
    <div className="container px-4 space-y-3">
      <div className="h-7 w-48 rounded bg-muted animate-pulse" aria-label={`${title} loading`} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-40 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

const CollectionSpotlight = dynamic(
  () => import("@/views/home/CollectionSpotlight").then((m) => m.CollectionSpotlight),
  { loading: () => <SectionSkeleton title="Collections" /> }
);

const CategorySpotlight = dynamic(
  () => import("@/views/home/CategorySpotlight").then((m) => m.CategorySpotlight),
  { loading: () => <SectionSkeleton title="Categories" /> }
);
const ProductShowcaseTabs = dynamic(
  () => import("@/views/home/ProductShowcaseTabs").then((m) => m.ProductShowcaseTabs),
  { loading: () => <SectionSkeleton title="Products" />, ssr: false }
);

const SaleSection = dynamic(() => import("@/views/home/SaleSection").then((m) => m.SaleSection), {
  loading: () => <SectionSkeleton title="Sale" />,
});

// const NewArrival = dynamic(() => import("@/views/home/NewArrival").then((m) => m.NewArrival), {
//   loading: () => <SectionSkeleton title="New Arrivals" />,
// });

const MattressSection = dynamic(
  () => import("@/views/home/MattressSection").then((m) => m.MattressSection),
  { loading: () => <SectionSkeleton title="Mattress" /> }
);

const DealHighlights = dynamic(
  () => import("@/views/home/DealHighlights").then((m) => m.DealHighlights),
  { loading: () => <SectionSkeleton title="Deals" /> }
);

const BestSellers = dynamic(() => import("@/views/home/BestSellers").then((m) => m.BestSellers), {
  loading: () => <SectionSkeleton title="Best Sellers" />,
});

const CustomerFeedbackSection = dynamic(
  () => import("@/views/home/CustomerFeedbackSection").then((m) => m.CustomerFeedbackSection),
  { loading: () => <SectionSkeleton title="Customer Feedback" /> }
);

const GridBanners = dynamic(() => import("@/views/home/GridBanners").then((m) => m.GridBanners), {
  loading: () => <SectionSkeleton title="Grid Banners" />,
});

export const HomeView = () => {
  return (
    <main className="flex-1">
      {/* 1. Home Slider */}
      <HeroShowcase />

      {/* 2. Shop By Collection */}
      <CollectionSpotlight />

      {/* 3. Satisfaction Quality Guaranteed */}
      <InfoHighlights />

      {/* 4. Category Section */}
      <CategorySpotlight />

      {/* 5. Hot Deal Section */}
      <HotDeals />

      {/* 6. Grid Banners */}
      <GridBanners />

      {/* 7. Sale Section */}
      <SaleSection />

      {/* 8. Start Building Section */}
      <StartBuilding />

      {/* 9. New Arrival */}
      {/* <NewArrival /> */}

      {/* Parallax Pattern Background Section */}
      <div className="parallax-pattern-section">
        {/* Curated Collections */}
        <ProductShowcaseTabs />
      </div>

      {/* 10. Mattress Section */}
      <MattressSection />

      {/* 11. Sub Category Banner - Today's Best Deals */}
      <DealHighlights />

      {/* Parallax Pattern Background Section */}
      <div className="parallax-pattern-section">
        {/* 12. Most Popular - Best Sellers */}
        <BestSellers />
      </div>

      {/* 13. Customer Feedback Section */}
      <CustomerFeedbackSection />

      {/* 14. Newsletter CTA */}
      <NewsletterCta />
    </main>
  );
};
