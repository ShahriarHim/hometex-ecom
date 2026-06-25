"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PriceFormatter from "./PriceFormatter";

interface ProductStickyBarProps {
  productImage: string;
  productName: string;
  price: number;
  isInStock: boolean;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onAddToCart: () => void;
  onVisibilityChange?: (isVisible: boolean) => void;
}

const SCROLL_THRESHOLD_ENTER = 350;
const SCROLL_THRESHOLD_EXIT = 200;
const SCROLL_THROTTLE_MS = 50;

export const ProductStickyBar = ({
  productImage,
  productName,
  price,
  isInStock,
  quantity,
  minQuantity,
  maxQuantity,
  onQuantityChange,
  onAddToCart,
  onVisibilityChange,
}: ProductStickyBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = (scrollY: number) => {
      const currentlyVisible = isVisibleRef.current;
      let shouldBeVisible = currentlyVisible;

      if (!currentlyVisible && scrollY >= SCROLL_THRESHOLD_ENTER) {
        shouldBeVisible = true;
      } else if (currentlyVisible && scrollY <= SCROLL_THRESHOLD_EXIT) {
        shouldBeVisible = false;
      }

      if (shouldBeVisible !== currentlyVisible) {
        isVisibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
        onVisibilityChange?.(shouldBeVisible);

        const preheaderWrapper = document.getElementById("preheader-wrapper");
        const mainHeader = document.getElementById("main-header");

        if (shouldBeVisible) {
          if (preheaderWrapper) {
            preheaderWrapper.classList.remove("header-visible");
            preheaderWrapper.classList.add("header-hidden");
          }
          if (mainHeader) {
            mainHeader.classList.remove("header-visible");
            mainHeader.classList.add("header-hidden");
          }
        } else {
          if (preheaderWrapper) {
            preheaderWrapper.classList.remove("header-hidden");
            preheaderWrapper.classList.add("header-visible");
          }
          if (mainHeader) {
            mainHeader.classList.remove("header-hidden");
            mainHeader.classList.add("header-visible");
          }
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const currentTime = Date.now();

          if (currentTime - lastUpdateTimeRef.current >= SCROLL_THROTTLE_MS) {
            lastUpdateTimeRef.current = currentTime;
            updateVisibility(scrollY);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const initialScrollY = window.scrollY;
    updateVisibility(initialScrollY);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      const preheaderWrapper = document.getElementById("preheader-wrapper");
      const mainHeader = document.getElementById("main-header");
      if (preheaderWrapper) {
        preheaderWrapper.classList.remove("header-hidden");
        preheaderWrapper.classList.add("header-visible");
      }
      if (mainHeader) {
        mainHeader.classList.remove("header-hidden");
        mainHeader.classList.add("header-visible");
      }
    };
  }, [onVisibilityChange]);

  const handleDecrease = () => {
    if (quantity > minQuantity) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-yellow-600 border-b border-yellow-700 shadow-lg ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transition:
          "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Product Image */}
          <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-white/30 shadow-md">
            <Image
              src={productImage || "/placeholder.svg"}
              alt={productName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* Product Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">{productName}</h3>
          </div>

          {/* Price */}
          <div className="flex-shrink-0 hidden sm:block">
            <PriceFormatter amount={price} className="text-lg font-bold text-white" />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/20 hover:bg-white/30 border-white/30 text-white"
              onClick={handleDecrease}
              disabled={quantity <= minQuantity || !isInStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10) || minQuantity;
                if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
                  onQuantityChange(newQuantity);
                }
              }}
              className="w-16 text-center border border-white/30 rounded px-2 py-1 text-sm bg-white/20 text-white font-medium placeholder:text-white/70"
              min={minQuantity}
              max={maxQuantity}
              disabled={!isInStock}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white/20 hover:bg-white/30 border-white/30 text-white"
              onClick={handleIncrease}
              disabled={quantity >= maxQuantity || !isInStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <div className="flex-shrink-0">
            {isInStock ? (
              <Button
                onClick={onAddToCart}
                size="sm"
                className="bg-yellow-500 text-white hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all border-0 font-semibold"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white/70 cursor-not-allowed border-0"
                disabled
              >
                <span className="hidden sm:inline">Request Stock</span>
                <span className="sm:hidden">Request</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
