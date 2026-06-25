"use client";

import { Button } from "@/components/ui/button";
import { productService } from "@/services/api";
import styles from "@/styles/DailyDealPopup.module.css";
import type { Product } from "@/types/api/product";
import { Clock, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DailyDealPopupProps {
  onClose: () => void;
}

interface RawProductData {
  product?: RawProductData;
  pricing?: {
    regular_price: number;
    final_price: number;
    sale_price: number;
    discount?: {
      value: number;
    };
  };
  media?: {
    primary_image?: {
      url: string;
      thumbnail: string;
    };
  };
  primary_photo?: string;
  subcategory?: {
    slug: string;
  };
  [key: string]: unknown;
}

const DailyDealPopup = ({ onClose }: DailyDealPopupProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 23,
    seconds: 45,
  });

  useEffect(() => {
    const fetchDealProduct = async () => {
      try {
        setLoading(true);
        // Fetch specific daily deal product by ID 367
        const response = await productService.getProduct(367);
        if (response.success && response.data) {
          const rawData = response.data as unknown as RawProductData;
          // Handle nested structure from API response (data.product)
          const productData = (rawData.product || rawData) as Product & RawProductData;

          // Map nested pricing fields to flat structure expected by UI
          if (productData.pricing) {
            productData.regular_price = productData.pricing.regular_price;
            productData.price = productData.pricing.final_price;
            productData.sale_price = productData.pricing.sale_price;
            // Map discount if available
            if (productData.pricing.discount) {
              productData.discount_percent = productData.pricing.discount.value;
            }
          }

          // Map nested media fields
          if (productData.media?.primary_image) {
            productData.thumbnail = productData.media.primary_image.thumbnail;
            productData.primary_photo = productData.media.primary_image.url;
            productData.images = [productData.media.primary_image.url];
          }

          setProduct(productData);
        }
      } catch (error) {
        console.error("Failed to fetch daily deal product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealProduct();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGrabDeal = () => {
    if (!product) {
      return;
    }
    onClose();

    // Construct robust URL matching the app's routing structure: /products/[category]/[subcategory]/[id]
    const categorySlug = product.category?.slug || "all";
    // Check both potential subcategory properties
    const hasSub = product.sub_category || (product as unknown as RawProductData).subcategory;
    const subCategorySlug = hasSub?.slug || "all";

    const productUrl = `/products/${categorySlug}/${subCategorySlug}/${product.id}`;
    window.location.href = productUrl;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Calculate discount if not provided
  const discountPercent = product
    ? product.discount_percent ||
      (product.regular_price > 0 && product.sale_price
        ? Math.round(((product.regular_price - product.sale_price) / product.regular_price) * 100)
        : 0)
    : 0;

  // Enhance image selection logic
  const productImage =
    product?.thumbnail ||
    product?.images?.[0] ||
    (product as unknown as RawProductData)?.primary_photo || // Check common variations
    null;

  if (loading) {
    return (
      <div className={styles.container} role="dialog" aria-modal="true">
        <div className={`${styles.popup} flex items-center justify-center min-h-[400px]`}>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null; // Don't show popup if product failed to load
  }

  return (
    <div
      className={styles.container}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-deal-title"
    >
      <div className={`${styles.popup} animate-in fade-in zoom-in-95 duration-300`}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close daily deal popup"
          type="button"
        >
          <X className={styles.closeIcon} />
        </button>

        <div className={styles.dealLabel}>Daily Deal</div>

        <div className={styles.imageContainer}>
          {productImage ? (
            <Image
              src={productImage}
              alt={product.name}
              width={300}
              height={300}
              className={styles.productImage}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
              No Image
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 id="daily-deal-title" className={styles.productName}>
            {product.name}
          </h3>

          <div className={styles.priceBlock}>
            <div className={styles.priceRow}>
              {Number(product.regular_price) > Number(product.sale_price || product.price) && (
                <span className={styles.originalPrice}>
                  ৳{Number(product.regular_price || 0).toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className={styles.discountBadge}>-{discountPercent}%</span>
              )}
            </div>
            <div className={styles.dealPrice}>
              ৳{Number(product.sale_price || product.price || 0).toLocaleString()}
            </div>
          </div>

          <div className={styles.timerContainer}>
            <Clock className={styles.timerIcon} />
            <span className={styles.timerLabel}>Ends in:</span>
            <div className={styles.timer}>
              <span className={styles.timerValue}>
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <Button onClick={handleGrabDeal} className={styles.ctaButton} size="lg">
            Grab Deal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyDealPopup;
