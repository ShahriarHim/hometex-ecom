"use client";

import { CustomerSatisfactionModal } from "@/components/CustomerSatisfactionModal";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

// Gallery images for the footer
const galleryImages = [
  "/images/designSix/bathrobes.png",
  "/images/designSix/feather_pillow.png",
  "/images/designSix/Handmade_Rugs.png",
  "/images/designSix/Summer_Quilt_Banner.png",
];

export const Footer = () => {
  const t = useTranslations("footer");
  const [isSatisfactionModalOpen, setIsSatisfactionModalOpen] = useState(false);

  return (
    <footer className="bg-white  mt-16">
      {/* Top Tagline Section */}
      <div className="py-2">
        <div className="max-w-[1360px] mx-auto px-8 text-center">
          <Image
            src="/images/hometex-logo.png"
            alt="Hometex Logo"
            width={150}
            height={50}
            className="mx-auto mb-3"
          />
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Discover the perfect blend of style and comfort with our curated collection of home
            textiles. Transform your living spaces with our premium quality products.
          </p>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-[1360px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Store Information - 2 cols */}
          <div className="md:col-span-4">
            <h3 className="text-base font-semibold text-gray-800 mb-5">Store Information</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-gray-600 leading-relaxed">{t("address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center flex-shrink-0 text-white transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-gray-600">+( 028 ) {t("phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center flex-shrink-0 text-white transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-gray-600">{t("email")}</span>
              </li>
            </ul>
          </div>

          {/* Our Gallery - 6 cols (images in a row) */}
          <div className="md:col-span-4">
            <h3 className="text-base font-semibold text-center text-gray-800 mb-5">Our Gallery</h3>
            <div className="flex gap-2">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-16 overflow-hidden rounded-lg group shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Information - 2 cols */}
          <div className="md:col-span-2 ml-8">
            <h3 className="text-base font-semibold text-gray-800 mb-5">Information</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsSatisfactionModalOpen(true)}
                  className="text-gray-500 hover:text-yellow-600 transition-colors text-left"
                >
                  Customer Satisfaction
                </button>
              </li>
            </ul>
          </div>

          {/* Account - 2 cols */}
          <div className="md:col-span-2 ml-8">
            <h3 className="text-base font-semibold text-gray-800 mb-5">Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/account"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/account/wishlist"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Wish List
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-500 hover:text-yellow-600 transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Media Icons - Centered with line through */}
      <div className="relative py-2">
        {/* Horizontal line that goes through the icons */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-gray-200" />

        {/* Social icons with white background to "cut" the line */}
        <div className="flex justify-center">
          <div className="flex gap-2 bg-white px-6 relative z-10">
            <a
              href="https://www.facebook.com/hometex.ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/HometexBD"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@hometexbangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/hometex_bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-yellow-600 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright & Payment Icons */}
      <div className="py-2">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-black text-sm font-bold">
            Powered by{" "}
            <a href="https://hometex.ltd" className="text-yellow-600 hover:underline">
              Hometex
            </a>{" "}
            Your Store © {new Date().getFullYear()}
          </p>

          {/* Payment Methods */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/payments/bkash.svg"
                alt="bKash"
                width={50}
                height={30}
                className="object-contain"
              />
              <Image
                src="/images/payments/nagad.svg"
                alt="Nagad"
                width={50}
                height={30}
                className="object-contain"
              />
              <Image
                src="/images/payments/rocket.svg"
                alt="Rocket"
                width={50}
                height={30}
                className="object-contain"
              />
              <Image
                src="/images/payments/nexus.svg"
                alt="Nexus"
                width={50}
                height={30}
                className="object-contain"
              />
              {/* Cash on Delivery */}
              <div className="bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                COD
              </div>
            </div>
            <p className="text-xs text-gray-400 italic">🔜 Online payment coming soon!</p>
          </div>
        </div>
      </div>

      <CustomerSatisfactionModal
        isOpen={isSatisfactionModalOpen}
        onClose={() => setIsSatisfactionModalOpen(false)}
      />
    </footer>
  );
};
