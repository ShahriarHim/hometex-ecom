"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { productService } from "@/services/api";
import type { CategoryTree } from "@/types/api";
import { useEffect, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const DealHighlights = () => {
  const [subcategories, setSubcategories] = useState<
    Array<{ id: number; name: string; slug: string; categorySlug: string; image: string | null }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [_bannerSwiperInstance, setBannerSwiperInstance] = useState<SwiperClass | null>(null);

  // Local fallback images mapping based on subcategory/category name keywords
  const getFallbackImage = (name: string, categorySlug: string): string => {
    const lowerName = name.toLowerCase();
    const lowerCategory = categorySlug.toLowerCase();

    // Check for matching keywords
    if (lowerName.includes("bed") || lowerCategory.includes("bed")) {
      return "/images/catagories/Bed.jpg";
    }
    if (lowerName.includes("bath") || lowerCategory.includes("bath")) {
      return "/images/catagories/Bathing.jpg";
    }
    if (lowerName.includes("pillow") || lowerName.includes("cushion")) {
      return "/images/catagories/Pillow.jpg";
    }
    if (lowerName.includes("curtain") || lowerName.includes("drape")) {
      return "/images/catagories/Curtainssss.jpg";
    }
    if (lowerName.includes("table") || lowerName.includes("linen")) {
      return "/images/catagories/Table.jpg";
    }
    if (lowerName.includes("living") || lowerName.includes("decor")) {
      return "/images/catagories/Living D.jpg";
    }
    if (lowerName.includes("rug") || lowerName.includes("carpet")) {
      return "/images/designSix/Handmade_Rugs.png";
    }
    if (lowerName.includes("robe") || lowerName.includes("towel")) {
      return "/images/designSix/bathrobes.png";
    }
    if (lowerName.includes("quilt") || lowerName.includes("comforter")) {
      return "/images/designSix/Summer_Quilt_Banner.png";
    }
    // Default fallback
    return "/images/catagories/Bed.jpg";
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await productService.getMenu();
        if (response.success && response.data) {
          const allSubcategories: Array<{
            id: number;
            name: string;
            slug: string;
            categorySlug: string;
            image: string | null;
          }> = [];

          response.data.forEach((category: CategoryTree) => {
            const categorySlug = category.name
              .toLowerCase()
              .replace(/ & /g, "-")
              .replace(/ /g, "-");
            if (category.subcategories && category.subcategories.length > 0) {
              category.subcategories.forEach((sub) => {
                allSubcategories.push({
                  id: sub.id,
                  name: sub.name,
                  slug: sub.slug,
                  categorySlug,
                  image: sub.image,
                });
              });
            }
          });

          setSubcategories(allSubcategories);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1360px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-black">
            Today&apos;s Best Deals
          </span>
        </h1>

        {/* Sub Category Banner with Scrolling */}
        {!loading && subcategories.length > 0 && (
          <div className="mb-8">
            <Swiper
              onSwiper={setBannerSwiperInstance}
              slidesPerView={3}
              spaceBetween={20}
              navigation={false}
              modules={[Navigation, Autoplay]}
              className="subcategory-banner-swiper"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={subcategories.length > 3}
              speed={800}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {subcategories.map((sub) => (
                <SwiperSlide key={sub.id}>
                  <Link
                    href={{
                      pathname: `/categories/${sub.categorySlug}`,
                      query: { sub: sub.id.toString() },
                    }}
                    className="block group"
                  >
                    <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <div className="absolute inset-0">
                        <img
                          src={sub.image || getFallbackImage(sub.name, sub.categorySlug)}
                          alt={sub.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            // If API image fails, use fallback
                            e.currentTarget.src = getFallbackImage(sub.name, sub.categorySlug);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                          {sub.name}
                        </h3>
                        <Button
                          size="sm"
                          className="w-fit bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-md"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/categories/${sub.categorySlug}?sub=${sub.id}`;
                          }}
                        >
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};
