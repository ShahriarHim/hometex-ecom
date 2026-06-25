"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

interface BannerItem {
  url: string;
  text: string;
  href: string;
}

const bannerItems: BannerItem[] = [
  {
    url: "/images/designSix/Summer_Quilt_Banner.png",
    text: "Summer Quilt",
    href: "/products?category=summer-quilt",
  },
  {
    url: "/images/designSix/bathrobes.png",
    text: "Bathrobes",
    href: "/products?category=bathrobes",
  },
  {
    url: "/images/designSix/Handmade_Rugs.png",
    text: "Handmade Rugs",
    href: "/products?category=handmade-rugs",
  },
  {
    url: "/images/designSix/feather_pillow.png",
    text: "Feather Pillow",
    href: "/products?category=feather-pillow",
  },
];

export const GridBanners = () => {
  return (
    <section className="max-w-[1360px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bannerItems.map((banner, index) => (
          <Link
            key={index}
            href={banner.href as Route}
            className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 block aspect-[2/1]"
          >
            <Image
              src={banner.url}
              alt={banner.text}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute bottom-8 left-0 bg-yellow-600 text-gray-800 px-8 py-3 transform translate-y-0 transition-transform duration-300 group-hover:translate-y-[-8px] shadow-md">
              <p className="font-medium text-sm md:text-base">{banner.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GridBanners;
