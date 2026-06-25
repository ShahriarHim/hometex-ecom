"use client";

import { heroSlides as fallbackSlides, type HeroSlide } from "@/data/migration-content";
import { transformHeroBannerToSlide } from "@/lib/transforms";
import { productService } from "@/services/api";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const HeroShowcase = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackSlides);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  }, []);

  // Fetch hero banners from API
  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        setIsLoading(true);
        const response = await productService.getHeroBanners();

        if (response.success && response.data.length > 0) {
          // Transform API data to HeroSlide format
          const transformedSlides = response.data
            .filter((banner) => banner.status === 1) // Only active banners (status: 1)
            .map((banner) => transformHeroBannerToSlide(banner));

          // Use transformed slides if available, otherwise fallback
          if (transformedSlides.length > 0) {
            setHeroSlides(transformedSlides);
          } else {
            // All banners are inactive, use fallback slides
            setHeroSlides(fallbackSlides);
          }
        } else {
          console.warn("⚠️ API returned no data or unsuccessful, using fallback");
          // Use fallback slides if API returns no data
          setHeroSlides(fallbackSlides);
        }
      } catch (error) {
        console.error("❌ Failed to fetch hero banners:", error);
        // Use fallback slides on error
        setHeroSlides(fallbackSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="relative overflow-hidden py-5">
        <div className="max-w-[1350px] mx-auto bg-gray-200 rounded-lg h-[500px] flex items-center justify-center animate-pulse">
          <div className="text-gray-500 text-xl font-medium">Loading hero banners...</div>
        </div>
      </div>
    );
  }

  if (!heroSlides.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden py-5">
      <div className="max-w-[1350px] mx-auto bg-white rounded-lg transition-shadow duration-300 overflow-hidden">
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          speed={800}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, EffectFade]}
          onSlideChange={handleSlideChange}
          className="mySwiper rounded-lg overflow-hidden"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id || `slide-${index}`} className="rounded-lg overflow-hidden">
              <div className="relative h-[500px] flex w-full overflow-hidden gap-[15px] rounded-lg">
                {/* Left Section */}
                {slide.accentPalette?.left && (
                  <div className="flex h-full w-[25%] gap-[15px] flex-shrink-0 pl-[15px]">
                    {[
                      {
                        opacity: "opacity-100",
                        width: "w-[40%]",
                        delay: "delay-100",
                      },
                      {
                        opacity: "opacity-80",
                        width: "w-[15%]",
                        delay: "delay-200",
                      },
                      {
                        opacity: "opacity-60",
                        width: "w-[10%]",
                        delay: "delay-300",
                      },
                      {
                        opacity: "opacity-40",
                        width: "w-[5%]",
                        delay: "delay-400",
                      },
                      {
                        opacity: "opacity-20",
                        width: "w-[5%]",
                        delay: "delay-500",
                      },
                    ].map((style, idx) => (
                      <div
                        key={idx}
                        className={`${style.opacity} ${style.width} h-full animate-fadeInColumn ${style.delay} ${
                          idx === 0 ? "rounded-l-2xl" : ""
                        }`}
                        style={{
                          backgroundColor: slide.accentPalette.left[idx] || "hsl(var(--primary))",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Middle Section */}
                <div className="flex-1 flex items-center justify-center bg-white overflow-hidden">
                  <div className="text-center px-4 max-w-3xl mx-auto">
                    {slide.eyebrow && (
                      <h3 className="text-red-600 text-6xl font-bold mb-6 animate-fadeIn">
                        {slide.eyebrow}
                      </h3>
                    )}
                    <h2 className="text-gray-900 text-5xl font-bold mb-8 animate-fadeIn delay-200">
                      {slide.title}
                    </h2>
                    {slide.description && (
                      <p className="text-gray-600 text-lg mb-10 animate-fadeIn delay-400">
                        {slide.description}
                      </p>
                    )}
                    <Link
                      href="/products"
                      className="bg-yellow-600 text-black px-8 py-3 text-lg font-medium inline-block
                        hover:bg-yellow-500 hover:text-black transition-colors duration-300 rounded"
                    >
                      Go Shop Now
                    </Link>
                  </div>
                </div>

                {/* Right Section */}
                {slide.accentPalette?.right && (
                  <div className="flex h-full w-[25%] gap-[15px] flex-shrink-0 pr-[15px]">
                    {[
                      {
                        opacity: "opacity-20",
                        width: "w-[5%]",
                        delay: "delay-500",
                      },
                      {
                        opacity: "opacity-40",
                        width: "w-[5%]",
                        delay: "delay-400",
                      },
                      {
                        opacity: "opacity-60",
                        width: "w-[10%]",
                        delay: "delay-300",
                      },
                      {
                        opacity: "opacity-80",
                        width: "w-[15%]",
                        delay: "delay-200",
                      },
                      {
                        opacity: "opacity-100",
                        width: "w-[40%]",
                        delay: "delay-100",
                      },
                    ].map((style, idx) => (
                      <div
                        key={idx}
                        className={`${style.opacity} ${style.width} h-full animate-fadeInColumn ${style.delay} ${
                          idx === 4 ? "rounded-r-2xl" : ""
                        }`}
                        style={{
                          backgroundColor:
                            slide.accentPalette.right[idx] || "hsl(var(--secondary-light))",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div className="flex justify-center items-center gap-2 py-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-yellow-600"
                  : "w-2 bg-yellow-600/30 hover:bg-yellow-600/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeInColumn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-fadeInColumn {
          animation: fadeInColumn 1s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .opacity-100 {
          opacity: 1;
        }
        .opacity-80 {
          opacity: 0.8;
        }
        .opacity-60 {
          opacity: 0.6;
        }
        .opacity-40 {
          opacity: 0.4;
        }
        .opacity-20 {
          opacity: 0.2;
        }

        .delay-100 {
          animation-delay: 0.2s;
        }
        .delay-200 {
          animation-delay: 0.3s;
        }
        .delay-300 {
          animation-delay: 0.4s;
        }
        .delay-400 {
          animation-delay: 0.5s;
        }
        .delay-500 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};
