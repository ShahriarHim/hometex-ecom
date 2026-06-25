"use client";

import { Link } from "@/i18n/routing";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  text: string;
}

export const CustomerFeedbackSection = () => {
  const t = useTranslations("customerSatisfaction");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: t("testimonial1.name"),
      role: t("testimonial1.role"),
      avatar: "/images/testimonials/avatar1.jpg",
      text: t("testimonial1.text"),
    },
    {
      id: "2",
      name: t("testimonial2.name"),
      role: t("testimonial2.role"),
      avatar: "/images/testimonials/avatar2.jpg",
      text: t("testimonial2.text"),
    },
    {
      id: "3",
      name: t("testimonial3.name"),
      role: t("testimonial3.role"),
      avatar: "/images/testimonials/avatar3.jpg",
      text: t("testimonial3.text"),
    },
    {
      id: "4",
      name: t("testimonial4.name"),
      role: t("testimonial4.role"),
      avatar: "/images/testimonials/avatar4.jpg",
      text: t("testimonial4.text"),
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1360px] mx-auto px-4">
        <div className="relative">
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Stats */}
            <div className="lg:w-2/5 bg-yellow-600 p-10 lg:p-14 rounded-l-2xl text-white relative overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full" />

              <div className="relative z-10">
                <h2 className="text-5xl lg:text-6xl font-bold mb-2 text-white">
                  {t("metricValue")}
                </h2>
                <p className="text-xl lg:text-2xl font-semibold uppercase tracking-wide mb-6 text-white">
                  {t("metricLabel")}
                </p>
                <p className="text-sm opacity-80 leading-relaxed mb-8 max-w-xs text-white">
                  {t("supportingText")}
                </p>
                <Link
                  href="/products"
                  className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-[#6C63FF] transition-colors uppercase tracking-wide rounded-md"
                >
                  {t("primaryAction")}
                </Link>
              </div>
            </div>

            {/* Right Section - Testimonials Carousel */}
            <div className="lg:w-3/5 bg-yellow-600 p-8 lg:p-12 rounded-r-2xl">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex-[0_0_50%] min-w-0 pl-4">
                      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                        {/* Avatar at top */}
                        <div className="flex justify-center mb-4">
                          <Avatar className="h-16 w-16 border-4 border-[#E91E63]/20">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-[#E91E63]/10 text-[#E91E63] text-lg font-bold">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Quote text */}
                        <blockquote className="text-gray-600 text-sm leading-relaxed text-center mb-4 italic">
                          &ldquo;{testimonial.text}&rdquo;
                        </blockquote>

                        {/* Quote mark */}
                        <div className="flex justify-center mb-3">
                          <span className="text-4xl text-[#E91E63] font-serif">&rdquo;</span>
                        </div>

                        {/* Name and role */}
                        <div className="text-center">
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
